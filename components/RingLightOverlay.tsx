import React, { useMemo, useEffect, useState } from 'react';
import { GlowSettings, EffectType } from '../types';

interface RingLightOverlayProps {
  settings: GlowSettings;
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

export const RingLightOverlay: React.FC<RingLightOverlayProps> = ({ settings }) => {
  const { isOn, intensity, temperature, softness, width, isRGB, accentColor, effect } = settings;
  const [isNear, setIsNear] = useState(false);

  // Proximity Detection Effect
  useEffect(() => {
    if (!isOn) {
        setIsNear(false);
        return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate physical thickness to determine active zone
      const thickness = 40 + (width / 100) * 160; 
      const threshold = thickness + 80;

      const { clientX: x, clientY: y } = e;
      const { innerWidth: w, innerHeight: h } = window;

      // Check proximity to any edge (accounting for the inset margin)
      const closeToEdge = x < threshold || x > w - threshold || y < threshold || y > h - threshold;
      
      setIsNear(closeToEdge);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOn, width]);

  const styles = useMemo(() => {
    if (!isOn) return { opacity: 0, boxShadow: 'none' };

    // Dynamic Intensity: Boost when hovered/near
    const activeIntensity = isNear 
        ? Math.min(100, intensity * 1.05 + 5) 
        : intensity;

    const rgb = isRGB ? hexToRgb(accentColor) : getTemperatureColor(temperature);
    const alpha = Math.min(1, activeIntensity / 100);

    // Geometry Configuration for "Studio Light"
    // Thickness: 40px to 200px
    const thickness = 40 + (width / 100) * 160;
    
    // Dynamic Border Radius:
    const outerRadius = Math.max(56, thickness + 24);
    
    // Softness: Controls the blur of the inner edge
    const blurRadius = 2 + (softness / 100) * 20; 

    // Colors
    const baseColor = `rgba(${rgb}, ${alpha})`;
    const highlightAlpha = alpha * 0.8;
    const highlightColor = `rgba(${rgb}, ${highlightAlpha})`;
    const glossAlpha = isNear ? 0.4 : 0.25;
    const glossColor = `rgba(255, 255, 255, ${glossAlpha})`;
    const bezelColor = `rgba(0,0,0, ${alpha * 0.3})`;
    const bevelColor = `rgba(255, 255, 255, ${alpha * 0.2})`;

    return {
      left: '16px',
      right: '16px',
      top: '16px',
      bottom: '16px',
      borderRadius: `${outerRadius}px`,
      boxShadow: `
        inset 0 0 1px 1px ${bezelColor},
        inset 0 0 ${thickness * 0.1}px ${thickness * 0.05}px ${glossColor},
        inset 0 0 ${blurRadius}px ${thickness}px ${baseColor},
        inset 0 0 ${thickness * 0.5}px ${thickness * 0.6}px ${highlightColor},
        inset 0 0 2px ${thickness - 2}px ${bevelColor}
      `,
      opacity: 1,
      transition: 'box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-in-out, border-radius 0.4s ease-out',
    };
  }, [isOn, intensity, temperature, softness, width, isNear, isRGB, accentColor]);

  // Determine Animation Class
  const getAnimationClass = () => {
    if (!isOn || !isRGB) return '';
    switch (effect) {
      case EffectType.RAINBOW: return 'animate-rgb-rainbow';
      case EffectType.PULSE: return 'animate-rgb-pulse';
      case EffectType.DISCO: return 'animate-rgb-disco';
      case EffectType.FLICKER: return 'animate-rgb-flicker';
      default: return '';
    }
  };

  return (
    <div 
      className={`fixed z-[9999] pointer-events-none overflow-hidden ${getAnimationClass()}`}
      style={{
        ...styles,
        transform: 'translate3d(0,0,0)', 
        willChange: 'box-shadow, border-radius, filter',
      }}
    >
    </div>
  );
};