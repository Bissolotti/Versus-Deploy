# Supabase Voting Kit (Hybrid: anonymous by IP + optional login)

This package contains all files to set up a Supabase-based voting backend where:
- Users may vote anonymously (one vote per IP per question).
- Users may optionally log in (Supabase Auth) and then are limited to one vote per user per question.
- Edge Function `/vote` performs checks and records votes using the service role key.

## Files
- schema.sql : table definitions (questions, votes)
- policies.sql : Row Level Security policies for basic safety
- supabase/functions/vote/index.ts : Edge Function code (Deno-style)
- frontend_integration.md : instructions to wire up your App.tsx

## Quick start
1. Create Supabase project.
2. Run `schema.sql` and `policies.sql` in SQL editor.
3. Deploy Edge Function `vote` with environment variables:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
4. Use `frontend_integration.md` to connect your React app.

If you want, I can also:
- Adapt your `App.tsx` to call the function directly (keeping layout unchanged).
- Create sample seed SQL with example questions.