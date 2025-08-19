import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Play, Search } from 'lucide-react'
import heroImage from '../assets/very5.jpg'
import Footer from '../components/Footer'
// Using a placeholder for heroImage since we can't import the actual file

export default function SermonPage() {
  const [search, setSearch] = useState('')
  const [audioMessages, setAudioMessages] = useState([])
  const [visibleCount, setVisibleCount] = useState(8)
  const [currentSlogan, setCurrentSlogan] = useState(0)

  useEffect(() => {
    fetch('/telegram-messages/audio_messages.json')
      .then((res) => res.json())
      .then((data) => setAudioMessages(data))
      .catch((err) => console.error('Error loading messages:', err))
  }, [])

  const slogans = [
    'Experience the Word of God that transforms, heals, and empowers.',
    'Browse our latest sermons, grow in faith, and share the message.',
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan(prev => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredMessages = audioMessages.filter((msg) =>
    msg.title.toLowerCase().includes(search.toLowerCase())
  )

  const visibleMessages = filteredMessages.slice(0, visibleCount)
  const hasMore = visibleCount < filteredMessages.length

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-yellow-900/60 to-blue-900/80 z-10" />

        {/* Background Image */}
        <motion.img
          src={heroImage}
          alt="Sermon Hero"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0, ease: "easeOut" }}
        />
        
        {/* Main content */}
        <div className="relative z-20 text-center text-white px-6 max-w-5xl">
          {/* Subtle badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-5 py-2 mb-8 border border-white/25"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider">Spiritual Growth</span>
          </motion.div>

          {/* Main heading - more refined */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="font-extralight">Transformative</span>{' '}
            <span className="font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Truth
            </span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl font-light text-blue-200 block mt-2">
              New sermon available now
            </span>
          </motion.h1>

          {/* Animated tagline */}
          <motion.div
            className="text-lg md:text-xl font-light mb-12 h-14 flex items-center justify-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlogan}
                className="text-blue-200 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
              >
                {slogans[currentSlogan]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Call-to-action button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <button
              onClick={() => document.getElementById('sermons')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-white/10 backdrop-blur-md text-white font-medium px-8 py-4 rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition-all duration-500 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Explore Sermons
                <motion.div
                  className="w-1 h-1 bg-current rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-light text-blue-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Recent Sermons
          </motion.h2>
          <motion.p
            className="text-blue-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Discover messages that inspire, challenge, and transform your spiritual journey.
          </motion.p>
        </div>
              
        {/* Search Bar */}
        <motion.div
          className="relative max-w-md mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search sermons..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setVisibleCount(8)
            }}
            className="w-full pl-12 pr-4 py-4 bg-white border border-blue-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300 text-blue-900"
          />
        </motion.div>

        {/* Sermons Grid */}
        <div id="sermons" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {visibleMessages.map((msg, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500 border border-blue-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Icon Section */}
              <div className="relative bg-gradient-to-br from-blue-700 to-blue-900 h-40 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play className="text-white w-10 h-10 drop-shadow-lg" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-blue-800 font-medium mb-4 leading-relaxed line-clamp-3 capitalize group-hover:text-blue-900 transition-colors duration-300">
                  {msg.title.toLowerCase()}
                </h3>

                <a
                  href={msg.link.toLowerCase()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-2">🎧</span>
                  Listen on Telegram
                </a>
              </div>
            </motion.div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-blue-500 text-lg">
                No sermons found for <span className="font-medium">"{search}"</span>
              </p>
              <p className="text-blue-400 text-sm mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setVisibleCount(visibleCount + 8)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              Load More Sermons
            </button>
          </motion.div>
        )}
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  )
}