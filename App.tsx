import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { WebApp } from './pages/WebApp';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PricingPage } from './pages/PricingPage';
import { FAQPage } from './pages/FAQPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AmbientBackground } from './components/AmbientBackground';
import { IntroAnimation } from './components/IntroAnimation';
import { ProtectedRoute } from './src/components/ProtectedRoute';
import { AuthProvider } from './src/contexts/AuthContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { SupabaseWarningBanner } from './src/components/SupabaseWarningBanner';

// Fix: Make children optional to resolve TypeScript errors in consuming components
export const Link = ({ to, children, className, onClick }: { to: string, children?: React.ReactNode, className?: string, onClick?: () => void }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = to;
    window.scrollTo(0, 0);
    if (onClick) {
      onClick();
    }
  };
  return <a href={`#${to}`} onClick={handleClick} className={className}>{children}</a>;
};

const AppContent: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [showIntro, setShowIntro] = useState(true);

  // We keep the Navbar logo hidden until the intro logo has "moved" into place
  const [showNavLogo, setShowNavLogo] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowNavLogo(true);
  };

  // Determine which page to render
  const renderPage = () => {
    switch (route) {
      case '#/app':
        return (
          <ProtectedRoute>
            <WebApp />
          </ProtectedRoute>
        );
      case '#/login':
        return <LoginPage />;
      case '#/signup':
        return <SignupPage />;
      case '#/how-it-works':
        return <HowItWorksPage />;
      case '#/pricing':
        return <PricingPage />;
      case '#/faq':
        return <FAQPage />;
      case '#/profile':
        return (
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        );
      default:
        // Pass the logo visibility state to the Landing Page (which contains the Navbar)
        // Note: For simplicity in this demo structure, we are hacking the prop into LandingPage
        // In a real app, this might be context or a layout wrapper.
        return <LandingPage showNavLogo={showNavLogo} />;
    }
  };

  return (
    <>
      {/* Play Intro Animation on Mount */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <SupabaseWarningBanner />
      <AmbientBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {renderPage()}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;