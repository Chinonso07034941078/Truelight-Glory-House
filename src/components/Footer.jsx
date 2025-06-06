import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Truelight Church</h3>
          <p className="text-sm">
          We disciple the nation, and discipline the devil.
          </p>
        </div>
       
        {/* Social Media + Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
          <div className="flex gap-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="hover:text-blue-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="hover:text-pink-400" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="hover:text-red-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="hover:text-blue-400" />
            </a>
          </div>
          <p className="text-sm">123 Faith Street, Owerri, Imo State</p>
          <p className="text-sm">Email: info@truelightchurch.org</p>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-300 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Truelight Glory House. All rights reserved.
      </div>
    </footer>
  );
};


