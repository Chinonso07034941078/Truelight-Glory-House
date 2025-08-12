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
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white px-4">
      {/* Contact Section */}
     
      {/* Giving Section */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto bg-white text-blue-900 rounded-xl p-8 md:p-12 shadow-xl relative border border-yellow-400/30">
          
          <h2 className="text-[2.3em] md:text-5xl font-extrabold uppercase">Give into Truelight Glory House</h2>
          <p className="text-lg mb-8 max-w-xl">Your generosity keeps blessing lives. Thank you for giving.</p>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105"
          >
            GIVE NOW
          </button>
        </div>
        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white text-blue-900 max-w-2xl w-full p-8 rounded-2xl shadow-xl relative border border-yellow-400/30">
              <button className="absolute top-4 right-4 text-red-500 text-lg" onClick={() => setShowPopup(false)}>✕</button>
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-8 h-8 text-yellow-500" />
                <h2 className="text-2xl font-bold">For Tithes and Offerings</h2>
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
                  <div key={i} className="p-4 bg-white rounded-lg border shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-bold">{label}</p>
                      <span className="text-2xl font-bold text-yellow-500">{currency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={logo} alt={bank} className="w-12 h-8 object-contain" />
                        <div>
                          <p className="font-bold text-blue-900">{number}</p>
                          <p className="text-sm text-gray-500">{name}</p>
                        </div>
                      </div>
                      <button onClick={() => handleCopyAccount(number)} className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200">
                        {copiedAccount === number ? <CheckCircle className="text-green-600" /> : <Copy className="text-blue-900" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Footer Bottom */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-center md:text-left py-8">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">TRUELIGHT GLORY HOUSE</h3>
          <p className="text-sm text-gray-300">We disciple the nation, and discipline the devil.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">Connect With Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mb-2">
            <a href="https://www.facebook.com/Truelightghofficial" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/truelightgloryhouse?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition">
              <Instagram size={20} />
            </a>
            <a href="http://www.youtube.com/@truelightgloryhouse" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition">
              <Youtube size={20} />
            </a>
          </div>
          <p className="text-xs text-gray-300">289 Okigwe Rd, Opp. Access Bank Orji, Owerri - Imo State</p>
          <p className="text-xs text-gray-300">info.truelight9@gmail.com</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 border-t border-yellow-400/30 pt-3 pb-6">
        &copy; {getCurrentYear()} Truelight Glory House. All rights reserved.
      </div>
    </footer>
  );
}