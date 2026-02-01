import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { DownloadIcon, MonitorIcon, VideoIcon } from '../components/Icons';

export const HowItWorksPage = () => {
  // Interactive Demo State
  const [demoIntensity, setDemoIntensity] = useState(85);
  const [demoTemp, setDemoTemp] = useState(5600); // Kelvin
  const [demoColor, setDemoColor] = useState('rgba(255, 255, 255, 0.85)');

  // Calculate RGB from Kelvin
  useEffect(() => {
    const k = Math.max(2000, Math.min(9000, demoTemp)) / 100;
    let r, g, b;
    if (k <= 66) {
      r = 255;
      g = k < 6 ? 0 : 99.47 * Math.log(k) - 161.1;
      b = k <= 19 ? 0 : 138.5 * Math.log(k - 10) - 305.04;
    } else {
      r = 329.7 * Math.pow(k - 60, -0.133);
      g = 288.1 * Math.pow(k - 60, -0.075);
      b = 255;
    }
    const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val || 0)));
    setDemoColor(`rgba(${clamp(r)}, ${clamp(g)}, ${clamp(b)}, ${demoIntensity / 100})`);
  }, [demoTemp, demoIntensity]);

  const steps = [
    {
      icon: <DownloadIcon className="w-8 h-8 text-blue-400" />,
      title: "1. Install the App",
      desc: "Download the lightweight GlowDesk installer for Windows. It runs silently in the system tray and starts instantly."
    },
    {
      icon: <MonitorIcon className="w-8 h-8 text-purple-400" />,
      title: "2. Toggle the Light",
      desc: "Click the toggle switch. A high-performance, GPU-accelerated ring light overlay appears around your screen edges."
    },
    {
      icon: <VideoIcon className="w-8 h-8 text-green-400" />,
      title: "3. Join Your Call",
      desc: "Open Zoom, Teams, Meet, or OBS. Your face is now evenly lit by your screen. Adjust temperature to match your room."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Master your lighting <br/> in 3 simple steps.</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">No hardware to mount. No cables to manage. Just pure software brilliance.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
           {/* Connection Line */}
           <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-900/0 via-blue-500/20 to-blue-900/0"></div>

           {steps.map((step, i) => (
             <div key={i} className="relative z-10 glass-panel rounded-3xl p-8 hover:bg-white/[0.03] transition-colors border border-white/10 group">
                <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
             </div>
           ))}
        </div>

        {/* Interactive Demo Section */}
        <div className="mt-32 glass-panel rounded-3xl overflow-visible border border-white/10 relative">
           <div className="absolute inset-0 bg-blue-900/10 rounded-3xl"></div>
           
           <div className="relative p-6 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">See it in action</h2>
              <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
                Adjust the brightness and temperature controls below to simulate how GlowDesk lights up your video feed.
              </p>

              {/* The "Monitor" container */}
              <div className="relative mx-auto max-w-4xl aspect-video bg-[#111] rounded-2xl border-[6px] sm:border-[12px] border-[#222] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden group">
                   {/* Image */}
                   <img 
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=2574&auto=format&fit=crop" 
                      alt="User Portrait" 
                      className="w-full h-full object-cover"
                   />
                   
                   {/* Glow Overlay - Hardware Virtualization */}
                   <div 
                      className="absolute inset-0 pointer-events-none transition-all duration-200 ease-out z-20"
                      style={{
                         boxShadow: `
                            inset 0 0 0 10px rgba(255,255,255,0.9),
                            inset 0 0 20px 15px ${demoColor},
                            inset 0 0 60px 30px ${demoColor}
                         `,
                      }}
                   ></div>

                   {/* Face Fill Light Simulation */}
                   <div 
                      className="absolute inset-0 pointer-events-none transition-all duration-200 ease-out z-10 mix-blend-overlay"
                      style={{
                         backgroundColor: demoColor,
                         opacity: 0.3
                      }}
                   ></div>

                   {/* UI Mockup */}
                   <div className="absolute top-6 right-6 flex items-center gap-2">
                      <div className="bg-red-500/20 backdrop-blur px-2 py-1 rounded text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> Live
                      </div>
                   </div>
                   
                   <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full z-30 border border-white/10">
                      <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
                      <span className="text-xs font-medium text-white tracking-wide">Camera Active</span>
                   </div>
              </div>

              {/* Controls */}
              <div className="mt-12 max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-center shadow-2xl">
                    <div className="flex flex-col gap-3 w-full">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex justify-between">
                          Brightness <span>{demoIntensity}%</span>
                        </label>
                        <input 
                          type="range" min="0" max="100" 
                          value={demoIntensity} 
                          onChange={(e) => setDemoIntensity(parseInt(e.target.value))}
                          className="blue-slider h-1.5 w-full touch-pan-x"
                          style={{ '--value': `${demoIntensity}%` } as React.CSSProperties}
                        />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex justify-between">
                          Temperature <span>{demoTemp}K</span>
                        </label>
                        <input 
                          type="range" min="2000" max="9000" step="100"
                          value={demoTemp} 
                          onChange={(e) => setDemoTemp(parseInt(e.target.value))}
                          className="temp-slider h-1.5 w-full touch-pan-x"
                        />
                    </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};