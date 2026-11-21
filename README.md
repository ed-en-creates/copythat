# CopyThat

An open-source library of AI prompts and workflows for creatives — every prompt shows the result it made.

- **Prompts:** CC BY 4.0 (see `CONTENT-LICENSE.md`) · **Code:** MIT (see `LICENSE`)
- Contributing: see `CONTRIBUTING.md`

Built with Next.js 16 (App Router) + Supabase.

## Run locally
1. `npm install`
2. Create `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://eflifirrqfngxiuzfxwk.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable key from Supabase → Project Settings → API>
   ```
3. `npm run dev` → http://localhost:3000

## Where things live
- `app/` — pages: home (`page.js`), `library`, `p/[slug]` (prompt pages), `open-source`, `how`, `changelog`, `signin`, `account`, `submit`, `feedback`
- `app/actions.js` — server actions: waitlist, feedback, submissions, "did it work?" votes, magic-link sign-in
- `components/` — Prompt Machine hero, library, forms, film player, customiser
- `lib/` — Supabase clients and data queries
- `proxy.js` — keeps the sign-in session fresh

## Database (Supabase)
Tables: `prompts` (public metadata), `prompt_pro_content` (Pro text, readable only by Pro members via RLS), `profiles` (`is_pro`), `waitlist`, `feedback`, `prompt_votes`, `submissions`, `categories`, `sources`, `packs`.
- Make someone Pro: set `profiles.is_pro = true` (later: a Paystack webhook does this).
- Mark a prompt tested: set `prompts.tested_model` and `prompts.tested_at`.
- Read feedback / submissions / waitlist in the Supabase Table Editor.

## Media
The Fluxa Pay brand film and its library teaser live in `public/media/`.
