# Supabase Setup Guide

This guide will walk you through setting up Supabase for the GlowDesk application.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" or "New Project"
3. Sign in with GitHub, Google, or email
4. Click "New Project"
5. Fill in the project details:
   - **Name**: GlowDesk (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Select the region closest to your users
   - **Pricing Plan**: Free tier is perfect for development
6. Click "Create new project"
7. Wait 2-3 minutes for your project to be provisioned

## Step 2: Get Your API Keys

1. Once your project is ready, go to **Settings** (gear icon in sidebar)
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`
4. Keep this page open - you'll need these values next

## Step 3: Configure Environment Variables

1. In your GlowDesk project, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Important**: Never commit `.env.local` to git (it's already in `.gitignore`)

## Step 4: Run Database Migrations

1. In your Supabase dashboard, click on **SQL Editor** in the sidebar
2. Click "New Query"
3. Open the file `supabase/migrations/001_initial_schema.sql` from your project
4. Copy the entire contents
5. Paste it into the SQL Editor
6. Click "Run" (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

## Step 5: Verify Database Setup

1. Click on **Table Editor** in the sidebar
2. You should see two new tables:
   - `user_profiles`
   - `user_settings`
3. Click on each table to verify the columns are created correctly

## Step 6: Configure Authentication

1. Click on **Authentication** in the sidebar
2. Click on **Providers**
3. Ensure **Email** is enabled (it should be by default)
4. Optional: Enable additional providers (Google, GitHub, etc.)
   - Click on the provider
   - Follow the setup instructions
   - Add the OAuth credentials

### Email Settings (Optional but Recommended)

1. Go to **Authentication** > **Email Templates**
2. Customize the email templates:
   - Confirm signup
   - Reset password
   - Magic link
3. Go to **Authentication** > **Settings**
4. Configure:
   - **Site URL**: `http://localhost:5173` (for development)
   - **Redirect URLs**: Add `http://localhost:5173/**`

## Step 7: Test Row Level Security

1. Go to **Authentication** > **Policies**
2. Select `user_profiles` table
3. You should see three policies:
   - Users can view own profile
   - Users can update own profile
   - Users can insert own profile
4. Select `user_settings` table
5. You should see four policies for CRUD operations

## Step 8: Install Dependencies

In your GlowDesk project directory:

```bash
npm install @supabase/supabase-js
```

## Step 9: Start Development

```bash
npm run dev
```

Your app should now be running at `http://localhost:5173`

## Verification Checklist

- [ ] Supabase project created
- [ ] API keys copied to `.env.local`
- [ ] Database migration executed successfully
- [ ] Tables visible in Table Editor
- [ ] RLS policies active
- [ ] Email authentication enabled
- [ ] Dependencies installed
- [ ] App running locally

## Troubleshooting

### "Invalid API key" error
- Double-check that you copied the **anon** key, not the service_role key
- Ensure there are no extra spaces in `.env.local`
- Restart your dev server after changing `.env.local`

### Database migration fails
- Check for syntax errors in the SQL
- Ensure you're running the query in the correct project
- Try running sections of the migration separately

### Authentication not working
- Verify Site URL and Redirect URLs in Supabase settings
- Check browser console for CORS errors
- Ensure `.env.local` variables are prefixed with `VITE_`

### RLS policies blocking requests
- Verify you're logged in when making requests
- Check that the user ID matches in the database
- Review policy definitions in SQL Editor

## Next Steps

Once setup is complete:
1. Test user registration at `http://localhost:5173/#/signup`
2. Verify user appears in Supabase Authentication dashboard
3. Test login functionality
4. Check that settings persist in the database

## Production Deployment

When deploying to production:
1. Update **Site URL** in Supabase Authentication settings
2. Add production domain to **Redirect URLs**
3. Create new environment variables in your hosting platform
4. Never expose your `service_role` key in frontend code

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GlowDesk GitHub Issues](your-repo-url)
