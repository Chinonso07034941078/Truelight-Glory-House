import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { HashLink } from "react-router-hash-link";
import { pastorInfo } from "./data"; 

// Helper function
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

// Data for the Cards Section
const cards = [
  { titleTop: "Join Our Community", title: "Get Involved", button: "Learn More", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1771202142/629486041_1310175651143462_620369017042103686_n_ci87yq.jpg', action: "navigate", path: "/about" },
  { titleTop: "Give Generously", title: "Donate Today", button: "Give Now", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1771204959/dd795031-f38e-49f5-b6f8-dc8dbbf2af8a.png', action: "navigate", path: "/support" },
  { titleTop: "Connect With Us", title: "Contact", button: "Connect", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1771205271/a6771218-13dd-458e-8e2f-9b79ae194583.png', action: "navigate", path: "/contact" },
  { titleTop: "Listen To Our Sermons", title: "Sermons", button: "Listen", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1771203266/630062818_1311600097667684_7216414172780416453_n_jej2ux.jpg', action: "navigate", path: "/sermons" }
];

export default function CardsAndPastorPage() {
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);

  // Duplicate cards for seamless infinite scroll
  const seamlessCards = [...cards, ...cards, ...cards];

  const handleCardAction = (card) => {
    if (card.action === "toggle") {
      setShowLinks(!showLinks);
    } else if (card.action === "navigate") {
      navigate(card.path);
    }
  };

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden relative">
        
      {/* Cards Section - Brutalist Carousel */}
      <section className="relative py-16 sm:py-20 md:py-28 bg-white border-t-2 border-b-2 border-gray-900 overflow-hidden">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 sm:w-20 h-1 bg-blue-600"></div>
              <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
                Take Action
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-black text-gray-900 leading-none tracking-tighter">
              Get <span className="text-blue-600">Connected</span>
            </h2>
          </motion.div>
        </div>

        {/* Scrolling Cards */}
        <div className="w-full">
          <div className="flex w-max animate-scroll space-x-6 sm:space-x-8">
            {seamlessCards.map((card, index) => (
              <motion.div 
                key={`${card.title}-${index}`} 
                className="relative w-[280px] sm:w-[320px] md:w-[360px] h-[450px] sm:h-[500px] flex-shrink-0 overflow-hidden group cursor-pointer border-4 border-gray-900 hover:border-blue-600 transition-all duration-500" 
                whileHover={{ y: -10 }} 
                transition={{ duration: 0.3 }}
                onClick={() => handleCardAction(card)}
              >
                {/* Image */}
                <img 
                  src={card.image} 
                  alt={card.title}
                  loading="lazy" 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10" />
                
                {/* Blue Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600 z-20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Content */}
                <div className="relative z-20 h-full flex flex-col justify-end p-6 sm:p-8 text-white">
                  <div className="space-y-4 mb-6">
                    <div className="w-12 h-1 bg-blue-600"></div>
                    <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-300 uppercase tracking-wider">
                      {card.titleTop}
                    </p>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white font-bold py-4 uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2">
                    {card.button} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pastor Section - Split Editorial Style */}
      <section className="min-h-screen bg-gray-50 flex items-center py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* LEFT - Image */}
            <motion.div 
              className="relative order-2 lg:order-1" 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative max-w-lg mx-auto lg:mx-0">
                
                {/* Blue Border Frame */}
                <div className="absolute -top-8 -left-8 w-full h-full border-8 border-blue-600 z-0"></div>
                
                {/* Image */}
                <div className="relative z-10 overflow-hidden ">
                  <img 
                    src='https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269814/6dabb4de-b6a6-464c-bf4e-e63f6104c34d.png'
                    alt={pastorInfo.title} 
                    loading="lazy"
                    className="w-full h-auto object-cover  transition-all duration-700" 
                  />
                </div>

                {/* Logo Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 shadow-xl z-20 border-4 border-gray-900">
                  <img 
                    src='https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270378/truelight-logo_ta57tl.png'
                    alt="logo" 
                    loading="lazy"
                    className="w-20 h-auto" 
                  />
                </div>
              </div>
            </motion.div>
           
            {/* RIGHT - Content */}
            <motion.div 
              className="space-y-8 order-1 lg:order-2" 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Section Label */}
              <div className="flex items-center gap-4">
                <div className="w-16 sm:w-20 h-1 bg-blue-600"></div>
                <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
                  {pastorInfo.subtitle}
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-none tracking-tighter mb-2">
                  Pastor
                </h2>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-blue-600 leading-none tracking-tighter">
                  {pastorInfo.title.split(' ').slice(1).join(' ')}
                </h2>
              </div>
              
              {/* Description */}
              <div className="max-w-xl">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {truncateText(pastorInfo.description, 820)}
                </p>
              </div>
              
              {/* Read More Link */}
              <HashLink
                smooth
                to="/about#pastor"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-gray-900 font-bold uppercase tracking-wider text-sm transition-all hover:gap-4"
              >
                Read Full Bio <ArrowRight className="w-4 h-4" />
              </HashLink>
              
              {/* Email Button */}
              <div className="pt-4">
                <a 
                  href={`mailto:${pastorInfo.email}`} 
                  className="inline-block bg-gray-900 text-white font-bold px-8 py-4 hover:bg-blue-600 transition-all duration-300 uppercase tracking-wider text-sm"
                >
                  {pastorInfo.email}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CSS for infinite scroll animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}