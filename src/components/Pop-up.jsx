import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';

export default function JubileeCountdownPopup({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Effect for countdown timer
  useEffect(() => {
    const jubileeDate = new Date('2026-02-06T18:00:00Z').getTime();

    const calculateTimeLeft = () => {
      const now = Date.now();
      const diff = jubileeDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Effect to control the skeleton loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  



  // Skeleton Loading Component with smooth animations
 // Skeleton Loading Component - Simple, smooth, and elegant
  const SkeletonLoader = () => (
    <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
      
      {/* Single elegant shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.5,
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row">
        
        {/* Image skeleton */}
        <div className="w-full lg:w-1/2 p-4 lg:p-6">
          <div className="w-full h-64 lg:h-80 rounded-xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
        </div>

        {/* Content skeleton */}
        <div className="w-full lg:w-1/2 p-4 lg:p-6 flex items-center">
          <div className="w-full rounded-xl border border-gray-100 bg-white p-4 space-y-4 shadow-sm">
            
            {/* Header */}
            <div className="flex justify-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-200" />
              <div className="w-28 h-4 rounded bg-gray-200" />
            </div>

            {/* Countdown boxes */}
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border-2 border-gray-200 bg-gray-50 p-2 space-y-1"
                >
                  <div className="h-6 rounded bg-gray-200" />
                  <div className="h-3 rounded bg-gray-200" />
                </div>
              ))}
            </div>

            {/* Event details */}
            <div className="space-y-1.5 text-center">
              <div className="h-3 w-32 mx-auto rounded bg-gray-200" />
              <div className="h-3 w-40 mx-auto rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-2xl pointer-events-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Enhanced Close Button */}
              <motion.button
                onClick={handleClose}
                className="absolute -top-4 -right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 group"
                aria-label="Close popup"
                // Add a subtle pulse animation on load
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 2, repeat: 1, repeatDelay: 3 }}
              >
                <X className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
              </motion.button>

              {/* Conditional Rendering: Skeleton or Content */}
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                /* Main content card */
                <div className="relative bg-gradient-to-br from-white via-yellow-50 to-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Simplified light effects - SPARKLING DOTS REMOVED */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Center glow */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 223, 0, 0.4) 30%, transparent 70%)',
                      }}
                      animate={{
                        scale: [0.95, 1.05, 0.95],
                        opacity: [0.6, 0.9, 0.6],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Content with Responsive Layout */}
                  <div className="relative z-10 flex flex-col lg:flex-row">
                    {/* Event Image - Left side on large screens */}
                    <div className="w-full lg:w-1/2 p-4 lg:p-6">
                      <div className="relative group">
                        <div className="absolute -inset-3 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 rounded-2xl blur-xl opacity-70 group-hover:opacity-90 transition-opacity" />
                        
                        <div className="relative">
                          <img
                            src="https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767276971/OAV_2026_-_Jubilee_Night_Flyer_hbtwax.jpg"
                            alt="Jubilee Night 2026"
                            className="relative w-full h-auto rounded-xl shadow-xl"
                          />
                          
                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 rounded-xl"
                            style={{
                              background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                            }}
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Countdown & Details - Right side on large screens */}
                    <div className="w-full lg:w-1/2 p-4 lg:p-6 flex flex-col justify-center">
                      <div className="bg-white rounded-xl p-4 shadow-lg border border-yellow-200">
                        <div className="flex items-center justify-center gap-1.5 mb-3">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <h3 className="text-gray-900 text-sm font-semibold">Event Countdown</h3>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: 'Days', value: timeLeft.days },
                            { label: 'Hours', value: timeLeft.hours },
                            { label: 'Mins', value: timeLeft.minutes },
                            { label: 'Secs', value: timeLeft.seconds },
                          ].map((item) => (
                            <motion.div
                              key={item.label}
                              className="bg-white border-2 border-gray-200 rounded-lg p-2 text-center shadow-sm"
                              animate={{ 
                                scale: item.label === 'Secs' ? [1, 1.05, 1] : 1,
                                borderColor: item.label === 'Secs' ? ['#e5e7eb', '#fbbf24', '#e5e7eb'] : '#e5e7eb'
                              }}
                              transition={{ duration: 1, repeat: item.label === 'Secs' ? Infinity : 0 }}
                            >
                              <div className="text-lg sm:text-xl font-bold text-gray-900">
                                {String(item.value).padStart(2, '0')}
                              </div>
                              <div className="text-[10px] font-medium text-gray-600">
                                {item.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Event details */}
                        <div className="mt-3 text-center space-y-1">
                          <div className="flex items-center justify-center gap-1.5 text-yellow-700">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold">Feb 6, 2026 • 7:00 PM</span>
                          </div>
                          <p className="text-gray-700 text-[11px] font-medium">
                            Don't miss this celebration!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}