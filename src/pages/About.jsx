import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import heroImage from "../assets/very6.jpg";
import papa from "../assets/papa.jpg";
import { Typewriter } from 'react-simple-typewriter';
import { BookOpen, Phone, Mail, Sparkles } from "lucide-react";
import { missionVisionValues, history, pastorInfo } from "../components/data";

export default function About() {
  return (
    <div className="text-gray-800 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-yellow-500/30 to-blue-900/90 z-10" />
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={heroImage}
            alt="Church building and community"
            className="w-full h-full object-cover object-center md:object-center sm:object-[center_20%]"
            initial={{ scale: 1.1, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        
        <div className="relative z-20 text-center text-white px-4 sm:px-6 max-w-4xl w-full mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-3 mb-6 sm:mb-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-medium uppercase tracking-wide">Divine Purpose</span>
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Welcome to Truelight Glory House
          </motion.h1>
          <motion.div
            className="text-lg sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8 h-12 sm:h-16 flex items-center justify-center px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-blue-100 italic text-center">
              <Typewriter
                words={[
                  "This is where we disciple the nations",
                  "And discipline the devil",
                ]}
                loop
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1800}
              />
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm sm:text-base"
              aria-label="Discover Our Mission"
            >
              Discover Our Mission
            </button>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section id="about-section" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-100 to-white">
        <motion.div
          className="max-w-7xl mx-auto grid gap-8 sm:gap-12 md:grid-cols-3 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          {missionVisionValues.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-2xl shadow-lg border border-yellow-100 p-6 sm:p-8 hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-yellow-100 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-yellow-600" aria-hidden="true" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-3 tracking-wide uppercase">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.content}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* History */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white relative overflow-hidden">
        {/* Background Accent Blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30 -z-10 translate-x-1/3 -translate-y-1/2" aria-hidden="true"></div>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 leading-tight tracking-tight">
            {history.title}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
            {history.content}
          </p>
        </motion.div>
      </section>

      {/* Pastor's section */}
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 py-16 sm:py-24 gap-12 sm:gap-16">
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <img
              src={papa}
              alt={pastorInfo.imageAlt || "Pastor of Truelight Glory House"}
              className="w-full max-w-md h-auto object-cover rounded-[2rem] shadow-2xl mx-auto border-2 border-yellow-400/30"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-blue-900/40 to-transparent" aria-hidden="true"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20" aria-hidden="true">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-blue-900" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <div className="text-yellow-400 text-sm sm:text-base font-bold tracking-widest uppercase">
              {pastorInfo.subtitle}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wide uppercase bg-gradient-to-r from-white via-gray-100 to-yellow-100 bg-clip-text text-transparent">
              {pastorInfo.title}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            {pastorInfo.description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a 
              href={`mailto:${pastorInfo.email}`} 
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors bg-blue-900/30 px-4 py-2 rounded-lg border border-yellow-400/30 hover:border-yellow-400/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label={`Email ${pastorInfo.title}`}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">{pastorInfo.email}</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* What We Believe */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">What We Believe</h2>
          <ul className="text-left space-y-4 max-w-2xl mx-auto">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 flex-shrink-0" aria-hidden="true">✅</span>
              <span className="text-sm sm:text-base">The Bible is the inspired word of God.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 flex-shrink-0" aria-hidden="true">✅</span>
              <span className="text-sm sm:text-base">Jesus Christ is the Son of God and Savior of the world.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 flex-shrink-0" aria-hidden="true">✅</span>
              <span className="text-sm sm:text-base">Salvation is by grace through faith in Jesus.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 flex-shrink-0" aria-hidden="true">✅</span>
              <span className="text-sm sm:text-base">The Holy Spirit empowers us for holy living and service.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 flex-shrink-0" aria-hidden="true">✅</span>
              <span className="text-sm sm:text-base">The Church is the body of Christ and a light to the world.</span>
            </li>
          </ul>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}