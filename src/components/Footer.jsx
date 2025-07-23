import C03 from '../assets/Give12.jpg'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { useState } from 'react';
import { Building, Copy, CheckCircle } from 'lucide-react';
import UBA from '../assets/ubalogo.png';


export default function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null)

  const handleCopyAccount = (number) => {
  navigator.clipboard.writeText(number);
  setCopiedAccount(number);
  setTimeout(() => setCopiedAccount(null), 2000);
};


  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-6 px-4">
      <section className="bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 py-20 px-4 md:px-10 text-white">
  <div className="max-w-6xl mx-auto bg-gradient-to-br from-white via-yellow-50 to-white text-slate-900 rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden transition-all duration-700 ease-in-out border border-yellow-400/30">
    <img
      src={C03}
      alt="hand art"
      className="absolute bottom-0 right-0 opacity-20 w-72 md:w-[400px] pointer-events-none"
    />

    <h2 className="text-[2.3em] md:text-5xl uppercase font-extrabold font-poppins tracking-tight text-blue-900">
      GIVE INTO TRUELIGHT GLORY HOUSE
    </h2>

    <p className="text-lg mb-8 max-w-xl text-blue-800">
      Your generosity keeps blessing lives, thank you for giving.
    </p>

    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => setShowPopup(true)}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 border border-blue-900/20"
      >
        GIVE NOW
      </button>
    </div>
  </div>

  {/* Modal */}
  {showPopup && (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white via-yellow-50 to-white text-blue-900 max-w-2xl w-full p-6 sm:p-8 rounded-2xl shadow-xl relative border border-yellow-400/30">
        <button
          className="absolute top-4 right-4 text-red-500 hover:text-red-600 font-bold text-lg transition-colors"
          onClick={() => setShowPopup(false)}
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Building className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-extrabold text-blue-900">GLORY LAND BUILDING PROJECT</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div
              key={i}
              className="bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-4 rounded-xl shadow-md hover:shadow-lg border border-yellow-400/40 transition-all duration-300 hover:border-yellow-400/60"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold uppercase text-sm text-blue-900">{label}</p>
                <span className="text-2xl font-bold text-yellow-500">{currency}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={logo} alt={`${bank} logo`} className="w-12 h-8 object-contain rounded" />
                  <div>
                    <span className="text-xl font-bold block text-blue-900">{number}</span>
                    <span className="text-sm text-gray-600">{name}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyAccount(number)}
                  className="group relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-all duration-300 hover:scale-110 border border-yellow-400/30"
                  title="Copy account number"
                >
                  {copiedAccount === number ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-blue-900" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
</section>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left items-start">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">TRUELIGHT GLORY HOUSE</h3>
          <p className="text-sm leading-snug text-gray-300">
            We disciple the nation, and discipline the devil.
          </p>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">Connect With Us</h3>
          <div className="flex justify-center md:justify-start gap-3 mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:text-yellow-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-yellow-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white hover:text-yellow-400 transition-colors">
              <Youtube size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white hover:text-yellow-400 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
          <p className="text-xs text-gray-300">289 Okigwe Rd, Opp. Access Bank Orji, Owerri</p>
          <p className="text-xs text-gray-300">info.truelight9@gmail.com</p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-6 text-xs text-gray-400 border-t border-yellow-400/30 pt-3">
        &copy; {new Date().getFullYear()} Truelight Glory House. All rights reserved.
      </div>
    </footer>
  );
}