import papa from '../assets/papa.jpg'
import { useState, useEffect } from "react";
import { Banknote, Copy, ArrowRight, Users, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import { useInView } from "react-intersection-observer";
import { pastorInfo } from '../components/data';
import Video from '../assets/truelight-video1.mp4'
import Gathering from '../assets/celebrate.jpg'
import C01 from '../assets/Gathering2.jpg'
import Footer from "../components/Footer"
import C03 from '../assets/Give12.jpg'
import C04 from '../assets/truelight-photo2.jpg'
import C05 from '../assets/choir5.jpg'
import { FaFacebookF, FaYoutube } from "react-icons/fa";

const fadeZoom = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } }
};

const messages = [
  "This is The Great Family of God",
  "Great Reward in Serving God",
  "God is Still Saving Lives Now",
  "Let Your Light Shine Bright",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [showLinks, setShowLinks] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const cards = [
    {
      titleTop: "JOIN OUR COMMUNITY",
      title: "Get Involved",
      button: "LEARN MORE",
      image: C01,
      link: "#community"
    },
    {
      titleTop: "GIVE GENEROUSLY",
      title: "Donate Today",
      button: "GIVE NOW",
      image: C03,
      link: "#donate"
    },
    {
      titleTop: "CONNECT WITH US",
      title: "Fellowship",
      button: "CONNECT",
      image: C04,
      link: "#fellowship"
    },
    {
      titleTop: "WATCH ONLINE",
      title: "Livestream",
      button: "WATCH",
      image: C05,
      link: "#livestream"
    },
  ];

  const stats = [
    { number: "500+", label: "Members", icon: Users },
    { number: "15+", label: "Years Serving", icon: Heart },
    { number: "22", label: "Ministry Units", icon: Star },
    { number: "100+", label: "Lives Changed", icon: Heart },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const target = document.getElementById('stats-section');
    if (target) observer.observe(target);
    
    return () => observer.disconnect();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const seamlessCards = [...cards, ...cards];

  return (
    <div className="bg-white text-white p-0 overflow-x-hidden">
      {/* Hero Section */}
     <section className="relative h-screen w-full overflow-hidden">
  <video 
    src={Video} 
    autoPlay 
    loop 
    muted 
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-0" 
  />
  <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-black/30 to-blue-950/80 z-10" />
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
    <motion.span 
      className="text-xs sm:text-sm md:text-base bg-white/20 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/30 uppercase tracking-widest backdrop-blur-md shadow-lg" 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.3, duration: 1 }}
    >
      the house of God
    </motion.span>
    
    <motion.h1 
      className="text-4xl sm:text-5xl md:text-8xl font-black text-white mt-6 sm:mt-8 drop-shadow-2xl leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text" 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ delay: 0.6, duration: 1.2 }}
    >
      EL SHADDAI
    </motion.h1>
    
    <motion.h2 
      className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-3xl font-bold text-blue-100 tracking-wide" 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 1, duration: 1 }}
    >
      The LORD GOD Almighty
    </motion.h2>
    
    <motion.div 
      className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mt-6 sm:mt-8 rounded-full shadow-lg" 
      initial={{ scaleX: 0 }} 
      animate={{ scaleX: 1 }} 
      transition={{ delay: 1.2, duration: 0.8 }}
    />
    
    <div className="relative flex flex-col items-center space-y-3 sm:space-y-4 mt-6 sm:mt-8">
      <motion.button 
        onClick={() => setShowLinks((prev) => !prev)} 
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm font-bold rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-2xl flex items-center gap-2 sm:gap-3 transform hover:scale-105 active:scale-95" 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        WATCH LIVE
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.button>
      
      <AnimatePresence>
        {showLinks && (
          <motion.div 
            className="flex gap-3 sm:gap-4" 
            initial={{ opacity: 0, y: 10, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 10, scale: 0.9 }} 
            transition={{ duration: 0.3 }}
          >
            <a 
              href="https://www.facebook.com/share/14FCmAPmKPZ/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-600 text-white p-3 sm:p-4 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-110"
            >
              <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a 
              href="https://youtube.com/@truelightgloryhouse?si=EnPJSZlzoefOGNQs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-red-600 text-white p-3 sm:p-4 rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg transform hover:scale-110"
            >
              <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
    <motion.p 
      className="mt-10 sm:mt-12 text-sm sm:text-base md:text-xl text-gray-200 italic max-w-xs sm:max-w-md md:max-w-2xl" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 2, duration: 1 }}
    >
      <Typewriter
        words={[
          "Join us every Sunday!", 
          "In Our Camp There Shall be no loss!", 
          "Experience God's presence.", 
          "Disciple the Nations, Discipline the devil."
        ]}
        loop
        cursor
        cursorStyle="_"
        typeSpeed={60}
        deleteSpeed={40}
        delaySpeed={1800}
      />
    </motion.p>
  </div>
</section>


      {/* Welcome Section */}
      <section ref={ref} className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
          <motion.div 
            className="flex-1 w-full space-y-8" 
            initial={{ opacity: 0, y: 100 }} 
            animate={inView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.8 }}
          >
            <div className="relative min-h-[4rem] sm:min-h-[7rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={currentMessageIndex} 
                  className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text tracking-tight text-center lg:text-left leading-tight" 
                  initial={{ opacity: 0, y: 50 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -30 }} 
                  transition={{ duration: 0.6 }}
                >
                  {messages[currentMessageIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
            
            <p className="text-gray-700 text-center lg:text-left text-lg sm:text-xl leading-relaxed max-w-2xl">
              Join a vibrant community of believers where faith comes alive. Discover your purpose, grow spiritually, and experience God's transformative power in a welcoming family atmosphere.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.8, duration: 0.8 }} 
              className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl text-blue-900 text-center font-semibold text-base sm:text-lg backdrop-blur-sm shadow-lg max-w-lg"
            >
              <Typewriter
                words={[
                  "You're not just visiting — you're home.", 
                  "God is writing your story here.", 
                  "Come grow your faith with a loving family.", 
                  "Destiny meets purpose at TLGH.", 
                  "We're saving a seat just for you!"
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={55}
                deleteSpeed={30}
                delaySpeed={2000}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 flex justify-center" 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={inView ? { opacity: 1, scale: 1 } : {}} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src={Gathering} 
                alt="Church Gathering" 
                className="rounded-3xl shadow-2xl w-full max-w-md lg:max-w-lg object-cover transform hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      

     

      {/* Scrolling Cards Section */}
      <section className="bg-white py-16 overflow-hidden">
        <div className="w-full">
          <div className="flex w-max animate-scroll space-x-8">
            {seamlessCards.map((card, index) => (
              <motion.div 
                key={`${card.title}-${index}`}
                className="relative w-[320px] md:w-[400px] h-[500px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <div className="relative z-20 h-full flex flex-col justify-between p-8 text-white">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300">
                      {card.titleTop}
                    </h4>
                    <h2 className="text-3xl md:text-4xl font-black">
                      {card.title}
                    </h2>
                  </div>
                  <button className="text-sm font-bold flex items-center gap-2 uppercase hover:gap-4 transition-all group-hover:text-blue-300">
                    {card.button} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pastor Section */}
      <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col lg:flex-row items-center justify-center px-6 py-24 gap-16">
        <motion.div 
          className="w-full lg:w-1/2" 
          initial={{ x: -100, opacity: 0 }} 
          whileInView={{ x: 0, opacity: 1 }} 
          transition={{ duration: 1 }} 
          viewport={{ once: true }}
        >
          <div className="relative">
            <img 
              src={papa} 
              alt={pastorInfo.imageAlt} 
              className="w-full h-auto object-cover rounded-[3rem] shadow-2xl" 
            />
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full lg:w-1/2 space-y-8 text-center lg:text-left" 
          initial={{ x: 100, opacity: 0 }} 
          whileInView={{ x: 0, opacity: 1 }} 
          transition={{ duration: 1 }} 
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <div className="text-blue-400 text-base font-bold tracking-widest uppercase">
              {pastorInfo.subtitle}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-wide uppercase bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {pastorInfo.title}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            {pastorInfo.description}
          </p>
        </motion.div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}