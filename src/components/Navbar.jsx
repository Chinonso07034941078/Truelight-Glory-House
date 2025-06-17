import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import trueligtLogo from '../assets/truelight-logo.png'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* Blurred or Solid Background Layer */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          hasScrolled ? 'bg-blue-950' : 'bg-opacity-70 backdrop-blur-md'
        }`}
      ></div>

      {/* Main Nav Content (not blurred) */}
      <div className="relative px-4 py-2 max-w-7xl mx-auto flex justify-between items-center text-white">
        <Link to="/" className="flex items-center">
          <img
            src={trueligtLogo}
            alt="Truelight Logo"
            className="h-full max-h-full object-contain transition-transform duration-200 hover:scale-105"
            style={{ maxHeight: '5rem', width: 'auto' }} // Ensures no overflow
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/sermons" className="hover:underline">Sermons</Link></li>
          <li><Link to="/events" className="hover:underline">Events</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          <li><Link to="/support" className="hover:underline">Support</Link></li>
        </ul>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-white" onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-950 opacity-90 shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-end">
          <button onClick={closeMenu}>
            <X size={24} className="text-white" />
          </button>
        </div>
        <ul className="flex flex-col gap-6 text-sm font-medium px-6 text-white">
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/sermons" onClick={closeMenu}>Sermons</Link></li>
          <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          <li><Link to="/support" onClick={closeMenu}>Support</Link></li>
        </ul>
      </div>
    </nav>
  );
}
