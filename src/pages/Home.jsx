
import React, { useState, useEffect } from 'react';
import { Banknote, Copy, ArrowRight, Users, Heart, Star, Calendar, MapPin, Phone, Mail, Clock, ChevronDown, Play, Pause, Volume2, VolumeX, BookOpen, Music, Handshake, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import BgVideo from '../assets/truelight-video1.mp4'

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

// Mock data for demonstration
const pastorInfo = {
  title: "Pastor Ifeanyi Uwakwe",
  subtitle: "Lead Pastor",
  description: "Pastor Ifeanyi Uwakwe is the Lead Pastor of Truelight Glory House, a vibrant ministry known for prophetic teaching, prayer, and leadership.He is passionate about spiritual growth, discipleship, and equipping believers to impact their families, careers, and communities. With humility and authority, he mentors many and emphasizes intimacy with God, kingdom purpose, and victorious living through faith. Under his leadership, the church has become a center of worship, intercession, and transformation. He is married and blessed with three children. David, Daniel, and Deborah, and serves faithfully alongside his wife.",
  imageAlt: "Pastor Ifeanyi Uwakwe",
  email: "pastor",
  phone: "200020202"
};

const upcomingEvents = [
  {
    title: "Sunday Service",
    date: "Every Sunday",
    time: "7:00 AM PROMPT",
    description: "Join us every Sunday as we fellowship in God's house"
  },
  {
    title: "Word Feast",
    date: "Ever Tuesday",
    time: "5:00 PM",
    description: "We let the word Transform our lives"
  },
  {
    title: "Let's pray",
    date: "Every Friday",
    time: "5:00 PM",
    description: "We wait on the Lord in deep prayers"
  },
  {
    title: "Teens Church",
    date: "Every Saturday",
    time: "1:00 PM",
    description: "Vibrant teenagers come to fellowship together in His prescence"
  }
];

const ministries = [
  {
    name: "Lighters Choir",
    icon: Music,
    description: "Leading the congregation in heartfelt worship"
  },
  {
    name: "Young Achiever's Network",
    icon: Users,
    description: "Empowering the next generation"
  },
  {
    name: "Children's Ministry",
    icon: Heart,
    description: "Nurturing young hearts for Jesus"
  },
  {
    name: "Truelight Media",
    icon: Heart,
    description: "Nurturing young hearts for Jesus"
  },
  
];

export default function Home() {
  const [showLinks, setShowLinks] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = React.useRef(null);

  const cards = [
    {
      titleTop: "JOIN OUR COMMUNITY",
      title: "Get Involved",
      button: "LEARN MORE",
      image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=400&h=500&fit=crop",
      link: "#community"
    },
    {
      titleTop: "GIVE GENEROUSLY",
      title: "Donate Today",
      button: "GIVE NOW",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=500&fit=crop",
      link: "#donate"
    },
    {
      titleTop: "CONNECT WITH US",
      title: "Fellowship",
      button: "CONNECT",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=500&fit=crop",
      link: "#fellowship"
    },
    {
      titleTop: "WATCH ONLINE",
      title: "Livestream",
      button: "WATCH",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=500&fit=crop",
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
    if (isTyping) {
      if (charIndex < messages[currentMessageIndex].length) {
        const typingTimer = setTimeout(() => {
          setDisplayedMessage(prev => prev + messages[currentMessageIndex][charIndex]);
          setCharIndex(prev => prev + 1);
        }, 70); // Typing speed
        return () => clearTimeout(typingTimer);
      } else {
        const pauseTimer = setTimeout(() => {
          setIsTyping(false);
        }, 1500); // Pause at end of message
        return () => clearTimeout(pauseTimer);
      }
    } else {
      if (charIndex > 0) {
        const erasingTimer = setTimeout(() => {
          setDisplayedMessage(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        }, 40); // Erasing speed
        return () => clearTimeout(erasingTimer);
      } else {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, currentMessageIndex, messages]);


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const seamlessCards = [...cards, ...cards];

  return (
    <div className="bg-white text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        >
          <source src={BgVideo} type="video/mp4" /> {/* Replace with your video path */}
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-black/50 to-blue-950/90 z-10" />

        {/* Floating elements */}
        <div className="absolute inset-0 z-15">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
        </div>

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
                  <a href="https://www.facebook.com/share/14FCmAPmKPZ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-3 sm:p-4 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-110">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.246h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com/@truelightgloryhouse?si=EnPJSZlzoefOGNQs" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white p-3 sm:p-4 rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg transform hover:scale-110">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
       
          </div>

     
        </div>


      </section>

      {/* Welcome Section */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
          <motion.div
            className="flex-1 w-full space-y-8"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative min-h-[4rem] sm:min-h-[7rem] overflow-hidden">
              <h1
                className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text tracking-tight text-center lg:text-left leading-tight"
              >
                {displayedMessage}
                <motion.span
                  className="inline-block w-1 bg-blue-600 h-10 sm:h-14 md:h-16 ml-1 align-bottom animate-blink"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                />
              </h1>
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
              "You're not just visiting — you're home."
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=400&fit=crop"
                alt="Church Gathering"
                className="rounded-3xl shadow-2xl w-full max-w-sm lg:max-w-md object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-blue-300" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Join us for these special gatherings
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{event.time}</span>
                </div>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Ministries
            </h2>
            <p className="text-xl text-gray-600">
              Find your place to serve and grow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors">
                  <ministry.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{ministry.name}</h3>
                <p className="text-gray-600">{ministry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling Cards Section */}
      <section className="bg-white py-16 overflow-hidden">
        <div className="w-full">
          <div className="flex w-max animate-scroll space-x-8">
            {seamlessCards.map((card, index) => (
              <motion.div
                key={`${card.title}-${index}`}
                className="relative w-[280px] md:w-[320px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <div className="relative z-20 h-full flex flex-col justify-between p-6 text-white">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
                      {card.titleTop}
                    </h4>
                    <h2 className="text-2xl md:text-3xl font-black">
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
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
              alt={pastorInfo.imageAlt}
              className="w-full max-w-md h-auto object-cover rounded-[2rem] shadow-2xl mx-auto"
            />
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
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
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href={`mailto:${pastorInfo.email}`} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{pastorInfo.email}</span>
            </a>
            <a href={`tel:${pastorInfo.phone}`} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{pastorInfo.phone}</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Visit Us
            </h2>
            <p className="text-xl text-blue-200">
              We'd love to meet you in person
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                  <p className="text-blue-200">
                    123 Faith Street<br />
                    Onitsha, Anambra State<br />
                    Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Service Times</h3>
                  <p className="text-blue-200">
                    Sunday Service: 10:00 AM<br />
                    Wednesday Bible Study: 6:30 PM<br />
                    Friday Youth Night: 7:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Contact Info</h3>
                  <p className="text-blue-200">
                    Phone: +234 (0) 123-456-789<br />
                    Email: info@elshaddai.org<br />
                    WhatsApp: +234 (0) 123-456-789
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
     < Footer />
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
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .animate-blink {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </div>
  );
}
