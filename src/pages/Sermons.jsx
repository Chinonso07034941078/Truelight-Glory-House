import { useState, useEffect } from 'react'
import { motion, AnimatePresence}     from 'framer-motion'
import sermonImage from '../assets/wcc1.jpg'
import heroImage from '../assets/truelight-photo3.jpg'

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
      <div className="relative h-[500px] md:h-[600px] flex items-center justify-center text-white text-center px-4 overflow-hidden">
        {/* Background Image with fade-in */}
        <motion.img
          src={heroImage}
          alt="Sermon Hero"
          className="absolute inset-0 w-full h-full object-cover z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Dark overlay with animated text */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Welcome to Our Sermons
          </motion.h1>

           <AnimatePresence mode="wait">
              <motion.span
                key={currentSlogan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-blue-100"
              >
                {slogans[currentSlogan]}
              </motion.span>
            </AnimatePresence>
        </motion.div>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
                className="w-full h-32 object-cover"
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
    </div>
  )
}
