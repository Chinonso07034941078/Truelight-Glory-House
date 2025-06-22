import bgimg from '../assets/truelight-photo2.jpg'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typed from "react-typed";

export default function Home() {
   const messages = [
    "SERVING GOD PAYS!",
    "WELCOME HOME!",
    "YOU'RE NOT ALONE!",
    "GOD'S GRACE ABOUNDS!",
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const nextMessage = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % messages.length);
  };

  const prevMessage = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };
  return (
    
    <div className="bg-white text-white ">
      {/* Hero Section */}
       <section
      className="relative h-[700px] lg:h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0"></div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-10">
        <div className="text-white text-xl md:text-2xl font-extrabold flex items-center gap-2">
          TRUELIGHT GLORY HOUSE <span className="text-red-500">∞</span>
        </div>
        <div className="md:hidden">
          <button className="text-white text-3xl">☰</button>
        </div>
      </nav>

      {/* Vision Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <button className="bg-white/10 text-white px-4 py-1 rounded-full border border-white mb-4 text-xs font-semibold tracking-widest uppercase">
          ● Our Vision
        </button>

        {/* Typed Effect */}
        <h1 className="text-3xl md:text-6xl font-extrabold leading-tight max-w-4xl text-white">
          <Typed
            strings={[
              "WE DISCIPLE THE NATIONS",
              "AND DISCIPLINE THE DEVIL",
            ]}
            typeSpeed={50}
            backSpeed={30}
            loop
          />
        </h1>

        {/* Watch Button */}
        <button className="mt-6 bg-white text-black px-6 py-3 text-sm font-semibold rounded-full hover:bg-yellow-300 transition duration-300 shadow-lg">
          WATCH LIVE
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-10">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
      
     <div className="min-h-screen bg-white flex flex-col items-start p-8 pt-[8em]">
      <div className="flex flex-col items-start ml-8">
        <div className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
          <span role="img" aria-label="house" className="mr-2">⛪</span> WELCOME TO TRUELIGHT
        </div>

        {/* Animate Message */}
        <div className="h-[4.5rem] overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              className="text-6xl lg:text-7xl text-black leading-tight font-extrabold absolute"
              initial={{ x: direction * 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 200, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {messages[index]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <p className="text-lg text-gray-700 mb-8 max-w-xl">
          Dive into our teachings, events and community.<br />
          Your journey of faith begins here.
        </p>

        <div className="flex space-x-4">
          <button onClick={prevMessage} className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={nextMessage} className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
 </div>
  

  );
}
   


   
  



