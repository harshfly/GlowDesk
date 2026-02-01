import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '../services/auth.service';
import { UserService, UserProfile } from '../services/user.service';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    session: Session | null;
    loading: boolean;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signInWithOAuth: (provider: 'google' | 'github' | 'discord') => Promise<{ error: any }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: any }>;
    updatePassword: (newPassword: string) => Promise<{ error: any }>;
    refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user profile
    const loadProfile = async (userId: string) => {
        const { data, error } = await UserService.getProfile(userId);
        if (!error && data) {
            setProfile(data);
        }
    };

    // Initialize auth state
    useEffect(() => {
        // Check for existing session
        AuthService.getCurrentSession().then((session) => {
            setSession(session);
            if (session?.user) {
                setUser(session.user);
                loadProfile(session.user.id);
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: authListener } = AuthService.onAuthStateChange((session) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                loadProfile(session.user.id);
            } else {
                setProfile(null);
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const signUp = async (email: string, password: string, fullName: string) => {
        const { error } = await AuthService.signUp({ email, password, fullName });
        return { error };
    };

    const signIn = async (email: string, password: string) => {
        const { error } = await AuthService.signIn({ email, password });
        return { error };
    };

    const signInWithOAuth = async (provider: 'google' | 'github' | 'discord') => {
        const { error } = await AuthService.signInWithOAuth(provider);
        return { error };
    };

    const signOut = async () => {
        await AuthService.signOut();
        setUser(null);
        setProfile(null);
        setSession(null);
    };

    const resetPassword = async (email: string) => {
        const { error } = await AuthService.resetPassword(email);
        return { error };
    };

    const updatePassword = async (newPassword: string) => {
        const { error } = await AuthService.updatePassword(newPassword);
        return { error };
    };

    const refreshProfile = async () => {
        if (user) {
            await loadProfile(user.id);
        }
    };

    const value: AuthContextType = {
        user,
        profile,
        session,
        loading,
        signUp,
        signIn,
        signInWithOAuth,
        signOut,
        resetPassword,
        updatePassword,
        refreshProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
