import { useEffect, useState, useCallback } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Church, User, PhoneCall, Calendar, Users, Heart, Mic, Handshake, ExternalLink, Facebook, Instagram, Youtube, AlertCircle, Copy, CheckCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Footer from '../components/Footer';

export default function EnhancedContacts() {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', category: 'general' });
  const [formValidation, setFormValidation] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [copiedInfo, setCopiedInfo] = useState(null);

  const slogans = [
    "We'd love to hear from you", "Your connection to faith", "Building relationships together",
    "Always here for you", "Join our community of faith", "Experience God's love"
  ];
  const EMAILJS_PUBLIC_KEY = 'LvLCUUDggUSgyv7_U', EMAILJS_SERVICE_ID = 'service_u13idyp', EMAILJS_TEMPLATE_ID = 'template_c5pp0dj';

  useEffect(() => { emailjs.init(EMAILJS_PUBLIC_KEY); }, []);
  useEffect(() => { const i = setInterval(() => setCurrentSlogan(p => (p + 1) % slogans.length), 4000); return () => clearInterval(i); }, []);

  const validateField = useCallback((name, value) => {
    const errors = {};
    if (name === 'name') { if (!value.trim()) errors.name = 'Name is required'; else if (value.trim().length < 2) errors.name = 'Name must be at least 2 characters'; }
    if (name === 'email') { if (!value.trim()) errors.email = 'Email is required'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = 'Please enter a valid email'; }
    if (name === 'subject') { if (!value.trim()) errors.subject = 'Subject is required'; else if (value.trim().length < 3) errors.subject = 'Subject must be at least 3 characters'; }
    if (name === 'message') { if (!value.trim()) errors.message = 'Message is required'; else if (value.trim().length < 10) errors.message = 'Message must be at least 10 characters'; }
    return errors;
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormValidation(prev => ({ ...prev, [name]: validateField(name, value)[name] || null }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const allErrors = {};
    Object.keys(formData).forEach(k => { if (k !== 'phone' && k !== 'category') { const err = validateField(k, formData[k]); if (err[k]) allErrors[k] = err[k]; } });
    if (Object.keys(allErrors).length > 0) { setFormValidation(allErrors); setIsSubmitting(false); return; }

    try {
      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone || 'Not provided',
        subject: formData.subject,
        message: formData.message,
        category: formData.category,
        reply_to: formData.email,
        timestamp: new Date().toLocaleString()
      };
      const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      if (response.status === 200 || response.text === "OK") {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', category: 'general' });
        setFormValidation({});
        setTimeout(() => setIsSubmitted(false), 8000);
      } else throw new Error('Failed to send email.');
    } catch (error) {
      setSubmitError('Failed to send message. Please try again or contact us directly at info.truelight9@gmail.com');
    } finally { setIsSubmitting(false); }
  };

  const copyToClipboard = async (text, type) => {
    try { await navigator.clipboard.writeText(text); setCopiedInfo(type); setTimeout(() => setCopiedInfo(null), 2000); }
    catch { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); setCopiedInfo(type); setTimeout(() => setCopiedInfo(null), 2000); document.body.removeChild(ta); }
  };

  const contactInfo = [
    { icon: PhoneCall, title: 'Phone Numbers', details: ['+234 813 045 6427'], color: 'bg-blue-100 text-blue-700 border-blue-200', action: () => window.open('tel:+2348130456427'), copyable: '+2348130456427' },
    { icon: Mail, title: 'Email Address', details: ['info.truelight9@gmail.com'], color: 'bg-emerald-100 text-emerald-700 border-emerald-200', action: () => window.open('mailto:info.truelight9@gmail.com'), copyable: 'info.truelight9@gmail.com' },
    { icon: MapPin, title: 'Our Location', details: ['Wesley Building, 289 Okigwe Rd', 'Owerri, Imo State, Nigeria'], color: 'bg-amber-100 text-amber-700 border-amber-200', action: () => window.open('https://maps.google.com/?q=Wesley Building, 289 Okigwe Rd, Owerri, Imo State, Nigeria', '_blank'), copyable: 'Wesley Building, 289 Okigwe Rd, Owerri, Imo State, Nigeria' }
  ];
  const departments = [
    { name: 'General Inquiry', value: 'general', icon: MessageSquare },
    { name: 'Prayer Request', value: 'prayer', icon: Heart },
    { name: 'Event Registration', value: 'events', icon: Calendar },
    { name: 'Counseling', value: 'counseling', icon: Users },
    { name: 'Media Ministry', value: 'media', icon: Mic },
    { name: 'Partnership', value: 'partnership', icon: Handshake }
  ];
  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: 'https://www.facebook.com/Truelightghofficial', color: 'hover:bg-blue-600' },
    { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/truelightgloryhouse?igsh=YzljYTk1ODg3Zg==', color: 'hover:bg-pink-600' },
    { icon: Youtube, name: 'YouTube', url: 'http://www.youtube.com/@truelightgloryhouse', color: 'hover:bg-red-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiM0RjQ2RTUiIGQ9Ik0zNiAzNGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDYuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAyYy00LjQxOCAwLTgtMy41ODItOC04czMuNTgyLTggOC04IDggMy41ODIgOCA4LTMuNTgyIDgtOHoiLz48L2c+PC9zdmc+')]"></div>
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <motion.div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-5 py-2 mb-8 border border-white/25" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Church className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium tracking-wider text-blue-600">Connect With Faith</span>
          </motion.div>
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-tight text-gray-900" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <span className="font-extralight">Get In</span>{' '}
            <span className="font-semibold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">Touch</span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-600 block mt-2">We're here for you</span>
          </motion.h1>
          <motion.div className="text-lg md:text-xl font-light mb-12 h-14 flex items-center justify-center max-w-3xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <AnimatePresence mode="wait">
              <motion.p key={currentSlogan} className="text-gray-600 leading-relaxed" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.6 }}>
                {slogans[currentSlogan]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <button onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 backdrop-blur-md text-gray-900 font-medium px-8 py-4 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-500 transform hover:scale-105 flex items-center justify-center gap-3">
              <Phone className="w-5 h-5" />
              Contact Information
              <motion.div className="w-1 h-1 bg-current rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            </button>
            <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-blue-600 text-blue-600 font-medium px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3">
              <Send className="w-5 h-5" />Send Message
            </button>
          </motion.div>
        </div>
      </section>
      <section id="contact-info" className="py-20 md:py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-5 py-2 rounded-full font-medium mb-8 border border-blue-100"><MapPin className="w-4 h-4" /><span className="text-sm tracking-wider">Find Us Here</span></div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight"><span className="font-extralight">Contact</span>{' '}<span className="font-medium">Information</span></h2>
            <p className="text-lg font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">We're here to serve you and answer any questions you may have. Reach out through any of these channels.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-4 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all duration-500 flex flex-col group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`${info.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/50`}><info.icon className="w-6 h-6" /></div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{info.title}</h3>
                  <div className="space-y-2 flex-grow mb-6">{info.details.map((detail, idx) => (<p key={idx} className="text-gray-600 text-sm font-light leading-relaxed">{detail}</p>))}</div>
                  <div className="flex items-center gap-4 mt-auto">
                    {info.action && (<button onClick={info.action} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm"><ExternalLink className="w-4 h-4" />Connect</button>)}
                    {info.copyable && (<button onClick={() => copyToClipboard(info.copyable, info.title)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors duration-200" title="Copy to clipboard">{copiedInfo === info.title ? (<CheckCheck className="w-4 h-4 text-green-500" />) : (<Copy className="w-4 h-4" />)}</button>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 text-gray-900 relative overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-2xl blur-xl" />
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-light mb-4"><span className="font-extralight">Ready to</span>{' '}<span className="font-medium">Connect?</span></h3>
                <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">Choose your preferred way to get in touch with our ministry team.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <a href="tel:+2348130456427" className="group bg-white hover:bg-blue-50 p-8 rounded-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"><PhoneCall className="w-10 h-10 text-blue-600 mb-4" /><h4 className="text-lg font-medium mb-2">Call us now</h4><p className="text-gray-600 text-sm font-light mb-4">Speak directly with our team</p><div className="text-blue-600 font-medium">+234 813 045 6427</div></a>
                <a href="mailto:info.truelight9@gmail.com" className="group bg-white hover:bg-blue-50 p-8 rounded-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"><Mail className="w-10 h-10 text-emerald-600 mb-4" /><h4 className="text-lg font-medium mb-2">Email us</h4><p className="text-gray-600 text-sm font-light mb-4">Send us a detailed message</p><div className="text-emerald-600 font-medium break-all">info.truelight9@gmail.com</div></a>
                <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} className="group bg-white hover:bg-blue-50 p-8 rounded-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"><Send className="w-10 h-10 text-indigo-600 mb-4" /><h4 className="text-lg font-medium mb-2">Contact form</h4><p className="text-gray-600 text-sm font-light mb-4">Fill out our online form</p><div className="text-indigo-600 font-medium">Send message →</div></button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact-form" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-5 py-2 rounded-full font-medium mb-8 border border-blue-100"><MessageSquare className="w-4 h-4" /><span className="text-sm tracking-wider">Get In Touch</span></div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight"><span className="font-extralight">Send Us a</span>{' '}<span className="font-medium">Message</span></h2>
            <p className="text-lg font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">Have questions, prayer requests, or want to know more about our ministry? We'd love to hear from you.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {isSubmitted ? (
              <div className="text-center py-20 px-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8 text-green-500" /></div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">Message sent successfully!</h3>
                <p className="text-gray-600 text-lg font-light mb-8 max-w-md mx-auto leading-relaxed">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setIsSubmitted(false)} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-colors">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                {submitError && (<div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg flex items-start gap-3"><AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" /><div><h4 className="font-medium text-red-700 mb-1">Submission failed</h4><p className="text-red-600 font-light">{submitError}</p></div></div>)}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6"><div className="bg-blue-100 p-3 rounded-xl"><User className="w-5 h-5 text-blue-600" /></div><h3 className="text-xl font-medium text-gray-900">Personal information</h3></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-900 font-medium mb-3">Full name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                        className={`w-full px-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 font-light ${formValidation.name ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-500/20'} text-gray-900 placeholder-gray-500`}
                        placeholder="Your full name" />
                      {formValidation.name && (<p className="text-red-500 text-sm font-light mt-2 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{formValidation.name}</p>)}
                    </div>
                    <div>
                      <label className="block text-gray-900 font-medium mb-3">Email address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                        className={`w-full px-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 font-light ${formValidation.email ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-500/20'} text-gray-900 placeholder-gray-500`}
                        placeholder="your.email@example.com" />
                      {formValidation.email && (<p className="text-red-500 text-sm font-light mt-2 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{formValidation.email}</p>)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">Phone number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-blue-400 focus:ring-blue-500/20 transition-all duration-200 font-light text-gray-900 placeholder-gray-500"
                      placeholder="+234 000 000 0000" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6"><div className="bg-emerald-100 p-3 rounded-xl"><MessageSquare className="w-5 h-5 text-emerald-600" /></div><h3 className="text-xl font-medium text-gray-900">Message details</h3></div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-blue-400 focus:ring-blue-500/20 transition-all duration-200 font-light text-gray-900">
                      {departments.map(dept => (<option key={dept.value} value={dept.value}>{dept.name}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">Subject *</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleInputChange}
                      className={`w-full px-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 font-light ${formValidation.subject ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-500/20'} text-gray-900 placeholder-gray-500`}
                      placeholder="What's this message about?" />
                    {formValidation.subject && (<p className="text-red-500 text-sm font-light mt-2 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{formValidation.subject}</p>)}
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows={6}
                      className={`w-full px-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 font-light resize-none ${formValidation.message ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-500/20'} text-gray-900 placeholder-gray-500`}
                      placeholder="Tell us how we can help you..." />
                    {formValidation.message && (<p className="text-red-500 text-sm font-light mt-2 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{formValidation.message}</p>)}
                  </div>
                </div>
                <div className="pt-6">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-3">
                    {isSubmitting ? (<><Loader2 className="w-6 h-6 animate-spin" />Sending message...</>) : (<><Send className="w-5 h-5" />Send message<motion.div className="w-1 h-1 bg-white rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} /></>)}
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-8">Other ways to connect</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a key={index} href={social.url} target="_blank" rel="noopener noreferrer"
                  className={`bg-gray-800 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}


// info.truelight9@gmail.com