import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle, Heart, Globe, Building, Gift, Sparkles } from "lucide-react";
import Footer from "../components/Footer";

const ACCESS = 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270045/accesslogo_aze5yl.png';
const UBA = 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269982/ubalogo_nnqsks.png';

export default function GivingSection() {
  const [activeTab, setActiveTab] = useState("naira");
  const [copiedAccount, setCopiedAccount] = useState("");
  const [currentSlogan, setCurrentSlogan] = useState(0);

  const slogans = [
    "Join our mission to transform lives through generosity",
    "Unite with us in spreading hope across communities", 
    "Walk alongside us as we build God's kingdom",
    "Stand with us in faith and generous giving"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const handleCopyAccount = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        {/* <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/25 to-purple-500/15 rounded-full blur-3xl animate-float-slow"></div> */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-300/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slower"></div> */}
        {/* <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-bl from-indigo-400/15 to-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div> */}
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-600/30 rounded-lg rotate-12 animate-float-rotate"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-blue-600/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-20 w-2 h-40 bg-gradient-to-b from-blue-600/50 to-transparent animate-slide-up"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-blue-500/30 rounded-full animate-ping-slow"></div>
        
        {/* Moving particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Diagonal accent lines */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-600/30 via-transparent to-blue-600/30 transform -skew-x-12 animate-slide-down"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-600/20 via-transparent to-blue-600/20 transform skew-x-12 animate-slide-up-slow"></div>
      </div>
      
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -20px); }
          50% { transform: translate(-10px, -30px); }
          75% { transform: translate(-20px, 10px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-30px, 20px); }
          50% { transform: translate(15px, 40px); }
          75% { transform: translate(25px, -15px); }
        }
        
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          33% { transform: translateY(-20px) rotate(20deg); }
          66% { transform: translateY(10px) rotate(5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        
        @keyframes slide-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes slide-down {
          0%, 100% { transform: translateY(0) skew(-12deg); }
          50% { transform: translateY(20px) skew(-12deg); }
        }
        
        @keyframes slide-up-slow {
          0%, 100% { transform: translateY(0) skew(12deg); }
          50% { transform: translateY(-40px) skew(12deg); }
        }
        
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 12s ease-in-out infinite;
        }
        
        .animate-float-rotate {
          animation: float-rotate 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 5s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 4s ease-in-out infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 6s ease-in-out infinite;
        }
        
        .animate-slide-up-slow {
          animation: slide-up-slow 8s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="space-y-8 lg:space-y-12 max-w-4xl"
          >
            
            {/* Bold Blue Line Accent */}
            <div className="flex items-center gap-4">
              <div className="w-16 sm:w-20 h-1 bg-blue-600"></div>
              <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
                Giving
              </span>
            </div>

            {/* Massive Heading */}
            <div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black text-gray-900 leading-none tracking-tighter">
                Your
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black leading-none tracking-tighter mt-2">
                <span className="text-blue-600">
                  Generosity
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <div className="max-w-xl">
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed">
                Join us as we partner with God for the spread of the gospel.
              </p>
            </div>

            {/* Rotating Slogan */}
            <div className="h-12 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlogan}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg text-gray-600 font-light italic"
                >
                  {slogans[currentSlogan]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => document.getElementById('bank-details')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-blue-600 text-white font-bold px-12 py-5 text-lg uppercase tracking-wider hover:bg-gray-900 transition-all duration-300 inline-block"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Give Now
                </span>
                <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
              </button>
            </div>

          </motion.div>
        </div>

        {/* Bottom Blue Stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-600"></div>
      </section>

      {/* Bank Details Section */}
      <section id="bank-details" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-1 bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Tithes & Offerings
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
              Regular Givings
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                label: "Offering/Tithes",
                number: "1025313120",
                bank: "UBA",
                logo: UBA,
                name: "Truelight Glory House Ministry",
              },
              {
                label: "Offering/Tithe",
                number: "0094316383",
                bank: "ACCESS",
                logo: ACCESS,
                name: "Truelight Glory House Ministry",
              },
              {
                label: "Project",
                number: "1911578888",
                bank: "ACCESS",
                logo: ACCESS,
                name: "Truelight Glory House Project Accounts",
              },
            ].map(({ label, number, bank, logo, name }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group"
              >
                <div className="relative overflow-hidden h-full min-h-[200px] bg-white/40 backdrop-blur-xl border border-white/60 hover:bg-white/60 hover:border-blue-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 p-6">
                  
                  {/* Blue accent on hover */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
                  
                  {/* Label */}
                  <div className="mb-4">
                    <span className="bg-blue-600/10 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {label}
                    </span>
                  </div>

                  {/* Bank Logo & Details */}
                  <div className="flex items-center gap-3 mb-4">
                    <img src={logo} alt={`${bank} logo`} className="w-16 h-8 object-contain" />
                  </div>

                  {/* Account Number */}
                  <div className="mb-3">
                    <span className="text-2xl font-black text-gray-900 block">
                      {number}
                    </span>
                    <span className="text-sm text-gray-600 font-medium block mt-1">
                      {name}
                    </span>
                  </div>

                  {/* Copy Button */}
                  <button 
                    onClick={() => handleCopyAccount(number)} 
                    className="group/btn relative bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white font-bold px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 w-full mt-4"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {copiedAccount === number ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Account
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Building Project Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-1 bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Special Project
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
              Glory Land Building Project
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                label: "Naira Account",
                number: "1025413161",
                bank: "UBA",
                logo: UBA,
                currency: "₦",
                name: "TRUELIGHT GLORY HOUSE BUILDING PROJECT",
              },
              {
                label: "Dollar Account",
                number: "3003743459",
                bank: "UBA",
                logo: UBA,
                currency: "$",
                name: "TRUELIGHT GLORY HOUSE BUILDING PROJECT",
              },
            ].map(({ label, number, bank, logo, currency, name }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group"
              >
                <div className="relative overflow-hidden h-full min-h-[220px] bg-white/60 backdrop-blur-xl border border-white/60 hover:bg-white/80 hover:border-blue-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 p-8">
                  
                  {/* Blue accent on hover */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
                  
                  {/* Header with label and currency */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-blue-600/10 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-4xl font-black text-blue-600/30">
                      {currency}
                    </span>
                  </div>

                  {/* Bank Logo */}
                  <div className="flex items-center gap-3 mb-4">
                    <img src={logo} alt={`${bank} logo`} className="w-20 h-10 object-contain" />
                  </div>

                  {/* Account Number */}
                  <div className="mb-4">
                    <span className="text-3xl font-black text-gray-900 block">
                      {number}
                    </span>
                    <span className="text-sm text-gray-600 font-medium block mt-2 leading-tight">
                      {name}
                    </span>
                  </div>

                  {/* Copy Button */}
                  <button 
                    onClick={() => handleCopyAccount(number)} 
                    className="group/btn relative bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white font-bold px-6 py-3 text-xs uppercase tracking-wider transition-all duration-300 w-full mt-4"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {copiedAccount === number ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Account
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 justify-center">
              <div className="w-16 h-1 bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Make an Impact
              </span>
            </div>

            <div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-none tracking-tighter mb-2">
                Every Gift
              </h2>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-blue-600 leading-none tracking-tighter">
                Makes a Difference
              </h2>
            </div>

            <p className="text-xl sm:text-2xl text-gray-700 font-light max-w-2xl mx-auto">
              Your generosity fuels our mission to spread hope and transform lives across communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => document.getElementById("bank-details")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative bg-blue-600 text-white font-bold px-12 py-5 text-lg uppercase tracking-wider hover:bg-gray-900 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <Heart className="w-5 h-5" />
                  Give Now
                </span>
                <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
              </button>
              
              <a
                href="tel:+2349010494622"
                className="bg-white/60 backdrop-blur-md border-2 border-gray-300 text-gray-900 font-bold px-12 py-5 text-lg uppercase tracking-wider hover:bg-white hover:border-blue-600 transition-all duration-300 inline-flex items-center justify-center"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}