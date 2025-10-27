-- policies.sql
-- ===========================================
-- Enable Row Level Security (RLS)
-- ===========================================
alter table votes enable row level security;
alter table questions enable row level security;

-- ===========================================
-- VOTES TABLE POLICIES
-- ===========================================

-- ✅ Allow authenticated users to insert their own votes
--    (user_id must match the authenticated user's id)
create policy "allow authenticated insert own vote" 
on votes
for insert
with check (
  auth.role() = 'authenticated'
  and user_id = auth.uid()
);

-- ✅ Allow select for everyone (anon or authenticated)
--    This lets your frontend read votes and show results
create policy "allow select for anon and auth"
on votes
for select
using (true);

-- ✅ Allow authenticated users to insert anonymous votes (edge case)
--    Normally Edge Functions will bypass RLS using the service key,
--    but this ensures local tests still work.
create policy "allow insert anon (auth)" 
on votes
for insert
with check (
  auth.role() = 'authenticated'
);

-- ===========================================
-- QUESTIONS TABLE POLICIES
-- ===========================================

-- ✅ Allow everyone to read published questions
create policy "allow select questions"
on questions
for select
using (
  status = 'published'
);