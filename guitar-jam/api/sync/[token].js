// Built-in sync endpoint — the "base DB + identifier" model.
// One JSON blob per token, stored in the Redis database linked to this
// Vercel project (Storage → Create Database → Upstash Redis, free tier).
// The 32+ character token IS the auth: knowing it is owning the data.
// Same contract as sync-worker/worker.js, so the app's sync client works
// against either backend unchanged.

const TOKEN_RE = /^[A-Za-z0-9_-]{32,128}$/;
const MAX_BYTES = 512 * 1024;

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
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  return (await res.json()).result;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

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
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(stored ?? 'null');
    }

    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? null);
      if (!body || body === 'null') return res.status(400).json({ error: 'empty body' });
      if (body.length > MAX_BYTES) return res.status(413).json({ error: 'too large' });
      JSON.parse(body); // store valid JSON only
      await redis(env, ['SET', key, body]);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'method not allowed' });
  } catch {
    return res.status(502).json({ error: 'database error' });
  }
}
