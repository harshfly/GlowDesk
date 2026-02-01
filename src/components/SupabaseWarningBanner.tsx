import React from 'react';
import { isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Banner to show when Supabase is not configured
 */
export const SupabaseWarningBanner: React.FC = () => {
    if (isSupabaseConfigured) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)',
            color: '#fff',
            padding: '12px 20px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        }}>
            <span style={{ marginRight: '10px' }}>⚠️</span>
            <strong>Supabase Not Configured</strong> - Authentication and data persistence are disabled.
            <span style={{ marginLeft: '10px', opacity: 0.9 }}>
                See <code style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '3px' }}>QUICKSTART.md</code> for setup instructions.
            </span>
        </div>
    );
};
