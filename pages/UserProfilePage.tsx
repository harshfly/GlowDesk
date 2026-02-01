import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Link } from '../App';
import {
    UserIcon, CreditCardIcon, BellIcon, ShieldIcon,
    LogOutIcon, CheckIcon, EditIcon, HomeIcon,
    KeyIcon, SmartphoneIcon, CameraIcon, GlobeIcon, GridIcon,
    VideoIcon
} from '../components/Icons';
import { useAuth } from '../src/hooks/useAuth';
import { UserService } from '../src/services/user.service';

type Tab = 'overview' | 'profile' | 'security' | 'billing' | 'integrations';

export const UserProfilePage = () => {
    const { user, profile, signOut, refreshProfile } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form state
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

    // Load user data from profile
    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || '');
            setAvatarUrl(profile.avatar_url || '');
        }
    }, [profile]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSaving(true);
        setMessage(null);

        const { error } = await UserService.updateProfile(user.id, {
            full_name: fullName,
        });

        if (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
        } else {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            await refreshProfile();
        }

        setIsSaving(false);
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setMessage({ type: 'error', text: 'Please select an image file' });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'Image must be less than 5MB' });
            return;
        }

        setIsUploadingAvatar(true);
        setMessage(null);

        const { url, error } = await UserService.uploadAvatar(user.id, file);

        if (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to upload avatar' });
        } else if (url) {
            setAvatarUrl(url);
            setMessage({ type: 'success', text: 'Avatar updated successfully!' });
            await refreshProfile();
        }

        setIsUploadingAvatar(false);
    };

    const handleLogout = async () => {
        await signOut();
        window.location.hash = '#/';
    };

    const navItems: { id: Tab, label: string, icon: React.ReactNode }[] = [
        { id: 'overview', label: 'Overview', icon: <HomeIcon className="w-5 h-5" /> },
        { id: 'profile', label: 'My Profile', icon: <UserIcon className="w-5 h-5" /> },
        { id: 'security', label: 'Security', icon: <KeyIcon className="w-5 h-5" /> },
        { id: 'integrations', label: 'Integrations', icon: <GridIcon className="w-5 h-5" /> },
        { id: 'billing', label: 'Billing & Plan', icon: <CreditCardIcon className="w-5 h-5" /> },
    ];

    // Helper for monitor icon used in sessions
    function MonitorIcon({ className }: { className?: string }) {
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>;
    }

    return (
        <div className="min-h-screen bg-[#020205] text-slate-200 font-sans selection:bg-blue-500/30 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-28 pb-12 max-w-7xl mx-auto px-6 lg:px-8 w-full">

                {/* 1. Header / Banner Area */}
                <div className="relative mb-8 group">
                    <div className="h-40 md:h-52 rounded-3xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-blue-900/40 border border-white/10 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        {/* Decorative background shapes */}
                        <div className="absolute top-[-50%] left-[10%] w-[30vw] h-[30vw] bg-blue-500/10 blur-[80px] rounded-full"></div>
                    </div>

                    <div className="absolute -bottom-10 left-6 md:left-12 flex items-end gap-6 z-10">
                        <div className="relative">
                            <input
                                type="file"
                                id="avatar-upload"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#020205] bg-slate-800 shadow-xl overflow-hidden group/avatar cursor-pointer block"
                            >
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover group-hover/avatar:opacity-50 transition-all" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                        {fullName.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity bg-black/50">
                                    {isUploadingAvatar ? (
                                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <CameraIcon className="w-8 h-8 text-white drop-shadow-lg" />
                                    )}
                                </div>
                            </label>
                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-[#020205] rounded-full"></div>
                        </div>
                        <div className="mb-1 md:mb-3">
                            <h1 className="text-3xl font-bold text-white tracking-tight">{fullName || user?.email || 'User'}</h1>
                            <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                                <span>{user?.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Header Actions */}
                    <div className="hidden md:flex absolute bottom-4 right-6 gap-3">
                        <Link to="/app" className="bg-white text-black hover:bg-slate-200 px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2">
                            Launch Web App
                        </Link>
                        <button className="bg-black/40 backdrop-blur text-white border border-white/10 hover:bg-white/10 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                            Download for Windows
                        </button>
                    </div>
                </div>

                {/* 2. Main Layout Grid */}
                <div className="mt-16 grid lg:grid-cols-12 gap-8">

                    {/* Sidebar Nav */}
                    <div className="lg:col-span-3 space-y-2">
                        <div className="bg-[#0a0a12] border border-white/5 rounded-2xl p-2 sticky top-24">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id
                                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}

                            <div className="my-2 h-px bg-white/5 mx-2"></div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 transition-all text-left"
                            >
                                <LogOutIcon className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-9">
                        <div className="min-h-[500px] animate-[fadeIn_0.3s_ease-out]">

                            {/* TAB: OVERVIEW */}
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    <div className="glass-panel p-8 rounded-2xl border border-white/10">
                                        <h2 className="text-2xl font-bold text-white mb-4">Welcome to GlowDesk!</h2>
                                        <p className="text-slate-400 mb-6">
                                            Manage your profile, settings, and preferences from this dashboard.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Link
                                                to="/app"
                                                className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                                            >
                                                <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/30 transition-colors">
                                                    <HomeIcon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white">Launch App</h3>
                                                    <p className="text-xs text-slate-400">Control your glow settings</p>
                                                </div>
                                            </Link>

                                            <button
                                                onClick={() => setActiveTab('profile')}
                                                className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group text-left"
                                            >
                                                <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-600/30 transition-colors">
                                                    <UserIcon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white">Edit Profile</h3>
                                                    <p className="text-xs text-slate-400">Update your information</p>
                                                </div>
                                            </button>
                                        </div>

                                        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                            <div className="flex items-start gap-3">
                                                <div className="text-blue-400 mt-0.5">ℹ️</div>
                                                <div>
                                                    <h4 className="font-bold text-blue-300 mb-1">Profile Information</h4>
                                                    <p className="text-sm text-blue-200/80">
                                                        Your profile data is securely stored in Supabase with Row Level Security enabled.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB: PROFILE EDIT */}
                            {activeTab === 'profile' && (
                                <div className="max-w-3xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                                    </div>

                                    {message && (
                                        <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success'
                                            ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                                            }`}>
                                            {message.text}
                                        </div>
                                    )}

                                    <form onSubmit={handleSave} className="space-y-6">
                                        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={user?.email || ''}
                                                    disabled
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed"
                                                />
                                                <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profile Picture</label>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10">
                                                        {avatarUrl ? (
                                                            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                                                {fullName.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="avatar-upload" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer inline-block transition-colors">
                                                            {isUploadingAvatar ? 'Uploading...' : 'Change Avatar'}
                                                        </label>
                                                        <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Max 5MB.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3">
                                            <button
                                                type="submit"
                                                disabled={isSaving}
                                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    'Save Changes'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* TAB: SECURITY */}
                            {activeTab === 'security' && (
                                <div className="max-w-3xl space-y-8">
                                    <h2 className="text-2xl font-bold text-white">Login & Security</h2>

                                    {/* Password */}
                                    <div className="glass-panel p-6 rounded-2xl border border-white/10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="font-bold text-white">Password</h3>
                                                <p className="text-sm text-slate-400">Manage your account password</p>
                                            </div>
                                            <button className="text-sm font-bold text-blue-400 hover:text-white transition-colors border border-blue-500/30 px-4 py-2 rounded-lg hover:bg-blue-500/10">Change Password</button>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                            <div>
                                                <h3 className="font-bold text-white">Two-Factor Authentication</h3>
                                                <p className="text-sm text-slate-400">Add an extra layer of security (coming soon)</p>
                                            </div>
                                            <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-not-allowed opacity-50">
                                                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Info */}
                                    <div className="glass-panel p-6 rounded-2xl border border-white/10">
                                        <h3 className="font-bold text-white mb-4">Account Information</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between py-2 border-b border-white/5">
                                                <span className="text-slate-400 text-sm">Email</span>
                                                <span className="text-white text-sm font-medium">{user?.email}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-white/5">
                                                <span className="text-slate-400 text-sm">User ID</span>
                                                <span className="text-white text-sm font-mono">{user?.id.slice(0, 8)}...</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span className="text-slate-400 text-sm">Account Created</span>
                                                <span className="text-white text-sm">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB: INTEGRATIONS */}
                            {activeTab === 'integrations' && (
                                <div className="max-w-3xl">
                                    <h2 className="text-2xl font-bold text-white mb-8">Integrations</h2>
                                    <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <GridIcon className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Integrations Coming Soon</h3>
                                        <p className="text-slate-400 max-w-md mx-auto">
                                            Connect GlowDesk with your favorite apps like Zoom, Teams, and OBS Studio to automate your lighting.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* TAB: BILLING */}
                            {activeTab === 'billing' && (
                                <div className="max-w-3xl">
                                    <h2 className="text-2xl font-bold text-white mb-6">Plan & Billing</h2>

                                    <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <CreditCardIcon className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Free Plan</h3>
                                        <p className="text-slate-400 max-w-md mx-auto mb-6">
                                            You're currently on the free plan. Enjoy all the core features of GlowDesk!
                                        </p>
                                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                                            Upgrade to Pro
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};