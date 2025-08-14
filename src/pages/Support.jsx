import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle, Heart, Globe, Building, Gift, Sparkles } from "lucide-react";

import UBAL from "../assets/ubalogo.png"
import ACCSS from "../assets/accesslogo.png"
import Footer from "../components/Footer";

const BGI = "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
const ACCESS = ACCSS;
const UBA = UBAL;

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
    <section className="w-full bg-white text-gray-900">
      {/* Refined Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-yellow-800/80 to-blue-900/80 z-10" />

        {/* Background Image */}
        <motion.img
          src={BGI}
          alt="Giving Background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        
        {/* Main content */}
        <div className="relative z-20 text-center text-white px-6 max-w-5xl">
          {/* Subtle badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-5 py-2 mb-8 border border-white/25"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider">Generous Giving</span>
          </motion.div>

          {/* Main heading - refined typography */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="font-extralight">Your</span>{' '}
            <span className="font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Generosity
            </span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl font-light text-blue-200 block mt-2">
              Our shared mission
            </span>
          </motion.h1>

          {/* Animated tagline */}
          <motion.div
            className="text-lg md:text-xl font-light mb-12 h-14 flex items-center justify-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlogan}
                className="text-blue-200 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
              >
                {slogans[currentSlogan]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Call-to-action button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <button
              onClick={() => document.getElementById('bank-details')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-white/10 backdrop-blur-md text-white font-medium px-8 py-4 rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition-all duration-500 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Give Now
                <motion.div
                  className="w-1 h-1 bg-current rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Refined Introduction Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            <div className="flex-1">
              <motion.div
                className="bg-blue-100/80 text-blue-950 font-medium px-6 py-3 rounded-full flex items-center gap-2 w-fit backdrop-blur-sm"
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
              >
                <Globe className="w-5 h-5" />
                Give to TLGH
              </motion.div>
            </div>

            <motion.div
              className="flex-1 lg:text-right"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
            >
              <p className="text-gray-600 text-lg font-light leading-relaxed">
                Join us as we put our money right where our faith is,<br />
                partnering with God for the spread of the gospel in our day.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 flex justify-center gap-3"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <button
              onClick={() => setActiveTab("naira")}
              className={`px-8 py-4 rounded-full font-medium transition-all duration-500 ${
                activeTab === "naira" 
                  ? "bg-blue-950 text-white shadow-lg transform scale-105" 
                  : "bg-blue-100/80 text-blue-950 hover:bg-blue-200/80 backdrop-blur-sm"
              }`}
            >
              Regular Giving
            </button>
            <button
              onClick={() => setActiveTab("domiciliary")}
              className={`px-8 py-4 rounded-full font-medium transition-all duration-500 ${
                activeTab === "domiciliary" 
                  ? "bg-blue-950 text-white shadow-lg transform scale-105" 
                  : "bg-blue-100/80 text-blue-950 hover:bg-blue-200/80 backdrop-blur-sm"
              }`}
            >
              Glory Land Project
            </button>
          </motion.div>
        </div>
      </section>

      {/* Refined Bank Details Section */}
      <section id="bank-details" className="bg-blue-50/50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-blue-100/50"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Gift className="w-8 h-8 text-blue-950" />
              </div>
              <h2 className="text-3xl font-light text-blue-950">
                <span className="font-extralight">Regular</span>{' '}
                <span className="font-medium">Givings</span>
              </h2>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
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
                  className="bg-gradient-to-br from-white to-blue-50/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-100/50 backdrop-blur-sm group hover:scale-105"
                  variants={fadeUp}
                >
                  <p className="font-medium text-blue-950 uppercase mb-6 text-sm tracking-wider opacity-80">{label}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={logo} alt={`${bank} logo`} className="w-16 h-8 object-contain rounded-lg" />
                      <div>
                        <span className="text-xl font-semibold text-gray-900 block mb-1">{number}</span>
                        <span className="text-sm text-gray-600 font-light">{name}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCopyAccount(number)} 
                      className="group/btn relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100/80 hover:bg-blue-200 transition-all duration-300 hover:scale-110 backdrop-blur-sm" 
                      title="Copy account number"
                    >
                      {copiedAccount === number ? 
                        <CheckCircle className="w-5 h-5 text-green-600" /> : 
                        <Copy className="w-5 h-5 text-blue-950 group-hover/btn:text-blue-700" />
                      }
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Refined Building Project Section */}
      <section id="other-ways" className="bg-gradient-to-br from-blue-50/50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-blue-100/50" 
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Building className="w-8 h-8 text-blue-950" />
              </div>
              <h2 className="text-3xl font-light text-blue-950">
                <span className="font-extralight">Glory Land</span>{' '}
                <span className="font-medium">Building Project</span>
              </h2>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8" 
              variants={staggerChildren} 
              initial="hidden" 
              whileInView="visible"
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
                  className="bg-gradient-to-br from-white to-blue-50/30 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-100/50 backdrop-blur-sm group hover:scale-105" 
                  variants={fadeUp}
                >
                  <div className="flex items-center justify-between mb-6">
                    <p className="font-medium text-blue-950 uppercase text-sm tracking-wider opacity-80">{label}</p>
                    <span className="text-3xl font-light text-blue-950 opacity-80">{currency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={logo} alt={`${bank} logo`} className="w-16 h-8 object-contain rounded-lg" />
                      <div>
                        <span className="text-xl font-semibold text-gray-900 block mb-1">{number}</span>
                        <span className="text-sm text-gray-600 font-light leading-tight">{name}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCopyAccount(number)} 
                      className="group/btn relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100/80 hover:bg-blue-200 transition-all duration-300 hover:scale-110 backdrop-blur-sm" 
                      title="Copy account number"
                    >
                      {copiedAccount === number ? 
                        <CheckCircle className="w-5 h-5 text-green-600" /> : 
                        <Copy className="w-5 h-5 text-blue-950 group-hover/btn:text-blue-700" />
                      }
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Refined Call to Action */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-4 border border-white/20">
              <Heart className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium tracking-wider">Make a Difference</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              <span className="font-extralight">Every Gift</span><br />
              <span className="font-medium">Makes a Difference</span>
            </h2>
            
            <p className="text-xl font-light text-blue-200 leading-relaxed max-w-2xl mx-auto">
              Your generosity fuels our mission to spread hope and transform lives 
              across communities worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <button 
                className="bg-white/10 backdrop-blur-md text-white font-medium px-8 py-4 rounded-full border border-white/30 hover:bg-white hover:text-blue-950 transition-all duration-500 transform hover:scale-105" 
                onClick={() => document.getElementById("bank-details")?.scrollIntoView({ behavior: "smooth" })}
              >
                Give Now
              </button>
              <a 
                href="tel:+2349010494622" 
                className="bg-transparent border-2 border-white/50 text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 inline-block"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </section>
  );
}