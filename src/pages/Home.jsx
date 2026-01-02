import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, ArrowRight, CalendarHeart, UserRoundPen, Users,  Heart, Sparkles, Calendar, Clock, Mail, BookOpen, CalendarDays, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { Typewriter } from 'react-simple-typewriter';
import { pastorInfo } from "../components/data";
import { HashLink } from "react-router-hash-link";

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

 const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

const upcomingEvents = [
  { 
    title: "3 Super Services", 
    date: "Every Sunday", 
    time: ["1st Service - 7:00 AM", "2nd Service - 8:30 AM", "3rd Service - 10:30 AM"], 
    description: "Join us every Sunday as we fellowship in God's house", 
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767187757/3521f5bb-441b-4715-8173-31f3f0ded370.png' 
  },
  { 
    title: "Word Feast", 
    date: "Every Tuesday", 
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767187879/b63529f4-a17d-4678-a33a-0a775671e4fb.png', 
    time: "5:00 PM", 
    description: "We let the word transform our lives" 
  },
  { 
    title: "Prayer Meeting", 
    date: "Every Friday", 
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767188029/home-page_fx0wwv.jpg', 
    time: "5:00 PM", 
    description: "We wait on the Lord in fervent prayers" 
  },
  { 
    title: "Teens Church", 
    date: "Every Saturday", 
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767187046/yanphotoo_ispvis.jpg', 
    time: "1:00 PM", 
    description: "Vibrant teenagers fellowship together in His presence" 
  }
];

const cards = [
  { titleTop: "Join Our Community", title: "Get Involved", button: "Learn More", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767188571/da0ec241-15a8-488f-9f97-37cdc78f8231.png', action: "navigate", path: "/about" },
  { titleTop: "Give Generously", title: "Donate Today", button: "Give Now", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767188932/1486b35a-4207-41f1-871e-7174963a4e28.png', action: "navigate", path: "/support" },
  { titleTop: "Connect With Us", title: "Contact", button: "Connect", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269723/58f8888d-aab4-47d5-83e3-0337e9be767a.png', action: "navigate", path: "/contact"  },
  { titleTop: "Listen To Our Sermons", title: "Sermons", button: "Listen", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767188371/56c60b29-3f46-40e5-b495-3962e95b1b15.png', action: "navigate", path: "/sermons"  }
];

const stats = [
  { number: "1500+", label: "Members", icon: Users },
  { number: "10+", label: "Years Serving", icon: CalendarHeart },
  { number: "22", label: "Ministry Units", icon: CalendarDays },
  { number: "1000+", label: "Lives Changed", icon: UserRoundPen }
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

  const [currentSlogan, setCurrentSlogan] = useState(0);
  const slogans = [
    'We Disciple the Nations and Discipline the Devil',
    'In Our Camp There Shall Be No Loss', 
    'Serving God pays and it will pay me'
  ];
  
  // Add this useEffect to cycle through slogans
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white font-light text-gray-900 overflow-x-hidden relative">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0, ease: "easeOut" }}
        >
          <source src='https://res.cloudinary.com/dnvgl9k4i/video/upload/v1767163856/truelight-video1_nqkqjd.mp4' type="video/mp4" />
        </motion.video>
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-yellow-900/60 to-blue-900/80" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-6 py-2 mb-8 border border-white/25"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Landmark className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider text-white/90">Global Church</span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          >
            <span className="font-light">TRUELIGHT </span>
            <span className="font-semibold bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent">
              GLORY HOUSE
            </span>
          </motion.h1>
          
          <motion.h2 
            className="text-lg md:text-xl font-light text-blue-200/90 mb-8 max-w-2xl tracking-wide min-h-[2rem] flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="text-blue-200/90 tracking-wide text-center leading-relaxed">
              <Typewriter
                words={['We Disciple the Nations and Discipline the Devil', 'In Our Camp There Shall Be No Loss', 'Serving God pays and it will pay me']}
                loop={true} // keeps typing infinitely
                cursor
                cursorStyle="|"
                typeSpeed={30}
                deleteSpeed={40}
                delaySpeed={300}// wait before deleting
              />
            </div>
          </motion.h2>
          
          <motion.div 
            className="w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-10"
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ delay: 0.8, duration: 0.6 }} 
          />
          
          <div className="flex flex-col items-center">
            <motion.button 
              onClick={() => setShowLinks(!showLinks)} 
              className="group bg-white/10 backdrop-blur-md text-white font-medium px-8 py-4 rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition-all duration-500 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1, duration: 0.6 }}
            >
              <span className="flex items-center gap-2">
                Watch Live
                <motion.div
                  className="w-1 h-1 bg-current rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
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
                    className="bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-blue-600 transition-all duration-300 border border-white/20 hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.246h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a 
                    href="https://youtube.com/@truelightgloryhouse?si=EnPJSZlzoefOGNQs" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-red-600 transition-all duration-300 border border-white/20 hover:scale-110"
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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1220] text-white">
        {/* Subtle texture / gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-[#0B1220] to-black opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* Overline */}
            <span className="block text-sm tracking-[0.35em] text-blue-300/80 uppercase">
              Welcome Home
            </span>

              {/* Heading - Fixed height to prevent layout shift */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-light leading-[1.05] min-h-[180px] sm:min-h-[200px] xl:min-h-[220px]">
              <span className="block opacity-80">
                {displayedMessage.split(" ").slice(0, -2).join(" ")}
              </span>
              <span className="block font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {displayedMessage.split(" ").slice(-2).join(" ")}
              </span>
            </h1>

            {/* Divider */}
            <div className="w-20 h-px bg-blue-500/60" />

            {/* Copy */}
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              This is more than a place you attend.
              <br />
              It's a family you belong to.
              A space to grow, heal, worship, and encounter God
              — together.
            </p>

            {/* Watch Service Button - now does the same as Watch Live */}
            <div className="pt-6">
              <button 
                onClick={() => setShowLinks(!showLinks)} 
                className="group bg-white/10 backdrop-blur-md text-white font-medium px-8 py-4 rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition-all duration-500 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Watch a Service
                  <motion.div
                    className="w-1 h-1 bg-current rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT — IMAGE - Reduced size */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Frame - Reduced size */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl max-w-md mx-auto">
              <img
                src="https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767186200/MAPA_bwxn13.webp"
                alt="Church Gathering"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>

            {/* Floating Scripture / Quote */}
            <div className="absolute -bottom-10 -left-10 bg-white text-gray-900 rounded-2xl p-6 max-w-xs shadow-xl">
              <p className="text-sm leading-relaxed">
                <span className="font-semibold block mb-1">
                  "You belong here."
                </span>
                No matter your story,
                there is a place for you.
              </p>
            </div>
          </motion.div>

        </div>
      </section>
      
      {/* Stats Section */}
      <section id="stats-section" className="py-24 bg-gradient-to-br from-blue-800 to-blue-900">
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                  <stat.icon className="w-8 h-8 text-blue-300" />
                </div>
                <div className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">{stat.number}</div>
                <div className="text-blue-200/80 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              <span className="font-extralight">Our</span>{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">Ministries</span>
            </h2>
            <p className="text-lg font-light text-gray-600 tracking-wide">
              Serving God with our different gifts and talents
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Lighters Choir", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767188181/84482564-9f8f-493c-9f2a-8b6ab87edbbf.png', description: "Leading the congregation into the presence of God through worship and praise." },
              { title: "TL Media", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767189143/a4de81d8-0602-4333-baee-55a39e76aad5.png', description: "Leveraging skill and expertise to share the Gospel and amplify the church's message." },
              { title: "TL Creatives", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270212/creatives2_upimvl.jpg', description: "Using artistic gifts to glorify God and enhance the experience in church." },
              { title: "Young Achievers Network", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767187046/yanphotoo_ispvis.jpg', description: "Empowering the teens to grow in faith, leadership, and purpose." },
            ].map((ministry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={ministry.image}
                    alt={ministry.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600 tracking-wide">
                      Service
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3 tracking-tight">
                    {ministry.title}
                  </h3>

                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    {ministry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Regular Activities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              <span className="font-extralight">Regular</span>{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">Activities</span>
            </h2>
            <p className="text-lg font-light text-gray-600 tracking-wide">
              Join us for these special gatherings
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    loading="lazy" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600 tracking-wide">
                      {event.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3 tracking-tight">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-start gap-2 mb-4">
                    <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div className="text-sm text-gray-600 font-light">
                      {Array.isArray(event.time) ? (
                        <div className="space-y-1">
                          {event.time.map((time, i) => (
                            <div key={i}>{time}</div>
                          ))}
                        </div>
                      ) : (
                        <span>{event.time}</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Cards Section */}
      <section className="bg-gray-50 py-16 overflow-hidden">
        <div className="w-full">
          <div className="flex w-max animate-scroll space-x-8">
            {seamlessCards.map((card, index) => (
              <motion.div 
                key={`${card.title}-${index}`} 
                className="relative w-[280px] md:w-[320px] h-[400px] flex-shrink-0 rounded-3xl overflow-hidden shadow-xl group cursor-pointer border border-white/20" 
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.3 }}
                onClick={() => handleCardAction(card)}
              >
                <img 
                  src={card.image} 
                  alt={card.title}
                  loading="lazy" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-blue-900/40 to-transparent z-10" />
                <div className="relative z-20 h-full flex flex-col justify-between p-8 text-white">
                  <div className="space-y-3">
                    <h4 className="text-xs font-medium uppercase tracking-widest text-yellow-400/90">{card.titleTop}</h4>
                    <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">{card.title}</h2>
                  </div>
                  <button className="text-sm font-medium flex items-center gap-2 uppercase hover:gap-4 transition-all group-hover:text-yellow-300 text-yellow-500 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50">
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
              src='https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269814/6dabb4de-b6a6-464c-bf4e-e63f6104c34d.png'
              alt={pastorInfo.title} 
              loading="lazy"
              className="w-full max-w-md h-auto object-cover rounded-3xl shadow-2xl mx-auto border-2 border-white/20" 
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>
       
        <motion.div 
          className="w-full lg:w-1/2 space-y-6 text-center" 
          initial={{ x: 100, opacity: 0 }} 
          whileInView={{ x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            {/* Logo positioned closer to text */}
            <div className="flex justify-center">
              <img 
                src='https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270378/truelight-logo_ta57tl.png'
                alt="logo" 
                loading="lazy"
                className="w-28 h-auto drop-shadow-lg" 
              />
            </div>
            
            {/* Text content with reduced spacing */}
            <div className="space-y-3">
              <div className="text-blue-300 text-sm font-medium tracking-widest uppercase">
                {pastorInfo.subtitle}
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                <span className="font-extralight">Pastor</span>{' '}
                <span className="font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {pastorInfo.title.split(' ').slice(1).join(' ')}
                </span>
              </h2>
            </div>
          </div>
          
          <p className="text-sm font-light leading-relaxed text-gray-300">
             {truncateText(pastorInfo.description, 820)}
          </p>
          <HashLink
               smooth
              to="/about#pastor"
              className="text-blue-500 hover:underline font-medium"
            >
              See More
        </HashLink>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href={`mailto:${pastorInfo.email}`} 
              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 hover:border-white/40 font-light"
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