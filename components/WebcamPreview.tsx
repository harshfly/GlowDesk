import React, { useEffect, useRef, useState } from 'react';
import { VideoIcon } from './Icons';

interface WebcamPreviewProps {
  active: boolean;
}

export const WebcamPreview: React.FC<WebcamPreviewProps> = ({ active }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;

    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setError(null);
      } catch (err) {
        setError("Camera access denied or unavailable.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [active]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-inner">
      {active && !error ? (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover transform scale-x-[-1]" 
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
           <VideoIcon className="w-12 h-12 mb-2 opacity-50" />
           <p className="text-sm">{error || "Preview Disabled"}</p>
        </div>
      )}
      
      {/* Decorative overlay frame inside preview to simulate app look */}
      <div className="absolute inset-4 border border-white/20 rounded-lg pointer-events-none opacity-50"></div>
    </div>
  );
};