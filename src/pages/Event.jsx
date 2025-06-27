import { useEffect, useState } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react'; // Example icons
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import events from '../components/Eventside.jsx';


// Import event-specific images
import EventHero from '../assets/streamline.jpg'; // Example
// import WorkshopImage from '../assets/papa.jpg'; // Example
// import CommunityGathering from '../assets/Gathering2.jpg'; // Example
// At the top of your Events.jsx
// import EventHero from '../assets/papa2.jpg';
import WorkshopImage from '../assets/Give11.jpg';
import AnotherWorkshopImage from '../assets/papa.jpg'; // Import new image
import YetAnotherWorkshopImage from '../assets/papa.jpg'; // Import new image

import CommunityGathering from '../assets/Give.jpeg';
import AnotherCommunityImage from '../assets/Gathering2.jpg'; // Import new image
import YetAnotherCommunityImage from '../assets/Give.png'; // Import new image

// Add imports for new event images
import YouthHangout1 from '../assets/papa.jpg';
import YouthHangout2 from '../assets/papa2.jpg';
import CouplesDinner1 from '../assets/papa3.jpg';
import CouplesDinner2 from '../assets/choir1.jpg';
import PrayerSummit2 from '../assets/choir2.jpg';
import PrayerSummit1 from '../assets/choir3.jpg';
import ChristmasCarol1 from '../assets/choir4.jpg';
import ChristmasCarol2 from '../assets/choir5.jpg';
import NewYearEve1 from '../assets/Give.jpeg';
import NewYearEve2 from '../assets/papa.jpg';
import FirstFruits1 from '../assets/papa.jpg';
import FirstFruits2 from '../assets/papa.jpg';

export default function Events() {
  const eventSlogans = [
    'Connect, Grow, Serve.',
    'Experience Community.',
    'Your Journey, Our Events.',
    'Bringing Hearts Together.'
  ];

  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [backspace, setBackspace] = useState(false);

  useEffect(() => {
    // Re-use the typing effect for event slogans
    const timeout = setTimeout(() => {
      setText(eventSlogans[i].substring(0, j));

      if (!backspace) {
        if (j < eventSlogans[i].length) {
          setJ(j + 1);
        } else {
          setBackspace(true);
        }
      } else {
        if (j > 0) {
          setJ(j - 1);
        } else {
          setBackspace(false);
          setI((i + 1) % eventSlogans.length);
        }
      }
    }, backspace ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [i, j, backspace, eventSlogans]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Example event data (you'd likely fetch this from an API)
 // Inside your Events.jsx
const upcomingEvents = [
  {
    id: 1,
    title: 'WORLD CHANGERS CONVENTION',
    date: 'July 20, 2025',
    time: '9:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    description: 'A day of empowering talks and workshops for leaders.',
    // Changed 'image' to 'images' (an array)
    images: [
      WorkshopImage,
      AnotherWorkshopImage, // Make sure to import these
      YetAnotherWorkshopImage,
    ],
    link: '/events/leadership-summit'
  },
  {
    id: 2,
    title: 'Community Outreach Day',
    date: 'August 15, 2025',
    time: '10:00 AM - 2:00 PM',
    location: 'Various Community Centers',
    description: 'Join us as we serve our local community.',
    // Changed 'image' to 'images' (an array)
    images: [
      CommunityGathering,
      AnotherCommunityImage, // Make sure to import these
      YetAnotherCommunityImage,
    ],
    link: '/events/outreach-day'
  },
  // ... (repeat for your other events, ensuring unique IDs)
  {
    id: 3, // Ensure unique ID for each event!
    title: 'Youth Hangout',
    date: 'September 5, 2025',
    time: '4:00 PM - 7:00 PM',
    location: 'Youth Center',
    description: 'Fun and fellowship for our youth.',
    images: [
      YouthHangout1,
      YouthHangout2,
    ],
    link: '/events/youth-hangout'
  },
  {
    id: 4, // Unique ID
    title: 'Couples Dinner',
    date: 'October 10, 2025',
    time: '6:00 PM - 9:00 PM',
    location: 'Church Hall',
    description: 'An evening of romance and spiritual growth for couples.',
    images: [
      CouplesDinner1,
      CouplesDinner2,
    ],
    link: '/events/couples-dinner'
  },
  {
    id: 5, // Unique ID
    title: 'Prayer Summit',
    date: 'November 1, 2025',
    time: '7:00 PM - 9:00 PM',
    location: 'Sanctuary',
    description: 'A powerful night of intercession and worship.',
    images: [
      PrayerSummit1,
      PrayerSummit2,
    ],
    link: '/events/prayer-summit'
  },
  {
    id: 6, // Unique ID
    title: 'Christmas Carol',
    date: 'December 24, 2025',
    time: '6:00 PM - 8:00 PM',
    location: 'Main Auditorium',
    description: 'Celebrate the birth of Christ with joyous carols.',
    images: [
      ChristmasCarol1,
      ChristmasCarol2,
    ],
    link: '/events/christmas-carol'
  },
  {
    id: 7, // Unique ID
    title: 'New Year\'s Eve Service',
    date: 'December 31, 2025',
    time: '9:00 PM - 12:00 AM',
    location: 'Main Auditorium',
    description: 'Cross over into the new year with praise and worship.',
    images: [
      NewYearEve1,
      NewYearEve2,
    ],
    link: '/events/new-year-service'
  },
  {
    id: 8, // Unique ID
    title: 'First Fruits Service',
    date: 'January 5, 2026',
    time: '9:00 AM - 12:00 PM',
    location: 'Main Auditorium',
    description: 'Dedicated to offering the first fruits of the new year to God.',
    images: [
      FirstFruits1,
      FirstFruits2,
    ],
    link: '/events/first-fruits'
  },
];
  const pastEvents = [
    // Example past events
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <img src={EventHero} alt="Event Background" className="w-full h-full object-cover absolute top-0 left-0 z-0" />
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
            "Connecting hearts, sharing joy, building faith together."
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

      {/* Upcoming Events Section */}
      <section className="bg-white px-4 md:px-6 py-16 text-gray-900">
        <motion.div
          className="mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center">
            <div>
              <button className="px-4 py-1.5 rounded-full bg-blue-100 text-sm font-semibold">
                __ MARK YOUR CALENDARS
              </button>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
                MAJOR EVENTS
              </h2>
            </div>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl">
              Discover our exciting upcoming events designed to foster growth and community.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              className="bg-blue-50 p-6 rounded-2xl shadow-lg flex flex-col gap-4 transform transition-transform duration-300 hover:scale-[1.02]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <img src={event.images} alt={event.title} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-bold text-blue-900">{event.title}</h3>
              <p className="text-gray-700">{event.description}</p>
              <div className="flex items-center text-gray-600 gap-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date} at {event.time}</span>
              </div>
              <div className="flex items-center text-gray-600 gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <a href={event.link} className="flex items-center mt-auto text-blue-700 font-semibold hover:underline">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past Events Section (Optional, similar structure) */}
      {/*
      <section className="bg-gray-100 px-4 md:px-6 py-16 text-gray-900 mt-16">
        <motion.div
          className="mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
            OUR PAST GATHERINGS
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl">
            A look back at some of our memorable events.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((event) => (
            // ... similar card structure for past events
          ))}
        </div>
      </section>
      */}

      {/* Newsletter */}
      <section className="bg-blue-950 text-white py-20 px-6 mt-24 text-center">
        <motion.div className="max-w-2xl mx-auto space-y-6" initial="hidden" whileInView="visible" variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest">STAY UPDATED ON EVENTS</h2>
          <p className="text-gray-300 text-lg">Never miss an event! Sign up for our event notifications.</p>
          <form className="flex flex-col md:flex-row justify-center gap-4">
            <input type="email" placeholder="Email address" className="px-6 py-3 rounded-full bg-white/20 text-white placeholder:text-gray-300 focus:outline-none w-[20rem] md:w-[24rem]" required />
            <button type="submit" className="bg-white text-blue-950 font-bold px-6 py-3 rounded-full">SUBSCRIBE</button>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}