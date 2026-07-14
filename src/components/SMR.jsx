import { motion } from 'framer-motion';

// Animation Variants

// 1. For the Card Container: Handles the card sliding up AND staggering its children
const cardContainer = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15 // Delays the animation of children elements
    }
  }
};

// 2. For Internal Elements (Text, Blocks): Fade up
const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// 3. For Images: Scale and Fade
const imageReveal = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

// 4. For simple stats (single element animation)
const statItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// Data: Stats
const stats = [
  { number: "1500+", label: "Members" },
  { number: "10+", label: "Years Serving" },
  { number: "22", label: "Ministry Units" },
  { number: "1000+", label: "Lives Changed" }
];

// Data: Ministries
const ministries = [
  {
    title: "Lighters Choir",
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1771218620/5fde9441-7fd6-4d81-be1e-9f6f7a48a3c0.png',
    description: "Leading the congregation into the presence of God through worship and praise."
  },
  {
    title: "TL Media",
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767189143/a4de81d8-0602-4333-baee-55a39e76aad5.png',
    description: "Leveraging skill and expertise to share the Gospel and amplify the church's message."
  },
  {
    title: "TL Creatives",
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1771218817/a1d81aed-4889-4fc9-8e8f-6076e62ad4a5.png',
    description: "Using artistic gifts to glorify God and enhance the experience in church."
  },
  {
    title: "Young Achievers Network",
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767187046/yanphotoo_ispvis.jpg',
    description: "Empowering the teens to grow in faith, leadership, and purpose."
  }
];

// Data: Regular Activities
const upcomingEvents = [
  {
    title: "3 Super Services",
    day: "Sunday",
    times: [
      { label: "1st", time: "7:00 AM" },
      { label: "2nd", time: "8:30 AM" },
      { label: "3rd", time: "10:30 AM" }
    ],
    description: "Join us every Sunday as we fellowship in God's house",
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767187757/3521f5bb-441b-4715-8173-31f3f0ded370.png'
  },
  {
    title: "Word Feast",
    day: "Tuesday",
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767187879/b63529f4-a17d-4678-a33a-0a775671e4fb.png',
    time: "5:00 PM",
    description: "We let the word transform our lives"
  },
  {
    title: "Prayer Meeting",
    day: "Friday",
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767188029/home-page_fx0wwv.jpg',
    time: "5:00 PM",
    description: "We wait on the Lord in fervent prayers"
  },
  {
    title: "Teens Church",
    day: "Saturday",
    image: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767187046/yanphotoo_ispvis.jpg',
    time: "1:00 PM",
    description: "Vibrant teenagers fellowship together in His presence"
  }
];

export default function CommunityPage() {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">

      {/* Stats Section */}
      <section id="stats-section" className="relative py-16 sm:py-24 md:py-32 bg-white border-y-8 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Large Impact Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
            className="mb-12 sm:mb-20"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-black text-gray-900 leading-none tracking-tighter">
              1500<span className="text-blue-600">+</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-600 mt-2 sm:mt-4">
              people call this home
            </p>
          </motion.div>

          {/* Stats Grid - Each item animates independently */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {stats.slice(1).map((stat, index) => (
              <motion.div
                key={index}
                variants={statItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="border-l-4 border-blue-600 pl-6 sm:pl-8"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            className="mb-12 sm:mb-20 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-blue-600"></div>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Get Involved</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-gray-900 leading-none mb-6">
              Ministries
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
              Where passion meets purpose
            </p>
          </motion.div>

          {/* Plain container - Animation is handled per card */}
          <div className="space-y-6 sm:space-y-8">
            {ministries.map((ministry, index) => (
              <motion.div
                key={index}
                variants={cardContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of card is visible
                className="group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">

                  {/* Image Side */}
                  <motion.div
                    className={`relative h-64 sm:h-80 lg:h-96 overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                    variants={imageReveal}
                  >
                    <img
                      src={ministry.image}
                      alt={ministry.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-colors duration-500"></div>
                  </motion.div>

                  {/* Content Side */}
                  <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                    <motion.div variants={fadeUpItem} className="w-16 h-1 bg-blue-600 mb-6"></motion.div>
                    <motion.h3 variants={fadeUpItem} className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                      {ministry.title}
                    </motion.h3>
                    <motion.p variants={fadeUpItem} className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      {ministry.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Activities Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            className="mb-12 sm:mb-20 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-blue-600"></div>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Weekly</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-gray-900 leading-none mb-6">
              Schedule
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
              Your week with us
            </p>
          </motion.div>

          {/* Plain Grid - Animation is handled per card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                variants={cardContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of card is visible
                className="group relative"
              >
                <div className="relative bg-white border-2 border-gray-200 hover:border-blue-600 transition-all duration-500 overflow-hidden h-full">

                  {/* Blue Accent Corner */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-blue-600 border-l-[60px] border-l-transparent group-hover:border-t-[80px] group-hover:border-l-[80px] transition-all duration-500 z-10"></div>

                  {/* Day Label */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="text-white font-black text-xs uppercase tracking-widest transform -rotate-45 origin-center">
                      {event.day}
                    </div>
                  </div>

                  {/* Image */}
                  <motion.div
                    className="relative h-56 sm:h-64 overflow-hidden"
                    variants={imageReveal}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700  group-hover:grayscale-0"
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    <motion.h3 variants={fadeUpItem} className="text-xl sm:text-2xl font-black text-gray-900 mb-4 leading-tight">
                      {event.title}
                    </motion.h3>

                    {/* Time */}
                    <motion.div variants={fadeUpItem} className="mb-6">
                      {event.times ? (
                        <div className="grid grid-cols-3 gap-3">
                          {event.times.map((t, i) => (
                            <div key={i} className="text-center bg-gray-50 py-3 px-2">
                              <div className="text-xs font-bold text-blue-600 mb-1">{t.label}</div>
                              <div className="text-sm font-black text-gray-900">{t.time}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="inline-block bg-blue-600 text-white px-6 py-3">
                          <div className="text-xl font-black">{event.time}</div>
                        </div>
                      )}
                    </motion.div>

                    <motion.p variants={fadeUpItem} className="text-sm text-gray-600 leading-relaxed">
                      {event.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}  