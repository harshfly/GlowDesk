import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { ChevronDownIcon } from '../components/Icons';

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does GlowDesk work?",
      a: "GlowDesk creates a virtual frame of light around your monitor's edges. By using white or warm pixels at high brightness, it illuminates your face evenly, acting like a physical ring light but without the bulky hardware."
    },
    {
      q: "Does it drain my battery?",
      a: "Screen brightness does consume power, but GlowDesk is optimized to be lightweight on CPU/GPU. If you are on a laptop on battery power, you might notice a slight decrease in battery life compared to a dim screen, similar to watching a video."
    },
    {
      q: "Does it work with Zoom/Teams/Discord?",
      a: "Yes! The desktop app stays 'Always on Top', so it sits above your video conferencing apps. The camera sees you better because you are physically lit better."
    },
    {
      q: "Is there a Mac version?",
      a: "We are currently beta testing the macOS version. It will be available later this year. The Web Demo works on Mac browsers today."
    },
    {
      q: "Can I use it on multiple monitors?",
      a: "The Pro version supports multi-monitor setups. You can choose which display acts as the light source, or light up all of them for maximum brightness."
    },
    {
      q: "What is the refund policy?",
      a: "We offer a 14-day money-back guarantee if you are not satisfied with the Professional version."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-slate-200 font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
         <h1 className="text-4xl font-display font-bold mb-12 text-center">Frequently Asked Questions</h1>
         
         <div className="space-y-4">
            {faqs.map((item, i) => (
               <div key={i} className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/20">
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                     <span className="font-medium text-lg text-slate-200">{item.q}</span>
                     <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                     <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                        {item.a}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </main>
    </div>
  );
};