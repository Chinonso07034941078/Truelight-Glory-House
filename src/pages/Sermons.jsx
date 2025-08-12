import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Search, Play, Calendar, User, ChevronRight } from 'lucide-react'
import Footer from '../components/Footer'

export default function SermonPage() {
  const [search, setSearch] = useState('')
  const [audioMessages, setAudioMessages] = useState([])
  const [visibleCount, setVisibleCount] = useState(8)
  const [currentSlogan, setCurrentSlogan] = useState(0)

  // Mock data for demonstration
  useEffect(() => {
    const mockData = [
      { title: "Faith in Times of Uncertainty", link: "https://t.me/example1", date: "2024-01-15", preacher: "Pastor John" },
      { title: "The Power of Prayer", link: "https://t.me/example2", date: "2024-01-08", preacher: "Pastor Mary" },
      { title: "Walking in God's Purpose", link: "https://t.me/example3", date: "2024-01-01", preacher: "Pastor David" },
      { title: "Love Without Limits", link: "https://t.me/example4", date: "2023-12-25", preacher: "Pastor Sarah" },
      { title: "Strength Through Scripture", link: "https://t.me/example5", date: "2023-12-18", preacher: "Pastor John" },
      { title: "Hope in Dark Times", link: "https://t.me/example6", date: "2023-12-11", preacher: "Pastor Mary" },
      { title: "Grace and Forgiveness", link: "https://t.me/example7", date: "2023-12-04", preacher: "Pastor David" },
      { title: "Living with Purpose", link: "https://t.me/example8", date: "2023-11-27", preacher: "Pastor Sarah" },
      { title: "The Joy of Worship", link: "https://t.me/example9", date: "2023-11-20", preacher: "Pastor John" },
      { title: "Building Strong Communities", link: "https://t.me/example10", date: "2023-11-13", preacher: "Pastor Mary" },
    ]
    setAudioMessages(mockData)
  }, [])

  const slogans = [
    'Experience the Word of God that transforms, heals, and empowers.',
    'Browse our latest sermons, grow in faith, and share the message.',
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan(prev => (prev + 1) % slogans.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const filteredMessages = audioMessages.filter((msg) =>
    msg.title.toLowerCase().includes(search.toLowerCase()) ||
    msg.preacher.toLowerCase().includes(search.toLowerCase())
  )

  const visibleMessages = filteredMessages.slice(0, visibleCount)
  const hasMore = visibleCount < filteredMessages.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-yellow-500/30 to-blue-900/90 z-10" />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Background Image with enhanced animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900"
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
            Gather Around the Message
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
              className="bg-white text-blue-900 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Explore Sermons
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative -mt-20 z-30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              Latest Messages
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Transformative Sermons
            </h2>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover powerful messages that inspire, challenge, and guide you on your spiritual journey. 
              Each sermon is crafted to bring you closer to God's truth and purpose for your life.
            </p>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div
            className="max-w-md mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or preacher..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setVisibleCount(8)
                }}
                className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-slate-700 placeholder-slate-400"
              />
            </div>
          </motion.div>

          {/* Sermons Grid */}
          <div id="sermons" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {visibleMessages.map((msg, index) => (
              <motion.div
                key={index}
                className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Sermon Image/Header */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  
                  {/* Floating date badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {new Date(msg.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500 font-medium">{msg.preacher}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {msg.title}
                  </h3>
                  
                  <a
                    href={msg.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-sm group/btn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                    Listen on Telegram
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results State */}
          {filteredMessages.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No sermons found</h3>
              <p className="text-slate-500">Try adjusting your search terms to find what you're looking for.</p>
            </motion.div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setVisibleCount(visibleCount + 6)}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-blue-700 rounded-2xl border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Load More Sermons
              </button>
            </motion.div>
          )}
        </div>
      </div>

     <Footer />
    </div>
  )
}