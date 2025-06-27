// Clean, enhanced Events.jsx page with transitions and animations

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react'; // Added icons for events
import Footer from '../components/Footer';

// Import your event specific background images here
import eventHeroBg from '../assets/papa.jpg'; // Replace with an actual image path
import eventCardBg1 from '../assets/papa3.jpg'; // Replace with an actual image path
import eventCardBg2 from '../assets/papa2.jpg'; // Replace with an actual image path

export default function Events() {
  const messages = [
    'Discover our upcoming gatherings.',
    'Experience faith, fellowship, and growth.',
    'Join us for impactful events.',
    'Celebrating God’s goodness together.',
    'Mark your calendars!'
  ];

  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [backspace, setBackspace] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(messages[i].substring(0, j));

      if (!backspace) {
        if (j < messages[i].length) {
          setJ(j + 1);
        } else {
          setBackspace(true);
        }
      } else {
        if (j > 0) {
          setJ(j - 1);
        } else {
          setBackspace(false);
          setI((i + 1) % messages.length);
        }
      }
    }, backspace ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [i, j, backspace]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  // Placeholder Event Data (replace with actual data from a CMS or API)
  const upcomingEvents = [
    {
      id: 1,
      title: 'Annual Revival Summit',
      date: 'August 15 - 18, 2025',
      time: '6:00 PM Daily',
      location: 'Church Auditorium, Owerri',
      description: 'A powerful time of spiritual renewal, worship, and impactful teachings.',
      image: eventCardBg1,
    },
    {
      id: 2,
      title: 'Youth Empowerment Conference',
      date: 'September 22, 2025',
      time: '9:00 AM - 3:00 PM',
      location: 'Main Hall, Owerri',
      description: 'Equipping the next generation with divine wisdom and practical skills for success.',
      image: eventCardBg2,
    },
    {
      id: 3,
      title: 'Couples Connect Seminar',
      date: 'October 5, 2025',
      time: '4:00 PM',
      location: 'Community Center',
      description: 'Strengthening marital bonds through faith-based principles and interactive sessions.',
      image: eventHeroBg, // Placeholder, use another image if available
    },
  ];

  const pastEvents = [
    {
      id: 101,
      title: 'Easter Fiesta 2025',
      date: 'March 31, 2025',
      location: 'Church Grounds',
      description: 'A joyous celebration of Christ\'s resurrection with music, drama, and fellowship.',
      image: eventCardBg1,
    },
    {
      id: 102,
      title: 'Leadership Workshop',
      date: 'February 10, 2025',
      location: 'Leadership Academy',
      description: 'Developing spiritual leaders for effective ministry and societal impact.',
      image: eventCardBg2,
    },
  ];

  

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <img src={eventHeroBg} alt="Events Background" className="w-full h-full object-cover absolute top-0 left-0 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-black/80 to-blue-950 z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <motion.h1
            className="text-5xl md:text-6xl uppercase font-bold mb-6"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            Our Events
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-medium italic max-w-3xl"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            "For where two or three are gathered together in my name, there am I in the midst of them."
            <br /><span className="font-bold">— Matthew 18:20</span>
          </motion.p>

          <motion.div
            className="text-xl md:text-2xl font-semibold mt-6 min-h-[2.5rem]"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <span className="border-r-2 border-white pr-1 animate-pulse">{text}</span>
          </motion.div>
        </div>
      </div>

     

      {/* Newsletter - Reused from Support.jsx */}
      <section className="bg-blue-950 text-white py-20 px-6 mt-24 text-center">
        <motion.div className="max-w-2xl mx-auto space-y-6" initial="hidden" whileInView="visible" variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest">JOIN OUR MAILING LIST</h2>
          <p className="text-gray-300 text-lg">Stay updated with our latest events and news.</p>
          <form className="flex flex-col md:flex-row justify-center gap-4">
            <input type="email" placeholder="Email address" className="px-6 py-3 rounded-full bg-white/20 text-white placeholder:text-gray-300 focus:outline-none w-[20rem] md:w-[24rem]" required />
            <button type="submit" className="bg-white text-blue-950 font-bold px-6 py-3 rounded-full">SUBMIT</button>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}