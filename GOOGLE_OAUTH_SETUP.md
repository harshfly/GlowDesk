# Setting Up Google OAuth for GlowDesk

This guide will help you enable Google Sign-In for your GlowDesk application.

## Prerequisites

- A Supabase project (already set up)
- A Google Cloud Platform account

## Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Name it "GlowDesk" or similar

### 1.2 Enable Google+ API

1. In the left sidebar, go to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click on it and click **Enable**

### 1.3 Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
3. If prompted, configure the OAuth consent screen:
   - User Type: **External**
   - App name: **GlowDesk**
   - User support email: Your email
   - Developer contact: Your email
   - Click **Save and Continue**
   - Skip scopes (click **Save and Continue**)
   - Add test users if needed
   - Click **Save and Continue**

4. Back to Create OAuth client ID:
   - Application type: **Web application**
   - Name: **GlowDesk Web Client**
   
5. Add Authorized JavaScript origins:
   ```
   http://localhost:3000
   https://your-production-domain.com
   ```

6. Add Authorized redirect URIs:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```
   
   **Important**: Replace `your-project-id` with your actual Supabase project ID
   
   To find your callback URL:
   - Go to your Supabase dashboard
   - Click **Authentication** > **Providers**
   - Scroll to Google provider
   - Copy the **Callback URL (for OAuth)**

7. Click **CREATE**
8. **Copy your Client ID and Client Secret** - you'll need these next!

## Step 2: Configure Supabase

### 2.1 Enable Google Provider

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your GlowDesk project
3. Click **Authentication** in the sidebar
4. Click **Providers**
5. Find **Google** in the list
6. Toggle it **ON**

### 2.2 Add Google Credentials

1. Paste your **Client ID** from Google
2. Paste your **Client Secret** from Google
3. Click **Save**

## Step 3: Test Google Login

### 3.1 Development Testing

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000/#/login

3. Click the **Google** button

4. You should be redirected to Google's sign-in page

5. After signing in with Google:
   - You'll be redirected back to your app
   - Automatically logged in
   - Redirected to `/app`

### 3.2 Verify in Supabase

1. Go to **Authentication** > **Users** in Supabase
2. You should see your Google account listed
3. The provider will show as "google"

## Step 4: Production Setup

When deploying to production:

### 4.1 Update Google Cloud Console

1. Go back to your OAuth client in Google Cloud Console
2. Add your production domain to:
   - **Authorized JavaScript origins**: `https://yourdomain.com`
   - **Authorized redirect URIs**: Keep the Supabase callback URL

### 4.2 Update Supabase

1. In Supabase **Authentication** > **URL Configuration**
2. Set **Site URL** to your production URL: `https://yourdomain.com`
3. Add to **Redirect URLs**: `https://yourdomain.com/**`

## Troubleshooting

### "redirect_uri_mismatch" Error

**Problem**: Google shows an error about redirect URI not matching.

**Solution**: 
1. Double-check the redirect URI in Google Cloud Console
2. Make sure it exactly matches: `https://your-project-id.supabase.co/auth/v1/callback`
3. No trailing slashes
4. Use your actual Supabase project ID

### "Access blocked: This app's request is invalid"

**Problem**: OAuth consent screen not properly configured.

**Solution**:
1. Go to **OAuth consent screen** in Google Cloud Console
2. Make sure app is published or you're added as a test user
3. Add required scopes (email, profile)

### Google login button does nothing

**Problem**: JavaScript error or Supabase not configured.

**Solution**:
1. Open browser console (F12)
2. Check for errors
3. Verify Supabase credentials in `.env.local`
4. Make sure Google provider is enabled in Supabase

### User created but no profile data

**Problem**: Database trigger might not be working.

**Solution**:
1. Check Supabase logs for errors
2. Verify the `handle_new_user` trigger is active
3. Manually check `user_profiles` table

## How It Works

1. **User clicks Google button** → `handleGoogleLogin()` is called
2. **App calls Supabase** → `signInWithOAuth('google')`
3. **Supabase redirects** → To Google's OAuth page
4. **User signs in** → With their Google account
5. **Google redirects back** → To Supabase callback URL
6. **Supabase creates session** → And redirects to your app
7. **AuthContext detects change** → Loads user profile
8. **User is logged in** → Redirected to `/app`

## Security Notes

- ✅ Never commit your Google Client Secret to git
- ✅ Keep it in Supabase dashboard only
- ✅ Use environment variables for any client-side config
- ✅ Supabase handles all OAuth flow securely
- ✅ JWT tokens are stored in localStorage
- ✅ Sessions auto-refresh

## Next Steps

- Set up Apple Sign-In (similar process with Apple Developer account)
- Add GitHub OAuth (easier, no API key needed)
- Customize OAuth consent screen with your logo
- Add custom scopes if you need more user data

---

**Need help?** Check the [Supabase OAuth docs](https://supabase.com/docs/guides/auth/social-login/auth-google) for more details.
