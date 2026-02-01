import React, { useState, useEffect, useRef } from 'react';
import { 
    CheckIcon, DownloadIcon, ArrowRightIcon, StarIcon, 
    SunIcon, SlidersIcon, MonitorIcon, ZapIcon, CpuIcon, LayersIcon
} from '../components/Icons';
import { Link } from '../App';
import { Navbar } from '../components/Navbar';
import { Logo } from '../components/Logo';

// Helper Component for Scroll Animations
interface FadeInProps {
    children?: React.ReactNode;
    className?: string;
    delay?: number;
    threshold?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ 
    children, 
    className = "", 
    delay = 0,
    threshold = 0.1 
}) => {
    const [isVisible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [threshold]);

    return (
        <div 
            ref={ref} 
            className={`${className} transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} 
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

interface LandingPageProps {
    showNavLogo?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ showNavLogo = true }) => {
  // Hero Interactive Demo State
  const [demoIntensity, setDemoIntensity] = useState(85);
  const [demoTemp, setDemoTemp] = useState(5600); // Kelvin
  const [demoColor, setDemoColor] = useState('rgba(255, 255, 255, 0.85)');

  useEffect(() => {
    // Simple Kelvin to RGB approximation for demo purposes
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

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden bg-[#020205] text-slate-200">
      
      <Navbar hideLogo={!showNavLogo} />

      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 lg:pt-48 lg:pb-32 overflow-visible">
        {/* Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[60vw] h-[60vw] bg-blue-600/15 rounded-full blur-[100px] animate-pulse-slow"></div>
           <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
           <div className="flex flex-col items-center text-center">
              
              <FadeIn delay={0}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-300 text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default mx-auto">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse"></span>
                     System-Wide Overlay V2.0
                  </div>
              </FadeIn>

              <FadeIn delay={100}>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 drop-shadow-2xl">
                     Professional Studio Light.<br/>
                     Zero Hardware.
                  </h1>
              </FadeIn>

              <FadeIn delay={200}>
                  <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                     Turn your screen borders into a powerful, adjustable ring light. 
                     Look perfect on Zoom, Teams, and streams without buying bulky gear.
                  </p>
              </FadeIn>

              <FadeIn delay={300}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                     <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-lg font-bold transition-all shadow-[0_10px_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2">
                        <DownloadIcon className="w-5 h-5" /> Download for Windows
                     </button>
                     <Link to="/app" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-lg font-medium transition-all backdrop-blur-sm flex items-center justify-center gap-2">
                        Open Web Demo <ArrowRightIcon className="w-4 h-4" />
                     </Link>
                  </div>
              </FadeIn>

              <FadeIn delay={400}>
                  <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500 flex-wrap">
                     <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-slate-700 shadow-sm overflow-hidden">
                               <img src={`https://randomuser.me/api/portraits/thumb/men/${i+10}.jpg`} alt="User" className="w-full h-full object-cover opacity-80" />
                            </div>
                        ))}
                     </div>
                     <div className="flex flex-col items-start">
                        <div className="flex text-yellow-500"><StarIcon fill className="w-3 h-3"/><StarIcon fill className="w-3 h-3"/><StarIcon fill className="w-3 h-3"/><StarIcon fill className="w-3 h-3"/><StarIcon fill className="w-3 h-3"/></div>
                        <span>Trusted by 10,000+ creators</span>
                     </div>
                  </div>
              </FadeIn>
           </div>

           {/* 3D INTERACTIVE HERO VISUALIZATION */}
           <FadeIn delay={500} className="w-full">
               <div className="mt-16 sm:mt-24 relative mx-auto max-w-5xl group perspective-container w-full" style={{ perspective: '2000px' }}>
                  
                  {/* Monitor Frame */}
                  <div className="relative aspect-[16/10] bg-[#111] rounded-[1rem] sm:rounded-[2rem] border-[6px] sm:border-[12px] border-[#222] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-700 transform-style-3d group-hover:rotate-x-1 z-20">
                     
                     {/* The Actual Image - Updated to High Quality Portrait */}
                     <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" 
                        alt="User Portrait" 
                        className="w-full h-full object-cover transform scale-105 transition-transform duration-1000 group-hover:scale-100"
                     />

                     {/* THE GLOWDESK OVERLAY EFFECT - REALISTIC RING LIGHT */}
                     
                     {/* 1. The Light Source (The "Hardware" Virtualization) */}
                     {/* Creates a distinct, bright band at the edge, simulating the LED hardware strip */}
                     <div 
                        className="absolute inset-0 pointer-events-none transition-all duration-200 ease-out z-20"
                        style={{
                           boxShadow: `
                              inset 0 0 0 10px rgba(255,255,255,0.9),  /* The intense white core ring */
                              inset 0 0 20px 15px ${demoColor},        /* The primary color bloom */
                              inset 0 0 60px 30px ${demoColor}         /* The soft ambient falloff */
                           `,
                        }}
                     ></div>

                     {/* 2. Face Illumination (Ambient Light Spill) */}
                     {/* Simulates the light actually hitting the subject's face */}
                     <div 
                        className="absolute inset-0 pointer-events-none transition-all duration-200 ease-out z-10 mix-blend-overlay"
                        style={{
                           backgroundColor: demoColor,
                           opacity: 0.2
                        }}
                     ></div>

                     {/* 3. Screen Edge Reflection/Gloss */}
                     <div className="absolute inset-0 z-30 pointer-events-none rounded-[0.8rem] sm:rounded-[1.2rem] ring-1 ring-white/10"></div>

                     {/* UI Overlay Mockup */}
                     <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2 z-30">
                         <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse"></div>
                         <span className="text-[10px] sm:text-xs font-mono text-white/50">REC 00:14:23</span>
                     </div>
                     
                     <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4 bg-black/80 backdrop-blur border border-white/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full z-30">
                         <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">JD</div>
                         <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer hidden sm:flex">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                         </div>
                         <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                         </div>
                         <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer hidden sm:flex">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                         </div>
                     </div>

                  </div>
                  
                  {/* Controls for Demo */}
                  <div className="absolute -bottom-24 sm:-bottom-32 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-[-5px] w-[90%] sm:w-auto">
                      <div className="bg-[#050505] border border-white/10 rounded-3xl px-6 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-10 shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full sm:w-auto">
                          <div className="flex flex-col gap-3 w-full sm:w-40">
                              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Brightness</label>
                              <input 
                                type="range" min="0" max="100" 
                                value={demoIntensity} 
                                onChange={(e) => setDemoIntensity(parseInt(e.target.value))}
                                className="blue-slider h-1.5 w-full touch-pan-x"
                                style={{ '--value': `${demoIntensity}%` } as React.CSSProperties}
                              />
                          </div>
                          <div className="flex flex-col gap-3 w-full sm:w-40">
                              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Temperature</label>
                              <input 
                                type="range" min="2000" max="9000" 
                                value={demoTemp} 
                                onChange={(e) => setDemoTemp(parseInt(e.target.value))}
                                className="temp-slider h-1.5 w-full touch-pan-x"
                              />
                          </div>
                      </div>
                  </div>

                  {/* Floor Reflection */}
                  <div className="absolute -bottom-20 left-[10%] w-[80%] h-16 bg-blue-500/20 blur-[80px] rounded-full transform scale-x-125 z-10"></div>
               </div>
           </FadeIn>
        </div>
      </section>

      {/* 2. SOCIAL PROOF / TICKER */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden">
         <FadeIn>
            <div className="max-w-7xl mx-auto px-6">
               <p className="text-center text-xs font-bold text-slate-500 mb-8 uppercase tracking-[0.2em]">Perfect for your favorite apps</p>
               <div className="relative w-full overflow-hidden">
                  <div className="flex justify-center items-center gap-8 sm:gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap">
                      {['Zoom', 'Microsoft Teams', 'Google Meet', 'OBS Studio', 'Discord', 'Skype'].map((name, i) => (
                          <span key={i} className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white whitespace-nowrap">{name}</span>
                      ))}
                  </div>
               </div>
            </div>
         </FadeIn>
      </section>

      {/* 3. PROBLEM / SOLUTION */}
      <section className="py-20 sm:py-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <FadeIn delay={0}>
                          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Stop buying <br/>plastic hardware.</h2>
                      </FadeIn>
                      <FadeIn delay={100}>
                          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                              Physical ring lights are bulky, generate heat, reflect in your glasses, and clutter your desk. 
                              GlowDesk uses the screen you already have to create a softer, more flattering light source that costs $0 in desk space.
                          </p>
                      </FadeIn>
                      
                      <div className="space-y-4">
                          <FadeIn delay={200}>
                              <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                                      <span className="text-red-400 font-bold">✕</span>
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-white">No Bulky Stands</h4>
                                      <p className="text-sm text-slate-500">Reclaim your desk space. No more tripods falling over behind your monitor.</p>
                                  </div>
                              </div>
                          </FadeIn>
                          <FadeIn delay={300}>
                              <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                                      <span className="text-red-400 font-bold">✕</span>
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-white">No Eye Strain</h4>
                                      <p className="text-sm text-slate-500">Physical LEDs are harsh point-sources. GlowDesk is a large, diffused softbox.</p>
                                  </div>
                              </div>
                          </FadeIn>
                      </div>
                  </div>
                  
                  <div className="relative">
                      <FadeIn delay={200}>
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
                          <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
                              <div className="aspect-square bg-black/50 rounded-2xl overflow-hidden relative border border-white/5">
                                  {/* Conceptual "Trash the hardware" visual */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="text-center opacity-30">
                                          <div className="text-6xl mb-2">🗑️</div>
                                          <div className="text-sm font-mono">HARDWARE NOT DETECTED</div>
                                          <div className="text-xs text-slate-500">Good riddance.</div>
                                      </div>
                                  </div>
                                  {/* Overlay GlowDesk UI */}
                                  <div className="absolute bottom-0 left-0 right-0 bg-glass-gradient border-t border-white/10 p-4 sm:p-6 backdrop-blur-md">
                                      <div className="flex items-center justify-between mb-2">
                                          <span className="text-xs font-bold text-blue-300 uppercase">GlowDesk Active</span>
                                          <div className="flex gap-1">
                                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div>
                                          </div>
                                      </div>
                                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                          <div className="w-[70%] h-full bg-blue-500"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </FadeIn>
                  </div>
              </div>
          </div>
      </section>

      {/* 4. FEATURES (BENTO GRID) */}
      <section id="features" className="py-20 sm:py-32 relative bg-black/30">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-16 md:text-center max-w-3xl mx-auto">
               <FadeIn>
                  <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Studio control suite.</h2>
                  <p className="text-slate-400 text-lg">Granular control over every aspect of your lighting.</p>
               </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-6 h-auto md:h-[600px]">
               
               {/* Card 1: Large - Temperature */}
               <div className="md:col-span-2 md:row-span-2 h-[400px] md:h-auto">
                   <FadeIn delay={0} className="h-full">
                       <div className="glass-panel rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-white/20 transition-all h-full">
                          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/10 blur-[80px] rounded-full group-hover:bg-orange-500/20 transition-all"></div>
                          <div className="relative z-10 flex flex-col h-full">
                             <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mb-6">
                                <SunIcon className="w-6 h-6 text-orange-300" />
                             </div>
                             <h3 className="text-2xl font-bold mb-2">Adaptive Temperature</h3>
                             <p className="text-slate-400 mb-8 max-w-sm">From warm candlelight (2700K) to crisp daylight (6500K). Match your ambient lighting perfectly.</p>
                             
                             {/* Interactive Visual */}
                             <div className="mt-auto w-full h-48 bg-black/40 rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                                <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-orange-500/20 via-white/10 to-blue-500/20"></div>
                                <div className="relative z-10 flex gap-4 sm:gap-8">
                                   <div className="text-center"><div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-500/80 blur-md mb-2 mx-auto shadow-[0_0_30px_orange]"></div><span className="text-xs text-orange-200">Warm</span></div>
                                   <div className="text-center"><div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/80 blur-md mb-2 mx-auto shadow-[0_0_30px_white]"></div><span className="text-xs text-white">Neutral</span></div>
                                   <div className="text-center"><div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-400/80 blur-md mb-2 mx-auto shadow-[0_0_30px_#60a5fa]"></div><span className="text-xs text-blue-200">Cool</span></div>
                                </div>
                             </div>
                          </div>
                       </div>
                   </FadeIn>
               </div>

               {/* Card 2: Performance */}
               <div className="md:col-span-1 h-[250px] md:h-auto">
                   <FadeIn delay={100} className="h-full">
                       <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between group overflow-hidden hover:bg-white/[0.03] h-full">
                          <div>
                             <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
                                <CpuIcon className="w-5 h-5 text-green-300" />
                             </div>
                             <h3 className="text-lg font-bold mb-1">GPU Accelerated</h3>
                             <p className="text-xs text-slate-400">0% CPU usage. Runs entirely on your graphics card for zero lag.</p>
                          </div>
                          <div className="mt-4">
                             <div className="flex justify-between text-xs font-mono mb-1 text-slate-500"><span>CPU LOAD</span><span>0.3%</span></div>
                             <div className="w-full h-1 bg-white/10 rounded-full"><div className="w-[1%] h-full bg-green-500"></div></div>
                          </div>
                       </div>
                   </FadeIn>
               </div>

               {/* Card 3: Multi-Monitor */}
               <div className="md:col-span-1 h-[250px] md:h-auto">
                   <FadeIn delay={200} className="h-full">
                       <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between group overflow-hidden hover:bg-white/[0.03] h-full">
                           <div>
                             <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                                <MonitorIcon className="w-5 h-5 text-purple-300" />
                             </div>
                             <h3 className="text-lg font-bold mb-1">Multi-Monitor</h3>
                             <p className="text-xs text-slate-400">Select any display as your light source, or sync all of them.</p>
                           </div>
                       </div>
                   </FadeIn>
               </div>

               {/* Card 4: Layers/Overlay */}
               <div className="md:col-span-2 h-[150px] md:h-auto">
                   <FadeIn delay={300} className="h-full">
                       <div className="glass-panel rounded-3xl p-6 flex items-center gap-6 hover:bg-white/[0.03] transition-colors h-full">
                          <div className="w-16 h-16 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                             <LayersIcon className="w-8 h-8 text-blue-300" />
                          </div>
                          <div>
                             <h3 className="text-xl font-bold mb-1">Always On Top</h3>
                             <p className="text-sm text-slate-400">The overlay persists over full-screen apps like Zoom, OBS, or games without interfering with clicks.</p>
                          </div>
                       </div>
                   </FadeIn>
               </div>
            </div>
         </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 border-y border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
                <h2 className="text-3xl font-display font-bold text-center mb-16">Community Favorites</h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
               {[
                  { name: "Sarah J.", role: "Product Designer", text: "I threw away my Elgato Key Light. This does the same thing for free and doesn't heat up my room." },
                  { name: "Mike R.", role: "Twitch Streamer", text: "The 'Creator Mode' preset is perfect for my dark room setup. It adds just enough fill light." },
                  { name: "Jessica T.", role: "Sales Executive", text: "I take calls from hotel rooms constantly. GlowDesk makes me look professional anywhere." }
               ].map((t, i) => (
                  <FadeIn key={i} delay={i * 100}>
                      <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:-translate-y-1 transition-transform h-full">
                         <div className="flex text-yellow-500 mb-4"><StarIcon fill className="w-4 h-4"/><StarIcon fill className="w-4 h-4"/><StarIcon fill className="w-4 h-4"/><StarIcon fill className="w-4 h-4"/><StarIcon fill className="w-4 h-4"/></div>
                         <p className="text-slate-300 mb-6 leading-relaxed">"{t.text}"</p>
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 border border-white/10"></div>
                            <div>
                               <div className="font-bold text-sm text-white">{t.name}</div>
                               <div className="text-xs text-slate-500">{t.role}</div>
                            </div>
                         </div>
                      </div>
                  </FadeIn>
               ))}
            </div>
         </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-blue-900/10"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
         
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <FadeIn>
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Ready to glow?</h2>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Join thousands of professionals who have upgraded their video presence.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <button className="px-10 py-5 bg-white text-black rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                      Get GlowDesk for Windows
                   </button>
                   <Link to="/app" className="px-10 py-5 bg-black/50 text-white border border-white/20 rounded-full text-lg font-bold hover:bg-white/10 transition-colors backdrop-blur-md">
                      Launch Web Demo
                   </Link>
                </div>
                <p className="mt-6 text-sm text-slate-500">v2.1.0 • Windows 10/11 • macOS Coming Soon</p>
            </FadeIn>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12">
         <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
            <Link to="/" className="inline-flex justify-center items-center gap-4 mb-8 group">
               <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Logo className="w-full h-full" />
               </div>
               <div className="flex flex-col items-start">
                  <span className="font-display font-bold text-xl tracking-tight text-white leading-none group-hover:text-blue-200 transition-colors">
                    GlowDesk
                  </span>
                  <span className="text-[10px] text-blue-400 font-medium tracking-widest uppercase">
                    Studio
                  </span>
               </div>
            </Link>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
                <a href="mailto:support@glowdesk.com" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p>© 2024 GlowDesk Inc. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
};