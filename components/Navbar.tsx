import React, { useState } from 'react';
import { Link } from '../App';
import { Logo } from './Logo';
import { useAuth } from '../src/hooks/useAuth';

interface NavbarProps {
  hideLogo?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ hideLogo = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile } = useAuth();

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Get avatar URL or generate initial
  const getAvatarDisplay = () => {
    if (profile?.avatar_url) {
      return <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />;
    }

    const initial = profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
        {initial}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent transition-all duration-300">
      {/* Glass Backdrop for Navbar */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border-b border-white/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo Section */}
        <Link
          to="/"
          className={`flex items-center gap-4 group transition-opacity duration-700 ${hideLogo ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Intro Animation Style Logo */}
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Logo className="w-full h-full" />
          </div>

          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-blue-200 transition-colors leading-none">
              GlowDesk
            </span>
            <span className="text-[10px] text-blue-400 font-medium tracking-widest uppercase animate-pulse">
              Studio
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <Link to="/" className="hover:text-white transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>

          <Link to="/how-it-works" className="hover:text-white transition-colors relative group">
            How it Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/pricing" className="hover:text-white transition-colors relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/faq" className="hover:text-white transition-colors relative group">
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>

          {/* Special Styled Web Demo Link */}
          <Link to="/app" className="group relative px-4 py-1.5 rounded-full bg-white/5 border border-white/10 transition-all hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-95">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">Web Demo</span>
            </div>
          </Link>
        </div>

        {/* CTA Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">

          {user ? (
            <Link to="/profile" className="w-10 h-10 rounded-full border border-white/10 bg-slate-800 overflow-hidden hover:border-blue-500 transition-colors group relative" aria-label="User Profile">
              {getAvatarDisplay()}
            </Link>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors">Log In</Link>
              <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95">
                Get App
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full min-h-screen bg-[#020205] bg-opacity-95 backdrop-blur-xl border-b border-white/10 p-6 pt-24 flex flex-col gap-6 shadow-2xl animate-[fadeIn_0.2s_ease-out] overflow-y-auto">
          <div className="flex flex-col gap-6 text-lg font-medium text-slate-300">
            <Link to="/" className="hover:text-white py-2 border-b border-white/5" onClick={handleMobileLinkClick}>Home</Link>

            <Link to="/how-it-works" className="hover:text-white py-2 border-b border-white/5" onClick={handleMobileLinkClick}>How it Works</Link>
            <Link to="/pricing" className="hover:text-white py-2 border-b border-white/5" onClick={handleMobileLinkClick}>Pricing</Link>
            <Link to="/faq" className="hover:text-white py-2 border-b border-white/5" onClick={handleMobileLinkClick}>FAQ</Link>

            <Link to="/app" className="py-2 border-b border-white/5 flex items-center justify-between group" onClick={handleMobileLinkClick}>
              <span className="text-slate-300 group-hover:text-white transition-colors">Web Demo</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span> Live
              </span>
            </Link>

            {user ? (
              <Link to="/profile" className="hover:text-white py-2 border-b border-white/5 flex items-center gap-2" onClick={handleMobileLinkClick}>
                <div className="w-6 h-6 rounded-full bg-slate-700 overflow-hidden border border-white/10">
                  {getAvatarDisplay()}
                </div>
                {profile?.full_name || 'My Profile'}
              </Link>
            ) : (
              <Link to="/login" className="hover:text-white py-2 border-b border-white/5" onClick={handleMobileLinkClick}>Log In</Link>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {!user && (
              <button className="bg-white text-black px-5 py-3 rounded-xl text-lg font-bold hover:bg-slate-200 transition-colors w-full">
                Get App for Windows
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};