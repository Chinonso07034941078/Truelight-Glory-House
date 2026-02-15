import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HomeHero() {
  const [showLinks, setShowLinks] = useState(false);
  const [isPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const videoRef = useRef(null);

  const messages = [
    { line1: "We Disciple the Nations", line2: "Discipline the Devil" },
    { line1: "In Our Camp", line2: "There Shall Be No Loss" },
    { line1: "Serving God Pays", line2: "And It Will Pay Me" }
  ];

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(err => console.log('Video play error:', err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      
      {/* Video Background with Parallax */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <source 
          src='https://res.cloudinary.com/dnvgl9k4i/video/upload/v1767163856/truelight-video1_nqkqjd.mp4' 
          type="video/mp4" 
        />
      </video>

      {/* Lighter overlay for video visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Bold Geometric Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-600"></div>
      <div className="absolute top-0 left-0 w-20 h-1 bg-blue-600"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 lg:space-y-12"
          >
            
            {/* Bold Blue Line Accent */}
            <div className="flex items-center gap-4">
              <div className="w-16 sm:w-20 h-1 bg-blue-600"></div>
              <span className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-widest">
                Welcome Home
              </span>
            </div>

            {/* Church Name */}
            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter">
                TRUELIGHT
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tighter mt-2">
                <span className="text-blue-600">
                  Glory House
                </span>
              </h2>
            </div>

            {/* Rotating Message */}
            <div className="max-w-xl min-h-[140px] sm:min-h-[160px]">
              <motion.div
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="border-l-4 border-blue-600 pl-6 py-4"
              >
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light leading-tight mb-1">
                  {messages[currentMessageIndex].line1}
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl text-white font-bold leading-tight">
                  {messages[currentMessageIndex].line2}
                </p>
              </motion.div>
            </div>

            {/* CTA Section */}
            <div className="pt-4 sm:pt-8">
              <button 
                onClick={() => setShowLinks(!showLinks)} 
                className="group relative bg-blue-600 text-white font-bold px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <span className="relative z-10">Watch Live</span>
                <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
              </button>

              {showLinks && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex gap-4"
                >
                  {/* Facebook */}
                  <a 
                    href="https://www.facebook.com/share/14FCmAPmKPZ/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border-2 border-white hover:border-blue-600 hover:bg-blue-600 flex items-center justify-center text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.246h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  
                  {/* YouTube */}
                  <a 
                    href="https://youtube.com/@truelightgloryhouse?si=EnPJSZlzoefOGNQs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border-2 border-white hover:border-blue-600 hover:bg-blue-600 flex items-center justify-center text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/truelightgloryhouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border-2 border-white hover:border-blue-600 hover:bg-blue-600 flex items-center justify-center text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </motion.div>
              )}
            </div>

          </motion.div>

          {/* RIGHT — Service Times Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            
            {/* Service Times Container */}
            <div className="relative">
              
              {/* Blue Border Frame */}
              <div className="absolute -top-6 hidden md:grid -right-6 w-full h-full border-8 border-blue-600 z-0"></div>
              
              {/* White Card */}
              <div className="relative hidden md:grid z-10 bg-white p-8 sm:p-12">
                
                <div className="space-y-6">
                  {/* Heading */}
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-1 bg-blue-600"></div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                        Join Us
                      </span>
                    </div>
                    <h3 className="text-4xl sm:text-5xl font-black text-gray-900 leading-none tracking-tighter">
                      Sunday
                    </h3>
                    <h3 className="text-4xl sm:text-5xl font-black text-blue-600 leading-none tracking-tighter">
                      Services
                    </h3>
                  </div>

                  {/* Times */}
                  <div className="space-y-4 border-l-4 border-blue-600 pl-6">
                    <div>
                      <div className="text-3xl font-black text-gray-900">8:00 AM</div>
                      <div className="text-sm text-gray-600 uppercase tracking-wider">First Service</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-gray-900">10:00 AM</div>
                      <div className="text-sm text-gray-600 uppercase tracking-wider">Second Service</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="pt-6 border-t-2 border-gray-200">
                    <p className="text-lg text-gray-700 font-medium italic">
                      "Serving God Pays and It Will Pay Me"
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Bottom Blue Stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-600"></div>

    </section>
  );
}