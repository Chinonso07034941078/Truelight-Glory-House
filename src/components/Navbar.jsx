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
  className={`absolute top-0 left-0 right-0 h-full transition-colors duration-500 ${
    hasScrolled ? 'bg-blue-950' : 'bg-opacity-70 backdrop-blur-md'
  }`}
></div>
      {/* Main Nav Content (not blurred) */}
     <div className="relative px-4 py-1 max-w-7xl mx-auto flex justify-between items-center text-white">
        <Link to="/" className="flex items-center">
    <img
      src={trueligtLogo}
      alt="Truelight Logo"
      className="object-contain transition-transform duration-300 hover:scale-110"
      style={{
         height: '7rem',         // or try 4.5rem, 5rem if needed
         maxHeight: '100%',
         width: 'auto',
         marginTop: '-1.5rem',   // lift it slightly if it feels too low
         marginBottom: '-2.3rem' // optional: compresses space without growing navbar
         }}
/>
    </Link>

        {/* Desktop Nav */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-14 text-md font-bold">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/units" className="hover:underline">Units</Link></li>
          <li><Link to="/sermons" className="hover:underline">Sermons</Link></li>
          <li><Link to="/events" className="hover:underline">Events</Link></li>
          <li><Link to="/support" className="hover:underline">Support</Link></li>
        </ul>
      </div>

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
          <li><Link to="/units" onClick={closeMenu}>Units</Link></li>
          <li><Link to="/sermons" onClick={closeMenu}>Sermons</Link></li>
          <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
          <li><Link to="/support" onClick={closeMenu}>Support</Link></li>
        </ul>
      </div>
    </nav>
  );
}
