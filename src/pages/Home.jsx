import papa from '../assets/papa.jpg'
import { useState, useEffect } from "react";
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
import { Banknote, Copy } from 'lucide-react';






const fadeZoom = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } }
};



// import Gathering from '../assets/celebrate.jpg'
// import Gathering from '../assets/celebrate.jpg'


const messages = [
  "This is The Great Family of God",
  "Great Reward in Serving God",
  "God is Still Saving Lives Now",
  "Let Your Light Shine Bright",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};



export default function Home() {
  
  const { ref:pastoref, inView:pastorview } = useInView({ triggerOnce: true, threshold: 0.3 });



 const cards = [
  {
    titleTop: "JOIN OUR COMMUNITY",
    title: "Get Involved",
    button: "LEARN MORE",
    image: C01, // Replace with your actual image path
  },
  {
    titleTop: "GIVE GENEROUSLY",
    title: "Donate Today",
    button: "GIVE NOW",
    image: C03,
  },
  // duplicate for seamless scroll
  {
    titleTop: "JOIN OUR COMMUNITY",
    title: "Get Involved",
    button: "LEARN MORE",
    image: C04,
  },
  {
    titleTop: "WATCH ONLINE",
    title: "Livestream",
    button: "WATCH",
    image: C05,
  },
];


  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-rotate messages
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000); // every 4 seconds
    return () => clearInterval(timer);
  }, []);

   const { ref, inView } = useInView({
    triggerOnce: false, // animate every time in view
    threshold: 0.2,
  });



const seamlessCards = [...cards, ...cards];
 

  return (
    
    <div className="bg-white text-white ">
      {/* Hero Section */}
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        src={Video}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-black/20 to-blue-950 z-0" />

      {/* Centered Vision Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.span
          className="text-sm md:text-base bg-white/10 text-white px-4 py-1 rounded-full border border-white uppercase tracking-widest backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
         the house of God
        </motion.span>

        <motion.h1
          className="text-4xl md:text-7xl font-extrabold text-white mt-6 drop-shadow-lg leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          EL SHADDAI
        </motion.h1>

        <motion.h2
          className="mt-7 text-xl md:text-4xl font-semibold text-blue-100 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          The LORD GOD Almighty
        </motion.h2>

        {/* Decorative Line */}
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-blue-950  via-blue-800 to-blue-950 mt-6 rounded-full shadow-lg"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        />

        {/* CTA Button */}
        <motion.button
          className="mt-8 bg-blue-950 text-white-900 px-6 py-3 text-sm font-bold rounded-full hover:bg-blue-500 transition duration-300 shadow-lg flex items-center gap-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          WATCH LIVE
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.button>

        {/* Typewriter Effect */}
        <motion.p
          className="mt-8 text-sm md:text-lg text-gray-200 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Typewriter
            words={[
              "Join us every Sunday!",
              "In Our Camp There Shall be no loss!",
              "Experience God's presence.",
              "Disciple the Nations, Discipline the devil.",
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

{/* second section */}

    <div
  ref={ref}
  className="min-h-screen bg-white flex items-center justify-center px-6 py-20"
>
  <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-14">
    {/* Left Text Section */}
    <motion.div
      className="flex-1 w-full space-y-8"
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      {/* Welcome Badge */}
     

      {/* Animated Headline */}
      <div className="relative min-h-[4rem] sm:min-h-[7rem] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-blue-950 tracking-tight text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            {messages[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Subtext */}
      <p className="text-gray-700 text-center lg:text-left text-base sm:text-lg leading-relaxed max-w-xl">
        Join a vibrant community of believers. Discover purpose, grow in faith, and experience God's power in a welcoming spiritual family.
      </p>

      {/* Typing CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-center font-semibold text-sm sm:text-base backdrop-blur-sm shadow-md max-w-md"
      >
        <Typewriter
          words={[
            "You're not just visiting — you're home.",
            "God is writing your story here.",
            "Come grow your faith with a loving family.",
            "Destiny meets purpose at TLGH.",
            "We’re saving a seat just for you!",
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

    {/* Right Visual */}
    <motion.div
      className="flex-1 flex justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <img
        src={Gathering}
        alt="Gathering"
        className="rounded-full shadow-2xl w-full max-w-md lg:max-w-lg object-cover"
      />
    </motion.div>
  </div>
</div>

      

      {/* Image slider section */}
     <section className="bg-white py-12 overflow-hidden">
  <div className="w-full">
    <div className="flex w-max animate-scroll space-x-6">
      {seamlessCards.map((card, index) => (
        <div
          key={index}
          className="relative w-[300px] md:w-[400px] h-[480px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
          <div className="relative z-20 h-full flex flex-col justify-between p-6 text-white">
            <div>
              <h4 className="text-sm font-semibold uppercase">
                {card.titleTop}
              </h4>
              <h2 className="text-3xl font-bold">{card.title}</h2>
            </div>
            <button className="text-sm font-semibold flex items-center gap-1 uppercase hover:underline">
              {card.button} →
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Lead pastors section */}
    
   
 <section className="min-h-screen bg-gradient-to-b from-black via-black/70 to-black text-white flex flex-col lg:flex-row items-center justify-center px-6 py-20 gap-12">
  <motion.div
    className="w-full lg:w-1/2"
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <img
      src={papa}
      alt={pastorInfo.imageAlt}
      className="w-full h-auto object-cover rounded-[9em]"
    />
  </motion.div>

  <motion.div
    className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
    initial={{ x: 100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div>
      <div className="text-gray-300 text-sm font-bold tracking-widest">{pastorInfo.subtitle}</div>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">{pastorInfo.title}</h2>
    </div>
    <p className="text-lg leading-relaxed text-gray-300">
      {pastorInfo.description}
    </p>
  </motion.div>
</section>

 

    <Footer />
 </div>
  

  );
}
   


   
  



