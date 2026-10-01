import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Youtube,
  Building,
  MapPin,
  Mail,
  ArrowRight,
} from 'lucide-react';

export default function Footer() {
  const { pathname } = useLocation();
  const isWccPage = pathname === "/wcc" || pathname.startsWith("/wcc/");
  const [showPopup, setShowPopup] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);

  const handleCopyAccount = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const getCurrentYear = () => new Date().getFullYear();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Units", path: "/units" },
    { name: "Sermons", path: "/sermons" },
    { name: "Events", path: "/events" },
    { name: "Support", path: "/support" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer
      className={`relative overflow-hidden text-white ${
        isWccPage ? "footer-wcc bg-[#431407]" : "bg-black"
      }`}
    >
      {isWccPage && (
        <>
          <style>{`
            .footer-wcc [class~="bg-blue-600"] { background-color: #c2410c !important; }
            .footer-wcc [class~="bg-blue-700"] { background-color: #9a3412 !important; }
            .footer-wcc [class~="bg-blue-600/80"] { background-color: rgb(194 65 12 / 0.8) !important; }
            .footer-wcc [class~="bg-blue-600/5"] { background-color: rgb(194 65 12 / 0.05) !important; }
            .footer-wcc [class~="bg-blue-400/5"] { background-color: rgb(251 146 60 / 0.05) !important; }
            .footer-wcc [class~="text-blue-600"] { color: #fb923c !important; }
            .footer-wcc [class~="text-blue-500"] { color: #fdba74 !important; }
            .footer-wcc [class~="border-blue-600"] { border-color: #c2410c !important; }
            .footer-wcc [class~="border-blue-600/60"] { border-color: rgb(194 65 12 / 0.6) !important; }
            .footer-wcc [class~="hover:bg-blue-600"]:hover { background-color: #c2410c !important; }
            .footer-wcc [class~="hover:bg-blue-700"]:hover { background-color: #9a3412 !important; }
            .footer-wcc [class~="hover:border-blue-600"]:hover { border-color: #c2410c !important; }
            .footer-wcc [class~="hover:border-blue-600/30"]:hover { border-color: rgb(194 65 12 / 0.3) !important; }
            .footer-wcc [class~="bg-blue-600"]:after { background-color: #fb923c; }
          `}</style>
          <div className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-orange-500/10 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-48 -left-40 h-[34rem] w-[34rem] rounded-full bg-orange-300/10 blur-[130px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(253,186,116,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(253,186,116,0.35)_1px,transparent_1px)] [background-size:52px_52px]" />
        </>
      )}

      {/* Giving Section */}
      <section className="relative py-16 sm:py-24 px-6 sm:px-12 lg:px-20">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Glass Card */}
          <div
            className={`relative rounded-2xl border p-8 backdrop-blur-md sm:p-12 lg:p-16 overflow-hidden ${
              isWccPage
                ? "border-orange-200/20 bg-orange-950/25 shadow-[0_24px_90px_rgba(67,20,7,0.45)]"
                : "border-white/[0.08] bg-white/[0.03]"
            }`}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-600/60" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-600/60" />

            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-blue-600"></div>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Partnership</span>
            </div>

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none tracking-tighter mb-6">
                Sow Into
                <br />
                <span className="text-blue-600">God's Kingdom</span>
              </h2>

              <p className="text-base sm:text-lg text-white/30 font-light leading-relaxed mb-8">
                Your generous giving empowers us to reach more souls and advance the Gospel worldwide.
              </p>

              <button
                onClick={() => setShowPopup(true)}
                className="px-8 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-widest transition-transform active:scale-95 hover:bg-blue-700 flex items-center gap-3"
              >
                <Building className="w-4 h-4" />
                Give Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Popup Modal — Dark Glass */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowPopup(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
                className={`relative max-w-3xl w-full overflow-hidden rounded-2xl border backdrop-blur-md ${
                  isWccPage
                    ? "border-orange-200/20 bg-orange-950/70 shadow-[0_30px_100px_rgba(67,20,7,0.8)]"
                    : "border-white/10 bg-white/[0.04] shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative border-b border-white/[0.06] p-6">
                  <button
                    className="absolute top-4 right-4 w-8 h-8 bg-white/[0.05] hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white text-sm transition-all duration-300"
                    onClick={() => setShowPopup(false)}
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-[1px] bg-blue-600"></div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Giving</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Account Details
                  </h2>
                  <p className="text-sm text-white/30 font-light mt-1">Select an account to make your contribution</p>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        label: 'Naira',
                        number: '0094316383',
                        currency: '₦',
                        bank: 'Access Bank',
                        name: 'Truelight Glory House Ministry',
                        logo: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270045/accesslogo_aze5yl.png',
                      },
                      {
                        label: 'Naira',
                        number: '1911578888',
                        currency: '₦',
                        bank: 'Access Bank',
                        name: 'Truelight Glory House Ministry',
                        logo: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270045/accesslogo_aze5yl.png',
                      },
                      {
                        label: 'Dollar',
                        number: '3003743459',
                        currency: '$',
                        bank: 'UBA',
                        name: 'TRUELIGHT GLORY HOUSE BUILDING PROJECT',
                        logo: 'https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767269982/ubalogo_nnqsks.png',
                      }
                    ].map(({ label, number, currency, bank, name, logo }, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + (i * 0.1) }}
                      >
                        <div className="relative bg-white/[0.03] border border-white/[0.08] hover:border-blue-600/30 rounded-xl p-5 transition-all duration-300 group h-full">

                          {/* Currency badge */}
                          <div className="absolute top-3 right-3 w-8 h-8 bg-blue-600/80 rounded-md flex items-center justify-center">
                            <span className="text-sm font-black text-white">{currency}</span>
                          </div>

                          <div className="mb-4">
                            <img src={logo} alt={bank} className="h-5 object-contain brightness-0 invert opacity-60" />
                          </div>

                          <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">{label}</p>
                          <p className="text-lg font-black text-white mb-1 tracking-tight">{number}</p>
                          <p className="text-[10px] text-white/20 leading-tight mb-4 line-clamp-2">{name}</p>

                          <button
                            onClick={() => handleCopyAccount(number)}
                            className={`w-full py-2.5 rounded-md font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
                              copiedAccount === number
                                ? 'bg-blue-600 text-white'
                                : 'bg-white/[0.06] border border-white/[0.08] text-white/50 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                            }`}
                          >
                            {copiedAccount === number ? 'Copied!' : 'Copy Number'}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Divider */}
      <div className={`w-full h-[2px] ${isWccPage ? "bg-orange-950/60" : "bg-white/5"}`}>
        <motion.div
          className={`h-full ${isWccPage ? "bg-orange-500 shadow-[0_0_18px_rgba(251,146,60,0.85)]" : "bg-blue-600"}`}
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "linear" }}
          viewport={{ once: true }}
        />
      </div>

      {/* Main Footer */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-20">
          <div className="grid md:grid-cols-12 gap-12 mb-16">

            {/* Brand Column */}
            <div className="md:col-span-5">
              <div className="mb-6 space-y-1">
                <h3 className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tighter">
                  TRUELIGHT
                </h3>
                <h3 className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tighter">
                  Glory House
                </h3>
              </div>

              <p className="text-white/30 font-light leading-relaxed mb-8 text-base sm:text-lg">
                Discipling the nation and disciplining the devil through the transformative power of God's Word.
              </p>

              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "https://www.facebook.com/Truelightghofficial", label: "Facebook" },
                  { icon: Instagram, href: "https://www.instagram.com/truelightgloryhouse?igsh=YzljYTk1ODg3Zg==", label: "Instagram" },
                  { icon: Youtube, href: "http://www.youtube.com/@truelightgloryhouse", label: "YouTube" },
                ].map(({ icon: Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-white/30 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-blue-600"></div>
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Navigate</span>
              </div>
              <ul className="space-y-3">
                {navLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="text-white/30 hover:text-white font-light text-sm transition-all duration-300 flex items-center gap-3 group"
                    >
                      <div className="w-0 h-[1px] bg-blue-600 group-hover:w-4 transition-all duration-300"></div>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-blue-600"></div>
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Contact</span>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/[0.04] border border-white/[0.08] flex-shrink-0">
                    <MapPin className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Visit Us</p>
                    <p className="text-white/30 font-light text-sm leading-relaxed">
                      289 Okigwe Rd, Opp. Access Bank Orji<br />
                      Owerri, Imo State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/[0.04] border border-white/[0.08] flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Email Us</p>
                    <a href="mailto:info.truelight9@gmail.com" className="text-white/30 font-light text-sm hover:text-white transition-colors duration-300">
                      info.truelight9@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/[0.06]">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/20 text-xs font-light">
                &copy; {getCurrentYear()} <span className="text-blue-600 font-black">Truelight Glory House</span>. All rights reserved.
              </p>
              <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
                <a href="#" className="text-white/20 hover:text-white transition-colors duration-300">Privacy</a>
                <a href="#" className="text-white/20 hover:text-white transition-colors duration-300">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Progress Line */}
      <div className={`w-full h-[2px] ${isWccPage ? "bg-orange-950/60" : "bg-white/5"}`}>
        <motion.div
          className={`h-full ${isWccPage ? "bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.8)]" : "bg-blue-600"}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </footer>
  );
}
