import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSectionFast() {
  const [currentSlogan, setCurrentSlogan] = useState(0);

  const slogans = [
    "Where faith meets community",
    "Experience God's presence",
    "Grow together in Christ"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slogans.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Background with progressive loading */}
      <div className="absolute inset-0 z-0">
        
        {/* Solid color fallback (shows immediately) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        
        {/* Tiny blurred placeholder (loads in ~100ms) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto,w_50,e_blur:800/v1771205271/a6771218-13dd-458e-8e2f-9b79ae194583.png')`,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            backgroundPosition: '-25% center'
          }}
        />
        
        {/* Full quality image (WebP for faster loading) */}
        <picture className="absolute inset-0">
          {/* WebP for modern browsers (smaller file size) */}
          <source 
            srcSet="https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto:best,w_1400/v1771205271/a6771218-13dd-458e-8e2f-9b79ae194583.webp" 
            type="image/webp"
          />
          {/* Fallback to original format */}
          <img 
            src="https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto,w_1400/v1771205271/a6771218-13dd-458e-8e2f-9b79ae194583.png"
            alt="Events Background"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[-5%_center] animate-fadeIn"
            style={{ animationDuration: '0.5s' }}
          />
        </picture>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/45 to-black/20 lg:to-transparent z-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="space-y-8 lg:space-y-12 max-w-4xl"
        >
          
          {/* Bold Blue Line Accent */}
          <div className="flex items-center gap-4">
            <div className="w-16 sm:w-20 h-1 bg-blue-600"></div>
            <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
              Events
            </span>
          </div>

          {/* Massive Heading */}
          <div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
              Divine
            </h1>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black leading-none tracking-tighter mt-2">
              <span className="text-blue-600 drop-shadow-2xl">
                Encounters
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <div className="max-w-xl">
            <p className="text-xl sm:text-2xl lg:text-3xl text-white font-light leading-relaxed drop-shadow-lg">
              Join us for transformative gatherings that strengthen your faith.
            </p>
          </div>

          {/* Rotating Slogan */}
          <div className="h-12 flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlogan}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-white font-light italic drop-shadow-md"
              >
                {slogans[currentSlogan]}
              </motion.p>
            </AnimatePresence>
          </div>

        </motion.div>
      </div>

      {/* Bottom Blue Stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-600 z-20"></div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation-name: fadeIn;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}