import React from 'react';
import { Navbar } from '../components/Navbar';
import { CheckIcon, ServerIcon, LockIcon } from '../components/Icons';
import { Link } from '../App';

export const PricingPage = () => {
  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
         <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Plans for every creator.</h1>
            <p className="text-xl text-slate-400">Secure, encrypted, and professional. Start with a 30-day free trial.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Free Tier */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col hover:border-white/20 transition-all">
               <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Starter</h3>
                  <div className="text-4xl font-bold text-white mb-2">Free</div>
                  <p className="text-slate-500 text-sm">Basic web-based lighting.</p>
               </div>
               
               <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-slate-300"><CheckIcon className="w-4 h-4 text-blue-500"/> Web Browser Version</div>
                  <div className="flex items-center gap-3 text-sm text-slate-300"><CheckIcon className="w-4 h-4 text-blue-500"/> Manual Temp Control</div>
                  <div className="flex items-center gap-3 text-sm text-slate-300"><CheckIcon className="w-4 h-4 text-blue-500"/> Standard Brightness</div>
               </div>

               <Link to="/app" className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-center font-bold text-sm transition-all">
                  Launch Web App
               </Link>
            </div>

            {/* Pro Tier */}
            <div className="glass-panel p-8 rounded-3xl border border-blue-500/50 bg-blue-900/10 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.15)] transform md:-translate-y-4">
               <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
               
               <div className="mb-6">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Professional</h3>
                  <div className="text-4xl font-bold text-white mb-2">$10 <span className="text-lg font-normal text-slate-400">/ mo</span></div>
                  <p className="text-blue-200/80 text-sm">Full power. Zero hardware.</p>
               </div>
               
               <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-white font-medium"><CheckIcon className="w-4 h-4 text-blue-400"/> Native Windows App</div>
                  <div className="flex items-center gap-3 text-sm text-white"><CheckIcon className="w-4 h-4 text-blue-400"/> Always-on-Top Overlay</div>
                  <div className="flex items-center gap-3 text-sm text-white"><CheckIcon className="w-4 h-4 text-blue-400"/> Multi-Monitor Support</div>
                  <div className="flex items-center gap-3 text-sm text-white"><CheckIcon className="w-4 h-4 text-blue-400"/> Webcam Auto-Adjust</div>
                  <div className="flex items-center gap-3 text-sm text-white"><CheckIcon className="w-4 h-4 text-blue-400"/> Priority Support</div>
               </div>

               <button className="w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 text-center font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/25 mb-3 flex items-center justify-center gap-2">
                  <LockIcon className="w-4 h-4" /> Start 30-Day Free Trial
               </button>
               <p className="text-center text-xs text-slate-400">Then $10/mo. Cancel anytime.</p>
            </div>

            {/* Corporate Tier */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col hover:border-purple-500/30 transition-all">
               <div className="mb-6">
                  <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">Corporate</h3>
                  <div className="text-4xl font-bold text-white mb-2">Custom</div>
                  <p className="text-slate-500 text-sm">Secure deployment for teams.</p>
               </div>
               
               <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-slate-300"><ServerIcon className="w-4 h-4 text-purple-500"/> Volume Licensing</div>
                  <div className="flex items-center gap-3 text-sm text-slate-300"><CheckIcon className="w-4 h-4 text-purple-500"/> SSO / SAML Integration</div>
                  <div className="flex items-center gap-3 text-sm text-slate-300"><CheckIcon className="w-4 h-4 text-purple-500"/> Centralized Admin</div>
                  <div className="flex items-center gap-3 text-sm text-slate-300"><CheckIcon className="w-4 h-4 text-purple-500"/> 24/7 SLA Support</div>
                  <div className="flex items-center gap-3 text-sm text-slate-300"><CheckIcon className="w-4 h-4 text-purple-500"/> MSI / MDM Deployment</div>
               </div>

               <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-center font-bold text-sm transition-all">
                  Contact Sales
               </button>
            </div>
         </div>
         
         <div className="mt-20 text-center border-t border-white/5 pt-12">
             <div className="flex items-center justify-center gap-2 text-slate-500 mb-6 text-xs uppercase tracking-widest font-bold">
                 <LockIcon className="w-4 h-4" /> Bank-Level AES-256 Security
             </div>
            <h2 className="text-2xl font-bold mb-4">Enterprise Security Standard</h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                We prioritize your privacy. GlowDesk operates locally on your machine. 
                No video feeds are ever sent to the cloud.
            </p>
         </div>
      </main>
    </div>
  );
};