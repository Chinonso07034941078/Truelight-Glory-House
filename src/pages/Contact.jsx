import { useEffect, useState, useCallback } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, MessageSquare, 
  CheckCircle, Church, User, PhoneCall, 
  Calendar, Users, Heart, Mic, Handshake, 
  ExternalLink, Facebook, Instagram, Twitter, Youtube, 
  AlertCircle, Copy, CheckCheck, Loader2, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function EnhancedContacts() {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [formValidation, setFormValidation] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [copiedInfo, setCopiedInfo] = useState(null);
  
  const slogans = [
    'We\'d Love to Hear From You',
    'Your Connection to Faith',
    'Building Relationships Together',
    'Always Here for You',
    'Join Our Community of Faith',
    'Experience God\'s Love'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan(prev => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  const validateField = useCallback((name, value) => {
    const errors = {};
    
    switch (name) {
      case 'name':
        if (!value.trim()) errors.name = 'Name is required';
        else if (value.trim().length < 2) errors.name = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = 'Please enter a valid email';
        break;
      case 'subject':
        if (!value.trim()) errors.subject = 'Subject is required';
        else if (value.trim().length < 3) errors.subject = 'Subject must be at least 3 characters';
        break;
      case 'message':
        if (!value.trim()) errors.message = 'Message is required';
        else if (value.trim().length < 10) errors.message = 'Message must be at least 10 characters';
        break;
    }
    
    return errors;
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const fieldErrors = validateField(name, value);
    setFormValidation(prev => ({
      ...prev,
      [name]: fieldErrors[name] || null
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    const allErrors = {};
    Object.keys(formData).forEach(key => {
      const errors = validateField(key, formData[key]);
      if (errors[key]) allErrors[key] = errors[key];
    });
    
    if (Object.keys(allErrors).length > 0) {
      setFormValidation(allErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({
        name: '', email: '', phone: '', subject: '', message: '', category: 'general'
      });
      setFormValidation({});
      
      setTimeout(() => setIsSubmitted(false), 8000);
      
    } catch (error) {
      setSubmitError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedInfo(type);
      setTimeout(() => setCopiedInfo(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedInfo(type);
        setTimeout(() => setCopiedInfo(null), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };
  
  const contactInfo = [
    {
      icon: PhoneCall,
      title: 'Phone Numbers',
      details: ['+234 813 045 6427'],
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      action: () => window.open('tel:+2348130456427'),
      copyable: '+2348130456427'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['info.truelight9@gmail.com'],
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      action: () => window.open('mailto:info.truelight9@gmail.com'),
      copyable: 'info.truelight9@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Our Location',
      details: ['Wesley Building, 289 Okigwe Rd', 'Owerri, Imo State, Nigeria'],
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      action: () => window.open('https://maps.google.com/?q=Wesley Building, 289 Okigwe Rd, Owerri, Imo State, Nigeria', '_blank'),
      copyable: 'Wesley Building, 289 Okigwe Rd, Owerri, Imo State, Nigeria'
    },
    {
      icon: Clock,
      title: 'Service Times',
      details: [
        'Sunday: 7:00 AM, 8:45 AM, 10:30 AM',
        'Tuesday Bible Study: 5:00 PM',
        'Friday Prayer: 5:00 PM'
      ],
      color: 'bg-indigo-100 text-indigo-700 border-indigo-200'
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
    { icon: Facebook, name: 'Facebook', url: 'https://facebook.com', color: 'hover:bg-blue-600' },
    { icon: Instagram, name: 'Instagram', url: 'https://instagram.com', color: 'hover:bg-pink-600' },
    { icon: Twitter, name: 'Twitter', url: 'https://twitter.com', color: 'hover:bg-sky-500' },
    { icon: Youtube, name: 'YouTube', url: 'https://youtube.com', color: 'hover:bg-red-600' }
  ];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiM0RjQ2RTUiIGQ9Ik0zNiAzNGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDYuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAyYy00LjQxOCAwLTgtMy41ODItOC04czMuNTgyLTggOC04IDggMy41ODIgOCA4LTMuNTgyIDgtOHoiLz48L2c+PC9zdmc+')]"></div>
        
        {/* Main content */}
        <div className="relative z-20 text-center px-6 max-w-4xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-full px-6 py-3 mb-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Church className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wide">Connect With Faith</span>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            GET IN TOUCH
          </motion.h1>
          
          {/* Dynamic slogan */}
          <motion.div
            className="text-xl md:text-2xl font-medium mb-8 text-gray-700 h-10 flex items-center justify-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {slogans.map((slogan, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-700 ${
                  index === currentSlogan 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-4'
                }`}
              >
                <span className="text-gray-700">{slogan}</span>
              </div>
            ))}
          </motion.div>
          
          {/* Call-to-action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-blue-600 text-white font-bold px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Contact Information
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group border-2 border-blue-600 text-blue-600 font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Send Message
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section id="contact-info" className="py-20 md:py-32 relative overflow-hidden bg-white">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiM0RjQ2RTUiIGQ9Ik0zNiAzNGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDYuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAyYy00LjQxOCAwLTgtMy41ODItOC04czMuNTgyLTggOC04IDggMy41ODIgOCA4LTMuNTgyIDgtOHoiLz48L2c+PC9zdmc+')]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold mb-6">
              <MapPin className="w-5 h-5" />
              Find Us Here
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">Contact Information</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We're here to serve you and answer any questions you may have. Reach out through any of these channels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl transform scale-0 group-hover:scale-100 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className={`${info.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg border-2`}>
                    <info.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                    {info.title}
                  </h3>
                  
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    {info.action && (
                      <button
                        onClick={info.action}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Connect
                      </button>
                    )}
                    {info.copyable && (
                      <button
                        onClick={() => copyToClipboard(info.copyable, info.title)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors duration-200"
                        title="Copy to clipboard"
                      >
                        {copiedInfo === info.title ? (
                          <CheckCheck className="w-4 h-4 text-green-500" />
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
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 text-gray-900 relative overflow-hidden border border-gray-200">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-3xl blur-xl" />
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Connect?</h3>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                  Choose your preferred way to get in touch with our ministry team.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <a
                  href="tel:+2348130456427"
                  className="group bg-white hover:bg-blue-50 p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 hover:border-blue-300 shadow-sm"
                >
                  <PhoneCall className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-bold mb-2">Call Us Now</h4>
                  <p className="text-gray-600 text-sm mb-4">Speak directly with our team</p>
                  <div className="text-blue-600 font-semibold">+234 813 045 6427</div>
                </a>
                
                <a
                  href="mailto:info.truelight9@gmail.com"
                  className="group bg-white hover:bg-blue-50 p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 hover:border-blue-300 shadow-sm"
                >
                  <Mail className="w-12 h-12 text-emerald-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-bold mb-2">Email Us</h4>
                  <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
                  <div className="text-emerald-600 font-semibold break-all">info.truelight9@gmail.com</div>
                </a>
                
                <button
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-white hover:bg-blue-50 p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 hover:border-blue-300 shadow-sm"
                >
                  <Send className="w-12 h-12 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-bold mb-2">Contact Form</h4>
                  <p className="text-gray-600 text-sm mb-4">Fill out our online form</p>
                  <div className="text-indigo-600 font-semibold">Send Message →</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section id="contact-form" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiM0RjQ2RTUiIGQ9Ik0zNiAzNGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDYuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAyYy00LjQxOCAwLTgtMy41ODItOC04czMuNTgyLTggOC04IDggMy41ODIgOCA4LTMuNTgyIDgtOHoiLz48L2c+PC9zdmc+')]"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold mb-6">
              <MessageSquare className="w-5 h-5" />
              Get In Touch
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">Send Us a Message</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Have questions, prayer requests, or want to know more about our ministry? We'd love to hear from you.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
            {isSubmitted ? (
              <div className="text-center py-20 px-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                {submitError && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-700 mb-1">Submission Failed</h4>
                      <p className="text-red-600">{submitError}</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-900 font-semibold mb-3">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 ${
                          formValidation.name 
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' 
                            : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                        } text-gray-900 placeholder-gray-500`}
                        placeholder="Your full name"
                      />
                      {formValidation.name && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {formValidation.name}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-900 font-semibold mb-3">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 ${
                          formValidation.email 
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' 
                            : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                        } text-gray-900 placeholder-gray-500`}
                        placeholder="your.email@example.com"
                      />
                      {formValidation.email && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {formValidation.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-900 font-semibold mb-3">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:border-blue-400 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-500"
                        placeholder="+234 000 000 0000"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-100 p-3 rounded-xl">
                      <MessageSquare className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Message Details</h3>
                  </div>
                  
                  <div>
                    <label className="block text-gray-900 font-semibold mb-3">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 ${
                        formValidation.subject 
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' 
                          : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                      } text-gray-900 placeholder-gray-500`}
                      placeholder="What's this message about?"
                    />
                    {formValidation.subject && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {formValidation.subject}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-900 font-semibold mb-3">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 resize-none ${
                        formValidation.message 
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' 
                          : 'border-gray-300 focus:border-blue-400 focus:ring-blue-500/20'
                      } text-gray-900 placeholder-gray-500`}
                      placeholder="Tell us how we can help you..."
                    />
                    {formValidation.message && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {formValidation.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Send Message
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}