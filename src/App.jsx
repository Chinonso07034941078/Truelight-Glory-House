import { useState, useEffect } from "react"; // Import useEffect
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Sermons from "./pages/Sermons";
import Event from "./pages/Event";
import Units from "./pages/Units";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import ScrollToTop from "./components/ScrollToTop";
import JubileeCountdownPopup from './components/Pop-up';

export default function App() {
  // Initialize state to false. The popup will not be visible on initial render.
  const [showPopup, setShowPopup] = useState(false);

  // The close function remains the same.
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // useEffect will run once after the component mounts.
  useEffect(() => {
    // Set a timer to show the popup after 2000 milliseconds (2 seconds).
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    // This is a cleanup function. It will be called when the component unmounts.
    // It's important to clear the timer to prevent memory leaks.
    return () => clearTimeout(timer);
  }, []); // The empty dependency array [] ensures this effect runs only once.

  return (
    <>
      {/* The popup will now render only after the state is set to true by the timer */}
      {showPopup && <JubileeCountdownPopup onClose={handleClosePopup} />}

      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/units" element={<Units />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Event />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}