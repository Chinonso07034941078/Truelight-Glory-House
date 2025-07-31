import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  Copy,
  CheckCircle,
} from 'lucide-react';
import C03 from '../assets/Give12.jpg';
import UBA from '../assets/ubalogo.png';

export default function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleCopyAccount = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate submission (replace with real API call)
      await new Promise((res) => setTimeout(res, 1000));
      setStatus({ message: 'Message sent successfully!', type: 'success' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus({ message: 'Failed to send message. Try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white px-4">
      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Visit Us</h2>
            <p className="text-xl text-yellow-400">We'd love to meet you in person</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Location/Times */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-yellow-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Our Location</h3>
                  <p className="text-gray-300">Wesley Building, 289 Okigwe Rd, adjacent Access Bank, Owerri</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-yellow-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Service Times</h3>
                  <p className="text-gray-300">
                    Sunday Service: 7:00 AM<br />
                    Tuesday Bible Study: 5:00 PM<br />
                    Friday Prayer Meeting: 5:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-yellow-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Contact Info</h3>
                  <p className="text-gray-300">
                    Phone: +234 813 045 6427<br />
                    Email: info.truelight9@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <div className="bg-blue-900/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-yellow-400/30">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-200 mb-2 capitalize">{field}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-yellow-400/40 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-sm"
                      placeholder={`Your ${field}`}
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-yellow-400/40 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-sm resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              {status.message && (
                <div className={`mt-4 p-3 rounded-lg ${status.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {status.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Giving Section */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto bg-white text-blue-900 rounded-xl p-8 md:p-12 shadow-xl relative border border-yellow-400/30">
          <img src={C03} alt="Give" className="absolute bottom-0 right-0 opacity-20 w-72 md:w-[400px] pointer-events-none" />
          <h2 className="text-[2.3em] md:text-5xl font-extrabold uppercase">Give into Truelight Glory House</h2>
          <p className="text-lg mb-8 max-w-xl">Your generosity keeps blessing lives. Thank you for giving.</p>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105"
          >
            GIVE NOW
          </button>
        </div>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white text-blue-900 max-w-2xl w-full p-8 rounded-2xl shadow-xl relative border border-yellow-400/30">
              <button className="absolute top-4 right-4 text-red-500 text-lg" onClick={() => setShowPopup(false)}>✕</button>
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-8 h-8 text-yellow-500" />
                <h2 className="text-2xl font-bold">Glory Land Building Project</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: 'Naira Account',
                    number: '1025413161',
                    currency: '₦',
                    bank: 'UBA',
                    name: 'TRUELIGHT GLORY HOUSE BUILDING PROJECT',
                    logo: UBA,
                  },
                  {
                    label: 'Dollar Account',
                    number: '3003743459',
                    currency: '$',
                    bank: 'UBA',
                    name: 'TRUELIGHT GLORY HOUSE BUILDING PROJECT',
                    logo: UBA,
                  }
                ].map(({ label, number, currency, bank, name, logo }, i) => (
                  <div key={i} className="p-4 bg-white rounded-lg border shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-bold">{label}</p>
                      <span className="text-2xl font-bold text-yellow-500">{currency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={logo} alt={bank} className="w-12 h-8 object-contain" />
                        <div>
                          <p className="font-bold text-blue-900">{number}</p>
                          <p className="text-sm text-gray-500">{name}</p>
                        </div>
                      </div>
                      <button onClick={() => handleCopyAccount(number)} className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200">
                        {copiedAccount === number ? <CheckCircle className="text-green-600" /> : <Copy className="text-blue-900" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer Bottom */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-center md:text-left py-8">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">TRUELIGHT GLORY HOUSE</h3>
          <p className="text-sm text-gray-300">We disciple the nation, and discipline the devil.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">Connect With Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mb-2">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition">
                <Icon size={20} />
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-300">289 Okigwe Rd, Opp. Access Bank Orji, Owerri</p>
          <p className="text-xs text-gray-300">info.truelight9@gmail.com</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 border-t border-yellow-400/30 pt-3 pb-6">
        &copy; {new Date().getFullYear()} Truelight Glory House. All rights reserved.
      </div>
    </footer>
  );
}
