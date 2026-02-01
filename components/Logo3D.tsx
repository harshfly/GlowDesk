import React, { useRef, useState } from 'react';

export const Logo3D = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [lightPosition, setLightPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on cursor position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 25; // Increased rotation range
    const rotateX = ((y - centerY) / centerY) * -25;

    // Calculate light source position (opposite to movement for realistic 3D feel)
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setLightPosition({ x: lightX, y: lightY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setLightPosition({ x: 50, y: 50 });
  };

  return (
    <div 
      className="perspective-container cursor-pointer group w-12 h-12"
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ref}
    >
      <div 
        className="relative w-full h-full transition-transform duration-100 ease-out transform-style-3d"
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Back Glow */}
        <div className="absolute inset-0 bg-blue-500 rounded-xl blur-[15px] opacity-40 group-hover:opacity-80 transition-opacity duration-300 transform translate-z-[-10px]"></div>
        
        {/* Main Logo Body */}
        <div 
          className="absolute inset-0 rounded-xl border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden transform translate-z-[10px]"
          style={{
            background: `radial-gradient(circle at ${lightPosition.x}% ${lightPosition.y}%, #2a2a40, #000000)`
          }}
        >
           {/* Internal Dynamic Light Reflection */}
           <div 
             className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-opacity duration-500"
             style={{
                opacity: 0.5 + (Math.abs(rotation.x) + Math.abs(rotation.y)) / 50
             }}
           ></div>
           
           {/* The "Light" Ring Shape - Floating */}
           <div 
             className="w-7 h-7 rounded-lg border-[3px] border-blue-500 shadow-[0_0_15px_#3b82f6] group-hover:shadow-[0_0_25px_#60a5fa] transition-all duration-300 transform translate-z-[20px]"
             style={{
               borderColor: `rgba(59, 130, 246, ${0.8 + lightPosition.x / 500})`
             }}
           ></div>
        </div>
      </div>
    </div>
  );
};