# GlowDesk - Production Deployment Guide

Complete guide to deploy GlowDesk to Netlify and make it live on the internet.

## Prerequisites

- [x] GlowDesk app running locally
- [x] Supabase project set up
- [ ] GitHub account
- [ ] Netlify account (free - sign up at [netlify.com](https://netlify.com))

## Deployment Steps

### Step 1: Prepare Your Repository

#### 1.1 Push to GitHub (if not already done)

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for production deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/glowdesk.git
git branch -M main
git push -u origin main
```

> [!TIP]
> Make sure your `.env.local` file is NOT committed to GitHub (it should be in `.gitignore`).

---

### Step 2: Deploy to Netlify

#### 2.1 Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Select your `glowdesk` repository

#### 2.2 Configure Build Settings

Netlify should auto-detect these settings (already configured in `netlify.toml`):

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Base directory**: (leave empty)

Click **"Deploy site"**

---

### Step 3: Configure Environment Variables

#### 3.1 Add Supabase Credentials

1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Click **"Add a variable"** and add:

| Key | Value | Where to find it |
|-----|-------|------------------|
| `VITE_SUPABASE_URL` | Your Supabase URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Supabase Dashboard → Settings → API |

3. Click **"Save"**

> [!IMPORTANT]
> After adding environment variables, you need to **redeploy** your site:
> - Go to **Deploys** tab
> - Click **"Trigger deploy"** → **"Deploy site"**

---

### Step 4: Update Supabase Settings

#### 4.1 Add Production URL to Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Netlify URL to **Site URL** and **Redirect URLs**:
   - Your site will be at: `https://YOUR_SITE_NAME.netlify.app`
   - Add: `https://YOUR_SITE_NAME.netlify.app`
   - Add: `https://YOUR_SITE_NAME.netlify.app/**` (for OAuth redirects)

4. Click **Save**

> [!TIP]
> You can find your Netlify URL in the Netlify dashboard. It will look like `https://glowdesk-abc123.netlify.app`

---

### Step 5: Test Your Deployment

#### 5.1 Visit Your Live Site

1. Click the URL in your Netlify dashboard
2. Your GlowDesk app should load!

#### 5.2 Test Core Features

- [ ] Home page loads correctly
- [ ] Sign up for a new account
- [ ] Log in with your account
- [ ] Navigate to profile page
- [ ] Update your name
- [ ] Upload an avatar
- [ ] Log out and log back in
- [ ] Test on mobile device

---

## Optional: Custom Domain

### Add Your Own Domain

1. In Netlify dashboard, go to **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `glowdesk.com`)
4. Follow Netlify's instructions to update your DNS settings
5. Netlify will automatically provision an SSL certificate

### Update Supabase for Custom Domain

After setting up your custom domain:

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Update **Site URL** to your custom domain
3. Add your custom domain to **Redirect URLs**

---

## Troubleshooting

### Build Fails

**Error**: `npm install` fails
- **Solution**: Delete `node_modules` and `package-lock.json`, then commit and push

**Error**: Build command not found
- **Solution**: Check that `netlify.toml` is in your repository root

### App Loads but Shows Errors

**Error**: "Supabase client not configured"
- **Solution**: Check environment variables are set correctly in Netlify
- **Solution**: Make sure variable names start with `VITE_`
- **Solution**: Redeploy after adding variables

**Error**: Login doesn't work
- **Solution**: Check that your Netlify URL is added to Supabase redirect URLs
- **Solution**: Make sure you're using the correct Supabase project

### 404 Errors on Page Refresh

**Error**: Refreshing any page shows 404
- **Solution**: This should be fixed by `netlify.toml` redirects
- **Solution**: If still happening, check that `netlify.toml` is in the root directory

---

## Continuous Deployment

### Automatic Deploys

Every time you push to your `main` branch on GitHub, Netlify will automatically:

1. Pull the latest code
2. Run `npm run build`
3. Deploy the new version
4. Your site updates in ~1-2 minutes!

### Deploy Previews

When you create a Pull Request on GitHub:
- Netlify creates a preview deployment
- You can test changes before merging
- Preview URL is posted in the PR

---

## Production Checklist

Before sharing your app with users:

- [ ] Test all features on production URL
- [ ] Run the avatar storage migration in Supabase
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS (automatic with Netlify)
- [ ] Test on multiple devices and browsers
- [ ] Set up error monitoring (optional - Sentry)
- [ ] Configure analytics (optional - Google Analytics)

---

## Monitoring & Maintenance

### View Deployment Logs

1. Go to Netlify dashboard → **Deploys**
2. Click on any deployment to see build logs
3. Check for errors or warnings

### Analytics

Netlify provides basic analytics:
- Go to **Analytics** tab in Netlify dashboard
- See page views, bandwidth usage, etc.

### Rollback if Needed

If a deployment breaks something:
1. Go to **Deploys** tab
2. Find a working deployment
3. Click **"Publish deploy"** to rollback

---

## Next Steps

Now that your app is live:

1. **Share it!** Send the link to friends and family
2. **Monitor usage** - Check Netlify analytics
3. **Iterate** - Keep improving based on feedback
4. **Scale** - Upgrade Supabase plan if you get lots of users

---

## Support Resources

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Community**: [Netlify Community](https://answers.netlify.com)

---

**Congratulations!** 🎉 Your GlowDesk app is now live on the internet!
