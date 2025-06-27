import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import sermonHero from "../assets/truelight-photo3.jpg"; // Add your own hero image

const mockSermons = [
  {
    id: 1,
    title: "The Power of Prayer",
    topic: "prayer",
    date: "2024-11-02",
    speaker: "Pastor Ifeanyi Uwakwe",
    telegramLink: "https://t.me/TruelightChurch/1001",
  },
  {
    id: 2,
    title: "Kingdom Prosperity",
    topic: "prosperity",
    date: "2024-10-14",
    speaker: "Pastor Ifeanyi Uwakwe",
    telegramLink: "https://t.me/TruelightChurch/1002",
  },
  {
    id: 3,
    title: "Warfare Prayers for the Family",
    topic: "prayer",
    date: "2024-09-28",
    speaker: "Minister Joy",
    telegramLink: "https://t.me/TruelightChurch/1003",
  },
];

export default function Sermons() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSermons = mockSermons.filter((sermon) =>
    sermon.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden flex items-center justify-center text-white text-center px-4">
        <div className="absolute inset-0">
          <img
            src={sermonHero}
            alt="Sermon Hero"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sermons & Messages</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Dive into powerful teachings that transform lives and renew your spirit.
          </p>
        </motion.div>
      </section>

      {/* Main Sermon Section */}
      <section className="min-h-screen bg-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Search bar */}
          <div className="flex justify-center items-center mb-10 max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by topic e.g. prayer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Sermon grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.length > 0 ? (
              filteredSermons.map((sermon) => (
                <motion.div
                  key={sermon.id}
                  className="bg-white shadow-md rounded-lg p-6 text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-semibold mb-2">{sermon.title}</h2>
                  <p className="text-sm text-gray-600 mb-1">Topic: {sermon.topic}</p>
                  <p className="text-sm text-gray-600 mb-1">Speaker: {sermon.speaker}</p>
                  <p className="text-sm text-gray-500 mb-4">Date: {sermon.date}</p>
                  <a
                    href={sermon.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-950 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition"
                  >
                    Read on Telegram
                  </a>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full">No sermons found for that topic.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
