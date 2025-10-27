# frontend_integration.md

## Overview
This document explains how to wire your existing `App.tsx` to the Supabase Edge Function `/vote` without changing your layout.

### 1) Create a Supabase project
1. Go to https://app.supabase.com and create a new project.
2. In your project settings, copy the **SUPABASE_URL** and **SUPABASE_ANON_KEY**.
3. Also copy the **Service Role Key** (Settings → API) — keep it secret. You'll paste it as SUPABASE_SERVICE_ROLE_KEY in the Edge Function environment.

### 2) Create tables
- Run `schema.sql` and `policies.sql` in the SQL editor of Supabase (SQL Editor → New Query).

### 3) Deploy Edge Function
- Create a new Edge Function called `vote` and paste the content of `supabase/functions/vote/index.ts`.
- Add environment variables in the Function settings:
  - SUPABASE_URL = your project URL (e.g. https://abcd.supabase.co)
  - SUPABASE_SERVICE_ROLE_KEY = your service role key

### 4) Call the function from your App.tsx
Example fetch (anonymous vote):
```js
const res = await fetch("https://<YOUR-PROJECT>.functions.supabase.co/vote", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question_id: "<QUESTION_UUID>", choice: "A" })
});
const data = await res.json();
```

If the user is logged in with Supabase Auth, pass the auth access token:
```js
const user = supabase.auth.user();
const token = (await supabase.auth.getSession()).data?.session?.access_token;
const res = await fetch("https://<YOUR-PROJECT>.functions.supabase.co/vote", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ question_id: "<QUESTION_UUID>", choice: "A" })
});
```

### 5) Fetching results
Use Supabase REST or client:
```js
// using rest
const r = await fetch(`${SUPABASE_URL}/rest/v1/votes?question_id=eq.${question_id}&select=choice,count`, {
  headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` }
});
```

## Notes
- IP-based enforcement depends on headers (x-forwarded-for). Supabase functions set these headers.
- For production, consider rate-limiting or reCAPTCHA on the frontend.