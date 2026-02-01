# User Profile Page - Setup Guide

The User Profile Page allows users to view and update their profile information including their name and avatar.

## Features

✅ **Real-time Profile Data** - Loads user data from Supabase
✅ **Update Full Name** - Change your display name
✅ **Avatar Upload** - Upload profile pictures (JPG, PNG, GIF up to 5MB)
✅ **Email Display** - Shows current email (read-only)
✅ **Success/Error Messages** - Clear feedback on actions
✅ **Loading States** - Visual feedback during uploads and saves

## Setup Instructions

### 1. Enable Supabase Storage

The avatar upload feature requires Supabase Storage to be configured.

**Run the storage migration:**

1. Go to your Supabase Dashboard
2. Click **SQL Editor** in the sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase/migrations/002_storage_avatars.sql`
5. Click **Run** or press `Ctrl+Enter`

This will:
- Create an `avatars` bucket for storing profile pictures
- Set up Row Level Security policies so users can only manage their own avatars
- Make avatars publicly readable

### 2. Verify Storage Setup

1. Go to **Storage** in your Supabase dashboard
2. You should see an `avatars` bucket
3. Click on it - it should be empty initially

## Using the Profile Page

### Accessing the Page

Navigate to `/profile` in your app:
```
http://localhost:3000/#/profile
```

Or click on your profile/settings link in the navigation.

### Updating Your Name

1. Click on the **My Profile** tab
2. Edit the **Full Name** field
3. Click **Save Changes**
4. You'll see a success message when saved

### Uploading an Avatar

**Method 1: From the header**
1. Hover over your profile picture at the top
2. Click when you see the camera icon
3. Select an image file
4. Wait for upload to complete

**Method 2: From the form**
1. Go to the **My Profile** tab
2. Click **Change Avatar** button
3. Select an image file
4. Wait for upload to complete

**Supported formats:** JPG, PNG, GIF
**Max file size:** 5MB

### Avatar Display

Your avatar will be displayed:
- In the profile page header
- In the profile edit form
- Anywhere else you're logged in

If you haven't uploaded an avatar, you'll see:
- A colorful gradient circle with your initial
- Based on the first letter of your name or email

## Troubleshooting

### "Failed to upload avatar"

**Possible causes:**
1. Storage bucket not created - Run the migration SQL
2. File too large - Must be under 5MB
3. Invalid file type - Must be an image (JPG, PNG, GIF)

**Solution:**
1. Check Supabase Storage is enabled
2. Verify the `avatars` bucket exists
3. Check browser console for detailed errors

### "Failed to update profile"

**Possible causes:**
1. Not authenticated
2. Network error
3. Database permissions issue

**Solution:**
1. Make sure you're logged in
2. Check your internet connection
3. Verify RLS policies are set up correctly

### Avatar not displaying

**Possible causes:**
1. Upload failed silently
2. URL not saved to profile
3. Storage bucket not public

**Solution:**
1. Try uploading again
2. Check the `user_profiles` table in Supabase - `avatar_url` should have a value
3. Verify storage policies allow public read access

## Technical Details

### Data Flow

**Profile Load:**
1. `AuthContext` loads user profile on mount
2. `UserProfilePage` reads from `profile` context
3. Form fields populate with current data

**Name Update:**
1. User edits name and clicks Save
2. `handleSave` calls `UserService.updateProfile()`
3. Supabase updates `user_profiles` table
4. `refreshProfile()` reloads the data
5. Success message displays

**Avatar Upload:**
1. User selects image file
2. File is validated (type, size)
3. `handleAvatarChange` calls `UserService.uploadAvatar()`
4. File uploads to `avatars/{user_id}/avatar.{ext}`
5. Public URL is generated
6. URL is saved to `user_profiles.avatar_url`
7. `refreshProfile()` reloads the data
8. New avatar displays

### Storage Structure

Avatars are stored in Supabase Storage:
```
avatars/
  └── {user_id}/
      └── avatar.{ext}
```

Each user has their own folder, and can only access their own files thanks to RLS policies.

### Security

- ✅ Row Level Security on storage ensures users can only manage their own avatars
- ✅ Public read access allows avatars to display without authentication
- ✅ File type and size validation prevents abuse
- ✅ User can only update their own profile data

## Next Steps

- Add image cropping before upload
- Support for cover photos
- Profile completion percentage
- More profile fields (bio, location, social links)
- Profile visibility settings

---

**Need help?** Check the [Supabase Storage docs](https://supabase.com/docs/guides/storage) for more details.
