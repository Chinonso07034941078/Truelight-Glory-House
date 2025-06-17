import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Sermons from "./pages/Sermons"
import Event from "./pages/Event"
import Contact from "./pages/Contact"
import Support from "./pages/Support"


export default function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/events" element={<Event />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

