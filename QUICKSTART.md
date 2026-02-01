# Quick Start Guide

Follow these steps to get GlowDesk running with Supabase backend:

## 1. Create Supabase Project (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: GlowDesk
   - **Database Password**: (choose a strong password)
   - **Region**: (closest to you)
4. Click "Create new project" and wait 2-3 minutes

## 2. Set Up Database (2 minutes)

1. In your Supabase dashboard, click **SQL Editor** in the sidebar
2. Click "New Query"
3. Open `supabase/migrations/001_initial_schema.sql` from this project
4. Copy ALL the contents and paste into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

## 3. Get API Keys (1 minute)

1. Click **Settings** (gear icon) in the sidebar
2. Click **API**
3. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJxxx...` (long string)

## 4. Configure Environment (1 minute)

1. In your project folder, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and paste your values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 5. Start the App (1 minute)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 6. Test It Out!

1. Click "Get Started" or "Sign Up"
2. Create an account with email/password
3. You'll be automatically logged in and redirected to the app
4. Try changing the glow settings - they'll save to your Supabase database!
5. Refresh the page - your settings persist!

## Verify in Supabase Dashboard

1. Go to **Authentication** > **Users** - you should see your new user
2. Go to **Table Editor** > **user_profiles** - your profile is there
3. Go to **Table Editor** > **user_settings** - your settings are saved

## Troubleshooting

**"Invalid API key"**
- Make sure you copied the **anon** key, not the service_role key
- Check for extra spaces in `.env.local`
- Restart the dev server: `Ctrl+C` then `npm run dev`

**"Cannot find module @supabase/supabase-js"**
- Run: `npm install`

**Database errors**
- Make sure you ran the entire SQL migration
- Check that RLS policies are enabled in Supabase

## Next Steps

- Read [README.md](./README.md) for full documentation
- See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup
- Check [walkthrough.md](./walkthrough.md) for implementation details

---

**Need help?** Check the Troubleshooting section in README.md
