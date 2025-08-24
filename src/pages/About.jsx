import { motion } from 'framer-motion';
import "react-lazy-load-image-component/src/effects/blur.css"; // for blur effect
import "react-lazy-load-image-component/src/effects/opacity.css"; // for fade-in
import Footer from "../components/Footer";
import heroImage from "../assets/very6.jpg";
import papa from "../assets/papa.jpg";
import { Typewriter } from 'react-simple-typewriter';
import { BookOpen, Phone, Mail, Sparkles } from "lucide-react";
import { missionVisionValues, history, pastorInfo } from "../components/data";

export default function About() {
  return (
    <div className="text-gray-900 font-light overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-yellow-900/60 to-blue-900/80 z-10" />
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={heroImage}
            alt="Church building and community"
            className="w-full h-full object-cover object-center md:object-center sm:object-[center_20%]"
            initial={{ scale: 1.05, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0, ease: "easeOut" }}
          />
        </div>
        
        <div className="relative z-20 text-center text-white px-4 sm:px-6 max-w-4xl w-full mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 sm:px-6 py-3 mb-6 sm:mb-8 border border-white/25"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-blue-300" aria-hidden="true" />
            <span className="text-sm font-medium tracking-wider text-white/90">Divine Purpose</span>
          </motion.div>
          
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 leading-tight tracking-tight px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-extralight">Welcome to</span>{' '}
            <span className="font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Truelight Glory House
            </span>
          </motion.h1>
          
          <motion.div
            className="text-lg sm:text-xl font-light mb-6 sm:mb-8 h-12 sm:h-16 flex items-center justify-center px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-blue-200/90 tracking-wide text-center leading-relaxed">
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
            className="flex flex-col sm:flex-row gap-4 justify-center sm:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-white/10 backdrop-blur-md text-white font-medium tracking-wide px-6 py-3 rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm sm:text-base"
              aria-label="Discover Our Mission"
            >
              <span className="flex items-center justify-center gap-2">
                Discover Our Mission
                <motion.div
                  className="w-1 h-1 bg-current rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section id="about-section" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
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
              className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:border-blue-200 p-6 sm:p-8 hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-full mb-6 border border-blue-200/30">
                <BookOpen className="w-8 h-8 text-blue-600" aria-hidden="true" />
              </div>
              <h2 className="text-xl sm:text-2xl font-light tracking-tight text-gray-900 mb-4">
                <span className="font-extralight">{item.title.split(' ').slice(0, -1).join(' ')}</span>{' '}
                <span className="font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                  {item.title.split(' ').slice(-1)[0]}
                </span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed tracking-wide">
                {item.content}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* History */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white relative overflow-hidden">
        {/* Background Accent Blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 -z-10 translate-x-1/3 -translate-y-1/2" aria-hidden="true"></div>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-6 leading-tight">
            <span className="font-extralight"></span>{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              {history.title}
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed tracking-wide">
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
              className="w-full max-w-md h-auto object-cover rounded-3xl shadow-2xl mx-auto border-2 border-white/20"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-900/20 to-transparent" aria-hidden="true"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20" aria-hidden="true">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
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
            <div className="text-blue-300 text-sm sm:text-base font-medium tracking-widest uppercase">
              {pastorInfo.subtitle}
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">
              <span className="font-extralight">Pastor</span>{' '}
              <span className="font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {pastorInfo.title.split(' ').slice(1).join(' ')}
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base font-light leading-relaxed text-gray-300 tracking-wide">
            {pastorInfo.description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a 
              href={`mailto:${pastorInfo.email}`} 
              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 hover:border-white/40 font-light focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label={`Email ${pastorInfo.title}`}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm tracking-wide">{pastorInfo.email}</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* What We Believe */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-gray-900 mb-8">
            <span className="font-extralight">What We</span>{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              Believe
            </span>
          </h2>
          <ul className="text-left space-y-6 max-w-2xl mx-auto">
            <li className="flex items-start">
              <span className="text-green-500 mr-3 flex-shrink-0 mt-1" aria-hidden="true">✅</span>
              <span className="text-sm sm:text-base font-light text-gray-700 leading-relaxed tracking-wide">
                The Bible is the inspired word of God.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 flex-shrink-0 mt-1" aria-hidden="true">✅</span>
              <span className="text-sm sm:text-base font-light text-gray-700 leading-relaxed tracking-wide">
                Jesus Christ is the Son of God and Savior of the world.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 flex-shrink-0 mt-1" aria-hidden="true">✅</span>
              <span className="text-sm sm:text-base font-light text-gray-700 leading-relaxed tracking-wide">
                Salvation is by grace through faith in Jesus.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 flex-shrink-0 mt-1" aria-hidden="true">✅</span>
              <span className="text-sm sm:text-base font-light text-gray-700 leading-relaxed tracking-wide">
                The Holy Spirit empowers us for holy living and service.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 flex-shrink-0 mt-1" aria-hidden="true">✅</span>
              <span className="text-sm sm:text-base font-light text-gray-700 leading-relaxed tracking-wide">
                The Church is the body of Christ and a light to the world.
              </span>
            </li>
          </ul>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}