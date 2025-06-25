import C05 from '../assets/Give2.jpeg';
import C06 from '../assets/Give4.mp4';
import accss from '../assets/accesslogo.png';
import ubal from '../assets/ubalogo.png';
import { Copy, Banknote, CreditCard } from 'lucide-react';
import Footer from "../components/Footer";
import { useEffect, useState } from 'react';

export default function Support() {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  
  const messages = [
    "Giving is an act of worship.",
    "Partner with God through your resources.",
    "Your generosity builds His house.",
    "Support the gospel — transform lives.",
    "Give cheerfully, give purposefully.",
  ];

  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === messages.length) return;

    const timeout = setTimeout(() => {
      if (deleting) {
        if (subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % messages.length);
        }
      } else {
        if (subIndex < messages[index].length) {
          setSubIndex(subIndex + 1);
        } else {
          setDeleting(true);
        }
      }

      setCurrentText(messages[index].substring(0, subIndex));
    }, deleting ? 60 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);


  return (
    <div className="overflow-x-hidden">
      {/* First Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={C06} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-opacity-5 from-black via-white/90 to-black/20 z-10" />

      {/* Foreground content */}
 <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
      <h1 className="text-5xl md:text-6xl uppercase font-bold mb-6 drop-shadow-lg animate-fadeIn">
        Give to tlgh
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-4 animate-fadeIn">
        Every man according as he purposeth in his heart, so let him give...
      </p>
      <div className="text-xl md:text-2xl font-semibold text-white mt-6 min-h-[2.5rem]">
        <span className="border-r-2 border-white pr-1 animate-pulse">
          {currentText}
        </span>
      </div>
    </div>
        </div>
     

      {/* Second Section */}
      <div className="bg-white px-6 py-16 text-gray-900 transition-all duration-500 ease-in-out">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-sm font-semibold animate-slideIn">
              __ GIVE TO TLGH
            </button>
            <h2 className="text-4xl font-extrabold mt-4">WAYS TO GIVE</h2>
          </div>
          <p className="text-gray-600 text-lg max-w-xl">
            Join us as we put our money right where our faith is, partnering with God for the spread of the gospel in our day.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button className="bg-blue-950 text-white rounded-full px-6 py-3 font-semibold hover:scale-105 transition">
            NAIRA ACCOUNT
          </button>
          <button className="bg-blue-100 text-gray-800 rounded-full px-6 py-3 font-semibold hover:scale-105 transition">
            DOMICILIARY ACCOUNT
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-blue-100 p-6 rounded-xl shadow hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white rounded-full border" />
                <span className="font-bold text-lg">GIVINGS</span>
              </div>
              <span className="text-2xl">🇳🇬</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'OFFERING/TITHE', number: '1025313120', logo: ubal },
                { label: 'OFFERING/TITHE', number: '0094316383', logo: accss },
                { label: 'PROJECT ACCOUNT', number: '00924316383', logo: accss },
              ].map(({ label, number, logo }) => (
                <div key={label + number} className="bg-white p-4 rounded-lg hover:shadow-md transition">
                  <div className="text-blue-900 text-sm mb-1">{label}</div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img src={logo} alt={label} className="w-[6rem] h-[3.5rem] object-contain" />
                      <span className="text-2xl font-semibold">{number}</span>
                    </div>
                    <button onClick={() => handleCopy(number)}>
                      <Copy className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 font-semibold">
                  <Banknote className="w-5 h-5" />
                  BUILDING PROJECT
                </div>
                <span className="text-2xl">🇳🇬</span>
              </div>

              {[{ label: 'GLORY LAND Naira', number: '1025413161', logo: ubal }, { label: 'GLORY LAND Dollar', number: '3003743459', logo: ubal }].map(({ label, number, logo }) => (
                <div key={label + number} className="bg-white p-4 mb-3 rounded-lg hover:shadow-md transition">
                  <div className="flex items-center gap-2 text-lg font-bold text-blue-900 mb-1">
                    <div className="w-4 h-4 bg-gray-200 rounded-full" />
                    {label}
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <div className="flex items-center gap-2">
                      <img src={logo} alt={label} className="w-[5.4em] h-6 object-contain" />
                      <span>{number}</span>
                    </div>
                    <button onClick={() => handleCopy(number)}>
                      <Copy className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl overflow-hidden shadow border border-blue-200 hover:shadow-md transition">
              <div className="flex items-start gap-3 p-6">
                <CreditCard className="w-6 h-6 text-blue-700" />
                <div>
                  <h3 className="font-semibold">Give via PayPal</h3>
                  <p className="text-sm text-gray-600">
                    Give securely from anywhere in the world using PayPal balance,
                    credit/debit cards, or bank accounts.
                  </p>
                </div>
              </div>
              <button className="bg-blue-600 w-full text-white font-bold py-3 hover:bg-blue-700 transition">
                GIVE NOW →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Call to Give */}
      <div className="text-white font-poppins relative">
        <div className="relative z-30 -mt-28">
          <div className="max-w-6xl mx-auto px-[3em] -mb-[12em] mt-[12em] py-[6em] flex flex-col md:flex-row items-center justify-between gap-10 bg-blue-950 backdrop-blur-md rounded-2xl shadow-2xl">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black capitalize text-white mb-4 leading-tight">
                Give to <br /> Truelight Glory House
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Your generosity keeps blessing lives, thank you for giving.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-950 font-bold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition duration-300">
                  GIVE NOW
                </button>
                <button className="bg-blue-950 text-white font-bold px-6 py-3 rounded-full shadow hover:bg-blue-900 transition duration-300">
                  BUILDING PROJECT
                </button>
              </div>
            </div>
            <div className="hidden md:block md:flex-shrink-0">
              <img
                src={C05} // Using an image instead of video
                alt="giving art"
                className="w-[20rem] object-contain opacity-60"
              />
            </div>
          </div>
        </div>

        <section className="bg-blue-950 py-24">
          {/* Reserved for future content */}
        </section>

        <div className="text-center py-20 px-6 bg-blue-950">
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest mb-4">
            JOIN OUR MAILING LIST
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
            We promise not to spam you, but send you edifying and amazing content
            regularly from Celebration Church International.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              placeholder="Email address"
              className="px-6 py-3 rounded-full bg-white/20 text-white placeholder:text-gray-300 focus:outline-none w-[20rem] md:w-[24rem]"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-950 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
