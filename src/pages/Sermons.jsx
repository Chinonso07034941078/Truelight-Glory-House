import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Search } from 'lucide-react'
import Footer from '../components/Footer'

export default function SermonPage() {
  const [search, setSearch] = useState('')
  const [audioMessages, setAudioMessages] = useState([])
  const [visibleCount, setVisibleCount] = useState(8)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [loadingError, setLoadingError] = useState(null)

  // Messages for rotating hero section
  const heroMessages = [
    { line1: "Experience the Word", line2: "That Transforms" },
    { line1: "Grow in Faith", line2: "Share the Message" }
  ];

  // Fetch messages with auto-refresh
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Try multiple possible paths
        const possiblePaths = [
          '/telegram-messages/audio_messages.json',
          '/audio_messages.json',
          './audio_messages.json',
          '../audio_messages.json'
        ];

        let data = null;
        let successPath = null;

        for (const path of possiblePaths) {
          try {
            const res = await fetch(`${path}?t=${Date.now()}`);
            if (res.ok) {
              data = await res.json();
              successPath = path;
              break;
            }
          } catch (err) {
            // Try next path
            continue;
          }
        }

        if (data) {
          setAudioMessages(data);
          setLoadingError(null);
          console.log(`✅ Messages loaded from ${successPath}:`, data.length);
        } else {
          throw new Error('Could not find audio_messages.json in any expected location');
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
        setLoadingError(err.message);
      }
    };

    fetchMessages(); // Initial load

    const interval = setInterval(() => {
      fetchMessages();
      console.log('🔄 Auto-refreshing messages...');
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Hero rotating messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % heroMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [heroMessages.length])

  // Filter messages based on search
  const filteredMessages = audioMessages.filter((msg) =>
    msg.title.toLowerCase().includes(search.toLowerCase())
  )
  const visibleMessages = filteredMessages.slice(0, visibleCount)
  const hasMore = visibleCount < filteredMessages.length

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Global Background & Animated Shapes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-gray-50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50/20 to-transparent"></div>

        {/* Animated shapes */}
        <motion.div
          className="absolute -top-60 -right-60 w-[800px] h-[800px] border-[4px] border-blue-600/10 rounded-full"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/8 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 border-[12px] border-blue-600/12"
          animate={{ rotate: [45, 225, 45], scale: [1, 0.9, 1], y: [0, -60, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cross-hatch overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(37, 99, 235, 0.4) 100px, rgba(37, 99, 235, 0.4) 101px),
            repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(37, 99, 235, 0.4) 100px, rgba(37, 99, 235, 0.4) 101px)
          `
        }}></div>

        {/* Animated grid overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.08) 2px, transparent 2px), linear-gradient(90deg, rgba(37, 99, 235, 0.08) 2px, transparent 2px)`,
            backgroundSize: '120px 120px'
          }}
          animate={{ opacity: [0.015, 0.03, 0.015] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Vertical & Horizontal accents */}
        <motion.div
          className="absolute top-1/4 bg-gradient-to-r from-transparent via-blue-600/15 to-transparent h-px"
          animate={{ left: ["-10%", "0%", "-10%"], right: ["0%", "-10%", "0%"], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-2/3 bg-gradient-to-r from-blue-600/12 via-transparent to-blue-600/12 h-px"
          animate={{ left: ["0%", "5%", "0%"], right: ["0%", "5%", "0%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/8 to-transparent"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden z-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-black">
          <img
            src="https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto,w_1600/v1767188371/56c60b29-3f46-40e5-b495-3962e95b1b15.png"
            alt="Background"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            className="w-full h-full object-cover transition-opacity duration-700 opacity-0"
            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 lg:via-black/30 to-transparent"></div>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-1 bg-blue-600"></div>
                <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
                  Sermons
                </span>
              </div>
              <div>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-none tracking-tighter">
                  Transformative
                </h1>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tighter mt-2">
                  <span className="text-blue-600">Truth</span>
                </h1>
              </div>
              <div className="max-w-xl min-h-[140px] sm:min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMessageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="border-l-4 border-blue-600 pl-6 py-4"
                  >
                    <p className="text-xl sm:text-2xl lg:text-3xl text-white font-light leading-tight mb-1">
                      {heroMessages[currentMessageIndex].line1}
                    </p>
                    <p className="text-xl sm:text-2xl lg:text-3xl text-white font-bold leading-tight">
                      {heroMessages[currentMessageIndex].line2}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => document.getElementById('sermons')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative bg-blue-600 text-white font-bold px-12 py-5 text-base uppercase tracking-wider hover:bg-gray-900 transition-all duration-300"
                >
                  <span className="relative z-10">Explore Sermons</span>
                  <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
                </button>
              </div>
            </motion.div>
            <div className="hidden lg:block"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-600 z-20"></div>
      </section>

      {/* Main Sermons Grid */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 z-10">
        {/* Header */}
        <motion.div className="mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-1 bg-blue-600"></div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Recent Messages</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-none tracking-tighter mb-4">Latest</h2>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-blue-600 leading-none tracking-tighter">Sermons</h2>
        </motion.div>

        {/* Error Display */}
        {loadingError && (
          <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-red-800 font-semibold">⚠️ Error loading sermons:</p>
            <p className="text-red-600 text-sm mt-2">{loadingError}</p>
            <p className="text-red-600 text-sm mt-2">Make sure audio_messages.json is in the public/telegram-messages/ folder</p>
          </div>
        )}

        {/* Search */}
        <motion.div className="relative max-w-2xl mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search sermons..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(8) }}
              className="w-full pl-16 pr-6 py-5 bg-white border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all duration-300 text-gray-900 text-lg font-light"
            />
          </div>
        </motion.div>

        {/* Sermons Grid */}
        <div id="sermons" className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {visibleMessages.map((msg, index) => (
            <motion.div key={`${msg.link}-${index}`} className="group relative" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} viewport={{ once: true }}>
              <div className="relative bg-white border-2 border-gray-200 hover:border-blue-600 transition-all duration-300 h-full flex flex-col">
                <div className="relative bg-blue-600 h-32 sm:h-48 flex items-center justify-center overflow-hidden">
                  <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }} className="relative z-10">
                    <Play className="text-white w-8 h-8 sm:w-12 sm:h-12 fill-white" />
                  </motion.div>
                </div>
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-gray-900 font-bold text-sm sm:text-lg mb-4 sm:mb-6 leading-tight line-clamp-3 capitalize flex-1">{msg.title.toLowerCase()}</h3>
                  <a href={msg.link} target="_blank" rel="noopener noreferrer" className="group/btn relative bg-gray-900 hover:bg-blue-600 text-white px-4 sm:px-6 py-3 sm:py-4 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 text-center">Listen Now</a>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredMessages.length === 0 && !loadingError && (
            <div className="col-span-full text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p className="text-gray-900 text-2xl font-bold mb-2">No Results Found</p>
                <p className="text-gray-600 font-light">Try adjusting your search terms</p>
              </div>
            </div>
          )}
        </div>

        {/* Load More */}
        {hasMore && (
          <motion.div className="text-center mt-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <button onClick={() => setVisibleCount(visibleCount + 8)} className="group relative bg-blue-600 text-white font-bold px-12 py-5 text-base uppercase tracking-wider hover:bg-gray-900 transition-all duration-300">
              <span className="relative z-10">Load More</span>
              <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}