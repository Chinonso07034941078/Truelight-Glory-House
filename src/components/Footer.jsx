import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  Copy,
  CheckCircle,
} from 'lucide-react';
import C03 from '../assets/Give12.jpg';
import UBA from '../assets/ubalogo.png';
import ACCESS from '../assets/accesslogo.png';

export default function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);

  const handleCopyAccount = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  // Function to get current year dynamically
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="bg-gradient-to-bl from-slate-900 via-blue-900 to-slate-800 text-white px-4">
      {/* Contact Section */}
     
      {/* Giving Section */}
      <section className="bg-gradient-to-b rounded-xl from-slate-900 via-blue-900 to-slate-800 py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto bg-white text-blue-900 rounded-2xl p-8 md:p-12 shadow-xl relative border border-blue-200/30">
          
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            <span className="font-extralight">Give into</span>{' '}
            <span className="font-semibold bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-300 bg-clip-text text-transparent">
              Truelight Glory House
            </span>
          </h2>
          <p className="text-lg font-light text-gray-700 mb-8 max-w-xl leading-relaxed">
            Your <span className="text-yellow-600 font-medium">generosity</span> keeps blessing lives. Thank you for giving.
          </p>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-white/10 backdrop-blur-md text-blue-900 font-medium tracking-wide py-4 px-8 rounded-full border border-yellow-400/50 hover:bg-yellow-500 hover:text-white transition-all duration-500 transform hover:scale-105 shadow-lg"
          >
            Give Now
          </button>
        </div>
        
        {/* Popup with delayed animation */}
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, delay: 0.15, type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white text-blue-900 max-w-2xl w-full p-8 rounded-3xl shadow-xl relative border border-yellow-300/30"
            >
              <button 
                className="absolute top-6 right-6 text-gray-400 hover:text-red-500 text-xl transition-colors duration-300" 
                onClick={() => setShowPopup(false)}
              >
                ✕
              </button>
              <div className="flex items-center gap-3 mb-8">
                <Building className="w-8 h-8 text-yellow-500" />
                <h2 className="text-2xl font-light tracking-tight">
                  <span className="font-extralight">For Tithes and</span>{' '}
                  <span className="font-semibold bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                    Offerings
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: 'Naira Account',
                    number: '0094316383',
                    currency: '₦',
                    bank: 'Access Bank',
                    name: 'Truelight Glory House Ministry',
                    logo: ACCESS,
                  },
                  {
                    label: 'Naira Account',
                    number: '1911578888',
                    currency: '₦',
                    bank: 'Access Bank',
                    name: 'Truelight Glory House Ministry',
                    logo: ACCESS,
                  },
                  {
                    label: 'Dollar Account',
                    number: '3003743459',
                    currency: '$',
                    bank: 'UBA',
                    name: 'TRUELIGHT GLORY HOUSE BUILDING PROJECT',
                    logo: UBA,
                  }
                ].map(({ label, number, currency, bank, name, logo }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
                    className="p-6 bg-gray-50/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-yellow-400/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm font-medium tracking-wide text-gray-700">{label}</p>
                      <span className="text-2xl font-light text-yellow-500">{currency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={logo} alt={bank} className="w-12 h-8 object-contain" />
                        <div>
                          <p className="font-medium text-blue-900 tracking-wide">{number}</p>
                          <p className="text-sm font-light text-gray-600 leading-relaxed">{name}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleCopyAccount(number)} 
                        className="p-3 rounded-full bg-yellow-50 hover:bg-yellow-100 transition-all duration-300"
                      >
                        {copiedAccount === number ? 
                          <CheckCircle className="text-green-600 w-5 h-5" /> : 
                          <Copy className="text-yellow-600 w-5 h-5" />
                        }
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>
      
      {/* Footer Bottom */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-center md:text-left py-12">
        <div>
          <h3 className="text-xl font-light tracking-wider mb-3">
            <span className="font-extralight">TRUELIGHT</span>{' '}
            <span className="font-medium bg-gradient-to-r from-yellow-400 via-yellow-200 to-white bg-clip-text text-transparent">
              GLORY HOUSE
            </span>
          </h3>
          <p className="text-sm font-light text-gray-300 leading-relaxed tracking-wide">
            We <span className="text-yellow-300 font-medium">disciple</span> the nation, and <span className="text-yellow-300 font-medium">discipline</span> the devil.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-light tracking-wider mb-4">
            <span className="font-extralight">Connect</span>{' '}
            <span className="font-medium text-yellow-300">With Us</span>
          </h3>
          <div className="flex justify-center md:justify-start gap-4 mb-4">
            <a href="https://www.facebook.com/Truelightghofficial" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors duration-300 p-2 rounded-full hover:bg-white/10">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/truelightgloryhouse?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors duration-300 p-2 rounded-full hover:bg-white/10">
              <Instagram size={20} />
            </a>
            <a href="http://www.youtube.com/@truelightgloryhouse" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors duration-300 p-2 rounded-full hover:bg-white/10">
              <Youtube size={20} />
            </a>
          </div>
          <p className="text-xs font-light text-gray-300 leading-relaxed mb-1 tracking-wide">
            <span className="text-yellow-300">289 Okigwe Rd</span>, Opp. Access Bank Orji, Owerri - Imo State
          </p>
          <p className="text-xs font-light text-yellow-300 tracking-wide">
            info.truelight9@gmail.com
          </p>
        </div>
      </div>
      <div className="text-center text-xs font-light text-gray-400 border-t border-yellow-400/20 pt-6 pb-8 tracking-wider">
        &copy; {getCurrentYear()} <span className="text-yellow-300">Truelight Glory House</span>. All rights reserved.
      </div>
    </footer>
  );
}