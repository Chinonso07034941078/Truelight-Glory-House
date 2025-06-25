import { motion } from "framer-motion";
import Footer from "../components/Footer";

const events = [
  {
    title: "Relationship Panadol",
    date: "Every February",
    description: "A special event addressing relationships, healing hearts, and giving godly clarity.",
    color: "bg-pink-600",
  },
  {
    title: "OAV (Outpouring and Visitation)",
    date: "Every April",
    description: "An intense spiritual revival program filled with worship, word, and wonders.",
    color: "bg-purple-700",
  },
  {
    title: "WCC (Warfare and Communion Conference)",
    date: "Every November",
    description: "A powerful conference focused on warfare prayers and communion mysteries.",
    color: "bg-blue-700",
  },
  {
    title: "EVOT Dinner",
    date: "Every December",
    description: "A glamorous end-of-year dinner with testimonies, thanksgiving, and fellowship.",
    color: "bg-yellow-600 text-black",
  },
];

export default function Events() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white text-center py-32 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Our Yearly Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg max-w-2xl mx-auto"
        >
          Get plugged into our life-changing yearly programs and special events throughout the year!
        </motion.p>
      </section>

      {/* Events Grid */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-xl shadow-lg p-6 text-white ${event.color}`}
            >
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
              <p className="text-sm mb-2 font-medium italic">{event.date}</p>
              <p className="text-sm">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
