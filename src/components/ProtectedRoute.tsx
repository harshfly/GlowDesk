import React, { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from '../../App';

interface ProtectedRouteProps {
    children: ReactNode;
}

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to login page if user is not authenticated
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
                color: '#fff',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '3px solid rgba(59, 130, 246, 0.3)',
                        borderTop: '3px solid #3b82f6',
                        borderRadius: '50%',
                        margin: '0 auto 20px',
                        animation: 'spin 1s linear infinite',
                    }} />
                    <p style={{ fontSize: '18px', opacity: 0.8 }}>Loading...</p>
                    <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        // Use hash navigation to redirect
        window.location.hash = '/login';
        return null;
    }

    // Render protected content
    return <>{children}</>;
};
