import React, { CSSProperties } from 'react';
import { GlowSettings, PresetMode, EffectType } from '../types';
import { PRESETS } from '../constants';
import { WebcamPreview } from './WebcamPreview';
import { SunIcon, MoonIcon, SlidersIcon, MonitorIcon, ZapIcon } from './Icons';

interface ControlPanelProps {
  settings: GlowSettings;
  updateSettings: (newSettings: Partial<GlowSettings>) => void;
}

const getTemperatureColor = (kelvin: number): string => {
  const k = Math.max(2000, Math.min(9000, kelvin)) / 100;
  let r, g, b;

  if (k <= 66) {
    r = 255;
    g = k < 6 ? 0 : 99.4708025861 * Math.log(k) - 161.1195681661;
    b = k <= 19 ? 0 : 138.5177312231 * Math.log(k - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(k - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(k - 60, -0.0755148492);
    b = 255;
  }
  return `${Math.round(Math.max(0, Math.min(255, r)))}, ${Math.round(Math.max(0, Math.min(255, g)))}, ${Math.round(Math.max(0, Math.min(255, b)))}`;
};

const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '255, 255, 255';
};

// Simple RGB to Hex for Slider sync
const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}).join('');

// HSL to Hex for Rainbow Slider
const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const ControlPanel: React.FC<ControlPanelProps> = ({ settings, updateSettings }) => {
  
  const handlePresetChange = (mode: PresetMode) => {
    const presetValues = PRESETS[mode];
    updateSettings({ ...presetValues, mode });
  };

  const handleChange = (key: keyof GlowSettings, value: number | string | boolean) => {
    updateSettings({ [key]: value, mode: PresetMode.MANUAL });
  };

  const getSliderStyle = (val: number, max: number = 100) => {
    return { '--value': `${(val / max) * 100}%` } as CSSProperties;
  };

  // Preset Colors for RGB Mode
  const RGB_PRESETS = [
      '#3b82f6', // Brand Blue
      '#ef4444', // Red
      '#22c55e', // Green
      '#eab308', // Yellow
      '#a855f7', // Purple
      '#ec4899', // Pink
      '#06b6d4', // Cyan
      '#ffffff', // White
  ];

  // Calculate preview shadow styles
  const getPreviewGlowStyle = () => {
    if (!settings.isOn) return { boxShadow: 'none' };

    const rgb = settings.isRGB ? hexToRgb(settings.accentColor) : getTemperatureColor(settings.temperature);
    const alpha = Math.min(1, settings.intensity / 100);
    const scale = 0.25;

    const realThickness = 40 + (settings.width / 100) * 160;
    const realBlur = 2 + (settings.softness / 100) * 20;

    const realOuterRadius = Math.max(56, realThickness + 24);
    const scaledRadius = realOuterRadius * scale;

    const t = realThickness * scale;
    const b = realBlur * scale;

    const baseColor = `rgba(${rgb}, ${alpha})`;
    const highlightColor = `rgba(${rgb}, ${alpha * 0.8})`;
    const glossColor = `rgba(255, 255, 255, 0.25)`;
    const bezelColor = `rgba(0, 0, 0, ${alpha * 0.3})`;
    const bevelColor = `rgba(255, 255, 255, ${alpha * 0.2})`;

    // Add animation styles for preview
    let animationStyle = {};
    if (settings.isRGB && settings.effect !== EffectType.NONE) {
       if (settings.effect === EffectType.RAINBOW) animationStyle = { animation: 'hueRotate 6s linear infinite' };
       if (settings.effect === EffectType.PULSE) animationStyle = { animation: 'pulseRGB 2s ease-in-out infinite' };
       if (settings.effect === EffectType.DISCO) animationStyle = { animation: 'disco 0.5s steps(1) infinite' };
       if (settings.effect === EffectType.FLICKER) animationStyle = { animation: 'flicker 0.2s infinite' };
    }

    return {
      borderRadius: `${scaledRadius}px`,
      inset: '4px',
      boxShadow: `
        inset 0 0 1px 0px ${bezelColor},
        inset 0 0 ${t * 0.1}px ${t * 0.05}px ${glossColor},
        inset 0 0 ${b}px ${t}px ${baseColor},
        inset 0 0 ${t * 0.5}px ${t * 0.6}px ${highlightColor},
        inset 0 0 1px ${t - 1}px ${bevelColor}
      `,
      ...animationStyle
    };
  };

  return (
    <div className="glass-panel rounded-3xl w-full max-w-[520px] overflow-hidden text-white flex flex-col font-sans transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-4 sm:px-6 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-3">
           <div className="relative">
             <div className="w-5 h-5 rounded-full border-2 border-white/80"></div>
             {settings.isOn && <div className="absolute inset-0 rounded-full bg-white blur-[2px] animate-pulse"></div>}
           </div>
           <h2 className="text-lg font-medium tracking-wide text-white/90">GlowDesk</h2>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Close Icon Mock */}
           <button className="p-2 hover:bg-white/10 rounded-full transition-colors opacity-50 hover:opacity-100">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                 <path d="M1 1L13 13M1 13L13 1"/>
              </svg>
           </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 pt-6 space-y-7 bg-gradient-to-b from-transparent to-black/20">
        
        {/* Toggle + Preview Section */}
        <div className="relative">
           {/* Floating Toggle Switch */}
           <div className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
              <button 
                onClick={() => updateSettings({ isOn: !settings.isOn })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none ${settings.isOn ? 'bg-blue-600' : 'bg-slate-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${settings.isOn ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className="text-xs font-bold tracking-wider text-white/80">{settings.isOn ? 'ON' : 'OFF'}</span>
           </div>

           {/* Preview Container */}
           <div className={`relative rounded-2xl overflow-hidden border-4 transition-all duration-500 bg-black ${settings.isOn ? 'border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]' : 'border-white/10'}`}>
              <WebcamPreview active={true} />
              
              {/* Virtual Ring Light on the Preview */}
              <div className="absolute pointer-events-none transition-all duration-300"
                   style={getPreviewGlowStyle()}
              ></div>
           </div>
        </div>

        {/* Mode Tabs */}
        <div className="bg-white/5 p-1 rounded-xl flex">
            <button 
                onClick={() => handleChange('isRGB', false)}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${!settings.isRGB ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
            >
                <SunIcon className="w-4 h-4" /> White
            </button>
            <button 
                onClick={() => handleChange('isRGB', true)}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${settings.isRGB ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
            >
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div> RGB
            </button>
        </div>

        {/* Dynamic Controls based on Tab */}
        <div className="space-y-6 min-h-[180px]">
            
            {!settings.isRGB ? (
                /* WHITE MODE CONTROLS */
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm font-medium text-blue-100/80">
                            <span className="flex items-center gap-2"><SunIcon className="w-4 h-4 text-orange-300" /> Temperature</span>
                            <span className="font-mono opacity-70 text-xs">
                                {settings.temperature < 4000 ? 'Warm' : settings.temperature > 6500 ? 'Cool' : 'Neutral'}
                            </span>
                        </div>
                        <input 
                            type="range" min="2000" max="9000" step="100"
                            value={settings.temperature}
                            onChange={(e) => handleChange('temperature', parseInt(e.target.value))}
                            className="temp-slider w-full touch-pan-x"
                        />
                    </div>
                </div>
            ) : (
                /* RGB MODE CONTROLS */
                <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
                    {/* Color Presets */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm font-medium text-blue-100/80">
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border border-white/50" style={{backgroundColor: settings.accentColor}}></div> Color
                            </span>
                        </div>
                        <div className="relative">
                            {/* Rainbow Slider for custom pick */}
                            <input 
                                type="range" min="0" max="360"
                                className="rainbow-slider w-full h-3 rounded-full mb-4 touch-pan-x"
                                onChange={(e) => handleChange('accentColor', hslToHex(parseInt(e.target.value), 100, 50))}
                            />
                            {/* Preset Grid */}
                            <div className="flex justify-between gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                                {RGB_PRESETS.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => handleChange('accentColor', color)}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform shrink-0 ${settings.accentColor.toLowerCase() === color.toLowerCase() ? 'border-white scale-110 shadow-[0_0_10px_white]' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Effects Grid */}
                    <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2"><ZapIcon className="w-3 h-3"/> Effect</label>
                         <div className="grid grid-cols-3 gap-2">
                             {[EffectType.NONE, EffectType.DISCO, EffectType.FLICKER, EffectType.RAINBOW, EffectType.PULSE].map((effect) => (
                                 <button
                                    key={effect}
                                    onClick={() => handleChange('effect', effect)}
                                    className={`px-2 py-2 rounded-lg text-[10px] sm:text-xs font-bold uppercase transition-all border ${settings.effect === effect ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                                 >
                                    {effect}
                                 </button>
                             ))}
                         </div>
                    </div>
                </div>
            )}

            {/* SHARED CONTROLS (Brightness, Softness, Width) */}
            <div className="space-y-6 pt-2 border-t border-white/5">
                
                {/* Brightness */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-medium text-blue-100/80">
                        <span className="flex items-center gap-2"><SunIcon className="w-4 h-4" /> Brightness</span>
                        <span className="font-mono opacity-70 text-xs">{settings.intensity}%</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" 
                        value={settings.intensity}
                        onChange={(e) => handleChange('intensity', parseInt(e.target.value))}
                        className="blue-slider w-full touch-pan-x"
                        style={getSliderStyle(settings.intensity)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-3">
                       <label className="text-xs font-bold text-slate-400 uppercase">Softness</label>
                       <input 
                         type="range" min="0" max="100" 
                         value={settings.softness}
                         onChange={(e) => handleChange('softness', parseInt(e.target.value))}
                         className="blue-slider w-full touch-pan-x"
                         style={getSliderStyle(settings.softness)}
                       />
                     </div>
                     <div className="space-y-3">
                       <label className="text-xs font-bold text-slate-400 uppercase">Width</label>
                       <input 
                         type="range" min="0" max="100" 
                         value={settings.width}
                         onChange={(e) => handleChange('width', parseInt(e.target.value))}
                         className="blue-slider w-full touch-pan-x"
                         style={getSliderStyle(settings.width)}
                       />
                     </div>
                </div>
            </div>

        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1"><MonitorIcon className="w-3 h-3"/> {settings.mode}</span>
            <span className="font-mono opacity-50">v1.2.0</span>
        </div>

      </div>
    </div>
  );
};