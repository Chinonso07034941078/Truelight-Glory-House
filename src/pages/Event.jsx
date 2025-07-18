import { useEffect, useState } from 'react';
import { Calendar, MapPin, Check, X , ArrowRight, Clock, Users, Heart, Star, Filter, Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

// Mock images - replace with your actual imports
const EventHero = "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000";
const ConventionImage = "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000";
const VisitationImage = "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000";
const DinnerImage = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000";
const PrayerImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000";
const CrossoverImage = "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=1000";

export default function Events() {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPastEvents, setShowPastEvents] = useState(false);


  
  const [email, setEmail] = useState('');
  const [subscribedEmails, setSubscribedEmails] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    if (subscribedEmails.includes(email)) {
      alert('This email is already subscribed!');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribedEmails([...subscribedEmails, email]);
      setEmail('');
      setShowSuccess(true);
      setIsLoading(false);
    }, 1000);
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
  };

 
  const slogans = [
    'Where Faith Meets Action',
    'Transforming Lives Together',
    'Your Spiritual Journey Awaits',
    'Building Tomorrow\'s Leaders'
  ];

  // Auto-cycle through slogans
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan(prev => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

const majorEvents = [
  {
    id: 1,
    title: 'World Changers Convention (WCC)',
    date: 'August 15-17, 2025',
    time: '6:00 PM - 9:00 PM',
    location: 'Main Auditorium',
    description: 'Three days of life-transforming sessions, worship, and networking with global leaders.',
    category: 'Convention',
    attendees: 2500,
    featured: true,
    image: ConventionImage,
    highlights: ['International Speakers', 'Leadership Training', 'Networking Sessions']
  },
  {
    id: 2,
    title: 'Owerri Apostolic Visitation (OAV)',
    date: 'September 20-22, 2025',
    time: '5:00 PM - 8:00 PM',
    location: 'Cathedral Grounds',
    description: 'Special apostolic visitation with prophetic declarations and spiritual impartation.',
    category: 'Apostolic',
    attendees: 1800,
    featured: true,
    image: VisitationImage,
    highlights: ['Prophetic Ministry', 'Healing Services', 'Spiritual Impartation']
  },
  {
    id: 3,
    title: 'Evening Of Truth Dinner',
    date: 'October 12, 2025',
    time: '6:00 PM - 10:00 PM',
    location: 'Grand Ballroom',
    description: 'An elegant evening of fellowship, testimonies, and celebrating God\'s faithfulness.',
    category: 'Fellowship',
    attendees: 500,
    featured: true,
    image: DinnerImage,
    highlights: ['Testimonial Sharing', 'Gourmet Dining', 'Award Ceremony']
  },
  {
    id: 4,
    title: 'Owerri Prayer March',
    date: 'November 8, 2025',
    time: '7:00 AM - 12:00 PM',
    location: 'City Center to Church',
    description: 'City-wide prayer march for spiritual awakening and transformation.',
    category: 'Prayer',
    attendees: 3000,
    featured: true,
    image: PrayerImage,
    highlights: ['City-wide Impact', 'Intercession', 'Community Unity']
  },
  {
    id: 5,
    title: 'CrossOver Service',
    date: 'December 31, 2025',
    time: '9:00 PM - 1:00 AM',
    location: 'Main Auditorium',
    description: 'Welcome the new year with powerful worship, prophecy, and thanksgiving.',
    category: 'Celebration',
    attendees: 4000,
    featured: true,
    image: CrossoverImage,
    highlights: ['Prophetic Declarations', 'Midnight Worship', 'New Year Prayers']
  },
  {
    id: 6,
    title: 'Global Leadership Training',
    date: 'Every January',
    time: 'To be announced...',
    location: 'Main Auditorium',
    description: 'True Leaders raise Leaders.',
    category: 'Leader',
    attendees: 4000,
    featured: true,
    image: CrossoverImage,
    highlights: ['Prophetic Declarations', 'Midnight Worship', 'New Year Prayers']
  }
];

const regularEvents = [
  {
    id: 7,
    title: 'World Feast',
    date: 'Every Tuesday',
    time: '5:00 PM - 7:00 PM',
    location: 'Church Auditorium',
    description: 'We Feast on God\'s Word and His Presence',
    category: 'Word',
    attendees: 100,
    featured: false,
    image: EventHero
  },
  {
    id: 8,
    title: 'Let\'s Pray',
    date: 'Every Friday',
    time: '5:00 PM - 7:00 PM',
    location: 'Church Auditorium',
    description: 'Dwell in His Prescence with Prayers.',
    category: 'Prayer',
    attendees: 600,
    featured: false,
    image: EventHero
  },
  {
    id: 9,
    title: 'Worker\'s Congress',
    date: 'Quaterly',
    time: '8:00 AM - 6:00 PM',
    location: 'Church Auditorium',
    description: 'Building strong, godly wprkers for family and community.',
    category: 'Retreat',
    attendees: 400,
    featured: false,
    image: EventHero
  }
];


  const allEvents = [...majorEvents, ...regularEvents];
  const categories = ['All', 'Convention', 'Apostolic', 'Fellowship', 'Prayer', 'Celebration', 'Youth', 'Conference', 'Retreat'];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-yellow-600/50 to-blue-900/95 z-10" />
        <img 
          src={EventHero} 
          alt="Events" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center text-white px-6 max-w-4xl">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wide">Life-Changing Events</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            DIVINE ENCOUNTERS
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl font-medium mb-8 h-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
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

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-900 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              Explore Events 
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300">
              Get Notifications
            </button>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 rounded-full px-6 py-3 mb-6">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wide">Mark Your Calendar</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              MAJOR EVENTS
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join us for transformative gatherings that will strengthen your faith and build lasting connections.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            
          </div>

          {/* Major Events Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Major Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.filter(event => event.featured).map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                        {event.category}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.attendees.toLocaleString()}</span>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                    {event.highlights && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {event.highlights.map((highlight, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>

                    <button className="w-full bg-blue-900 text-white font-semibold py-3 rounded-full hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2 group">
                      Join Us
                     
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Regular Events */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Regular Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.filter(event => !event.featured).map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {event.category}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.attendees}</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                    <div className="text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <button className="w-full bg-gray-900 text-white font-medium py-2 rounded-full hover:bg-gray-800 transition-all duration-300">
                      Register Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
        <div className="relative">
      <section className="bg-gradient-to-r from-blue-950 to-yellow-500/60 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wide">Stay Connected</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            NEVER MISS AN EVENT
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates about our upcoming events, special announcements, and spiritual gatherings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
            />
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-white text-blue-900 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          <p className="text-blue-200 text-sm">
            Join {2000 + subscribedEmails.length}+ members who never miss our events!
          </p>
        </div>
      </section>

      {/* Success Message Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center relative">
            <button
              onClick={closeSuccessMessage}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Email Received Successfully!
            </h3>
            
            <p className="text-gray-600 mb-6">
              Thank you for subscribing! You'll be notified about upcoming events and special announcements.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>What's next?</strong><br />
                You'll receive notifications when events are approaching and updates about our spiritual gatherings.
              </p>
            </div>
            
            <button
              onClick={closeSuccessMessage}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
      <Footer />
    </div>
  );
  }
