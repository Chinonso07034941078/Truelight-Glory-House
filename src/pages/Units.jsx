import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Heart, Users, Calendar, MapPin, Phone, Mail, X, Star, ChevronRight, Play, Pause, Sparkles,
  Award, Clock, Globe, Book, Handshake, Megaphone, Music, Smile, Shield, Check, Sun, Trophy, BadgeCheck, ThumbsUp
} from 'lucide-react';

// Enhanced animation variants (adds bounce, fade, and more)
const ANIMATION_VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.7,
        ease: [0.21, 1.02, 0.73, 1],
      },
    }),
  },
  bounce: {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.5,
        duration: 0.8,
        delay: i * 0.09,
      }
    }),
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  },
  cardHover: {
    hover: {
      scale: 1.04,
      rotateY: 4,
      y: -10,
      boxShadow: '0 10px 30px 0 rgba(80,32,200,0.18)',
      transition: {
        duration: 0.4,
        ease: [0.21, 1.02, 0.73, 1],
      },
    },
  },
  modalVariants: {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.21, 1.02, 0.73, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 40,
      transition: { duration: 0.33 }
    }
  },
  heroText: {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.21, 1.02, 0.73, 1]
      }
    }
  }
};

const MotionDiv = ({
  children, className, variants, custom, initial, animate, whileInView, viewport, whileHover, onClick, ...props
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!props.id) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById(props.id);
    if (element) observer.observe(element);
    return () => observer.disconnect();
    // eslint-disable-next-line
  }, [props.id]);

  const getStyle = () => {
    let style = {};
    // Animation on view
    if (variants && initial && (animate || whileInView)) {
      const variant = variants[animate] || variants[whileInView];
      if (variant) {
        if (typeof variant === 'function') {
          const computed = variant(custom);
          style = {
            opacity: isInView ? computed.opacity : (variants[initial]?.opacity || 0),
            transform: isInView
              ? `translateY(${computed.y || 0}px) scale(${computed.scale || 1})`
              : `translateY(${variants[initial]?.y || 20}px) scale(${variants[initial]?.scale || 1})`,
            transition: `all ${computed.transition?.duration || 0.6}s ${computed.transition?.ease || 'ease-out'}`,
            ...computed.boxShadow && { boxShadow: computed.boxShadow }
          };
        } else {
          style = {
            opacity: isInView ? variant.opacity : (variants[initial]?.opacity || 0),
            transform: isInView
              ? `translateY(${variant.y || 0}px) scale(${variant.scale || 1})`
              : `translateY(${variants[initial]?.y || 20}px) scale(${variants[initial]?.scale || 1})`,
            transition: `all ${variant.transition?.duration || 0.6}s ${variant.transition?.ease || 'ease-out'}`,
            ...variant.boxShadow && { boxShadow: variant.boxShadow }
          };
        }
      }
    }
    // Hover
    if (whileHover && isHovered && variants[whileHover]) {
      const hoverVariant = variants[whileHover];
      style = {
        ...style,
        transform: `translateY(${hoverVariant.y || 0}px) scale(${hoverVariant.scale || 1}) rotateY(${hoverVariant.rotateY || 0}deg)`,
        transition: `all ${hoverVariant.transition?.duration || 0.4}s ${hoverVariant.transition?.ease || 'ease-out'}`,
        ...hoverVariant.boxShadow && { boxShadow: hoverVariant.boxShadow }
      };
    }
    return style;
  };

  return (
    <div
      {...props}
      className={className}
      style={getStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const AnimatePresence = ({ children }) => <>{children}</>;

// Extra icons per ministry type for extra clarity
const CATEGORY_ICONS = {
  worship: Music,
  service: Handshake,
  creative: Sparkles,
  youth: Sun,
  outreach: Megaphone,
  spiritual: Award,
  all: Globe
};

// Enhanced units with even more variety, icons, and fun badges
 function getUnits() {


  return [
    {
      id: 1,
      name: "Media Ministry",
      category: "creative",
      description: "Crafting captivating audio, video, and digital content to amplify God's message and reach souls far and wide through cutting-edge technology and creative storytelling.",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
      gradient: "from-violet-600 via-purple-600 to-indigo-600",
      bgColor: "bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50",
      members: 28,
      meetingTime: "Sundays 2:00 PM",
      leader: "John Smith",
      contact: "media@church.com",
      requirements: ["Video editing expertise", "Photography skills", "Creative vision", "Technical proficiency"],
      activities: ["Live streaming", "Video production", "Social media content", "Audio engineering"],
      rating: 4.9,
      badge: "Most Active",
      icon: Sparkles,
      quote: "We amplify the Gospel through every lens and waveform."
    },
    {
      id: 2,
      name: "Worship Choir",
      category: "worship",
      description: "Lifting hearts to heaven through powerful melodies and harmonious praise, leading our congregation into transformative divine encounters through spirit-filled worship.",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&crop=center",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      bgColor: "bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50",
      members: 52,
      meetingTime: "Wednesdays 7:00 PM",
      leader: "Sarah Johnson",
      contact: "choir@church.com",
      requirements: ["Vocal ability", "Commitment to excellence", "Heart for worship", "Team spirit"],
      activities: ["Weekly rehearsals", "Sunday performances", "Special concerts", "Worship leading"],
      rating: 4.8,
      badge: "Featured",
      icon: Music,
      quote: "Let every voice rise; let every heart sing."
    },
    {
      id: 3,
      name: "Protocol Team",
      category: "service",
      description: "Ensuring every service and event flows with grace and divine order, creating seamless and welcoming experiences that honor God and serve His people.",
      imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop&crop=center",
      gradient: "from-emerald-600 via-teal-600 to-green-600",
      bgColor: "bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50",
      members: 18,
      meetingTime: "Saturdays 10:00 AM",
      leader: "Michael Brown",
      contact: "protocol@church.com",
      requirements: ["Attention to detail", "Leadership skills", "Excellence mindset", "Reliability"],
      activities: ["Service coordination", "Event planning", "Guest management", "Ceremony oversight"],
      rating: 4.7,
      badge: "Essential",
      icon: Handshake,
      quote: "Order is the aroma of worship."
    },
    {
      id: 4,
      name: "Logistics Hub",
      category: "service",
      description: "The operational backbone ensuring every ministry initiative is perfectly supported through meticulous planning, resource coordination, and seamless execution.",
      imageUrl: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&h=400&fit=crop&crop=center",
      gradient: "from-orange-600 via-red-600 to-pink-600",
      bgColor: "bg-gradient-to-br from-orange-50 via-red-50 to-pink-50",
      members: 24,
      meetingTime: "Fridays 6:00 PM",
      leader: "David Wilson",
      contact: "logistics@church.com",
      requirements: ["Organizational mastery", "Problem-solving skills", "Team collaboration", "Strategic thinking"],
      activities: ["Equipment management", "Setup coordination", "Resource planning", "Vendor relations"],
      rating: 4.8,
      badge: "Critical",
      icon: Trophy,
      quote: "Excellence is in the details."
    },
    {
      id: 5,
      name: "Welcome Center",
      category: "service",
      description: "Your first point of divine connection, providing warm hospitality and helpful guidance to create lasting first impressions for new friends and beloved members.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop&crop=center",
      gradient: "from-yellow-600 via-orange-600 to-amber-600",
      bgColor: "bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50",
      members: 15,
      meetingTime: "Sundays 8:00 AM",
      leader: "Emily Davis",
      contact: "welcome@church.com",
      requirements: ["Exceptional communication", "Warm personality", "Church knowledge", "Customer service"],
      activities: ["Guest welcome", "Information sharing", "Tour guidance", "Connection facilitation"],
      rating: 4.9,
      badge: "Friendly",
      icon: Smile,
      quote: "Every guest is a gift from God."
    },
    {
      id: 6,
      name: "Young Achievers Network",
      category: "youth",
      description: "Empowering the next generation to excel spiritually, professionally, and personally while building lasting relationships and discovering their divine purpose.",
      imageUrl: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop&crop=center",
      gradient: "from-red-600 via-pink-600 to-rose-600",
      bgColor: "bg-gradient-to-br from-red-50 via-pink-50 to-rose-50",
      members: 67,
      meetingTime: "Saturdays 4:00 PM",
      leader: "Alex Thompson",
      contact: "yan@church.com",
      requirements: ["Age 18-35", "Growth mindset", "Leadership potential", "Commitment to excellence"],
      activities: ["Career workshops", "Mentorship programs", "Networking events", "Leadership training"],
      rating: 4.8,
      badge: "Growing",
      icon: Sun,
      quote: "The future begins now."
    },
    {
      id: 7,
      name: "Children's Ministry",
      category: "youth",
      description: "Nurturing young hearts with joy, biblical wisdom, and boundless love, creating safe spaces where children can grow in faith and discover their unique gifts.",
      imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop&crop=center",
      gradient: "from-amber-600 via-yellow-600 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
      members: 42,
      meetingTime: "Sundays 10:00 AM",
      leader: "Grace Martinez",
      contact: "children@church.com",
      requirements: ["Love for children", "Patience and creativity", "Teaching ability", "Background check"],
      activities: ["Sunday school", "Children's programs", "Special events", "Creative activities"],
      rating: 4.9,
      badge: "Loved",
      icon: Book,
      quote: "Children are arrows in the hand of the Lord."
    },
    {
      id: 8,
      name: "Prayer Warriors",
      category: "spiritual",
      description: "Standing in the gap through fervent intercession, covering our church, community, and world in powerful prayer while engaging in spiritual warfare.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center",
      gradient: "from-indigo-600 via-blue-600 to-purple-600",
      bgColor: "bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50",
      members: 35,
      meetingTime: "Tuesdays 6:00 AM",
      leader: "Pastor James",
      contact: "prayer@church.com",
      requirements: ["Heart for prayer", "Spiritual maturity", "Commitment to intercession", "Faithfulness"],
      activities: ["Prayer meetings", "Intercession sessions", "Spiritual warfare", "Healing ministry"],
      rating: 4.9,
      badge: "Powerful",
      icon: Shield,
      quote: "Prayer moves mountains."
    },
    {
      id: 9,
      name: "Evangelism Team",
      category: "outreach",
      description: "Passionately sharing the life-transforming gospel through strategic outreach, building authentic relationships, and demonstrating God's love in practical ways.",
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop&crop=center",
      gradient: "from-red-600 via-rose-600 to-pink-600",
      bgColor: "bg-gradient-to-br from-red-50 via-rose-50 to-pink-50",
      members: 46,
      meetingTime: "Saturdays 9:00 AM",
      leader: "Mark Rodriguez",
      contact: "evangelism@church.com",
      requirements: ["Passion for souls", "Bold faith", "Biblical knowledge", "Compassionate heart"],
      activities: ["Street evangelism", "Community outreach", "Crusades", "Discipleship training"],
      rating: 4.7,
      badge: "Impactful",
      icon: Megaphone,
      quote: "We don't just go, we grow."
    },
    {
      id: 10,
      name: "Creative Arts",
      category: "creative",
      description: "Unleashing divine imagination through visual and performing arts, bringing God's Word to life through innovative, inspiring, and unforgettable creative expressions.",
      imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop&crop=center",
      gradient: "from-purple-600 via-fuchsia-600 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50",
      members: 33,
      meetingTime: "Thursdays 7:00 PM",
      leader: "Lisa Chen",
      contact: "creative@church.com",
      requirements: ["Artistic talent", "Creative vision", "Collaborative spirit", "Technical skills"],
      activities: ["Drama performances", "Visual arts", "Creative worship", "Set design"],
      rating: 4.8,
      badge: "Innovative",
      icon: Sparkles,
      quote: "We paint the Gospel in color and movement."
    },
    {
      id: 11,
      name: "Hospitality Team",
      category: "service",
      description: "Creating warm, welcoming environments that make every person feel valued and at home, ensuring comfort and connection at every church gathering.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center",
      gradient: "from-violet-600 via-indigo-600 to-blue-600",
      bgColor: "bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50",
      members: 38,
      meetingTime: "Sundays 8:30 AM",
      leader: "Robert Kim",
      contact: "hospitality@church.com",
      requirements: ["Servant heart", "Attention to detail", "People skills", "Reliability"],
      activities: ["Guest services", "Event hosting", "Crowd management", "Comfort coordination"],
      rating: 4.8,
      badge: "Welcoming",
      icon: Smile,
      quote: "Hospitality is our ministry of smiles."
    },
    {
      id: 12,
      name: "Compassion Ministry",
      category: "service",
      description: "Meeting practical needs with Christ's love, supporting vulnerable members and community families through comprehensive care and sustainable assistance programs.",
      imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&crop=center",
      gradient: "from-green-600 via-emerald-600 to-teal-600",
      bgColor: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50",
      members: 22,
      meetingTime: "Mondays 6:00 PM",
      leader: "Maria Lopez",
      contact: "compassion@church.com",
      requirements: ["Compassionate heart", "Discretion", "Organizational skills", "Empathy"],
      activities: ["Community support", "Food distribution", "Emergency aid", "Family assistance"],
      rating: 4.9,
      badge: "Caring",
      icon: Heart,
      quote: "Love in action changes lives."
    }
  ];
}

const testimonials = [
  {
    name: "Sarah Johnson",
    unit: "Worship Choir",
    image: "https://images.unsplash.com/photo-1494790108755-2616c23c5b95?w=120&h=120&fit=crop&crop=face",
    text: "Being part of the choir has completely transformed my worship experience. The fellowship and growth in my musical gifts have been absolutely incredible!",
    rating: 5
  },
  {
    name: "Michael Brown",
    unit: "Media Ministry",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    text: "I've discovered my passion for storytelling through media ministry. It's amazing how God uses technology to spread His message across the globe!",
    rating: 5
  },
  {
    name: "Grace Martinez",
    unit: "Children's Ministry",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    text: "Working with children has taught me so much about pure faith and joy. Their innocent worship and genuine questions inspire me every single day!",
    rating: 5
  },
  {
    name: "David Wilson",
    unit: "Logistics Hub",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    text: "Behind every smooth service is a team that loves to serve. Logistics made me see God's order in action!",
    rating: 5
  },
  {
    name: "Maria Lopez",
    unit: "Compassion Ministry",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    text: "I never thought my small acts of kindness could mean so much. Compassion Ministry changed my heart.",
    rating: 5
  },
];

const funFacts = [
  {
    icon: ThumbsUp,
    color: "text-green-500",
    info: "100+ souls saved through outreach each year!"
  },
  {
    icon: BadgeCheck,
    color: "text-blue-500",
    info: "Rated top 5 most engaging church groups in the city."
  },
  {
    icon: Trophy,
    color: "text-yellow-500",
    info: "Ministry members win awards for community impact."
  }
];

const stats = [
  { number: "750+", label: "Active Members", icon: Users, color: "text-blue-600" },
  { number: "24", label: "Ministry Units", icon: Star, color: "text-purple-600" },
  { number: "18", label: "Years of Impact", icon: Award, color: "text-green-600" },
  { number: "80+", label: "Weekly Activities", icon: Calendar, color: "text-orange-600" }
];

export default function Units() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const units = getUnits();
  const categories = [
    { id: 'all', name: 'All Units', count: units.length, icon: Globe },
    { id: 'worship', name: 'Worship', count: units.filter(u => u.category === 'worship').length, icon: Music },
    { id: 'service', name: 'Service', count: units.filter(u => u.category === 'service').length, icon: Handshake },
    { id: 'creative', name: 'Creative', count: units.filter(u => u.category === 'creative').length, icon: Sparkles },
    { id: 'youth', name: 'Youth', count: units.filter(u => u.category === 'youth').length, icon: Sun },
    { id: 'outreach', name: 'Outreach', count: units.filter(u => u.category === 'outreach').length, icon: Megaphone },
    { id: 'spiritual', name: 'Spiritual', count: units.filter(u => u.category === 'spiritual').length, icon: Award }
  ];
  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || unit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Spotlight unit (the highest-rated one)
  const spotlightUnit = units.reduce((a, b) => (a.rating > b.rating ? a : b), units[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-32 px-6">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/70 to-blue-900/80"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-72 h-72 bg-blue-400/20 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-64 h-64 bg-purple-300/20 rounded-full blur-2xl animate-bounce"></div>
        </div>
        {/* Floating Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <div className="relative z-20 max-w-7xl mx-auto text-center space-y-12">
          <MotionDiv
            variants={ANIMATION_VARIANTS}
            initial="hidden"
            animate="heroText"
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium shadow-lg">
              <Sparkles className="w-4 h-4 animate-spin" />
              Discover Your Divine Purpose
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
              Join a{" "}
              <span className="text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text">
                Ministry
              </span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                Unit
              </span>
            </h1>
            <p className="text-blue-100 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light">
              Discover where you belong and serve God with passion. Every member has a unique place to contribute their gifts, talents, and calling to advance His kingdom.
            </p>
            {/* Fun facts */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {funFacts.map(({ icon: Icon, color, info }, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-semibold shadow-md">
                  <Icon className={`w-5 h-5 ${color}`} /> {info}
                </div>
              ))}
            </div>
          </MotionDiv>
          {/* Stats */}
          <MotionDiv
            variants={ANIMATION_VARIANTS}
            initial="hidden"
            animate="fadeUp"
            custom={1}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm font-semibold">{stat.label}</div>
              </div>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-16 px-6 bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search ministry units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
              />
            </div>
            {/* Category Filter */}
            <div className="flex gap-3 flex-wrap">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  <category.icon className={`w-4 h-4 ${selectedCategory === category.id ? 'text-white' : 'text-gray-500'} group-hover:scale-110 transition-transform`} />
                  {category.name}
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <MotionDiv
          variants={ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="fadeUp"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-100 rounded-3xl shadow-lg p-10 border border-blue-100"
        >
          <div className="flex-shrink-0 w-36 h-36 rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-4 md:mb-0">
            <img src={spotlightUnit.imageUrl} alt={spotlightUnit.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-xs font-bold mb-2 shadow">
              <spotlightUnit.icon className="w-4 h-4" /> Spotlight Unit
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-1">{spotlightUnit.name}</h2>
            <p className="text-gray-700 max-w-lg">{spotlightUnit.quote}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                <Users className="w-3 h-3" /> {spotlightUnit.members} Members
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                <Calendar className="w-3 h-3" /> {spotlightUnit.meetingTime}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                <Star className="w-3 h-3" /> {spotlightUnit.rating}
              </span>
            </div>
          </div>
        </MotionDiv>
      </section>

      {/* Ministry Units Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            variants={ANIMATION_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Choose Your Ministry Path
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-blue-900 via-purple-600 to-indigo-900 bg-clip-text mb-6">
              Ministry Units
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              Each unit represents a divine opportunity to serve, grow, and impact lives. Click on any unit to discover how you can contribute your unique gifts to God's kingdom.
            </p>
          </MotionDiv>
          <MotionDiv
            variants={ANIMATION_VARIANTS.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredUnits.map((unit, i) => (
              <MotionDiv
                key={unit.id}
                id={`unit-${unit.id}`}
                custom={i}
                variants={ANIMATION_VARIANTS}
                initial="hidden"
                whileInView="fadeUp"
                viewport={{ once: true }}
                whileHover="hover"
                className="group perspective-1000"
              >
                <div
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 relative"
                  onClick={() => setSelectedUnit(unit)}
                >
                  <div className={`relative h-44 w-full overflow-hidden ${unit.bgColor}`}>
                    <img
                      src={unit.imageUrl}
                      alt={unit.name}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${unit.gradient} opacity-80`} />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 text-xs font-bold text-gray-800 drop-shadow">
                      {unit.badge}
                    </div>
                    <div className="absolute top-4 right-4">
                      <unit.icon className="w-6 h-6 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <unit.icon className="w-5 h-5 text-blue-500" />
                      <span className="text-lg font-bold text-blue-900">{unit.name}</span>
                    </div>
                    <p className="text-gray-600 text-sm min-h-[60px]">{unit.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2 mb-1">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                        <Users className="w-3 h-3" /> {unit.members} Members
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                        <Calendar className="w-3 h-3" /> {unit.meetingTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                        <Star className="w-3 h-3" /> {unit.rating}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
                      >
                        Learn More <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
          {filteredUnits.length === 0 && (
            <div className="text-center py-16 text-gray-500 text-lg">
              <span>No ministry units found matching your search.</span>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            variants={ANIMATION_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-purple-700 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Stories of Impact
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-transparent bg-gradient-to-r from-blue-900 via-purple-600 to-indigo-900 bg-clip-text mb-4">
              Testimonies
            </h3>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Hear from members whose lives have been transformed through ministry involvement.
            </p>
          </MotionDiv>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <MotionDiv
                key={i}
                variants={ANIMATION_VARIANTS}
                initial="hidden"
                whileInView="fadeUp"
                custom={i}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full border-4 border-purple-200 mb-4 object-cover"
                />
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-yellow-400" filled="true" />
                  ))}
                </div>
                <p className="text-gray-700 font-medium mb-4">"{t.text}"</p>
                <div className="text-purple-700 font-bold">{t.name}</div>
                <div className="text-xs text-gray-500">{t.unit}</div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Modal */}
      <AnimatePresence>
        {selectedUnit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <MotionDiv
              variants={ANIMATION_VARIANTS.modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-10 overflow-y-auto max-h-[90vh]"
              id="unit-modal"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedUnit(null)}
                className="absolute top-6 right-6 bg-gray-100 rounded-full p-2 hover:bg-red-100 text-gray-500 hover:text-red-500 transition"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              {/* Content */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0 w-full md:w-56 h-40 md:h-56 rounded-2xl overflow-hidden relative shadow-lg">
                  <img
                    src={selectedUnit.imageUrl}
                    alt={selectedUnit.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/80 text-xs font-bold text-gray-800 shadow">{selectedUnit.badge}</span>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <selectedUnit.icon className="w-6 h-6 text-blue-500" />
                    <h4 className="text-2xl font-bold text-blue-900">{selectedUnit.name}</h4>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-2">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                      <Users className="w-3 h-3" /> {selectedUnit.members} Members
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                      <Calendar className="w-3 h-3" /> {selectedUnit.meetingTime}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                      <Star className="w-3 h-3" /> {selectedUnit.rating}
                    </span>
                  </div>
                  <p className="text-gray-700">{selectedUnit.description}</p>
                  <blockquote className="italic text-purple-800 border-l-4 border-purple-300 pl-4 my-2">{selectedUnit.quote}</blockquote>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-100 rounded-full px-2 py-1 text-xs">
                      <Mail className="w-3 h-3" /> {selectedUnit.contact}
                    </span>
                    <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-100 rounded-full px-2 py-1 text-xs">
                      <Users className="w-3 h-3" /> Lead: {selectedUnit.leader}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h5 className="font-bold text-sm text-gray-600 mb-2">Requirements</h5>
                      <ul className="list-disc list-inside text-xs text-gray-700">
                        {selectedUnit.requirements.map((req, i) => (
                          <li key={i}><Check className="inline-block w-4 h-4 text-green-500 mr-1" />{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-sm text-gray-600 mb-2">Key Activities</h5>
                      <ul className="list-disc list-inside text-xs text-gray-700">
                        {selectedUnit.activities.map((act, i) => (
                          <li key={i}><ArrowRight className="inline-block w-3 h-3 text-purple-500 mr-1" />{act}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a
                      href={`mailto:${selectedUnit.contact}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                      <Mail className="w-5 h-5" />
                      Contact / Join
                    </a>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}