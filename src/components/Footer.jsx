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
    <footer className="bg-blue-950 text-white py-6 px-4">
      <section className="bg-gradient-to-b from-blue-950 via-blue-400 to-blue-950 py-20 px-4 md:px-10 text-white">
  <div className="max-w-6xl mx-auto bg-blue-100 text-blue-950 rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden transition-all duration-700 ease-in-out">
    <img
      src={C03}
      alt="hand art"
      className="absolute bottom-0 right-0 opacity-20 w-72 md:w-[400px] pointer-events-none"
    />

    <h2 className="text-[2.3em] md:text-5xl uppercase font-extrabold font-poppins tracking-tight">
      GIVE INTO TRUELIGHT GLORY HOUSE
    </h2>

    <p className="text-lg mb-8 max-w-xl text-blue-800">
      Your generosity keeps blessing lives, thank you for giving.
    </p>

    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => setShowPopup(true)}
        className="bg-white text-blue-900 font-bold py-3 px-6 rounded-full shadow hover:bg-blue-50 transition"
      >
        GIVE NOW
      </button>
    </div>
  </div>

  {/* Modal */}
  {showPopup && (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-blue-950 max-w-2xl w-full p-6 sm:p-8 rounded-2xl shadow-xl relative">
        <button
          className="absolute top-4 right-4 text-red-500 font-bold text-lg"
          onClick={() => setShowPopup(false)}
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Building className="w-8 h-8 text-blue-950" />
          <h2 className="text-2xl font-extrabold">GLORY LAND BUILDING PROJECT</h2>
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
              className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl shadow-md hover:shadow-lg border border-blue-100 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold uppercase text-sm">{label}</p>
                <span className="text-2xl font-bold">{currency}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={logo} alt={`${bank} logo`} className="w-12 h-8 object-contain rounded" />
                  <div>
                    <span className="text-xl font-bold block">{number}</span>
                    <span className="text-sm text-gray-600">{name}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyAccount(number)}
                  className="group relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition hover:scale-110"
                  title="Copy account number"
                >
                  {copiedAccount === number ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-blue-950" />
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
          <h3 className="text-lg font-semibold mb-2">Truelight Church</h3>
          <p className="text-sm leading-snug">
            We disciple the nation, and discipline the devil.
          </p>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
          <div className="flex justify-center md:justify-start gap-3 mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="hover:text-blue-400" size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="hover:text-pink-400" size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="hover:text-red-500" size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="hover:text-blue-400" size={20} />
            </a>
          </div>
          <p className="text-xs">289 Okigwe Rd, Opp. Access Bank Orji, Owerri</p>
          <p className="text-xs">info.truelight9@gmail.com</p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-6 text-xs text-gray-300 border-t border-gray-700 pt-3">
        &copy; {new Date().getFullYear()} Truelight Glory House. All rights reserved.
      </div>
    </footer>
  );
}
