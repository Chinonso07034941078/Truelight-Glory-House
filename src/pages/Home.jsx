import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Sparkles, Heart, Star, Calendar, Clock, Mail, Music, UserMinus2Icon, LucideAlarmPlus, BookOpen, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import BgVideo from '../assets/truelight-video1.mp4';
import Papa from '../assets/papa.jpg';
import Pray from '../assets/home-page.jpg';
import Choir from '../assets/choir4.jpg';
import YAN from '../assets/yan.jpg';
import YAN2 from '../assets/yan2.jpg';
import Media from '../assets/very5.jpg';
import Evot from '../assets/Evot.jpg';
import Creative from '../assets/creatives2.jpg';
import Sunday from '../assets/sunday.jpg';
import very from '../assets/very.jpg';
import very4 from '../assets/very4.jpg';
import very2 from '../assets/very2.jpg';
import very3 from '../assets/very3.jpg';
import pama from '../assets/papaandmama.jpg';
import wordfeast from '../assets/wordfeast.jpg';

const fadeUp = (i) => ({ 
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } } 
});

const messages = [
  "This is The Great Family of God", 
  "Great Reward in Serving God", 
  "God is Still Saving Lives Now", 
  "Let Your Light Shine Bright"
];

const pastorInfo = {
  title: "Pastor Ifeanyi Uwakwe",
  subtitle: "Lead Pastor",
  description: "Pastor Ifeanyi Uwakwe is the Lead Pastor of Truelight Glory House, a vibrant ministry known for prophetic teaching, prayer, and leadership. He is passionate about spiritual growth, discipleship, and equipping believers to impact their families, careers, and communities. With humility and authority, he mentors many and emphasizes intimacy with God, kingdom purpose, and victorious living through faith. Under his leadership, the church has become a center of worship, intercession, and transformation. He is married and blessed with three children: David, Daniel, and Deborah, and serves faithfully alongside his wife.",
  email: "Pastorifeanyiuwakwe@gmail.com"
};

const upcomingEvents = [
  { 
    title: "3 Super Services", 
    date: "Every Sunday", 
    time: ["1st Service - 7:00 AM PROMPT", "2nd Service - 8:45 AM", "3rd Service - 10:30 AM"], 
    description: "Join us every Sunday as we fellowship in God's house", 
    image: Sunday 
  },
  { 
    title: "Word Feast", 
    date: "Every Tuesday", 
    image: wordfeast, 
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

const cards = [
  { titleTop: "JOIN OUR COMMUNITY", title: "Get Involved", button: "LEARN MORE", image: very, action: "navigate", path: "/about" },
  { titleTop: "GIVE GENEROUSLY", title: "Donate Today", button: "GIVE NOW", image: very3, action: "navigate", path: "/support" },
  { titleTop: "CONNECT WITH US", title: "Contact", button: "CONNECT", image: very4, action: "navigate", path: "/support"  },
  { titleTop: "WATCH ONLINE", title: "Sermons", button: "LISTEN", image: very2, action: "navigate", path: "/sermons"  }
];

const stats = [
  { number: "1500+", label: "Members", icon: Users },
  { number: "10+", label: "Years Serving", icon: CalendarDays },
  { number: "22", label: "Ministry Units", icon: Star },
  { number: "1000+", label: "Lives Changed", icon: Heart }
];

const getCurrentYear = () => new Date().getFullYear();

export default function Home() {
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });
  const seamlessCards = [...cards, ...cards];
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true); 
    setStatus({ message: '', type: '' });
    try {
      if (window.emailjs) {
        await window.emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { 
          from_name: formData.name, 
          from_email: formData.email, 
          subject: formData.subject, 
          message: formData.message, 
          to_email: 'your-email@example.com' 
        });
        setStatus({ message: 'Message sent successfully! We\'ll get back to you soon.', type: 'success' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const response = await fetch('/api/send-email', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(formData) 
        });
        if (response.ok) { 
          setStatus({ message: 'Message sent successfully!', type: 'success' }); 
          setFormData({ name: '', email: '', subject: '', message: '' }); 
        }
        else throw new Error('Failed to send message');
      }
    } catch (error) { 
      console.error('Error sending message:', error); 
      setStatus({ message: 'Failed to send message. Please try again.', type: 'error' }); 
    }
    finally { setIsSubmitting(false); }
  };
  
  const handleCardAction = (card) => {
    if (card.action === "toggle") {
      setShowLinks(!showLinks);
      if (heroRef.current) {
        heroRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (card.action === "navigate") {
      navigate(card.path);
    }
  };
  
  useEffect(() => {
    if (isTyping) {
      if (charIndex < messages[currentMessageIndex].length) {
        const timer = setTimeout(() => { 
          setDisplayedMessage(prev => prev + messages[currentMessageIndex][charIndex]); 
          setCharIndex(prev => prev + 1); 
        }, 70);
        return () => clearTimeout(timer);
      } else { 
        const timer = setTimeout(() => setIsTyping(false), 1500); 
        return () => clearTimeout(timer); 
      }
    } else {
      if (charIndex > 0) { 
        const timer = setTimeout(() => { 
          setDisplayedMessage(prev => prev.slice(0, -1)); 
          setCharIndex(prev => prev - 1); 
        }, 40); 
        return () => clearTimeout(timer); 
      }
      else { 
        setCurrentMessageIndex(prev => (prev + 1) % messages.length); 
        setIsTyping(true); 
      }
    }
  }, [charIndex, isTyping, currentMessageIndex]);
  
  useEffect(() => {
    if (videoRef.current) isPlaying ? videoRef.current.play() : videoRef.current.pause();
  }, [isPlaying]);
  
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  return (
    <div className="bg-white text-white overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <video 
          ref={videoRef} 
          className="absolute inset-0 w-full h-full object-cover" 
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline
        >
          <source src={BgVideo} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-24 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-16 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 right-20 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Global Church</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            TRUELIGHT
            <br />
            GLORY HOUSE
          </motion.h1>
          
          <motion.h2 
            className="text-lg md:text-xl font-medium text-blue-100/90 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Disciple the Nations and Discipline the Devil
          </motion.h2>
          
          <motion.div 
            className="w-24 h-0.5 bg-blue-400 mb-10 rounded-full"
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ delay: 0.8, duration: 0.6 }} 
          />
          
          <div className="flex flex-col items-center">
            <motion.button 
              onClick={() => setShowLinks(!showLinks)} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-semibold rounded-full transition-all duration-300 shadow-lg flex items-center gap-2 hover:scale-105"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1, duration: 0.6 }}
            >
              WATCH LIVE 
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <AnimatePresence>
              {showLinks && (
                <motion.div 
                  className="flex gap-4 mt-6"
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 15 }} 
                  transition={{ duration: 0.3 }}
                >
                  <a 
                    href="https://www.facebook.com/share/14FCmAPmKPZ/?mibextid=wwXIfr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-600/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.246h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a 
                    href="https://youtube.com/@truelightgloryhouse?si=EnPJSZlzoefOGNQs" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-red-600/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg hover:scale-110"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* Message Section */}
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="min-h-[3rem] sm:min-h-[4rem]">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-blue-900 leading-tight">
                {displayedMessage}
                <motion.span 
                  className="inline-block w-0.5 bg-blue-600 h-8 sm:h-12 ml-1 align-bottom"
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }} 
                />
              </h1>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Join a vibrant community of believers where faith comes alive. Discover your purpose, 
              grow spiritually, and experience God's transformative power in a welcoming family atmosphere.
            </p>
            
            <motion.div 
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-900 font-medium text-lg max-w-md"
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              "You're not just visiting — you're home."
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img 
                src={pama}
                alt="Church Gathering" 
                className="rounded-2xl shadow-xl w-full max-w-md object-cover hover:scale-105 transition-transform duration-300" 
              />
              
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent"></div>
              
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
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
                variants={fadeUp(index)}
                viewport={{ once: true }}
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
      
      {/* Regular Activities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Regular Activities
            </h2>
            <p className="text-lg text-gray-600">
              Join us for these special gatherings
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="h-40 bg-gray-200 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      {event.date}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-start gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-500 mt-1" />
                    <div className="text-sm text-gray-600">
                      {Array.isArray(event.time) ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {event.time.map((time, i) => (
                            <li key={i}>{time}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>{event.time}</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Cards Section */}
      <section className="bg-white py-16 overflow-hidden">
        <div className="w-full">
          <div className="flex w-max animate-scroll space-x-8">
            {seamlessCards.map((card, index) => (
              <motion.div 
                key={`${card.title}-${index}`} 
                className="relative w-[280px] md:w-[320px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border border-yellow-400/20" 
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.3 }}
                onClick={() => handleCardAction(card)}
              >
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-blue-900/50 to-transparent z-10" />
                <div className="relative z-20 h-full flex flex-col justify-between p-6 text-white">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-400">{card.titleTop}</h4>
                    <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg">{card.title}</h2>
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
              alt={pastorInfo.title} 
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
            <div className="text-yellow-400 text-base font-bold tracking-widest uppercase">{pastorInfo.subtitle}</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-wide uppercase bg-gradient-to-r from-white via-gray-100 to-yellow-100 bg-clip-text text-transparent">{pastorInfo.title}</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">{pastorInfo.description}</p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a 
              href={`mailto:${pastorInfo.email}`} 
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors bg-blue-900/30 px-4 py-2 rounded-lg border border-yellow-400/30 hover:border-yellow-400/60 backdrop-blur-sm"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">{pastorInfo.email}</span>
            </a>
          </div>
        </motion.div>
      </section>
      
      <Footer currentYear={getCurrentYear()} />
      
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