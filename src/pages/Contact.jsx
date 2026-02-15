import { useEffect, useState, useCallback } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Church, User, PhoneCall, Calendar, Users, Heart, Mic, Handshake, ExternalLink, Facebook, Instagram, Youtube, AlertCircle, Copy, CheckCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      // Create the email body with all form details
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Category: ${formData.category}

Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from True Light Glory House Contact Form
${new Date().toLocaleString()}
      `;

      // Encode the subject and body for URL
      const mailtoSubject = encodeURIComponent(`Contact Form: ${formData.subject}`);
      const mailtoBody = encodeURIComponent(emailBody);

      // Open Gmail with pre-filled message
      window.location.href = `mailto:info.truelight9@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Show success message
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', category: 'general' });
      setFormValidation({});
      setTimeout(() => setIsSubmitted(false), 8000);
    } catch (error) {
      setSubmitError('Failed to open email client. Please try again or contact us directly at info.truelight9@gmail.com');
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const copyToClipboard = async (text, type) => {
    try { await navigator.clipboard.writeText(text); setCopiedInfo(type); setTimeout(() => setCopiedInfo(null), 2000); }
    catch { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); setCopiedInfo(type); setTimeout(() => setCopiedInfo(null), 2000); document.body.removeChild(ta); }
  };

  const contactInfo = [
    { 
      icon: PhoneCall, 
      title: 'WhatsApp', 
      details: ['+234 813 045 6427'], 
      color: 'bg-green-100 text-green-700', 
      action: () => window.open('https://wa.me/2348130456427', '_blank'), 
      copyable: '+2348130456427' 
    },
    { 
      icon: Mail, 
      title: 'Email Address', 
      details: ['info.truelight9@gmail.com'], 
      color: 'bg-blue-100 text-blue-700', 
      action: () => window.open('mailto:info.truelight9@gmail.com'), 
      copyable: 'info.truelight9@gmail.com' 
    },
    { 
      icon: MapPin, 
      title: 'Our Location', 
      details: ['Wesley Building, 289 Okigwe Rd', 'Owerri, Imo State, Nigeria'], 
      color: 'bg-purple-100 text-purple-700', 
      action: () => window.open('https://maps.google.com/?q=Wesley Building, 289 Okigwe Rd, Owerri, Imo State, Nigeria', '_blank'), 
      copyable: 'Wesley Building, 289 Okigwe Rd, Owerri, Imo State, Nigeria' 
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div> */}
        {/* <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/25 to-purple-500/15 rounded-full blur-3xl animate-float-slow"></div> */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-300/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slower"></div> */}
        {/* <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-bl from-indigo-400/15 to-blue-500/10 rounded-full blur-3xl animate-float-reverse"></div> */}
        
        {/* <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div> */}
        
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-600/30 rounded-lg rotate-12 animate-float-rotate"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-blue-600/10 rounded-full animate-pulse-slow"></div>
        {/* <div className="absolute top-1/3 right-20 w-2 h-40 bg-gradient-to-b from-blue-600/50 to-transparent animate-slide-up"></div> */}
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-blue-500/30 rounded-full animate-ping-slow"></div>
        
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-600/30 via-transparent to-blue-600/30 transform -skew-x-12 animate-slide-down"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-600/20 via-transparent to-blue-600/20 transform skew-x-12 animate-slide-up-slow"></div>
      </div>
      
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -20px); }
          50% { transform: translate(-10px, -30px); }
          75% { transform: translate(-20px, 10px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-30px, 20px); }
          50% { transform: translate(15px, 40px); }
          75% { transform: translate(25px, -15px); }
        }
        
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          33% { transform: translateY(-20px) rotate(20deg); }
          66% { transform: translateY(10px) rotate(5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        
        @keyframes slide-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes slide-down {
          0%, 100% { transform: translateY(0) skew(-12deg); }
          50% { transform: translateY(20px) skew(-12deg); }
        }
        
        @keyframes slide-up-slow {
          0%, 100% { transform: translateY(0) skew(12deg); }
          50% { transform: translateY(-40px) skew(12deg); }
        }
        
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 12s ease-in-out infinite;
        }
        
        .animate-float-rotate {
          animation: float-rotate 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 5s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 4s ease-in-out infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 6s ease-in-out infinite;
        }
        
        .animate-slide-up-slow {
          animation: slide-up-slow 8s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="space-y-8 lg:space-y-12 max-w-4xl"
          >
            
            <div className="flex items-center gap-4">
              <div className="w-16 sm:w-20 h-1 bg-blue-600"></div>
              <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
                Contact
              </span>
            </div>

            <div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black text-gray-900 leading-none tracking-tighter">
                Get In
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black leading-none tracking-tighter mt-2">
                <span className="text-blue-600">
                  Touch
                </span>
              </h1>
            </div>

            <div className="max-w-xl">
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed">
                We're here to serve you and answer any questions you may have.
              </p>
            </div>

            <div className="h-12 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlogan}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg text-gray-600 font-light italic"
                >
                  {slogans[currentSlogan]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-blue-600 text-white font-bold px-12 py-5 text-lg uppercase tracking-wider hover:bg-gray-900 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Info
                </span>
                <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
              </button>
              
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/60 backdrop-blur-md border-2 border-gray-300 text-gray-900 font-bold px-12 py-5 text-lg uppercase tracking-wider hover:bg-white hover:border-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>

          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-600"></div>
      </section>

      {/* Contact Info Section */}
      <section id="contact-info" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-1 bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Reach Us
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
              Contact Information
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden h-full min-h-[240px] bg-white/40 backdrop-blur-xl border border-white/60 hover:bg-white/60 hover:border-blue-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 p-6 flex flex-col">
                  
                  <div className="absolute top-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
                  
                  <div className={`${info.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                    <info.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  
                  <div className="space-y-1 flex-grow mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 text-sm font-medium leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-300/50">
                    {info.action && (
                      <button
                        onClick={info.action}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Connect
                      </button>
                    )}
                    {info.copyable && (
                      <button
                        onClick={() => copyToClipboard(info.copyable, info.title)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedInfo === info.title ? (
                          <CheckCheck className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="w-16 h-1 bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Send Message
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
              Contact Form
            </h2>
          </motion.div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-20 px-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Message Sent!</h3>
                <p className="text-gray-700 text-lg font-light mb-8 max-w-md mx-auto">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 uppercase tracking-wider transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                {submitError && (
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-700 mb-1">Submission Failed</h4>
                      <p className="text-red-600 font-light text-sm">{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-bold mb-3 text-sm uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 bg-white/60 backdrop-blur-sm border-2 focus:outline-none transition-all ${
                        formValidation.name
                          ? 'border-red-400 focus:border-red-600'
                          : 'border-gray-300 focus:border-blue-600'
                      }`}
                      placeholder="Your full name"
                    />
                    {formValidation.name && (
                      <p className="text-red-600 text-sm font-medium mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {formValidation.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-900 font-bold mb-3 text-sm uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 bg-white/60 backdrop-blur-sm border-2 focus:outline-none transition-all ${
                        formValidation.email
                          ? 'border-red-400 focus:border-red-600'
                          : 'border-gray-300 focus:border-blue-600'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formValidation.email && (
                      <p className="text-red-600 text-sm font-medium mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {formValidation.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-3 text-sm uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-all"
                    placeholder="+234 000 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-3 text-sm uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border-2 border-gray-300 focus:outline-none focus:border-blue-600 transition-all"
                  >
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-3 text-sm uppercase tracking-wider">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 bg-white/60 backdrop-blur-sm border-2 focus:outline-none transition-all ${
                      formValidation.subject
                        ? 'border-red-400 focus:border-red-600'
                        : 'border-gray-300 focus:border-blue-600'
                    }`}
                    placeholder="What's this message about?"
                  />
                  {formValidation.subject && (
                    <p className="text-red-600 text-sm font-medium mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {formValidation.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-3 text-sm uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-4 bg-white/60 backdrop-blur-sm border-2 focus:outline-none transition-all resize-none ${
                      formValidation.message
                        ? 'border-red-400 focus:border-red-600'
                        : 'border-gray-300 focus:border-blue-600'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {formValidation.message && (
                    <p className="text-red-600 text-sm font-medium mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {formValidation.message}
                    </p>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-blue-600 text-white font-bold px-12 py-5 text-lg uppercase tracking-wider hover:bg-gray-900 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </span>
                    {!isSubmitting && (
                      <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Social Links */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wider">
              Connect on Social Media
            </h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gray-900 text-white p-4 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
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