import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, } from 'framer-motion';
import Footer from '../components/Footer';
import HomeHero from '../components/HomeHero';
import CardsAndPastorPage from '../components/CardsPast';
import CommunityPage from '../components/SMR';
import HeroSection from '../components/MessageHero';



const messages = [
  "This is The Great Family of God", 
  "Great Reward in Serving God", 
  "God is Still Saving Lives Now", 
  "Let Your Light Shine Bright"
];




const cards = [
  { titleTop: "Join Our Community", title: "Get Involved", button: "Learn More", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767188571/da0ec241-15a8-488f-9f97-37cdc78f8231.png', action: "navigate", path: "/about" },
  { titleTop: "Give Generously", title: "Donate Today", button: "Give Now", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767188932/1486b35a-4207-41f1-871e-7174963a4e28.png', action: "navigate", path: "/support" },
  { titleTop: "Connect With Us", title: "Contact", button: "Connect", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269723/58f8888d-aab4-47d5-83e3-0337e9be767a.png', action: "navigate", path: "/contact"  },
  { titleTop: "Listen To Our Sermons", title: "Sermons", button: "Listen", image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767188371/56c60b29-3f46-40e5-b495-3962e95b1b15.png', action: "navigate", path: "/sermons"  }
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
      <HomeHero />
      
     <HeroSection />
      
      <CommunityPage />
      
     <CardsAndPastorPage />
      
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