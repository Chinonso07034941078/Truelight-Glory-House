import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Search } from 'lucide-react'
import Footer from '../components/Footer'

export default function SermonPage() {
  const [search, setSearch] = useState('')
  const [audioMessages, setAudioMessages] = useState([])
  const [visibleCount, setVisibleCount] = useState(8)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    fetch('/telegram-messages/audio_messages.json')
      .then((res) => res.json())
      .then((data) => setAudioMessages(data))
      .catch((err) => console.error('Error loading messages:', err))
  }, [])

  const messages = [
    { line1: "Experience the Word", line2: "That Transforms" },
    { line1: "Grow in Faith", line2: "Share the Message" }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredMessages = audioMessages.filter((msg) =>
    msg.title.toLowerCase().includes(search.toLowerCase())
  )

  const visibleMessages = filteredMessages.slice(0, visibleCount)
  const hasMore = visibleCount < filteredMessages.length

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Global Creative Background Layer - ENHANCED */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Multi-layer gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-gray-50"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50/20 to-transparent"></div>
        
        {/* Large animated shapes - more dramatic */}
        <motion.div 
          className="absolute -top-60 -right-60 w-[800px] h-[800px] border-[4px] border-blue-600/10 rounded-full"
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/8 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-1/4 w-96 h-96 border-[12px] border-blue-600/12"
          animate={{ 
            rotate: [45, 225, 45],
            scale: [1, 0.9, 1],
            y: [0, -60, 0]
          }}
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
          animate={{ 
            opacity: [0.015, 0.03, 0.015]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Multiple dot pattern clusters - varied sizes */}
        <motion.div 
          className="absolute top-32 left-1/4"
          style={{
            backgroundImage: `radial-gradient(circle, rgb(37, 99, 235) 4px, transparent 4px)`,
            backgroundSize: '50px 50px',
            width: '400px',
            height: '400px',
            opacity: 0.06
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="absolute bottom-40 right-32 opacity-[0.08]" style={{
          backgroundImage: `radial-gradient(circle, rgb(37, 99, 235) 2px, transparent 2px)`,
          backgroundSize: '30px 30px',
          width: '250px',
          height: '250px'
        }}></div>
        
        <motion.div 
          className="absolute top-1/2 right-1/4"
          style={{
            backgroundImage: `radial-gradient(circle, rgb(37, 99, 235) 3px, transparent 3px)`,
            backgroundSize: '40px 40px',
            width: '300px',
            height: '300px',
            opacity: 0.05
          }}
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated vertical accent lines - multiple */}
        <motion.div 
          className="absolute top-0 left-1/5 w-px bg-gradient-to-b from-transparent via-blue-600/25 to-transparent"
          animate={{ height: ["50%", "90%", "50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-0 left-2/5 w-px bg-gradient-to-b from-blue-600/15 via-blue-600/8 to-transparent"
          animate={{ height: ["60%", "75%", "60%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-0 right-1/3 w-px bg-gradient-to-b from-transparent via-blue-600/10 to-blue-600/5"
          animate={{ height: ["70%", "85%", "70%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        
        {/* Animated horizontal accent lines */}
        <motion.div 
          className="absolute top-1/4 bg-gradient-to-r from-transparent via-blue-600/15 to-transparent h-px"
          animate={{ 
            left: ["-10%", "0%", "-10%"],
            right: ["0%", "-10%", "0%"],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-2/3 bg-gradient-to-r from-blue-600/12 via-transparent to-blue-600/12 h-px"
          animate={{ 
            left: ["0%", "5%", "0%"],
            right: ["0%", "5%", "0%"]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/8 to-transparent"></div>
        
        {/* Corner accents - enhanced */}
        <div className="absolute top-0 left-0 w-40 h-40 border-l-[6px] border-t-[6px] border-blue-600/25"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-r-[4px] border-t-[4px] border-blue-600/15"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 border-r-[6px] border-b-[6px] border-blue-600/20"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 border-l-[4px] border-b-[4px] border-blue-600/15"></div>
        
        {/* Large atmospheric circle - enhanced */}
        <motion.div 
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/[0.04] via-blue-600/[0.02] to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.04, 0.06, 0.04]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Additional geometric elements */}
        <motion.div 
          className="absolute top-1/3 right-20 w-24 h-24 border-4 border-blue-600/15 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-blue-600/[0.06]"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 0.85, 1]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Hero Section - BOLD EDITORIAL */}
      <section className="relative min-h-screen flex items-center overflow-hidden z-10">
        {/* Simple local accents */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-600"></div>
          <div className="absolute top-0 left-0 w-24 h-1 bg-blue-600"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              {/* Label */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-1 bg-blue-600"></div>
                <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
                  Sermons
                </span>
              </div>

              {/* Main Title */}
              <div>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-gray-900 leading-none tracking-tighter">
                  Transformative
                </h1>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tighter mt-2">
                  <span className="text-blue-600">Truth</span>
                </h1>
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
                  <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-light leading-tight mb-1">
                    {messages[currentMessageIndex].line1}
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl text-gray-900 font-bold leading-tight">
                    {messages[currentMessageIndex].line2}
                  </p>
                </motion.div>
              </div>

              {/* CTA */}
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

            {/* RIGHT - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative">
                {/* Blue Border Frame */}
                <div className="absolute -top-8 -right-8 w-full h-full border-8 border-blue-600 z-0"></div>
                
                {/* Image */}
                <div className="relative z-10 overflow-hidden bg-gray-100">
                  <img
                    src='https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767188371/56c60b29-3f46-40e5-b495-3962e95b1b15.png'
                    alt="Sermon Hero"
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-600"></div>
      </section>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 z-10">
        
        {/* Header Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-1 bg-blue-600"></div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Recent Messages
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-none tracking-tighter mb-4">
            Latest
          </h2>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-blue-600 leading-none tracking-tighter">
            Sermons
          </h2>
        </motion.div>
              
        {/* Search Bar - BOLD DESIGN */}
        <motion.div
          className="relative max-w-2xl mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search sermons..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setVisibleCount(8)
              }}
              className="w-full pl-16 pr-6 py-5 bg-white border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all duration-300 text-gray-900 text-lg font-light"
            />
          </div>
        </motion.div>

        {/* Sermons Grid - BOLD CARDS */}
        <div id="sermons" className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {visibleMessages.map((msg, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-white border-2 border-gray-200 hover:border-blue-600 transition-all duration-300 h-full flex flex-col">
                
                {/* Icon Section - Bold Blue Background */}
                <div className="relative bg-blue-600 h-32 sm:h-48 flex items-center justify-center overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Play className="text-white w-8 h-8 sm:w-12 sm:h-12 fill-white" />
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-gray-900 font-bold text-sm sm:text-lg mb-4 sm:mb-6 leading-tight line-clamp-3 capitalize flex-1">
                    {msg.title.toLowerCase()}
                  </h3>

                  <a
                    href={msg.link.toLowerCase()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative bg-gray-900 hover:bg-blue-600 text-white px-4 sm:px-6 py-3 sm:py-4 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 text-center"
                  >
                    Listen Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="col-span-full text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p className="text-gray-900 text-2xl font-bold mb-2">
                  No Results Found
                </p>
                <p className="text-gray-600 font-light">
                  Try adjusting your search terms
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Load More Button - BOLD */}
        {hasMore && (
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setVisibleCount(visibleCount + 8)}
              className="group relative bg-blue-600 text-white font-bold px-12 py-5 text-base uppercase tracking-wider hover:bg-gray-900 transition-all duration-300"
            >
              <span className="relative z-10">Load More</span>
              <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}