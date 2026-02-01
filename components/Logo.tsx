import React from 'react';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <defs>
             <linearGradient id="navLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#60a5fa" />
             </linearGradient>
             <filter id="navLogoGlow" x="-50%" y="-50%" width="200%" height="200%">
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

          {/* Full Circle with Breathing Animation */}
          <circle 
              cx="50" cy="50" r="40" 
              fill="none" 
              stroke="url(#navLogoGradient)" 
              strokeWidth="6" 
              strokeLinecap="round"
              filter="url(#navLogoGlow)"
              className="animate-[breathe_3s_ease-in-out_infinite]"
          />
       </svg>
       <style>{`
         @keyframes breathe {
           0%, 100% { opacity: 0.7; filter: drop-shadow(0 0 0px rgba(59, 130, 246, 0)); }
           50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.6)); }
         }
       `}</style>
    </div>
  );
};