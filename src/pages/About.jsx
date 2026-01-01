import { motion } from 'framer-motion';
import { useEffect } from 'react';
import "react-lazy-load-image-component/src/effects/blur.css"; 
import "react-lazy-load-image-component/src/effects/opacity.css"; 
import Footer from "../components/Footer";
import { Typewriter } from 'react-simple-typewriter';
import { BookOpen, Sparkles, Heart, Target, Compass, CheckCircle2 } from "lucide-react";
import { missionVisionValues, history, pastorInfo } from "../components/data";
import { useLocation } from 'react-router-dom';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const icons = [Target, Heart, Compass];

  return (
    <div className="text-gray-900 font-light overflow-x-hidden">
      {/* Hero Section - UNCHANGED */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-yellow-900/60 to-blue-900/80 z-10" />
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src='https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269348/a8745567-6e47-40b8-aab5-1b754bc5f259.png'
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

      {/* Mission, Vision, Values - REFINED */}
      <section id="about-section" className="py-20 sm:py-32 px-6 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(37, 99, 235) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 text-blue-600 text-sm font-medium tracking-wider uppercase">
                <div className="w-8 h-px bg-blue-600" />
                <span>Our Foundation</span>
                <div className="w-8 h-px bg-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
              <span className="font-extralight">Guided by</span>{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                Purpose
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {missionVisionValues.map((item, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={item.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Card */}
                  <div className="relative bg-white rounded-2xl p-8 h-full border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:shadow-xl">
                    {/* Subtle gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/30 group-hover:scale-110 transition-transform duration-500">
                          <Icon className="w-7 h-7 text-blue-600" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-light tracking-tight text-gray-900 mb-4">
                        <span className="font-extralight">{item.title.split(' ').slice(0, -1).join(' ')}</span>{' '}
                        <span className="font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                          {item.title.split(' ').slice(-1)[0]}
                        </span>
                      </h3>

                      {/* Content */}
                      <p className="text-gray-600 font-light leading-relaxed">
                        {item.content}
                      </p>
                    </div>

                    {/* Decorative corner element */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History - REFINED */}
      <section className="py-20 sm:py-32 px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-50 to-transparent rounded-full blur-3xl opacity-30" />

        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section label */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 text-blue-600 text-sm font-medium tracking-wider uppercase">
                <div className="w-8 h-px bg-blue-600" />
                <span>Our Journey</span>
                <div className="w-8 h-px bg-blue-600" />
              </div>
            </div>
          </div>

          {/* Content card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900 mb-8 text-center">
              <span className="font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                {history.title}
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-8" />
            <p className="text-gray-600 text-lg font-light leading-relaxed text-center">
              {history.content}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Pastor's section - REFINED */}
      <section id="pastor" className="py-20 sm:py-32 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative max-w-md mx-auto lg:mx-0">
                {/* Shadow layers */}
                <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-3xl transform translate-y-8 scale-95" />
                
                <div className="relative">
                  <img
                    src='https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269814/6dabb4de-b6a6-464c-bf4e-e63f6104c34d.png'
                    alt={pastorInfo.imageAlt || "Pastor of Truelight Glory House"}
                    className="w-full h-auto object-cover rounded-3xl shadow-2xl border-2 border-white/10"
                    loading="lazy"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
                  
                  {/* Floating badge */}
                  <motion.div
                    className="absolute -bottom-6 -right-6 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              className="text-white space-y-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <div className="inline-block">
                  <div className="text-blue-300 text-sm font-medium tracking-widest uppercase px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    {pastorInfo.subtitle}
                  </div>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-tight">
                  <span className="font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {pastorInfo.title.split(' ').slice(1).join(' ')}
                  </span>
                </h2>
                
                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-200" />
              </div>

              <p className="text-lg font-light leading-relaxed text-gray-300">
                {pastorInfo.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Believe - REFINED */}
      <section className="py-20 sm:py-32 px-6 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />

        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 text-blue-600 text-sm font-medium tracking-wider uppercase">
                <div className="w-8 h-px bg-blue-600" />
                <span>Core Beliefs</span>
                <div className="w-8 h-px bg-blue-600" />
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
              <span className="font-extralight">What We</span>{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                Believe
              </span>
            </h2>
          </div>

          {/* Beliefs list */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              "The Bible is the inspired word of God.",
              "Jesus Christ is the Son of God and Savior of the world.",
              "Salvation is by grace through faith in Jesus.",
              "The Holy Spirit empowers us for holy living and service.",
              "The Church is the body of Christ and a light to the world."
            ].map((belief, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 p-6 bg-gray-50 hover:bg-blue-50/50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-gray-700 font-light leading-relaxed text-lg">
                  {belief}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}