# Cross-device sync — a base DB + an identifier

Your progress syncs as one JSON blob keyed by a secret token you generate in the
app. The token is the entire "account": same token on every device = same data.
Two interchangeable backends implement the same contract (`GET`/`PUT /sync/<token>`).

## Option A (recommended) — built into the Vercel app

The API route already ships with the app (`guitar-jam/api/sync/[token].js`).
One-time setup, all inside the Vercel dashboard:

1. Vercel → your **guitar** project → **Storage** → **Create Database** →
   **Upstash Redis** (free tier) → connect it to the project.
2. **Redeploy** (Deployments → ⋯ → Redeploy) so the function picks up the
   database credentials.

Then in the app on each device: **Assessment tab → Cloud Sync** →
tap **"This site"** → on the first device tap **Generate** and save the token
somewhere safe → paste the same token on the other devices → ON.

No extra accounts, no CORS, no separate deploy — the app syncs to itself.

## Option B — standalone Cloudflare Worker

Same contract, hosted on a free Cloudflare account instead:

```bash
cd sync-worker
npx wrangler login
npx wrangler kv namespace create SYNC_KV   # paste the printed id into wrangler.toml
npx wrangler deploy                         # prints your Worker URL
```

In the app, paste the Worker URL instead of tapping "This site".

## Behavior (both options)

- Every change pushes automatically (3 s debounce); every app launch pulls the
  latest before rendering. Conflict rule: **last write wins** — practice on one
  device at a time.
- The token in the URL path is the auth. Treat it like a password; rotating it
  = generating a new one and re-entering it everywhere.
- Nothing else is stored: no account, no analytics, one JSON blob per token.
