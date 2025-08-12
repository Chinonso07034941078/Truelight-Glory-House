import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Send, MessageSquare, 
  CheckCircle, Church, User, Mail as Email, PhoneCall, 
  Calendar, Map, Navigation, Users, Heart, BookOpen, 
  Mic, Handshake, Video 
} from 'lucide-react';
import Footer from '../components/Footer';

const ContactHero = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";

export default function Contacts() {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  
  const slogans = [
    'We\'d Love to Hear From You',
    'Your Connection to Faith',
    'Building Relationships Together',
    'Always Here for You'
  ];
  
  // Auto-cycle through slogans
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan(prev => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Replace with your actual form submission endpoint
      const response = await fetch('https://truelight9.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          category: 'general'
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: PhoneCall,
      title: 'Phone Numbers',
      details: ['+234 803 XXX XXXX', '+234 701 XXX XXXX'],
      color: 'bg-blue-100 text-blue-700'
    },
    {
      icon: Email,
      title: 'Email Address',
      details: ['info.truelight9@gmail.com', 'pastors@truelight9.com'],
      color: 'bg-green-100 text-green-700'
    },
    {
      icon: Map,
      title: 'Location',
      details: ['Owerri, Imo State', 'Nigeria'],
      color: 'bg-amber-100 text-amber-700'
    },
    {
      icon: Calendar,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Sunday: After Service'],
      color: 'bg-purple-100 text-purple-700'
    }
  ];
  
  const socialMedia = [
    { icon: 'facebook', name: 'Facebook', url: '#' },
    { icon: 'instagram', name: 'Instagram', url: '#' },
    { icon: 'twitter', name: 'Twitter', url: '#' },
    { icon: 'youtube', name: 'YouTube', url: '#' }
  ];
  
  const departments = [
    { name: 'General Inquiry', value: 'general', icon: MessageSquare },
    { name: 'Prayer Request', value: 'prayer', icon: Heart },
    { name: 'Event Registration', value: 'events', icon: Calendar },
    { name: 'Counseling', value: 'counseling', icon: Users },
    { name: 'Media Ministry', value: 'media', icon: Mic },
    { name: 'Partnership', value: 'partnership', icon: Handshake }
  ];
  
  const getDirections = () => {
    window.open('https://maps.google.com/?q=Wesley Building, 289 Okigwe Rd, Owerri, Imo State, Nigeria', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/80 via-blue-700/70 to-indigo-900/90 z-10" />
        <img 
          src={ContactHero}
          alt="Contact Us" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center text-white px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <Church className="w-5 h-5 text-amber-300" />
            <span className="text-sm font-medium uppercase tracking-wide">Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            CONNECT WITH US
          </h1>
          <div className="text-xl md:text-2xl font-medium mb-8 h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={slogans[currentSlogan]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-blue-100 absolute"
              >
                {slogans[currentSlogan]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-amber-500 hover:bg-amber-600 text-blue-900 font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Contact Information
            </button>
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-amber-400 text-amber-100 hover:bg-amber-500/20 font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </div>
      </section>
      
      {/* Contact Information Section */}
      <section id="contact-info" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16" 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            data-animate
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Contact Information</h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">We'd love to meet you in person</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                data-animate
              >
                <div className={`${info.color} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{info.title}</h3>
                <div className="space-y-2 mt-auto">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-blue-700">{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Location/Times */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="space-y-8"
              data-animate
            >
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-blue-900">Our Location</h3>
                  <p className="text-blue-700">Wesley Building, 289 Okigwe Rd, adjacent Access Bank, Owerri - Imo State</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-blue-900">Service Times</h3>
                  <p className="text-blue-700">
                    Sunday Service: 7:00 AM, 8:45 AM & 10:30 AM<br />
                    Tuesday Bible Study: 5:00 PM<br />
                    Friday Prayer Meeting: 5:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-blue-900">Contact Info</h3>
                  <p className="text-blue-700">
                    Phone: +234 813 045 6427<br />
                    Email: info.truelight9@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 w-full max-w-md border border-blue-100"
              data-animate
            >
              <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">Contact Us</h2>
              <div className="space-y-6">
                <a
                  href="tel:+2348130456427"
                  className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-md"
                >
                  <PhoneCall className="w-5 h-5" />
                  Call Us
                </a>
                <a
                  href="mailto:info.truelight9@gmail.com"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-md"
                >
                  <Email className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      {/* <section id="contact-form" className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12" 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            data-animate
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Send Us a Message</h2>
            <p className="text-blue-700 text-lg max-w-2xl mx-auto">
              Have questions or need prayer? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-animate
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-blue-700">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {submitError}
                  </div>
                )}
                
                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-700" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-blue-800 font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-blue-800 font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-colors"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-700" />
                    Message Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-blue-800 font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-blue-800 font-medium mb-2">Department</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-colors"
                      >
                        {departments.map((dept, index) => (
                          <option key={index} value={dept.value}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-blue-800 font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-colors"
                      placeholder="Subject of your message"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-blue-800 font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-colors"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section> */}
      
      <Footer />
    </div>
  );
}