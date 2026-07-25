// Stage Ready 90 sync — a tiny Cloudflare Worker + KV blob store.
// One route: /sync/<token>. The token is a user-generated secret (32+ hex
// chars); knowing it IS the authorization, so treat it like a password.
// GET returns the stored blob (or null), PUT replaces it. Last write wins.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const MAX_BYTES = 512 * 1024; // stage90 blobs are a few KB; this is generous

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const m = new URL(request.url).pathname.match(/^\/sync\/([A-Za-z0-9_-]{32,128})$/);
    if (!m) {
      return new Response(JSON.stringify({ error: 'not found' }), {
        status: 404,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }
    const key = 'blob:' + m[1];

    if (request.method === 'GET') {
      const stored = await env.SYNC_KV.get(key);
      return new Response(stored ?? 'null', {
        headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }

    if (request.method === 'PUT') {
      const body = await request.text();
      if (body.length > MAX_BYTES) {
        return new Response(JSON.stringify({ error: 'too large' }), {
          status: 413,
          headers: { ...CORS, 'Content-Type': 'application/json' },
        });
      }
      try {
        JSON.parse(body); // only store valid JSON
      } catch {
        return new Response(JSON.stringify({ error: 'invalid JSON' }), {
          status: 400,
          headers: { ...CORS, 'Content-Type': 'application/json' },
        });
      }
      await env.SYNC_KV.put(key, body);
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'method not allowed' }), {
      status: 405,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  },
};
