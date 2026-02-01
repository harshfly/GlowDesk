import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

/**
 * Custom hook to access settings context
 * @throws Error if used outside of SettingsProvider
 */
export const useSettings = () => {
    const context = useContext(SettingsContext);

    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }

    return context;
};
