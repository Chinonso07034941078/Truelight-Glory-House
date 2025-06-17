import React from 'react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-6 px-4">
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
