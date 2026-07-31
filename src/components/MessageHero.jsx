import { motion } from 'framer-motion';
import { useState } from 'react';

// Message rotation data
const messages = [
  "Welcome Home",
  "Find Your Family",
  "Grow Your Faith"
];

export default function HeroSection() {
  const [showLinks, setShowLinks] = useState(false);
  const [displayedMessage] = useState(messages[0]); // You can rotate through messages

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Blue Accent Blocks */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600 opacity-5"></div>
        <div className="absolute bottom-20 left-0 w-96 h-2 bg-blue-600"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="space-y-8 lg:space-y-12"
          >
            
            {/* Bold Blue Line Accent */}
            <div className="flex items-center gap-4">
              <div className="w-16 sm:w-20 h-1 bg-blue-600"></div>
              <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
                Welcome
              </span>
            </div>

            {/* Massive Heading */}
            <div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black text-gray-900 leading-none tracking-tighter">
                {displayedMessage.split(" ")[0]}
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black leading-none tracking-tighter mt-2">
                <span className="text-blue-600">
                  {displayedMessage.split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <div className="max-w-xl">
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed">
                This is more than a place you attend. It's a family you belong to.
              </p>
            </div>

            {/* CTA Section */}
            <div className="pt-4 sm:pt-8">
              <button 
                onClick={() => setShowLinks(!showLinks)} 
                className="group relative bg-blue-600 text-white font-bold px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg uppercase tracking-wider hover:bg-gray-900 transition-all duration-300"
              >
                <span className="relative z-10">Watch a Service</span>
                <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
              </button>

              {showLinks && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-2"
                >
                  <a href="#" className="block text-gray-600 hover:text-blue-600 font-medium">→ Latest Service</a>
                  <a href="#" className="block text-gray-600 hover:text-blue-600 font-medium">→ Watch Live</a>
                  <a href="#" className="block text-gray-600 hover:text-blue-600 font-medium">→ Service Archive</a>
                </motion.div>
              )}
            </div>

            {/* Quote Card - Desktop */}
            <div className="hidden lg:block max-w-md">
              <div className="border-l-4 border-blue-600 pl-6 py-4">
                <p className="text-lg text-gray-700 font-medium mb-2">
                  "You belong here."
                </p>
                <p className="text-base text-gray-600">
                  No matter your story, there is a place for you.
                </p>
              </div>
            </div>

          </motion.div>

          {/* RIGHT — IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            
            {/* Main Image Container */}
            <div className="relative">
              
              {/* Blue Border Frame */}
              <div className="absolute -top-6 -right-6 w-full h-full border-8 border-blue-600 z-0"></div>
       {/* Image */}
<div className="relative z-10 overflow-hidden">
  <img
    src="https://res.cloudinary.com/dnvgl9k4i/image/upload/w_800,q_auto,f_auto/v1767186200/MAPA_bwxn13.webp"
    alt="Church Gathering"
    className="w-full h-auto object-cover transition-all duration-700"
    loading="lazy"
    decoding="async"
  />
</div>
              {/* Stats Overlay - Mobile/Tablet */}
              <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white border-t-4 border-blue-600 p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-black text-gray-900">1500+</div>
                    <div className="text-xs uppercase tracking-wider text-gray-600">Members</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-gray-900">10+</div>
                    <div className="text-xs uppercase tracking-wider text-gray-600">Years</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Card - Mobile Only */}
            <div className="lg:hidden mt-8 max-w-md mx-auto">
              <div className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50">
                <p className="text-lg text-gray-700 font-medium mb-2">
                  "You belong here."
                </p>
                <p className="text-base text-gray-600">
                  No matter your story, there is a place for you.
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Bottom Blue Stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-600"></div>

    </section>
  );
}