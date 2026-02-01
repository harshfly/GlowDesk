export enum LightTemperature {
  WARM = 'warm',
  NEUTRAL = 'neutral',
  COOL = 'cool',
}

export enum PresetMode {
  MANUAL = 'Manual',
  INTERVIEW = 'Interview',
  NIGHT_CALL = 'Night Call',
  CREATOR = 'Creator Mode',
}

export enum EffectType {
  NONE = 'None',
  RAINBOW = 'Rainbow',
  PULSE = 'Pulse',
  DISCO = 'Disco',
  FLICKER = 'Flicker',
}

export interface GlowSettings {
  isOn: boolean;
  intensity: number; // 0-100
  temperature: number; // 2000 - 9000 (Kelvin approximation)
  softness: number; // 0-100 (Blur radius)
  width: number; // 0-100 (Border width)
  mode: PresetMode;
  
  // RGB Mode Settings
  isRGB: boolean;
  accentColor: string; // Hex code
  effect: EffectType;
}

export interface NavigationItem {
  label: string;
  path: string;
}

export const TEMP_COLORS: Record<string, string> = {
  warm: '#ffedd5',    // Orange-ish
  neutral: '#ffffff', // White
  cool: '#e0f2fe',    // Blue-ish
};