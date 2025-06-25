import React from 'react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-6 px-4">
      <section className="bg-gradient-to-b from-blue-950 via-blue-400 to-blue-950 py-20 px-4 md:px-10 text-white">
      <div className="max-w-6xl mx-auto bg-blue-100 text-blue-950 rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden transition-all duration-700 ease-in-out">
        
        {/* Background Hand SVG */}
        <img
          src="/your-hand-image.svg" // Replace this with your actual image
          alt="hand art"
          className="absolute bottom-0 right-0 opacity-20 w-72 md:w-[400px] pointer-events-none"
        />

        {/* Headline */}
        <h2 className="text-[2.3em] md:text-5xl uppercase font-extrabold font-poppins tracking-tight ">
  GIVE INTO  TRUELIGHT GLORY HOUSE
</h2>


        {/* Description */}
        <p className="text-lg mb-8 max-w-xl text-blue-800">
          Your generosity keeps blessing lives, thank you for giving.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-white text-blue-900 font-bold py-3 px-6 rounded-full shadow hover:bg-blue-50 transition">
            GIVE NOW
          </button>
          <button className="bg-blue-700 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-800 transition">
            BUILDING PROJECT
          </button>
        </div>
      </div>
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
