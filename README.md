# ForgetKit Web

Frontend application for ForgetKit, a game development prep workspace for ideas, docs, assets, and production planning.

## Local setup

1. Copy [`.env.example`](./.env.example) to `.env.local`.
2. Fill in your Supabase project URL and anon key.
3. Set the backend API URL for the matching `forgetkit-api` instance.
4. Run the app:

```bash
npm run dev
```

## Environment variables

The web app only uses client-safe env vars:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_FORGETKIT_API_URL=
```

Notes:

- Keep Supabase service-role keys in `forgetkit-api` only.
- Do not commit `.env.local`.
- Use `.env.example` as the local template for web auth and API access.
