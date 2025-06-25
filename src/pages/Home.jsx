import papa from '../assets/papa.jpg'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import { useInView } from "react-intersection-observer";
import Video from '../assets/truelight-video1.mp4'
import Gathering from '../assets/celebrate.jpg'
import C01 from '../assets/Gathering2.jpg'
import C02 from '../assets/streamline.jpg'
import C03 from '../assets/give.png'
import C04 from '../assets/truelight-photo2.jpg'
import C05 from '../assets/choir5.jpg'

// import Gathering from '../assets/celebrate.jpg'
// import Gathering from '../assets/celebrate.jpg'


const messages = [
  "This is The Great Family of God",
  "Great Reward in Serving God",
  "God is Still Saving Lives Now",
  "Let Your Light Shine Bright",
];



export default function Home() {
  
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0" />

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

    <div
      ref={ref}
      className="min-h-screen bg-white flex items-center justify-center px-6 pt-[3em] pb-16"
    >
      <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-11">
        {/* Left Content */}
        <motion.div
          className="flex-1 w-full space-y-8 relative z-10"
          initial={{ opacity: 0, y : 300 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold shadow-xl mx-[2em]">
            <span role="img" aria-label="house" className="mr-2">⛪</span> WE LOVE AND CELEBRATE YOU!
          </div>

          {/* Animated Message */}
          <div className="relative min-h-[6rem] sm:min-h-[10rem] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                className="text-3xl sm:text-5xl md:text-6xl xl:text-6xl text-center font-black text-gray-900 tracking-tight absolute w-full"
                initial={{ opacity: 0, y: 300, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.8 }}
              >
                {messages[index]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <p className="sm:text-lg text-center leading-relaxed text-gray-700 max-w-xl">
            Join a vibrant community of believers. Explore events, messages and divine transformation. Your spiritual journey starts now.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 inline-block px-6 py-3 mx-[4em] bg-blue-950 text-white font-semibold rounded-xl shadow-lg transition duration-300"
          >
            Join The Movement
          </motion.button>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.1 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <img
            src={Gathering}
            alt="Gathering"
            className="rounded-xl shadow-xl w-full max-w-md lg:max-w-full object-cover"
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

    
    <section className="min-h-screen bg-gradient-to-b from-black/100 via-black/60 to-black/100 text-white flex flex-col lg:flex-row items-center justify-center px-6 py-20 gap-12 ">
      {/* Left Image Section */}
      <div className=" w-full lg:w-1/2 ">
        <img
          src={papa}
          alt="Lead Pastor"
          className="w-full h-auto object-cover rounded-[9em]"
        />
      </div>

      {/* Right Text Section */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        {/* Logo and Heading */}
        <div className="space-y-2">
          <div className="text-gray-300 text-sm font-bold tracking-widest">GLOBAL</div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
            Our Lead Pastor
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg leading-relaxed text-gray-300">
          Pastor Ifeanyi Uwakwe is the visionary founder and lead pastor of Truelight Glory House,
          an enormous passion for the young, positioned to spread the gospel and helping people discover their purpose in Christ.
          With a strong passion for the Word of God and a heart for missions, Pastor Ifeanyi has led the church to establish over 30 campuses
          across Nigeria and the UK, all while inspiring countless lives to grow in their faith and embrace
          the life-changing power of Christ.
        </p>

        {/* Button */}
        <div>
          <button className="mt-4 px-6 py-3 border border-white rounded-full text-white hover:bg-gray-600 transition-all duration-300">
            READ MORE
          </button>
        </div>
      </div>
    </section>
  
  <section className="bg-gradient-to-b from-blue-950 via-blue-400 to-blue-950 py-20 px-4 md:px-10 text-white">
      <div className="max-w-6xl mx-auto bg-blue-100 text-blue-950 rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden transition-all duration-700 ease-in-out">
        
        {/* Background Hand SVG */}
        <img
          src="/your-hand-image.svg" // Replace this with your actual image
          alt="hand art"
          className="absolute bottom-0 right-0 opacity-20 w-72 md:w-[400px] pointer-events-none"
        />

        {/* Headline */}
        <h2 className="text-[2.3em] md:text-5xl uppercase font-extrabold font-poppins tracking-tight ">
  GIVE INTO  TRUELIGHT GLORY HOUSE
</h2>


        {/* Description */}
        <p className="text-lg mb-8 max-w-xl text-blue-800">
          Your generosity keeps blessing lives, thank you for giving.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-white text-blue-900 font-bold py-3 px-6 rounded-full shadow hover:bg-blue-50 transition">
            GIVE NOW
          </button>
          <button className="bg-blue-700 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-800 transition">
            BUILDING PROJECT
          </button>
        </div>
      </div>
    </section>
 </div>
  

  );
}
   


   
  



