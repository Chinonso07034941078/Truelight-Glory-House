import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-blue-950 text-white px-4 py-4 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Truelight</Link>
        </div>

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
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-950 shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
      >
        <div className="p-4 flex justify-end">
          <button onClick={closeMenu}>
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col gap-6 text-sm font-medium px-6">
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
