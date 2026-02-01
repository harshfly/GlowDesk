# 🚀 Quick Start: Deploy to Netlify

Get your GlowDesk app live in 10 minutes!

## Prerequisites
- GitHub account
- Netlify account (free - [sign up here](https://netlify.com))

## Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) → **Add new site**
2. Choose **Deploy with GitHub**
3. Select your `glowdesk` repository
4. Click **Deploy site** (settings are auto-configured!)

### 3. Add Environment Variables
1. In Netlify: **Site settings** → **Environment variables**
2. Add these two variables:
   - `VITE_SUPABASE_URL` = (from Supabase Dashboard → Settings → API)
   - `VITE_SUPABASE_ANON_KEY` = (from Supabase Dashboard → Settings → API)
3. **Trigger deploy** → **Deploy site** (to apply variables)

### 4. Update Supabase
1. Copy your Netlify URL (e.g., `https://glowdesk-abc123.netlify.app`)
2. In Supabase: **Authentication** → **URL Configuration**
3. Add your Netlify URL to **Site URL** and **Redirect URLs**
4. Save

### 5. Test! 🎉
Visit your Netlify URL and test:
- Sign up / Log in
- Profile page
- Avatar upload

---

**Need more details?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete guide.

**Having issues?** Check the troubleshooting section in DEPLOYMENT.md.
