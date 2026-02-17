import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Youtube,
  Building,
  MapPin,
  Mail,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);

  const handleCopyAccount = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Units", path: "/units" },
    { name: "Sermons", path: "/sermons" },
    { name: "Events", path: "/events" },
    { name: "Support", path: "/support" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      
      {/* Giving Section */}
      <section className="relative py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="relative bg-gradient-to-br from-white via-blue-50 to-white text-black rounded-2xl p-8 md:p-12 shadow-[0_20px_80px_rgba(59,130,246,0.3)] overflow-hidden">
            
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-blue-600" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-blue-600" />
            
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              Make a Difference
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <div className="inline-block mb-3">
                <span className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase">Partnership</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Sow Into <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">God's Kingdom</span>
              </h2>
              
              <p className="text-base text-gray-700 mb-6 leading-relaxed">
                Your generous giving empowers us to reach more souls and advance the Gospel worldwide.
              </p>
              
              <button
                onClick={() => setShowPopup(true)}
                className="group relative bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_10px_40px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_50px_rgba(37,99,235,0.6)] flex items-center gap-2 text-sm"
              >
                <Building className="w-4 h-4" />
                Give Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Popup Modal */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowPopup(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
                className="relative bg-white text-black max-w-3xl w-full rounded-xl shadow-[0_30px_100px_rgba(59,130,246,0.5)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-5">
                  <button 
                    className="absolute top-3 right-3 w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl transition-all duration-300" 
                    onClick={() => setShowPopup(false)}
                  >
                    ✕
                  </button>
                  
                  <h2 className="text-xl font-bold text-white mb-1">
                    Account Details
                  </h2>
                  <p className="text-blue-100 text-sm">Select an account to make your contribution</p>
                </div>
                
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        label: 'Naira',
                        number: '0094316383',
                        currency: '₦',
                        bank: 'Access Bank',
                        name: 'Truelight Glory House Ministry',
                        logo: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270045/accesslogo_aze5yl.png',
                      },
                      {
                        label: 'Naira',
                        number: '1911578888',
                        currency: '₦',
                        bank: 'Access Bank',
                        name: 'Truelight Glory House Ministry',
                        logo: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270045/accesslogo_aze5yl.png',
                      },
                      {
                        label: 'Dollar',
                        number: '3003743459',
                        currency: '$',
                        bank: 'UBA',
                        name: 'TRUELIGHT GLORY HOUSE BUILDING PROJECT',
                        logo: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269982/ubalogo_nnqsks.png',
                      }
                    ].map(({ label, number, currency, bank, name, logo }, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + (i * 0.1) }}
                      >
                        <div className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-3 transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
                          
                          <div className="absolute top-2 right-2 w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                            <span className="text-lg font-bold text-white">{currency}</span>
                          </div>
                          
                          <div className="mb-2">
                            <img src={logo} alt={bank} className="h-6 object-contain" />
                          </div>
                          
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-2">{label}</p>
                          <p className="text-base font-bold text-gray-900 mb-2">{number}</p>
                          <p className="text-[10px] text-gray-600 leading-tight mb-3 line-clamp-2">{name}</p>
                          
                          <button 
                            onClick={() => handleCopyAccount(number)} 
                            className={`w-full py-2 rounded-md font-semibold text-xs transition-all duration-300 ${
                              copiedAccount === number 
                                ? 'bg-green-500 text-white' 
                                : 'bg-black hover:bg-gray-800 text-white'
                            }`}
                          >
                            {copiedAccount === number ? 'Copied!' : 'Copy Number'}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      {/* Main Footer */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            
            <div className="md:col-span-5">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-white via-blue-400 to-blue-600 bg-clip-text text-transparent">
                    TRUELIGHT
                  </span>
                </h3>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  GLORY HOUSE
                </h3>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Discipling the nation and disciplining the devil through the transformative power of God's Word.
              </p>
              
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: "https://www.facebook.com/Truelightghofficial", label: "Facebook" },
                  { icon: Instagram, href: "https://www.instagram.com/truelightgloryhouse?igsh=YzljYTk1ODg3Zg==", label: "Instagram" },
                  { icon: Youtube, href: "http://www.youtube.com/@truelightgloryhouse", label: "YouTube" },
                ].map(({ icon: Icon, href, label }, i) => (
                  <a 
                    key={i}
                    href={href} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label={label}
                    className="group relative w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white relative z-10 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600" />
                Quick Links
              </h4>
              <ul className="space-y-4">
                {navLinks.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-3 group"
                    >
                      <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-4">
              <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600" />
                Get in Touch
              </h4>
              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Visit Us</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      289 Okigwe Rd, Opp. Access Bank Orji<br />
                      Owerri, Imo State, Nigeria
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Email Us</p>
                    <a href="mailto:info.truelight9@gmail.com" className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-300">
                      info.truelight9@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                &copy; {getCurrentYear()} <span className="text-blue-400 font-semibold">Truelight Glory House</span>. All rights reserved.
              </p>
              <div className="flex gap-8 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}