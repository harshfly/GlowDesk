import { supabase } from '../lib/supabaseClient';
import type { User, AuthError, Session } from '@supabase/supabase-js';

export interface SignUpData {
    email: string;
    password: string;
    fullName: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User | null;
    session: Session | null;
    error: AuthError | null;
}

/**
 * Authentication Service
 * Handles all authentication-related operations using Supabase Auth
 */
export class AuthService {
    /**
     * Sign up a new user
     */
    static async signUp({ email, password, fullName }: SignUpData): Promise<AuthResponse> {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        return {
            user: data.user,
            session: data.session,
            error,
        };
    }

    /**
     * Sign in an existing user
     */
    static async signIn({ email, password }: SignInData): Promise<AuthResponse> {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        return {
            user: data.user,
            session: data.session,
            error,
        };
    }

    /**
     * Sign out the current user
     */
    static async signOut(): Promise<{ error: AuthError | null }> {
        const { error } = await supabase.auth.signOut();
        return { error };
    }

    /**
     * Get the current user session
     */
    static async getCurrentSession(): Promise<Session | null> {
        const { data } = await supabase.auth.getSession();
        return data.session;
    }

    /**
     * Get the current user
     */
    static async getCurrentUser(): Promise<User | null> {
        const { data } = await supabase.auth.getUser();
        return data.user;
    }

    /**
     * Send password reset email
     */
    static async resetPassword(email: string): Promise<{ error: AuthError | null }> {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/#/reset-password`,
        });
        return { error };
    }

    /**
     * Update user password
     */
    static async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        return { error };
    }

    /**
     * Listen to auth state changes
     */
    static onAuthStateChange(callback: (session: Session | null) => void) {
        return supabase.auth.onAuthStateChange((_event, session) => {
            callback(session);
        });
    }

    /**
     * Sign in with OAuth provider (Google, GitHub, etc.)
     */
    static async signInWithOAuth(provider: 'google' | 'github' | 'discord') {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/#/app`,
            },
        });
        return { data, error };
    }
}
