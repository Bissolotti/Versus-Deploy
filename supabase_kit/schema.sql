-- schema.sql
-- Tables: users (using supabase auth), questions, votes
create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  option_a text not null,
  option_b text not null,
  status text not null default 'published',
  created_at timestamptz default now()
);

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references questions(id) on delete cascade,
  user_id uuid, -- nullable if anonymous
  choice text not null check (choice in ('A','B')),
  ip_address text,
  created_at timestamptz default now()
);

create index if not exists idx_votes_question_choice on votes(question_id, choice);
create index if not exists idx_votes_question_user on votes(question_id, user_id);