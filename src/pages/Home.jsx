
import React, { useState, useEffect } from 'react';
import { Banknote, Copy, ArrowRight, Users, Heart, Star, Calendar, MapPin, Phone, Mail, Clock, ChevronDown, Play, Pause, Volume2, VolumeX, BookOpen, Music, Handshake, Gift, UserMinus2Icon, LucideAlarmPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import BgVideo from '../assets/truelight-video1.mp4'
import Papa from '../assets/papa.jpg'
import Papa2 from '../assets/papa4.jpg'
import Pray from '../assets/home-page.jpg'
import Choir from '../assets/choir4.jpg'
import YAN from '../assets/yan.jpg'
import YAN2 from '../assets/yan2.jpg'
import Media from '../assets/media.jpg'
import Evot from '../assets/Evot.jpg'
import Creative from '../assets/creatives2.jpg'
import Sunday from '../assets/truelight-photo2.jpg'



// State management


// Handle input changes
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setStatus({ message: '', type: '' });

  try {
    // Option 1: EmailJS
    if (window.emailjs) {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'your-email@example.com' // Replace with your email
      };

      await window.emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
      setStatus({ message: 'Message sent successfully! We\'ll get back to you soon.', type: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      // Option 2: Fetch to your backend API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ message: 'Message sent successfully!', type: 'success' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    }
  } catch (error) {
    console.error('Error sending message:', error);
    setStatus({ message: 'Failed to send message. Please try again.', type: 'error' });
  } finally {
    setIsSubmitting(false);
  }
};





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
  email: "Pastorifeanyiuwakwe@gmail.com",
  phone: "+234 806 097 8617"
};

const upcomingEvents = [
  {
    title: "Sunday 3 Super Services",
    date: "Every Sunday",
    time: "1st Service - 7:00 AM PROMPT, 2nd Service-8:45, AM 3rd Service-10:30 AM",
    description: "Join us every Sunday as we fellowship in God's house",
    image: Sunday,
  },
  {
    title: "Word Feast",
    date: "Ever Tuesday",
    image: "https://scontent.fabb1-3.fna.fbcdn.net/v/t39.30808-6/524156465_1148257704001925_7727432858456475697_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHgLlq6kWbRdyyAbU7kANiKs1VnwwJ3DIazVWfDAncMhgLuJt9PWxo_DKDjMz3W69jSZfRNipCW_6NryWLLnUUv&_nc_ohc=U7J-Ffm3bQAQ7kNvwEKKOlb&_nc_oc=Adm4uMhyOamLWkZ7NpJFw9dm4XDrsZQM3KmO4bGXffcQ9PQXsAz3Dwcm1QmhU-Wfdos&_nc_zt=23&_nc_ht=scontent.fabb1-3.fna&_nc_gid=lIqh4ym8D3nLdTISk6S7gQ&oh=00_AfTM31oi1RcjNfZygJnUt0F1UKAS5jA1sc8969wpPzRmqg&oe=6886767B",
    time: "5:00 PM",
    description: "We let the word Transform our lives"
  },
  {
    title: "Let's pray",
    date: "Every Friday",
    image: Pray,
    time: "5:00 PM",
    description: "We wait on the Lord in Fervent prayers"
  },
  {
    title: "Teens Church",
    date: "Every Saturday",
    image: YAN2,
    time: "1:00 PM",
    description: "Vibrant teenagers come to fellowship together in His prescence"
  }
];

const ministries = [
  {
    name: "Lighters Choir",
    icon: Music,
    description: "Leading the congregation in heartfelt worship",
    image: Choir,
  },
  {
    name: "Young Achiever's Network",
    icon: Users,
    description: "Empowering the next generation",
    image: YAN,
  },
  {
    name: "Truelight Media",
    icon: Heart,
    description: "Service with Excellence!!!",
    image: Media,
  },
  {
    name: "Evening Of Truth",
    icon: UserMinus2Icon,
    description: "Relationship Classic - 2nd Sunday of the month, 3:00pm",
    image: Evot,
  },
  {
    name: "The Creatives",
    icon: LucideAlarmPlus,
    description: "Harnessing Special talents",
    image: Creative,
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



  const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [status, setStatus] = useState({ message: '', type: '' });



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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-yellow-500/5 to-blue-950/90 z-10" />

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
            Global Church
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-8xl font-black text-white mt-6 sm:mt-8 drop-shadow-2xl leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            TRUELIGHT <br /> GLORY HOUSE
          </motion.h1>

          <motion.h2
            className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-3xl font-bold text-yellow-500 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
           Disciple the Nations and Discipline the Devil
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
                src="https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/516597503_1141097741384588_2423057142439453111_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHccey6tvOXaj6az0vcDX0MG3xDdTPj1IUbfEN1M-PUhWO15wZN0A9OJgjtieTiHVI-hcM-tYoVEyhEZgWLQfHA&_nc_ohc=2i0Vut5yBk0Q7kNvwFfuSal&_nc_oc=AdmfDOesPZb-dkSD9pc3Cofa5ItBkwoNEYBNOZ2dlP9e4QkT_a9EZ4jEoWmEcqc9_N4&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&_nc_gid=jnpaiZdmZ3BkHYvLJWxHoA&oh=00_AfS4u_qeJr5chpEwmJVhZ6f7b51tUNuhr2NyJnCLDYN0yg&oe=6886945B"
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

    {/* Activities Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
       Regular Activities
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
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          {/* Image Container */}
          <div className="h-48 bg-gradient-to-br from-blue-200 to-indigo-200 relative overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
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
          </div>
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
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
        >
          {/* Image Container */}
          <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
            <img 
              src={ministry.image} 
              alt={ministry.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors">
              <ministry.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{ministry.name}</h3>
            <p className="text-gray-600">{ministry.description}</p>
          </div>
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
          className="relative w-[280px] md:w-[320px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border border-yellow-400/20"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-blue-900/50 to-transparent z-10" />
          <div className="relative z-20 h-full flex flex-col justify-between p-6 text-white">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                {card.titleTop}
              </h4>
              <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg">
                {card.title}
              </h2>
            </div>
            <button className="text-sm font-bold flex items-center gap-2 uppercase hover:gap-4 transition-all group-hover:text-yellow-400 text-white bg-blue-900/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-yellow-400/30 hover:bg-yellow-400/20 hover:border-yellow-400/60">
              {card.button} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Pastor Section */}
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex flex-col lg:flex-row items-center justify-center px-6 py-24 gap-16">
  <motion.div
    className="w-full lg:w-1/2"
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="relative">
      <img
        src={Papa}
        alt={pastorInfo.imageAlt}
        className="w-full max-w-md h-auto object-cover rounded-[2rem] shadow-2xl mx-auto border-2 border-yellow-400/30"
      />
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-blue-900/40 to-transparent"></div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
        <BookOpen className="w-10 h-10 text-blue-900" />
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
      <div className="text-yellow-400 text-base font-bold tracking-widest uppercase">
        {pastorInfo.subtitle}
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-wide uppercase bg-gradient-to-r from-white via-gray-100 to-yellow-100 bg-clip-text text-transparent">
        {pastorInfo.title}
      </h2>
    </div>
    <p className="text-sm leading-relaxed text-gray-300">
      {pastorInfo.description}
    </p>
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
      <a href={`mailto:${pastorInfo.email}`} className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors bg-blue-900/30 px-4 py-2 rounded-lg border border-yellow-400/30 hover:border-yellow-400/60 backdrop-blur-sm">
        <Mail className="w-4 h-4" />
        <span className="text-sm">{pastorInfo.email}</span>
      </a>
      <a href={`tel:${pastorInfo.phone}`} className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors bg-blue-900/30 px-4 py-2 rounded-lg border border-yellow-400/30 hover:border-yellow-400/60 backdrop-blur-sm">
        <Phone className="w-4 h-4" />
        <span className="text-sm">+234 806 097 8617</span>
      </a>
    </div>
  </motion.div>
</section>

      {/* Contact Section */}
     <section className="py-20 bg-gradient-to-bl from-slate-900 via-blue-900 to-slate-800 text-white">
  <div className="max-w-7xl mx-auto px-6">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
        Visit Us
      </h2>
      <p className="text-xl text-yellow-400">
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
          <MapPin className="w-6 h-6 text-yellow-400 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2 text-white">Our Location</h3>
            <p className="text-gray-300">
              Wesley Building, 289 Okigwe Rd, adjacent Access Bank, Owerri 460222, Imo
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="w-6 h-6 text-yellow-400 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2 text-white">Service Times</h3>
            <p className="text-gray-300">
              Sunday Service: 7:00 AM<br />
              Tuesday Bible Study: 5:00 PM<br />
              Friday Prayer Meeting: 5:00 PM
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-yellow-400 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2 text-white">Contact Info</h3>
            <p className="text-gray-300">
              Phone: +234 813 045 6427<br />
              Email: info.truelight9@gmail.com<br />
              WhatsApp: 
            </p>
          </div>
        </div>
      </motion.div>

      <div className="bg-blue-900/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-yellow-400/30">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Contact Us</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-yellow-400 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-yellow-400/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-sm"
              placeholder="Your Name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-yellow-400 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-yellow-400/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-sm"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-yellow-400 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-yellow-400/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-sm"
              placeholder="Message Subject"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-yellow-400 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-yellow-400/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-sm resize-none"
              placeholder="Your message here..."
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-yellow-400/30 hover:border-yellow-400/60"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
        
        {status.message && (
          <div className={`mt-4 p-3 rounded-lg ${
            status.type === 'success' 
              ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
              : 'bg-red-500/20 border border-red-500/30 text-red-300'
          }`}>
            {status.message}
          </div>
        )}
      </div>
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
