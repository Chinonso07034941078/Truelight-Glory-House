import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Footer from "../components/Footer";
import { BookOpen, Target, Heart, Compass, CheckCircle2 } from "lucide-react";
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
    <div className="text-gray-900 font-sans overflow-x-hidden bg-white">
      
    {/* Hero Section - BOLD EDITORIAL STYLE */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
  
  {/* Background Image & Overlays */}
  <div className="absolute inset-0 z-0">
    {/* Main Image */}
   <img
  src="https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto,w_1600/v1771210031/4cc80570-20f5-4f56-af5c-0f9913d4412e.png"
  srcSet="
    https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto,w_640/v1771210031/4cc80570-20f5-4f56-af5c-0f9913d4412e.png 640w,
    https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto,w_1024/v1771210031/4cc80570-20f5-4f56-af5c-0f9913d4412e.png 1024w,
    https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto,w_1600/v1771210031/4cc80570-20f5-4f56-af5c-0f9913d4412e.png 1600w
  "
  sizes="100vw"
  alt="Background"
  loading="eager"
  fetchpriority="high"
  decoding="async"
  className="w-full h-full object-cover"
/>

    {/* 
      Gradient Overlay: 
      Fades from solid white on the left (where text is) 
      to slightly transparent on the right (to show the image).
      Adjust opacity via 'via-white/90' or 'to-white/70' as needed.
    */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/45 to-black/60"></div>
  </div>

  {/* Bold Blue Geometric Accents - Now relative to the overlay */}
  <div className="absolute inset-0 z-[1] pointer-events-none">
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-5"></div>
    <div className="absolute top-0 left-0 w-24 h-1 bg-blue-600"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      
      {/* LEFT - Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-10"
      >
        {/* Label */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-1 bg-blue-600"></div>
          <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
            About Us
          </span>
        </div>

        {/* Main Title */}
        <div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-none tracking-tighter">
            Divine
          </h1>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-none tracking-tighter mt-2">
            <span className="text-blue-600">Purpose</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="max-w-xl border-l-4 border-blue-600 pl-6">
          <p className="text-2xl sm:text-3xl text-white font-light leading-tight">
            This is where we disciple the nations
          </p>
          <p className="text-2xl sm:text-3xl text-white font-bold leading-tight">
            And discipline the devil
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <button
            onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-blue-600 text-white font-bold px-12 py-5 text-base uppercase tracking-wider hover:bg-gray-900 transition-all duration-300"
          >
            <span className="relative z-10">Discover More</span>
            <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
          </button>
        </div>
      </motion.div>

      {/* RIGHT - Empty column allows background image to show through */}

    </div>
  </div>

  {/* Bottom Stripe */}
  <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-600 z-20"></div>
</section>


      {/* Mission, Vision, Values - BOLD GRID */}
      <section id="about-section" className="py-32 px-6 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-1 bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Our Foundation
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-none tracking-tighter">
              Guided by
            </h2>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-blue-600 leading-none tracking-tighter">
              Purpose
            </h2>
          </motion.div>

          {/* Grid */}
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
                  <div className="relative bg-white border-2 border-gray-200 hover:border-blue-600 p-8 h-full transition-all duration-300">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-blue-600 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                      {item.title}
                    </h3>

                    {/* Blue Accent Line */}
                    <div className="w-12 h-1 bg-blue-600 mb-6"></div>

                    {/* Content */}
                    <p className="text-gray-600 font-light leading-relaxed text-lg">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History - BOLD STATEMENT */}
      <section className="py-32 px-6 bg-gray-900 relative overflow-hidden">
        {/* Geometric Accents */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600 opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-2 bg-blue-600"></div>

        <motion.div
          className="max-w-5xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-1 bg-blue-600"></div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Our Journey
            </span>
          </div>

          {/* Title */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mb-12">
            {history.title}
          </h2>

          {/* Blue Line */}
          <div className="w-24 h-1 bg-blue-600 mb-10"></div>

          {/* Content */}
          <div className="border-l-4 border-blue-600 pl-8">
            <p className="text-gray-300 text-xl sm:text-2xl font-light leading-relaxed">
              {history.content}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Pastor Section - TWO COLUMN BOLD */}
      <section id="pastor" className="py-32 px-6 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT - Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Blue Border Frame */}
                <div className="absolute -top-8 -left-8 w-full h-full border-8 border-blue-600 z-0"></div>
                
                {/* Image Container */}
                <div className="relative z-10">
                  <img
                    src='https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269814/6dabb4de-b6a6-464c-bf4e-e63f6104c34d.png'
                    alt={pastorInfo.imageAlt || "Pastor of Truelight Glory House"}
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            {/* RIGHT - Content */}
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Label */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-1 bg-blue-600"></div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  {pastorInfo.subtitle}
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-none tracking-tighter">
                  {pastorInfo.title.split(' ').slice(1, 2).join(' ')}
                </h2>
                <h2 className="text-5xl sm:text-6xl font-black text-blue-600 leading-none tracking-tighter">
                  {pastorInfo.title.split(' ').slice(2).join(' ')}
                </h2>
              </div>

              {/* Blue Line */}
              <div className="w-20 h-1 bg-blue-600"></div>

              {/* Description */}
              <div className="border-l-4 border-blue-600 pl-6">
                <p className="text-gray-700 text-lg font-light leading-relaxed">
                  {pastorInfo.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Believe - BOLD LIST */}
      <section className="py-32 px-6 bg-gray-900 relative overflow-hidden">
        {/* Geometric Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-600"></div>

        <motion.div
          className="max-w-5xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-1 bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                Core Beliefs
              </span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter">
              What We
            </h2>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-blue-600 leading-none tracking-tighter">
              Believe
            </h2>
          </div>

          {/* Beliefs List */}
          <div className="space-y-8">
            {[
              "The Bible is the inspired word of God.",
              "Jesus Christ is the Son of God and Savior of the world.",
              "Salvation is by grace through faith in Jesus.",
              "The Holy Spirit empowers us for holy living and service.",
              "The Church is the body of Christ and a light to the world."
            ].map((belief, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-6 p-8 bg-white/5 border-l-4 border-blue-600 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-600 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-white text-xl font-light leading-relaxed">
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