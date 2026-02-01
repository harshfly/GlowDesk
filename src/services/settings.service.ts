import { supabase } from '../lib/supabaseClient';
import type { GlowSettings } from '../../types';

export interface UserSettings {
    id: string;
    user_id: string;
    glow_settings: GlowSettings;
    preferences: Record<string, any>;
    created_at: string;
    updated_at: string;
}

/**
 * Settings Service
 * Handles user settings operations with Supabase
 */
export class SettingsService {
    /**
     * Get user settings
     */
    static async getSettings(userId: string): Promise<{ data: UserSettings | null; error: any }> {
        const { data, error } = await supabase
            .from('user_settings')
            .select('*')
            .eq('user_id', userId)
            .single();

        return { data, error };
    }

    /**
     * Update glow settings
     */
    static async updateGlowSettings(
        userId: string,
        glowSettings: GlowSettings
    ): Promise<{ data: UserSettings | null; error: any }> {
        const { data, error } = await supabase
            .from('user_settings')
            .update({ glow_settings: glowSettings })
            .eq('user_id', userId)
            .select()
            .single();

        return { data, error };
    }

    /**
     * Update preferences
     */
    static async updatePreferences(
        userId: string,
        preferences: Record<string, any>
    ): Promise<{ data: UserSettings | null; error: any }> {
        const { data, error } = await supabase
            .from('user_settings')
            .update({ preferences })
            .eq('user_id', userId)
            .select()
            .single();

        return { data, error };
    }

    /**
     * Create default settings for a new user
     * (This is usually handled by the database trigger, but can be called manually if needed)
     */
    static async createDefaultSettings(
        userId: string,
        defaultGlowSettings: GlowSettings
    ): Promise<{ data: UserSettings | null; error: any }> {
        const { data, error } = await supabase
            .from('user_settings')
            .insert({
                user_id: userId,
                glow_settings: defaultGlowSettings,
                preferences: {},
            })
            .select()
            .single();

        return { data, error };
    }

    /**
     * Subscribe to real-time settings changes
     */
    static subscribeToSettings(
        userId: string,
        callback: (settings: UserSettings) => void
    ) {
        const channel = supabase
            .channel(`settings:${userId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'user_settings',
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    callback(payload.new as UserSettings);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }
}
