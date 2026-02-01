import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { SettingsService, UserSettings } from '../services/settings.service';
import { GlowSettings } from '../../types';
import { DEFAULT_SETTINGS } from '../../constants';
import { useAuth } from '../hooks/useAuth';

interface SettingsContextType {
    settings: GlowSettings;
    loading: boolean;
    error: string | null;
    updateSettings: (newSettings: Partial<GlowSettings>) => Promise<void>;
    resetSettings: () => Promise<void>;
    syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
    children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const { user } = useAuth();
    const [settings, setSettings] = useState<GlowSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

    // Load settings from Supabase when user logs in
    useEffect(() => {
        if (!user) {
            setSettings(DEFAULT_SETTINGS);
            setLoading(false);
            return;
        }

        loadSettings();
    }, [user]);

    const loadSettings = async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await SettingsService.getSettings(user.id);

        if (fetchError) {
            console.error('Error loading settings:', fetchError);
            setError('Failed to load settings');
            setSettings(DEFAULT_SETTINGS);
        } else if (data) {
            setSettings(data.glow_settings as GlowSettings);
        }

        setLoading(false);
    };

    const updateSettings = async (newSettings: Partial<GlowSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };

        // Optimistic update
        setSettings(updatedSettings);

        if (!user) {
            // If not logged in, just update local state
            return;
        }

        setSyncStatus('syncing');

        const { error: updateError } = await SettingsService.updateGlowSettings(
            user.id,
            updatedSettings
        );

        if (updateError) {
            console.error('Error updating settings:', updateError);
            setError('Failed to save settings');
            setSyncStatus('error');
            // Revert optimistic update
            await loadSettings();
        } else {
            setSyncStatus('synced');
            setTimeout(() => setSyncStatus('idle'), 2000);
        }
    };

    const resetSettings = async () => {
        await updateSettings(DEFAULT_SETTINGS);
    };

    const value: SettingsContextType = {
        settings,
        loading,
        error,
        updateSettings,
        resetSettings,
        syncStatus,
    };

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
