import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';

export default function JubileeCountdownPopup({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

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
              className="relative w-full max-w-sm sm:max-w-md pointer-events-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute -top-3 -right-3 z-10 w-9 h-9 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-100 transition-colors group"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
              </button>

              {/* Main content card */}
              <div className="relative bg-gradient-to-br from-white via-yellow-50 to-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Simplified light effects */}
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

                  {/* Sparkles */}
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={`sparkle-${i}`}
                      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        boxShadow: '0 0 8px rgba(255, 223, 0, 0.8)',
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 p-4">
                  {/* Event image */}
                  <div className="relative mb-3 group">
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

                  {/* Countdown */}
                  <div className="bg-white rounded-xl p-3 shadow-lg border border-yellow-200">
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <h3 className="text-gray-900 text-sm font-semibold">Event Countdown</h3>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hours', value: timeLeft.hours },
                        { label: 'Mins', value: timeLeft.minutes },
                        { label: 'Secs', value: timeLeft.seconds },
                      ].map((item) => (
                        <motion.div
                          key={item.label}
                          className="bg-white border-2 border-gray-200 rounded-lg p-1.5 text-center shadow-sm"
                          animate={{ 
                            scale: item.label === 'Secs' ? [1, 1.05, 1] : 1,
                            borderColor: item.label === 'Secs' ? ['#e5e7eb', '#fbbf24', '#e5e7eb'] : '#e5e7eb'
                          }}
                          transition={{ duration: 1, repeat: item.label === 'Secs' ? Infinity : 0 }}
                        >
                          <div className="text-lg sm:text-xl font-bold text-gray-900">
                            {String(item.value).padStart(2, '0')}
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-medium text-gray-600">
                            {item.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Event details */}
                    <div className="mt-2.5 text-center space-y-1">
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
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}