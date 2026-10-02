import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Star, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import HeroSectionFast from '../components/EventHero';

const EventHero = 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767272187/41f205fb-7c91-4ecd-8b7c-b05dec358cad.png';
const ConventionImage = 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270037/WCClogo_b5llkb.png';
const VisitationImage = 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767273017/fc78df5d-b664-49b5-a6dd-7dd98790b69c.png';
const DinnerImage = 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270251/HIGHHEELSlogo_r6irgw.png';
const CrossoverImage = 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270256/GLCTlogo_iutvln.png';

export default function Events() {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlogan(v => (v + 1) % 4), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleEventRegistration = (event) => {
    if (event.id === 2) {
      window.open("https://docs.google.com/forms/d/1V1a3B0mLUOAs4IKETAzhHf7XKYzTtcp1rHEPm43Y1Go/edit", "_blank");
    } else {
      const subject = encodeURIComponent(`Registration for ${event.title}`);
      const body = encodeURIComponent(
        `I would like to register for the following event:\n\nEvent: ${event.title}\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\n\nPlease provide me with more information about registration.\n\nThank you.`
      );
      window.location.href = `mailto:info.truelight9@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  const majorEvents = [
    { id: 1, title: 'World Changers Convention (WCC)', date: 'Every Second week of November', time: 'Morning sessions 8:00 AM - 12:00 PM, Evening sessions 5:00 PM - 9:00 PM', location: 'Main Auditorium', description: 'Five days of life-transforming sessions of impact and excellence', category: 'Convention', featured: true, image: ConventionImage, highlights: ['International Speakers', 'Leadership Training', 'Networking Sessions'], registrationOpen: false },
    { id: 2, title: 'Owerri Apostolic Visitation (OAV)', date: 'Every 2nd week of April', time: 'Morning sessions 8:00 AM - 12:00 PM, Evening sessions 5:00 PM - 9:00 PM', location: 'Church Auditorium', description: 'Special apostolic visitation with prophetic declarations and spiritual impartation.', category: 'Apostolic', featured: true, image: VisitationImage, highlights: ['Prophetic Ministry', 'Healing Services', 'Spiritual Impartation'], registrationOpen: false },
    { id: 3, title: 'Evening Of Truth Dinner', date: 'Every 2nd Sunday in December', time: '3:00 PM', location: 'Grand Ballroom', description: 'An elegant evening of fellowship, testimonies, and celebrating God\'s faithfulness.', category: 'Fellowship', featured: true, image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270006/very10_ekqoyd.jpg', highlights: ['Testimonial Sharing', 'Gourmet Dining', 'Award Ceremony'], registrationOpen: false },
    { id: 4, title: 'High Heels in High Places', date: 'Every 3rd Week of July', time: '5:00 PM - 9:00 PM', location: 'Raising Kingdom Ladies', description: 'Ladies with high Infuence in high environments', category: 'Prayer', featured: true, image: DinnerImage, highlights: ['City-wide Impact', 'Influence', 'Ladies Unity'], registrationOpen: false },
    { id: 6, title: 'Global Leadership Training', date: 'Every January', time: 'To be announced', location: 'Main Auditorium', description: 'True leaders raise leaders.', category: 'Leader', featured: true, image: CrossoverImage, highlights: ['Prophetic Declarations', 'Midnight Worship', 'New Year Prayers'], registrationOpen: false }
  ];

  const regularEvents = [
    { id: 7, title: 'Word Feast', date: 'Every Tuesday', time: '5:00 PM - 7:00 PM', location: 'Church Auditorium', description: 'We feast on God\'s Word and His presence', category: 'Word', featured: false, image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767187879/b63529f4-a17d-4678-a33a-0a775671e4fb.png', registrationOpen: true },
    { id: 8, title: 'Let\'s Pray', date: 'Every Friday', time: '5:00 PM - 7:00 PM', location: 'Church Auditorium', description: 'Dwell in His presence with prayers.', category: 'Prayer', featured: false, image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269474/60335dee-8d13-43f1-afde-286f6e6238b7.png', registrationOpen: true },
    { id: 9, title: 'Worker\'s Congress', date: 'Quarterly', time: '8:00 AM - 6:00 PM', location: 'Church Auditorium', description: 'Building strong, godly workers for family and community.', category: 'Retreat', featured: false, image: EventHero, registrationOpen: true },
    { id: 10, title: 'Owerri Prayer Walk', date: 'Every half year', time: '6:00 AM', location: 'Leave from Church Auditorium', description: 'Praying round the city.', category: 'Prayer', featured: false, image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269921/prayerwalk_iy9hz9.jpg', registrationOpen: true },
    { id: 11, title: 'Not Under My Watch', date: 'Every third friday of the month', time: '9:00 PM', location: 'Church Auditorium', description: 'Intercession, breaking negative family patterns.', category: 'Prayer', featured: false, image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269424/b41bfa4a-a86b-48db-8a85-51b2e9b166b6.png', registrationOpen: true }
  ];

  const allEvents = [...majorEvents, ...regularEvents];
  const filteredEvents = allEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const slogans = [
    'Where faith meets action',
    'Transforming lives together',
    'Your spiritual journey awaits',
    'Building tomorrow\'s leaders'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
     
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Floating shapes */}
        {/* <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-600/30 rounded-lg rotate-12 animate-float-rotate"></div> */}
        {/* <div className="absolute bottom-40 right-32 w-24 h-24 bg-blue-600/10 rounded-full animate-pulse-slow"></div> */}
        <div className="absolute top-1/3 right-20 w-2 h-40 bg-gradient-to-b from-blue-600/50 to-transparent animate-slide-up"></div>
        {/* <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-blue-500/30 rounded-full animate-ping-slow"></div> */}
      
        
        {/* Diagonal accent lines */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-600/30 via-transparent to-blue-600/30 transform -skew-x-12 animate-slide-down"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-600/20 via-transparent to-blue-600/20 transform skew-x-12 animate-slide-up-slow"></div>
      </div>
      
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -20px); }
          50% { transform: translate(-10px, -30px); }
          75% { transform: translate(-20px, 10px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-30px, 20px); }
          50% { transform: translate(15px, 40px); }
          75% { transform: translate(25px, -15px); }
        }
        
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          33% { transform: translateY(-20px) rotate(20deg); }
          66% { transform: translateY(10px) rotate(5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        
        @keyframes slide-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes slide-down {
          0%, 100% { transform: translateY(0) skew(-12deg); }
          50% { transform: translateY(20px) skew(-12deg); }
        }
        
        @keyframes slide-up-slow {
          0%, 100% { transform: translateY(0) skew(12deg); }
          50% { transform: translateY(-40px) skew(12deg); }
        }
        
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 12s ease-in-out infinite;
        }
        
        .animate-float-rotate {
          animation: float-rotate 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 5s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 4s ease-in-out infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 6s ease-in-out infinite;
        }
        
        .animate-slide-up-slow {
          animation: slide-up-slow 8s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
      `}</style>

    
<HeroSectionFast />


      {/* Search Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border-b-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg transition-colors bg-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      <section id="events" className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-1 bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Featured
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
              Major Events
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredEvents.filter(event => event.featured).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden h-full min-h-[420px] bg-white/40 backdrop-blur-xl border border-white/60 hover:bg-white/60 hover:border-blue-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col">
                  
                  {/* Blue accent on hover */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-500 z-10"></div>
                  
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                    
                    {/* Featured badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-bold text-gray-900">FEATURED</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-6">
                    
                    <div className="mb-3">
                      <span className="bg-blue-600/10 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {event.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3">
                      {event.title}
                    </h3>
                    
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow">
                      {event.description}
                    </p>

                    {/* Highlights */}
                    {event.highlights && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {event.highlights.map((h, i) => (
                            <span key={i} className="bg-gray-100/80 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Event Details */}
                    <div className="space-y-2 mb-4 pt-4 border-t border-gray-300/50">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-xs">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs line-clamp-1">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-xs">{event.location}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    {event.id === 1 ? (
                      <button
                        onClick={() => {
                          window.location.href = '/wcc';
                        }}
                        className="group/btn relative w-full bg-blue-600 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-gray-900"
                      >
                        <span className="relative z-10">Visit WCC Page</span>
                        <div className="absolute inset-0 translate-x-1 translate-y-1 border-2 border-blue-600 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5"></div>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEventRegistration(event)}
                        disabled={!event.registrationOpen}
                        className={`group/btn relative w-full font-bold py-3 text-sm uppercase tracking-wider transition-all duration-300 ${
                          event.registrationOpen
                            ? 'bg-blue-600 text-white hover:bg-gray-900'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <span className="relative z-10">
                          {event.registrationOpen ? 'Register Now' : 'Coming Soon'}
                        </span>
                        {event.registrationOpen && (
                          <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-1 translate-y-1 group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5 transition-transform duration-300"></div>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Events */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-1 bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Regular
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
              Weekly Events
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredEvents.filter(event => !event.featured).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden h-full min-h-[280px] bg-white/60 backdrop-blur-md border border-white/40 hover:bg-white/80 hover:border-blue-400/60 transition-all duration-300 flex flex-col">
                  
                  {/* Blue accent */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                  
                  {/* Event Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-4">
                    
                    <div className="mb-2">
                      <span className="bg-gray-100/80 text-gray-700 px-2 py-1 rounded-full text-xs font-bold uppercase">
                        {event.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 leading-tight mb-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-xs text-gray-600 leading-relaxed mb-auto line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-1 pt-3 mt-3 border-t border-gray-300/50">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-3 h-3 text-blue-600" />
                        <span className="text-xs line-clamp-1">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        <span className="text-xs line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}