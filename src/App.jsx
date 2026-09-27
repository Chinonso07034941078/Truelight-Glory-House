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
import Wcc from "./pages/WCC";
import ScrollToTop from "./components/ScrollToTop";
// import JubileeCountdownPopup from './components/Pop-up';

export default function App() {
  // Initialize state to false. The popup will not be visible on initial render.
 
  return (
    <>
      {/* The popup will now render only after the state is set to true by the timer */}
    
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
          <Route path="/wcc" element={<Wcc />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}