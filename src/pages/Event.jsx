import { useEffect, useState } from 'react';
import { Calendar, MapPin, Check, X, ArrowRight, Clock, Users, Heart, Star, Filter, Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import Prayer from '../assets/home-page.jpg';
import Word from "../assets/truelight-photo1.jpg"
import WCC from "../assets/WCClogo.png"
import OAV from "../assets/OAVLogo.png"
import GLCT from "../assets/GLCTlogo.png"
import HIGHHEELS from "../assets/HIGHHEELSlogo.png"
import EventHerro from "../assets/very9.jpg"
import evot from "../assets/very10.jpg"
import NUMW from "../assets/notunder.jpg"
import PM from "../assets/prayerwalk.jpg"
import congress from "../assets/very8.jpg"

// Mock images - replace with your actual imports
const EventHero = congress;
// Fixed: Assign imported images directly, not as objects
const ConventionImage = WCC;
const VisitationImage = OAV;
const DinnerImage = HIGHHEELS;
// const PrayerImage = "https://scontent.fabb1-1.fna.fbcdn.net/v/t39.30808-6/516759655_1137930058368023_1145055711123431194_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH8RsyPaGuc6EZfheFiyFdrx3ybJwTdmSnHfJsnBN2ZKeQgAA35xjfcVODiFzVKBvEp_xTLYmV8O85ijz0xv1Bg&_nc_ohc=uq62NbvVrhgQ7kNvwFuD-7_&_nc_oc=AdlETeAue5YGZv_jWMS5ZPdEt39SL2968iczVmDj3UygKjL4yk20hsEnLvYfauIxS9k&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&_nc_gid=VEUuKDLgpP4fGFC_--OfOw&oh=00_AfXWxf9mi5gmqHiwWqtLSgX7L5tK3rwrw7gBpA-8piBkgg&oe=689E768A";
const CrossoverImage = GLCT;

export default function Events() {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPastEvents, setShowPastEvents] = useState(false);
  
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const slogans = [
    'Where faith meets action',
    'Transforming lives together',
    'Your spiritual journey awaits',
    'Building tomorrow\'s leaders'
  ];

  // Auto-cycle through slogans
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan(prev => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Function to handle event registration via email
  const handleEventRegistration = (event) => {
    const subject = encodeURIComponent(`Registration for ${event.title}`);
    const body = encodeURIComponent(
      `I would like to register for the following event:\n\n` +
      `Event: ${event.title}\n` +
      `Date: ${event.date}\n` +
      `Time: ${event.time}\n` +
      `Location: ${event.location}\n\n` +
      `Please provide me with more information about registration.\n\n` +
      `Thank you.`
    );
    window.location.href = `mailto:info.truelight9@gmail.com?subject=${subject}&body=${body}`;
  };
  
const majorEvents = [
  {
    id: 1,
    title: 'World Changers Convention (WCC)',
    date: 'Every Second week of November',
    time: 'Morning sessions 8:00 AM - 12:00 PM, Evening sessions 5:00 PM - 9:00 PM',
    location: 'Main Auditorium',
    description: 'Five days of life-transforming sessions of impact and excellence',
    category: 'Convention',
    featured: true,
    image: ConventionImage,
    highlights: ['International Speakers', 'Leadership Training', 'Networking Sessions'],
    registrationOpen: false
  },
  {
    id: 2,
    title: 'Owerri Apostolic Visitation (OAV)',
    date: 'Every 2nd week of April',
    time: 'Morning sessions 8:00 AM - 12:00 PM, Evening sessions 5:00 PM - 9:00 PM',
    location: 'Church Auditorium',
    description: 'Special apostolic visitation with prophetic declarations and spiritual impartation.',
    category: 'Apostolic',
    featured: true,
    image: VisitationImage,
    highlights: ['Prophetic Ministry', 'Healing Services', 'Spiritual Impartation'],
    registrationOpen: false
  },
  {
    id: 3,
    title: 'Evening Of Truth Dinner',
    date: 'Every 2nd Sunday in December',
    time: '3:00 PM',
    location: 'Grand Ballroom',
    description: 'An elegant evening of fellowship, testimonies, and celebrating God\'s faithfulness.',
    category: 'Fellowship',
    featured: true,
    image: evot,
    highlights: ['Testimonial Sharing', 'Gourmet Dining', 'Award Ceremony'],
    registrationOpen: false
  },
  {
    id: 4,
    title: 'High Heels in High Places',
    date: 'Every 3rd Week of July',
    time: '5:00 PM - 9:00 PM',
    location: 'Raising Kingdom Ladies',
    description: 'Ladies with high Infuence in high environments',
    category: 'Prayer',
    featured: true,
    image: DinnerImage,
    highlights: ['City-wide Impact', 'Influence', 'Ladies Unity'],
    registrationOpen: false
  },
  {
    id: 6,
    title: 'Global Leadership Training',
    date: 'Every January',
    time: 'To be announced',
    location: 'Main Auditorium',
    description: 'True leaders raise leaders.',
    category: 'Leader',
    featured: true,
    image: CrossoverImage,
    highlights: ['Prophetic Declarations', 'Midnight Worship', 'New Year Prayers'],
    registrationOpen: false
  }
];

const regularEvents = [
  {
    id: 7,
    title: 'Word Feast',
    date: 'Every Tuesday',
    time: '5:00 PM - 7:00 PM',
    location: 'Church Auditorium',
    description: 'We feast on God\'s Word and His presence',
    category: 'Word',
    featured: false,
    image: Word,
    registrationOpen: true
  },
  {
    id: 8,
    title: 'Let\'s Pray',
    date: 'Every Friday',
    time: '5:00 PM - 7:00 PM',
    location: 'Church Auditorium',
    description: 'Dwell in His presence with prayers.',
    category: 'Prayer',
    featured: false,
    image: Prayer,
    registrationOpen: true
  },
  {
    id: 9,
    title: 'Worker\'s Congress',
    date: 'Quarterly',
    time: '8:00 AM - 6:00 PM',
    location: 'Church Auditorium',
    description: 'Building strong, godly workers for family and community.',
    category: 'Retreat',
    featured: false,
    image: EventHero,
    registrationOpen: true
  },
  {
    id: 10,
    title: 'Owerri Prayer Walk',
    date: 'Every half year',
    time: '6:00 AM',
    location: 'Leave from Church Auditorium',
    description: 'Praying round the city.',
    category: 'Prayer',
    featured: false,
    image: PM,
    registrationOpen: true
  },
  {
    id: 10,
    title: 'Not Under My Watch',
    date: 'Every third friday of the month',
    time: '9:00 PM',
    location: 'Church Auditorium',
    description: 'Intercession, breaking negative family patterns.',
    category: 'Prayer',
    featured: false,
    image: NUMW,
    registrationOpen: true
  },
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
      {/* Hero Section - Refined */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-yellow-900/60 to-blue-900/80 z-10" />
        <img 
          src={EventHerro}
          alt="Events" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center text-white px-6 max-w-5xl">
          {/* Subtle badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-5 py-2 mb-8 border border-white/25"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider">Life-Changing Events</span>
          </motion.div>

          {/* Main heading - refined */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-extralight">Divine</span>{' '}
            <span className="font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Encounters
            </span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl font-light text-blue-200 block mt-2">
              Transform your life
            </span>
          </motion.h1>

          {/* Animated tagline */}
          <motion.div
            className="text-lg md:text-xl font-light mb-12 h-14 flex items-center justify-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
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
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 backdrop-blur-md text-white font-medium px-8 py-4 rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition-all duration-500 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Explore Events
                <motion.div
                  className="w-1 h-1 bg-current rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Events Section - Refined */}
      <section id="events" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header - Simplified */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 rounded-full px-5 py-2 mb-8 border border-blue-100">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wider">Mark Your Calendar</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
              <span className="font-extralight">Upcoming</span>{' '}
              <span className="font-medium">Events</span>
            </h2>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join us for transformative gatherings that will strengthen your faith and build lasting connections.
            </p>
          </motion.div>

          {/* Search - Refined */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition-all font-light bg-white"
              />
            </div>
          </div>

          {/* Major Events Grid - Refined */}
          <div className="mb-16">
            <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">
              <span className="font-extralight">Featured</span>{' '}
              <span className="font-medium">Events</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.filter(event => event.featured).map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-white/50">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
                        {event.category}
                      </span>
                    </div>
                    <h4 className="text-xl font-medium text-gray-900 mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm font-light mb-4 flex-grow leading-relaxed">{event.description}</p>
                    
                    {event.highlights && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {event.highlights.map((highlight, index) => (
                            <span key={index} className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs font-light">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-light">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-light">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-light">{event.location}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleEventRegistration(event)}
                      disabled={!event.registrationOpen}
                      className={`w-full font-medium py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                        event.registrationOpen 
                          ? 'bg-blue-900 text-white hover:bg-blue-800' 
                          : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {event.registrationOpen ? 'Register Now' : 'Coming Soon'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Regular Events - Refined */}
          <div>
            <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">
              <span className="font-extralight">Regular</span>{' '}
              <span className="font-medium">Events</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.filter(event => !event.featured).map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {event.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm font-light mb-3 flex-grow leading-relaxed">{event.description}</p>
                    <div className="text-sm text-gray-500 mb-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span className="font-light">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span className="font-light">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}