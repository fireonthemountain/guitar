// Built-in sync endpoint — the "base DB + identifier" model.
// One JSON blob per token, stored in the Redis database linked to this
// Vercel project (Storage → Create Database → Upstash Redis, free tier).
// The 32+ character token IS the auth: knowing it is owning the data.
// Same contract as sync-worker/worker.js, so the app's sync client works
// against either backend unchanged.

import { createHash } from 'node:crypto';

const TOKEN_RE = /^[A-Za-z0-9_-]{32,128}$/;
const MAX_BYTES = 512 * 1024;
const digest = (body) => createHash('sha1').update(body).digest('hex');
// The comparison and write run atomically, including concurrent first writes.
const COMPARE_AND_SET = `
local current = redis.call('GET', KEYS[1]) or 'null'
if redis.sha1hex(current) ~= ARGV[1] then return 0 end
redis.call('SET', KEYS[1], ARGV[2])
return 1`;

function redisEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

// Upstash REST: POST the command as a JSON array to the base URL.
async function redis(env, cmd) {
  const res = await fetch(env.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error('database command failed');
  return data.result;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, If-Match');
  res.setHeader('Access-Control-Expose-Headers', 'ETag');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!['GET', 'PUT'].includes(req.method)) return res.status(405).json({ error: 'method not allowed' });

  const token = req.query?.token;
  if (!TOKEN_RE.test(token || '')) return res.status(404).json({ error: 'not found' });

  const env = redisEnv();
  if (!env) {
    return res.status(503).json({ error: 'no database linked — in Vercel: Storage → Create Database (Upstash Redis), connect it to this project, redeploy' });
  }

  const key = 'blob:' + token;
  try {
    if (req.method === 'GET') {
      const stored = await redis(env, ['GET', key]);
      res.setHeader('ETag', `"${digest(stored ?? 'null')}"`);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(stored ?? 'null');
    }

    if (req.method === 'PUT') {
      let body;
      try {
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? null);
        const parsed = JSON.parse(body);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid progress');
      } catch { return res.status(400).json({ error: 'invalid progress JSON' }); }
      if (Buffer.byteLength(body, 'utf8') > MAX_BYTES) return res.status(413).json({ error: 'too large' });
      const expected = req.headers?.['if-match'];
      if (!/^"[a-f0-9]{40}"$/.test(expected || '')) {
        return res.status(428).json({ error: 'refresh the app and check the cloud copy before uploading' });
      }
      const written = await redis(env, ['EVAL', COMPARE_AND_SET, 1, key, expected.slice(1, -1), body]);
      if (Number(written) !== 1) return res.status(409).json({ error: 'cloud progress changed; both devices must check the latest copy' });
      res.setHeader('ETag', `"${digest(body)}"`);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'method not allowed' });
  } catch {
    return res.status(502).json({ error: 'database error' });
  }
}
