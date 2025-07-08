import { useEffect, useState } from 'react';
import { Calendar, MapPin, ArrowRight, Clock, Users, Heart, Star, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import Img1 from '../assets/papa4.jpg'
import Img2 from '../assets/teachings.jpg'
import Img3 from '../assets/Give12.jpg'
import Img4 from '../assets/choir2.jpg'

// Mock images - replace with your actual imports
const EventHero = Img1;
const WorkshopImage = Img2;
const CommunityGathering = Img3;
const YouthHangout = Img4;

export default function Events() {
  const eventSlogans = [
    'Connect, Grow, Serve.',
    'Experience Community.',
    'Your Journey, Our Events.',
    'Bringing Hearts Together.'
  ];

  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [backspace, setBackspace] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showPastEvents, setShowPastEvents] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(eventSlogans[i].substring(0, j));

      if (!backspace) {
        if (j < eventSlogans[i].length) {
          setJ(j + 1);
        } else {
          setBackspace(true);
        }
      } else {
        if (j > 0) {
          setJ(j - 1);
        } else {
          setBackspace(false);
          setI((i + 1) % eventSlogans.length);
        }
      }
    }, backspace ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [i, j, backspace, eventSlogans]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'WORLD CHANGERS CONVENTION',
      date: 'July 20, 2025',
      time: '9:00 AM - 4:00 PM',
      location: 'Main Auditorium',
      description: 'A day of empowering talks and workshops for leaders to transform communities.',
      category: 'Conference',
      attendees: 500,
      featured: true,
      images: [WorkshopImage, EventHero, CommunityGathering],
      link: '/events/leadership-summit'
    },
    {
      id: 2,
      title: 'Community Outreach Day',
      date: 'August 15, 2025',
      time: '10:00 AM - 2:00 PM',
      location: 'Various Community Centers',
      description: 'Join us as we serve our local community with love and compassion.',
      category: 'Outreach',
      attendees: 200,
      featured: false,
      images: [CommunityGathering, WorkshopImage, YouthHangout],
      link: '/events/outreach-day'
    },
    {
      id: 3,
      title: 'Youth Hangout',
      date: 'September 5, 2025',
      time: '4:00 PM - 7:00 PM',
      location: 'Youth Center',
      description: 'Fun and fellowship for our youth with games, music, and inspiring talks.',
      category: 'Youth',
      attendees: 150,
      featured: false,
      images: [YouthHangout, CommunityGathering, WorkshopImage],
      link: '/events/youth-hangout'
    },
    {
      id: 4,
      title: 'Couples Dinner',
      date: 'October 10, 2025',
      time: '6:00 PM - 9:00 PM',
      location: 'Church Hall',
      description: 'An evening of romance and spiritual growth for couples.',
      category: 'Fellowship',
      attendees: 100,
      featured: false,
      images: [WorkshopImage, EventHero, CommunityGathering],
      link: '/events/couples-dinner'
    },
    {
      id: 5,
      title: 'Prayer Summit',
      date: 'November 1, 2025',
      time: '7:00 PM - 9:00 PM',
      location: 'Sanctuary',
      description: 'A powerful night of intercession and worship.',
      category: 'Prayer',
      attendees: 300,
      featured: true,
      images: [CommunityGathering, YouthHangout, WorkshopImage],
      link: '/events/prayer-summit'
    },
    {
      id: 6,
      title: 'Christmas Carol',
      date: 'December 24, 2025',
      time: '6:00 PM - 8:00 PM',
      location: 'Main Auditorium',
      description: 'Celebrate the birth of Christ with joyous carols.',
      category: 'Celebration',
      attendees: 800,
      featured: true,
      images: [EventHero, WorkshopImage, CommunityGathering],
      link: '/events/christmas-carol'
    },
    {
      id: 7,
      title: 'New Year\'s Eve Service',
      date: 'December 31, 2025',
      time: '9:00 PM - 12:00 AM',
      location: 'Main Auditorium',
      description: 'Cross over into the new year with praise and worship.',
      category: 'Celebration',
      attendees: 1000,
      featured: true,
      images: [CommunityGathering, EventHero, YouthHangout],
      link: '/events/new-year-service'
    },
    {
      id: 8,
      title: 'First Fruits Service',
      date: 'January 5, 2026',
      time: '9:00 AM - 12:00 PM',
      location: 'Main Auditorium',
      description: 'Dedicated to offering the first fruits of the new year to God.',
      category: 'Service',
      attendees: 600,
      featured: false,
      images: [WorkshopImage, CommunityGathering, EventHero],
      link: '/events/first-fruits'
    },
  ];

  const pastEvents = [
    {
      id: 9,
      title: 'Easter Celebration',
      date: 'April 9, 2024',
      time: '9:00 AM - 12:00 PM',
      location: 'Main Auditorium',
      description: 'Celebrated the resurrection of Jesus Christ.',
      category: 'Celebration',
      attendees: 1200,
      featured: true,
      images: [EventHero, WorkshopImage, CommunityGathering],
      link: '/events/easter-celebration'
    },
    {
      id: 10,
      title: 'Summer Camp',
      date: 'June 15, 2024',
      time: '8:00 AM - 6:00 PM',
      location: 'Camp Grounds',
      description: 'A week-long summer camp for children and teens.',
      category: 'Youth',
      attendees: 250,
      featured: false,
      images: [YouthHangout, CommunityGathering, WorkshopImage],
      link: '/events/summer-camp'
    },
  ];

  const categories = ['All', 'Conference', 'Outreach', 'Youth', 'Fellowship', 'Prayer', 'Celebration', 'Service'];

  const filteredEvents = (showPastEvents ? pastEvents : upcomingEvents).filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleImageNavigation = (eventId, direction) => {
    const event = [...upcomingEvents, ...pastEvents].find(e => e.id === eventId);
    const currentIndex = currentImageIndex[eventId] || 0;
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % event.images.length 
      : (currentIndex - 1 + event.images.length) % event.images.length;
    
    setCurrentImageIndex(prev => ({
      ...prev,
      [eventId]: newIndex
    }));
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        <img 
          src={EventHero} 
          alt="Event Background" 
          className="w-full h-full object-cover absolute top-0 left-0 z-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-black/60 to-blue-950/90 z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white/10 backdrop-blur-sm text-white rounded-full px-6 py-3 text-sm font-medium uppercase tracking-wide flex items-center gap-2 border border-white/20 mb-8"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <Calendar className="w-4 h-4" />
            Upcoming Events
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase font-bold mb-6 leading-tight"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            Our Events
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-medium italic max-w-4xl mb-8 text-blue-100"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            "Connecting hearts, sharing joy, building faith together."
          </motion.p>

          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-semibold mt-6 min-h-[3rem] text-blue-300"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <span className="border-r-2 border-blue-300 pr-1 animate-pulse">{text}</span>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-10"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <button
              onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-950 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              View Events
            </button>
            <button
              onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-blue-950 transition-all duration-300"
            >
              Get Notified
            </button>
          </motion.div>
        </div>
      </div>

      {/* Events Section */}
      <section id="events-section" className="bg-gradient-to-br from-blue-50 to-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-gray-900">
        <motion.div
          className="max-w-7xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:items-center mb-12">
            <div className="flex-1">
              <button className="px-6 py-3 rounded-full bg-blue-100 text-blue-950 text-sm font-semibold uppercase tracking-wide mb-4">
                Mark Your Calendars
              </button>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 mb-4">
                {showPastEvents ? 'PAST EVENTS' : 'UPCOMING EVENTS'}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                {showPastEvents 
                  ? 'Look back at our amazing past gatherings and celebrations.'
                  : 'Discover our exciting upcoming events designed to foster growth and community.'
                }
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowPastEvents(!showPastEvents)}
                className="bg-blue-950 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition-all duration-300"
              >
                {showPastEvents ? 'View Upcoming' : 'View Past Events'}
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm appearance-none cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                className={`relative bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  event.featured ? 'ring-4 ring-blue-500/20' : ''
                }`}
                variants={fadeUp}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {event.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}

                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={event.images[currentImageIndex[event.id] || 0]} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                  />
                  
                  {event.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageNavigation(event.id, 'prev')}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleImageNavigation(event.id, 'next')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {event.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(prev => ({ ...prev, [event.id]: index }))}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === (currentImageIndex[event.id] || 0) ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-950 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      {event.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{event.attendees}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-blue-950 leading-tight">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <a 
                      href={event.link} 
                      className="flex items-center justify-center w-full bg-blue-950 text-white font-semibold py-3 rounded-full hover:bg-blue-800 transition-all duration-300 group"
                    >
                      Learn More 
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <div className="text-gray-400 text-6xl mb-4">
              <Calendar className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Events Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="bg-gradient-to-br from-blue-950 to-blue-900 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto text-center space-y-8" 
          initial="hidden" 
          whileInView="visible" 
          variants={fadeUp}
        >
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-6 py-3 text-sm font-medium uppercase tracking-wide flex items-center gap-2 border border-white/20 w-fit mx-auto">
              <Heart className="w-4 h-4" />
              Stay Connected
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">
              NEVER MISS AN EVENT
            </h2>
            <p className="text-blue-100 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Be the first to know about our upcoming events, special gatherings, and community celebrations.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20" 
            />
            <button 
              onClick={() => alert('Thank you for subscribing! You will receive event notifications.')}
              className="bg-white text-blue-950 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              SUBSCRIBE
            </button>
          </div>
          
          <p className="text-blue-200 text-sm">
            Join over 1,000 members who stay updated with our events!
          </p>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}