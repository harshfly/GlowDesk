import React, { useState } from 'react';
import { ControlPanel } from '../components/ControlPanel';
import { RingLightOverlay } from '../components/RingLightOverlay';
import { GlowSettings, PresetMode } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

const Link = ({ to, children, className }: { to: string, children?: React.ReactNode, className?: string }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = to;
  };
  return <a href={`#${to}`} onClick={handleClick} className={className}>{children}</a>;
};

export const WebApp = () => {
  const [settings, setSettings] = useState<GlowSettings>({
    ...DEFAULT_SETTINGS,
    isOn: true, // Auto turn on for demo
  });

  const updateSettings = (newSettings: Partial<GlowSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center relative overflow-x-hidden overflow-y-auto bg-black selection:bg-blue-500/30 pt-24 pb-12 md:py-0">
      
      {/* The Actual Product - Global Overlay */}
      <RingLightOverlay settings={settings} />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* App Container */}
      <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 p-4 md:p-6 w-full max-w-4xl animate-[fadeIn_0.5s_ease-out]">
        
        <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center gap-4 max-w-[520px]">
            <Link to="/" className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5 hover:border-white/20">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Exit Demo
            </Link>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
               <span className="text-sm text-white/60 font-medium tracking-wide">Web Preview Active</span>
            </div>
        </div>

        <ControlPanel settings={settings} updateSettings={updateSettings} />

        <div className="glass-card rounded-xl p-5 max-w-[520px] w-full text-center border border-yellow-500/20 bg-yellow-500/5">
           <h3 className="text-yellow-200 font-semibold mb-1 flex items-center justify-center gap-2">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             System Limitation
           </h3>
           <p className="text-sm text-yellow-100/70 leading-relaxed mb-4">
              The web version cannot draw over other apps like Zoom or Teams. 
              For the system-wide always-on-top overlay, please use the desktop app.
           </p>
           <button 
             className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-slate-200 px-6 py-2.5 rounded-lg text-sm font-bold w-full transition-all"
             onClick={() => alert("Simulating Download Started...")}
           >
              Download Windows Installer (.exe)
           </button>
        </div>

      </div>
    </div>
  );
};