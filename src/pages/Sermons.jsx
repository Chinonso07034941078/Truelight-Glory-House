import { useState, useEffect } from 'react'
import { motion, AnimatePresence}     from 'framer-motion'
import sermonImage from '../assets/truelight-logo.png'
import heroImage from '../assets/truelight-photo3.jpg'
import Footer from '../components/Footer'
import { Sparkles } from 'lucide-react'

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
      }, 3000);
      return () => clearInterval(interval);
    }, []);

  const filteredMessages = audioMessages.filter((msg) =>
    msg.title.toLowerCase().includes(search.toLowerCase())
  )

  const visibleMessages = filteredMessages.slice(0, visibleCount)
  const hasMore = visibleCount < filteredMessages.length

  return (
    <div>
      {/* Hero Section */}
     <div className="relative h-screen flex items-center justify-center overflow-hidden">
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-yellow-500/30 to-blue-900/90 z-10" />

  {/* Background Image with enhanced animation */}
  <motion.img
    src={heroImage}
    alt="Sermon Hero"
    className="absolute inset-0 w-full h-full object-cover"
    initial={{ scale: 1.1, opacity: 0.7 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
  />
  
  {/* Main content */}
  <div className="relative z-20 text-center text-white px-6 max-w-4xl">
    {/* Badge */}
    <motion.div
      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Sparkles className="w-4 h-4" />
      <span className="text-sm font-medium uppercase tracking-wide">Spiritual Growth</span>
    </motion.div>

    {/* Main heading */}
    <motion.h1
      className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      Welcome to Our Sermons
    </motion.h1>

    {/* Animated tagline */}
    <motion.div
      className="text-xl md:text-2xl font-medium mb-8 h-16 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <div className="text-blue-100 italic">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentSlogan}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {slogans[currentSlogan]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>

    {/* Call-to-action buttons */}
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <button
        onClick={() => document.getElementById('sermons')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-white text-blue-900 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
      >
        Explore Sermons
      </button>
    
    </motion.div>
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900">Sermons</h2>
              
        <input
          type="text"
          placeholder="Search by title or preacher"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setVisibleCount(8)
          }}
          className="w-full px-4 py-2 mb-8 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
        />

        <div id="sermons" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {visibleMessages.map((msg, index) => (
            <motion.div
              key={index}
              className="bg-white border rounded-lg shadow-md hover:shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <img
                src={sermonImage}
                alt="Sermon"
                className="w-full bg-gradient-to-br from-blue-600 to-blue-950 p-4 pt-6 pr-11 h-32 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-medium text-blue-900 line-clamp-2 capitalize">
                  {msg.title.toLowerCase()}
                </h3>
                <a
                  href={msg.link.toLowerCase()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-blue-600 underline hover:text-yellow-500"
                >
                  Listen on Telegram
                </a>
              </div>
            </motion.div>
          ))}

          {filteredMessages.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No messages found for "{search}"
            </p>
          )}
        </div>

        {/* See More Button */}
        {hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleCount(visibleCount + 6)}
              className="px-4 py-2 text-sm bg-blue-950 text-white rounded-md hover:bg-blue-800 transition"
            >
              See More
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
