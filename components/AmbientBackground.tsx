import React from 'react';

export const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Deep Space Base */}
      <div className="absolute inset-0 bg-[#020205]"></div>
      
      {/* 2. Moving Blobs (Breathing Light) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
         {/* Top Left - Blue */}
         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[100px] animate-blob"></div>
         
         {/* Bottom Right - Purple */}
         <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
         
         {/* Center - Subtle Cyan */}
         <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      {/* 3. Aesthetic Corner Borders (Breathing Flow) */}
      <div className="absolute inset-0 p-4 md:p-6">
        <div className="relative w-full h-full border border-white/5 rounded-3xl overflow-hidden">
            {/* Corner Highlights */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/20 to-transparent blur-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent blur-2xl"></div>

            {/* Subtle flowing edge line */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent animate-border-flow"></div>
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent animate-border-flow" style={{ animationDirection: 'reverse' }}></div>
            </div>
        </div>
      </div>
      
      {/* 4. Grain Texture for "Modern Vibe" */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
};