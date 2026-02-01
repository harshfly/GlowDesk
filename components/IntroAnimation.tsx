import React, { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0); 
  // 0: Initial
  // 1: Draw Ring (Fast)
  // 2: Pulse/Reveal Text
  // 3: Move to Header & Fade Out BG
  // 4: Complete

  useEffect(() => {
    // Fast Animation Timeline
    const t1 = setTimeout(() => setStage(1), 100);    // Start drawing ASAP
    const t2 = setTimeout(() => setStage(2), 800);    // Reveal text quickly
    const t3 = setTimeout(() => setStage(3), 1800);   // Move to header
    const t4 = setTimeout(onComplete, 2400);          // Handover to app

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-colors duration-500 ease-in-out pointer-events-none
        ${stage >= 3 ? 'bg-transparent' : 'bg-[#020205]'}
      `}
    >
      <div className={`relative flex flex-col items-center justify-center w-full h-full`}>
        
        {/* Moving Logo Container */}
        {/* We animate from Center Screen to Top-Left Navbar Position */}
        {/* Navbar position logic: max-w-7xl, px-6. The logo is approx 24px from top, 24px from left (in the container) */}
        <div 
            className={`absolute transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) flex items-center justify-center
                ${stage >= 3 
                    ? 'top-4 left-6 lg:left-[calc(50%-40rem+1.5rem)] scale-[0.3] -translate-x-8 -translate-y-8 origin-top-left opacity-0' // End: Top Left, Small, Eventually invisible for smooth swap
                    : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100' // Start: Center
                }
            `}
        >
           {/* The SVG Logo */}
           <div className="relative w-32 h-32 md:w-40 md:h-40">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <defs>
                     <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#60a5fa" />
                     </linearGradient>
                     <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                     </filter>
                  </defs>
                  
                  {/* Background Track */}
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#1e293b" 
                    strokeWidth="6" 
                    className="opacity-30"
                  />

                  {/* Animated Stroke */}
                  {stage >= 1 && (
                    <circle 
                        cx="50" cy="50" r="40" 
                        fill="none" 
                        stroke="url(#logoGradient)" 
                        strokeWidth="6" 
                        strokeLinecap="round"
                        filter="url(#logoGlow)"
                        strokeDasharray="251.2"
                        strokeDashoffset="251.2"
                        style={{ animation: 'drawCircle 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' }}
                    />
                  )}
               </svg>
               
               {/* Burst Effect */}
               <div 
                 className={`absolute inset-0 bg-blue-400/20 rounded-full blur-2xl transition-all duration-1000 ${stage >= 2 && stage < 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
               ></div>
           </div>
        </div>

        {/* Text Reveal Animation - Fades out during move */}
        <div className={`overflow-hidden h-20 flex items-center absolute top-1/2 left-1/2 -translate-x-1/2 mt-20 transition-all duration-300 ${stage >= 3 ? 'opacity-0 translate-y-4' : 'opacity-100'}`}>
            <h1 
                className={`text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white tracking-tight transition-all duration-700 transform ${stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
            >
                GlowDesk
            </h1>
        </div>
      </div>
      
      <style>{`
        @keyframes drawCircle {
          0% { stroke-dashoffset: 251.2; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};