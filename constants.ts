import { GlowSettings, PresetMode, EffectType } from './types';

export const DEFAULT_SETTINGS: GlowSettings = {
  isOn: false,
  intensity: 75,
  temperature: 6500, // Neutral daylight
  softness: 40,
  width: 10, // Start at 10% width for a thinner, cleaner look
  mode: PresetMode.MANUAL,
  
  // RGB Defaults
  isRGB: false,
  accentColor: '#3b82f6', // Brand Blue
  effect: EffectType.NONE,
};

export const PRESETS: Record<PresetMode, Partial<GlowSettings>> = {
  [PresetMode.MANUAL]: {},
  [PresetMode.INTERVIEW]: {
    intensity: 80,
    temperature: 5600,
    softness: 60,
    width: 60,
    isRGB: false,
    effect: EffectType.NONE,
  },
  [PresetMode.NIGHT_CALL]: {
    intensity: 40,
    temperature: 3200, // Warm
    softness: 80,
    width: 40,
    isRGB: false,
    effect: EffectType.NONE,
  },
  [PresetMode.CREATOR]: {
    intensity: 100,
    temperature: 7500, // Cool
    softness: 20, // Sharp
    width: 80,
    isRGB: false,
    effect: EffectType.NONE,
  },
};

export const ARCHITECTURE_DOCS = `
GLOWDESK SYSTEM ARCHITECTURE & SECURITY PROTOCOLS

1. SECURITY & DATA PRIVACY
-------------------------
A. Storage Encryption
   - All local user preferences are encrypted at rest using AES-256.
   - Authentication tokens are stored securely in the OS native Credential Locker (Keychain/Windows Credential Manager).

B. Runtime Security
   - Context Isolation: ENABLED. The renderer process runs in a sandboxed environment with no direct Node.js access.
   - IPC Communication: Strictly typed and validated channels between Main and Renderer processes to prevent injection attacks.
   - Content Security Policy (CSP): Strict-Dynamic enabled to prevent XSS.

2. DESKTOP APP (ELECTRON)
-------------------------
A. Main Process (Node.js)
   - Lifecycle Management: Handles app launch, tray icon, and cleanup.
   - Window Management: Creates two browser windows:
     1. ControlWindow: Standard framed window for UI.
     2. OverlayWindow: Fullscreen, transparent, click-through, always-on-top.

B. Renderer Process (React)
   - Shared codebase for Web and Desktop.
   - Component: <RingOverlay /> relies on CSS 'box-shadow: inset' for high-performance rendering.
   - GPU Acceleration: Forces hardware acceleration via 'translate3d(0,0,0)' to prevent UI lag.

C. Overlay Logic
   - The overlay window has 'pointer-events: none' set at the browser window level.
   - CSS logic:
     box-shadow: inset 0px 0px {softness}px {width}px rgba({r},{g},{b},{opacity});
   - This technique avoids complex SVG masking and ensures 60fps performance on low-end iGPUs.

3. WEB APP (BROWSER)
--------------------
   - Limitations: Cannot force "Always on Top" outside the browser tab.
   - Use Case: Quick demo, Chromebooks, or second monitor usage.
   - Camera: Uses navigator.mediaDevices for the "Auto-Adjust" preview loop.
   - No data is ever sent to external servers for processing; all light calculations are client-side.
`;