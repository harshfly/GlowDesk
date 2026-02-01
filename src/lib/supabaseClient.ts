import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
// If credentials are not configured, create a dummy client that will fail gracefully
let supabase: SupabaseClient<Database>;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '⚠️ Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local'
    );
    console.warn('Authentication and data persistence features will not work until Supabase is configured.');
    console.warn('See QUICKSTART.md or SUPABASE_SETUP.md for setup instructions.');

    // Create a dummy client to prevent errors
    // This allows the app to run and display the UI even without Supabase
    supabase = createClient<Database>(
        'https://placeholder.supabase.co',
        'placeholder-key',
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        }
    );
} else {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage,
        },
    });
}

export { supabase };
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);
