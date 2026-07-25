# Sync backend — Cloudflare Worker + KV

Auto-syncs your Stage Ready 90 progress (`stage90` data) across phone / iPad / Mac.
Free tier is far more than enough (the blob is a few KB; free KV allows 100k reads/day).

## One-time setup (~10 minutes)

1. **Create a free Cloudflare account** at https://dash.cloudflare.com/sign-up (no card needed).
2. On any machine with Node:
   ```bash
   cd sync-worker
   npx wrangler login                          # opens browser, authorize
   npx wrangler kv namespace create SYNC_KV   # prints an id
   ```
3. Paste the printed `id` into `wrangler.toml` (replacing `PASTE_YOUR_KV_NAMESPACE_ID_HERE`).
4. Deploy:
   ```bash
   npx wrangler deploy
   ```
   It prints your Worker URL, e.g. `https://guitar-sync.<your-subdomain>.workers.dev`.

## Connect the app

On **each** device, open the app → **Assessment tab → Cloud sync** card:

1. Paste the Worker URL.
2. On the FIRST device: tap **Generate** to create a secret sync token, then copy it
   somewhere safe (it's the only key to your data — anyone with it can read/write it).
3. On the other devices: paste the SAME token.
4. Enable sync.

From then on every change pushes automatically (debounced a few seconds), and each
app launch pulls the latest before rendering. Conflict rule: **last write wins** —
practice on one device at a time and you'll never notice.

## Notes

- The token in the URL path is the whole auth model. It's fine for a single-user
  personal app; don't share the token or the data becomes shared.
- To rotate the token: generate a new one on one device, re-enter it on the others.
  The old blob just goes stale in KV.
- Nothing else is stored: no account, no analytics, one JSON blob per token.
