import React, { useState } from 'react';
import { Link } from '../App';
import { AppleIcon, GoogleIcon } from '../components/Icons';
import { Logo } from '../components/Logo';
import { useAuth } from '../src/hooks/useAuth';

export const SignupPage = () => {
   const { signUp, signInWithOAuth } = useAuth();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [errors, setErrors] = useState({ name: '', email: '', password: '', form: '' });

   const validate = () => {
      let isValid = true;
      const newErrors = { name: '', email: '', password: '', form: '' };

      if (!name.trim()) {
         newErrors.name = 'Full name is required';
         isValid = false;
      }

      // Basic regex for email validation
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!email.trim()) {
         newErrors.email = 'Email is required';
         isValid = false;
      } else if (!emailRegex.test(email)) {
         newErrors.email = 'Please enter a valid email address';
         isValid = false;
      }

      // Password Complexity
      if (!password) {
         newErrors.password = 'Password is required';
         isValid = false;
      } else if (password.length < 6) {
         newErrors.password = 'Password must be at least 6 characters';
         isValid = false;
      }

      setErrors(newErrors);
      return isValid;
   };

   const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({ name: '', email: '', password: '', form: '' });

      if (!validate()) return;

      setIsLoading(true);

      // Real Supabase registration
      const { error } = await signUp(email, password, name);

      if (error) {
         setIsLoading(false);
         setErrors({
            name: '',
            email: '',
            password: '',
            form: error.message || 'Failed to create account. Please try again.'
         });
      } else {
         // Success - redirect to home
         window.location.hash = '#/';
      }
   };

   const handleGoogleSignup = async () => {
      setIsLoading(true);
      setErrors({ name: '', email: '', password: '', form: '' });

      const { error } = await signInWithOAuth('google');

      if (error) {
         setIsLoading(false);
         setErrors({
            name: '',
            email: '',
            password: '',
            form: error.message || 'Failed to sign up with Google. Please try again.'
         });
      }
   };

   const handleAppleSignup = async () => {
      setErrors({
         name: '',
         email: '',
         password: '',
         form: 'Apple Sign-In is not configured yet. Please use email/password or Google.'
      });
   };

   return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#020205] text-white">
         {/* Dynamic Background */}
         <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-indigo-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute top-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
         </div>

         <nav className="absolute top-8 left-8 z-20">
            <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
               <span className="text-xl">←</span> Back to Home
            </Link>
         </nav>

         <div className="relative z-10 w-full max-w-md p-6">
            <div className="text-center mb-8">
               <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="relative w-16 h-16">
                     {/* Ambient Glow Pulse */}
                     <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full animate-pulse"></div>
                     {/* Logo with internal breathing glow */}
                     <div className="relative z-10 w-full h-full">
                        <Logo className="w-full h-full" />
                     </div>
                  </div>
                  <h1 className="font-display font-bold text-3xl tracking-tight text-white flex items-center justify-center gap-2"
                     style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.6)' }}>
                     GlowDesk
                  </h1>
               </div>

               <h2 className="text-xl font-medium text-slate-300">Create Account</h2>
               <p className="text-sm text-slate-500 mt-1">Join 10,000+ creators using GlowDesk.</p>
            </div>

            <div className="glass-panel rounded-2xl p-8 border border-white/10 shadow-2xl">
               <form onSubmit={handleSignup} className="space-y-5">
                  {errors.form && (
                     <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                        {errors.form}
                     </div>
                  )}
                  <div>
                     <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                     <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full bg-black/40 border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all placeholder:text-white/20`}
                        placeholder="John Doe"
                     />
                     {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                  </div>
                  <div>
                     <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Email</label>
                     <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full bg-black/40 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all placeholder:text-white/20`}
                        placeholder="you@glowdesk.com"
                     />
                     {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                  </div>
                  <div>
                     <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Password</label>
                     <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full bg-black/40 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all placeholder:text-white/20`}
                        placeholder="Min 10 characters"
                     />
                     {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>}
                  </div>

                  <div className="text-xs text-slate-400 leading-relaxed">
                     By creating an account, you agree to our <a href="#" className="underline hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>.
                  </div>

                  <button
                     type="submit"
                     disabled={isLoading}
                     className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2"
                  >
                     {isLoading ? 'Creating Account...' : 'Get Started'}
                  </button>
               </form>

               <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f1219] px-4 text-slate-500 font-medium">Or continue with</span></div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <button
                     type="button"
                     onClick={handleGoogleSignup}
                     disabled={isLoading}
                     className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <GoogleIcon className="w-5 h-5" /> Google
                  </button>
                  <button
                     type="button"
                     onClick={handleAppleSignup}
                     disabled={isLoading}
                     className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <AppleIcon className="w-5 h-5" /> Apple
                  </button>
               </div>
            </div>

            <p className="text-center mt-8 text-sm text-slate-400">
               Already have an account? <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300">Sign in</Link>
            </p>
         </div>
      </div>
   );
};