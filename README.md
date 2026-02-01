# GlowDesk - Professional Webcam Lighting Control

GlowDesk is a modern web application that provides professional webcam lighting control with an industry-ready Supabase backend for authentication and data persistence.

## Features

✨ **Professional Lighting Control**
- Real-time webcam ring light overlay
- Customizable intensity, temperature, and softness
- Multiple preset modes (Interview, Night Call, Creator Mode)
- RGB color effects with animations

🔐 **Secure Authentication**
- Email/password authentication via Supabase
- JWT-based session management
- Protected routes for authenticated users
- Password reset functionality

💾 **Data Persistence**
- User profiles stored in Supabase
- Settings synchronized across devices
- Real-time updates
- Optimistic UI updates

🎨 **Modern UI/UX**
- Beautiful glassmorphism design
- Smooth animations and transitions
- Responsive layout
- Dark mode optimized

## Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works great)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd glowdesk
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

Follow the detailed guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to:
1. Create a Supabase project
2. Run database migrations
3. Configure authentication
4. Get your API keys

### 4. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
glowdesk/
├── src/
│   ├── lib/                 # Supabase client configuration
│   │   ├── supabaseClient.ts
│   │   └── database.types.ts
│   ├── services/            # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   └── settings.service.ts
│   ├── contexts/            # React contexts
│   │   ├── AuthContext.tsx
│   │   └── SettingsContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useSettings.ts
│   └── components/          # Shared components
│       └── ProtectedRoute.tsx
├── pages/                   # Page components
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── WebApp.tsx
│   └── UserProfilePage.tsx
├── components/              # UI components
│   ├── Navbar.tsx
│   ├── ControlPanel.tsx
│   └── ...
├── supabase/
│   └── migrations/          # Database migrations
│       └── 001_initial_schema.sql
├── types.ts                 # TypeScript type definitions
├── constants.ts             # App constants
└── App.tsx                  # Main app component
```

## Database Schema

### user_profiles
Extends Supabase's built-in `auth.users` table with additional profile information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | References auth.users(id) |
| full_name | TEXT | User's full name |
| avatar_url | TEXT | Profile picture URL |
| created_at | TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | Last update time |

### user_settings
Stores user-specific GlowDesk settings.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | References auth.users(id) |
| glow_settings | JSONB | GlowSettings configuration |
| preferences | JSONB | Additional preferences |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |

## Authentication Flow

1. **Sign Up**: User creates account with email/password
2. **Email Verification**: Supabase sends confirmation email (optional)
3. **Sign In**: User logs in with credentials
4. **Session Management**: JWT tokens stored in localStorage
5. **Auto-refresh**: Tokens automatically refreshed
6. **Protected Routes**: `/app` and `/profile` require authentication

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard

### Update Supabase Settings

After deployment, update your Supabase project settings:
1. Go to Authentication > URL Configuration
2. Add your production URL to **Site URL**
3. Add `https://yourdomain.com/**` to **Redirect URLs**

## Security

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Users can only access their own data
- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for authentication
- ✅ HTTPS enforced in production
- ✅ Environment variables for sensitive data

## Features Roadmap

- [ ] OAuth providers (Google, GitHub)
- [ ] Avatar upload to Supabase Storage
- [ ] Email notifications
- [ ] Desktop app (Electron)
- [ ] Browser extension
- [ ] Team collaboration features

## Troubleshooting

### "Invalid API key" error
- Verify you copied the **anon** key, not the service_role key
- Check for extra spaces in `.env.local`
- Restart dev server after changing environment variables

### Authentication not working
- Verify Site URL in Supabase settings matches your dev URL
- Check browser console for CORS errors
- Ensure environment variables are prefixed with `VITE_`

### Database errors
- Verify migrations ran successfully in Supabase SQL Editor
- Check RLS policies are enabled
- Ensure user is authenticated when accessing protected data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

---

Built with ❤️ using React, TypeScript, and Supabase
