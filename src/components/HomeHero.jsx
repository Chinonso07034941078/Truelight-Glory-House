import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomeHero() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // Clean, high-performance callback ref for the video
  const videoRef = useRef(null);
  const setVideoRef = useCallback((node) => {
    if (node) {
      videoRef.current = node;
      node.muted = true;
      
      // Ensure play is only attempted when the browser is ready
      const playPromise = node.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback handled silently
        });
      }
    }
  }, []);

  const messages = useMemo(() => [
    { line1: "We Disciple the Nations", line2: "Discipline the Devil" },
    { line1: "In Our Camp", line2: "There Shall Be No Loss" },
    { line1: "Serving God Pays", line2: "And It Will Pay Me" }
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      
      {/* Smooth Video Container */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <video
          ref={setVideoRef}
          // Removed translate-gpu / will-change unless animating. Standard object-cover is highly optimized natively.
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          src="https://res.cloudinary.com/dnvgl9k4i/video/upload/v1782275714/57855671-a311-4b7e-9626-45059c615fee_sscrlx.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* PHYSICAL GRADIENT OVERLAYS (Replaces CSS Mask Image for dramatically better frame rates) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Ambient vignetting to isolate the text */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/50 z-1 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Branding */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Smooth ease-out
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-[1px] bg-blue-600"></div>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em]">Welcome Home</span>
              </div>
              
              <div className="space-y-1">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter">
                  TRUELIGHT
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-blue-600">
                  Glory House
                </h2>
              </div>
            </div>

            {/* Message Rotation with Premium Easing */}
            <div className="min-h-[80px] flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  // [0.16, 1, 0.3, 1] is an ultra-premium "ease-out" curve that starts quickly and slows down smoothly
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
                  className="border-l-2 border-blue-600 pl-6"
                >
                  <p className="text-lg sm:text-xl text-white/50 font-light mb-1">
                    {messages[currentMessageIndex].line1}
                  </p>
                  <p className="text-xl sm:text-2xl text-white font-bold tracking-tight">
                    {messages[currentMessageIndex].line2}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <button
                onClick={() => {
                  window.location.href = '/wcc#registration';
                }}
                className="px-8 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-widest transition-transform active:scale-95 duration-200 hover:bg-gray-900"
              >
                Register for WCC
              </button>
            </div>
          </motion.div>

          {/* Right Column: Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative w-full lg:max-w-[380px]"
          >
            <div className="absolute -inset-4 bg-blue-600/10 blur-2xl rounded-full"></div>
            
            <div className="relative overflow-hidden bg-white/[0.04] backdrop-blur-md border border-white/10 p-10 shadow-2xl">
              <div className="relative z-10 space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-[1px] bg-blue-500"></div>
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em]">Sunday Service</span>
                  </div>
                  <h3 className="text-4xl font-black text-white leading-none tracking-tighter">
                    Join Our <br />
                    <span className="text-blue-500">Community</span>
                  </h3>
                </div>

                <div className="space-y-6">
                  {[
                    { time: '08:00', label: 'First Service' },
                    { time: '10:00', label: 'Second Service' }
                  ].map((service, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">{service.time}</span>
                        <span className="text-[10px] font-black text-blue-500/80 uppercase">AM</span>
                      </div>
                      <span className="text-[10px] text-white/30 uppercase tracking-[0.1em] font-bold">{service.label}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5">
                  <p className="text-[11px] text-white/40 font-medium italic leading-relaxed">
                    "Serving God Pays and It Will Pay Me"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Static Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
        <motion.div 
          className="h-full bg-blue-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

    </section>
  );
}