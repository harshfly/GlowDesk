import { supabase } from '../lib/supabaseClient';

export interface UserProfile {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface UpdateProfileData {
    full_name?: string;
    avatar_url?: string;
}

/**
 * User Service
 * Handles user profile operations
 */
export class UserService {
    /**
     * Get user profile by ID
     */
    static async getProfile(userId: string): Promise<{ data: UserProfile | null; error: any }> {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single();

        return { data, error };
    }

    /**
     * Update user profile
     */
    static async updateProfile(
        userId: string,
        updates: UpdateProfileData
    ): Promise<{ data: UserProfile | null; error: any }> {
        const { data, error } = await supabase
            .from('user_profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        return { data, error };
    }

    /**
     * Upload avatar image to Supabase Storage
     */
    static async uploadAvatar(userId: string, file: File): Promise<{ url: string | null; error: any }> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Math.random()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        // Upload file to storage
        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, { upsert: true });

        if (uploadError) {
            return { url: null, error: uploadError };
        }

        // Get public URL
        const { data } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        return { url: data.publicUrl, error: null };
    }

    /**
     * Delete user avatar
     */
    static async deleteAvatar(avatarUrl: string): Promise<{ error: any }> {
        // Extract file path from URL
        const urlParts = avatarUrl.split('/');
        const filePath = `avatars/${urlParts[urlParts.length - 1]}`;

        const { error } = await supabase.storage
            .from('avatars')
            .remove([filePath]);

        return { error };
    }
}
