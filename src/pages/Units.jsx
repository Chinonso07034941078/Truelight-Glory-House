import { useState, useEffect } from "react";
import { Video, Recycle, Search, Sparkles, Users, Heart, Award, Target, Phone, Mail, Star, ChevronRight, Clock, MonitorSpeaker, Music, Shield, Book, UserCheck, Globe, Crown, Zap, Truck, Info, Database, Megaphone, Smile, HandHeart, Paintbrush, Handshake, CupSoda } from "lucide-react";
import Footer from "../components/Footer";

const units = [
  { name: "Media", icon: Video, description: "Amplifying God's message through digital excellence", leader: "Min. Moyo", members: "30+", time: "Tuesday 9PM", contact: "media@truelight.org", phone: "+2348012345678" },
  { name: "Music Department", icon: Music, description: "Leading souls into God's presence through worship", leader: "Esther Ifeanyi", members: "35+", time: "Saturdays 5PM, Mondays 9PM", contact: "choir@truelight.org", phone: "+2348023456789" },
  { name: "Protocol", icon: Award, description: "Excellence in events and hospitality", leader: "Chibuzor Okeke", members: "18+", time: "Varies", contact: "protocol@truelight.org", phone: "+2348034567890" },
  { name: "Logistics", icon: Truck, description: "Ensuring seamless movement of resources and equipment", leader: "Grace Ojo", members: "7+", time: "online", contact: "logistics@truelight.org", phone: "+2348045678901" },
  { name: "Information Desk", icon: Info, description: "Providing information and assistance to members and guests", leader: "Favour Okechukwu", members: "12+", time: "Sundays Services", contact: "info@truelight.org", phone: "+2348056789012" },
  { name: "Data Analysis", icon: Database, description: "Analyzing and managing church data for strategic decisions", leader: "Ngozi Nwachukwu", members: "8+", time: "Online", contact: "data@truelight.org", phone: "+2348067890123" },
  { name: "Company of the Great", icon: Crown, description: "Mentorship and leadership development for kingdom impact", leader: "Oluwatobi Ojo", members: "10+", time: "Saturday 5PM", contact: "company@truelight.org", phone: "+2348078901234" },
  { name: "Evangelism", icon: Globe, description: "Taking the gospel beyond church walls", leader: "Daniel Okafor", members: "22+", time: "Saturdays 5PM", contact: "evangelism@truelight.org", phone: "+2348089012345" },
  { name: "Follow-Up", icon: UserCheck, description: "Connecting and following up with new converts and visitors", leader: "Chinedu John", members: "14+", time: "Saturday 5PM", contact: "followup@truelight.org", phone: "+2348090123456" },
  { name: "Marketing", icon: Megaphone, description: "Promoting church events and initiatives effectively", leader: "Nkechi Okorie", members: "16+", time: "Sunday Services", contact: "marketing@truelight.org", phone: "+2348101234567" },
  { name: "Sanctuary Keepers", icon: Recycle, description: "Maintaining cleanliness and sanctity of God's house", leader: "Blessing Okafor", members: "22+", time: "Saturdays 5PM", contact: "sanctuary@truelight.org", phone: "+2348112345678" },
  { name: "Ushering", icon: UserCheck, description: "Creating order and comfort in God's house", leader: "Blessing Musa", members: "28+", time: "Saturdays 5PM, Wednesdays 9PM", contact: "ushering@truelight.org", phone: "+2348123456789" },
  { name: "Greeters", icon: Smile, description: "Giving a warm and friendly welcome to everyone", leader: "Ada Uche", members: "13+", time: "Sundays 8:30AM", contact: "greeters@truelight.org", phone: "+2348134567890" },
  { name: "Sound Hub", icon: MonitorSpeaker, description: "Delivering crystal-clear audio for worship", leader: "Emeka Obi", members: "12+", time: "Saturday 5PM", contact: "sound@truelight.org", phone: "+2348145678901" },
  { name: "Security", icon: Shield, description: "Protecting and securing God's people", leader: "Ikenna Umeh", members: "10+", time: "Sundays 7:00AM", contact: "security@truelight.org", phone: "+2348156789012" },
  { name: "Children Church", icon: Book, description: "Nurturing the next generation for Christ", leader: "Joy Eze", members: "25+", time: "Sundays 8:30AM", contact: "children@truelight.org", phone: "+2348167890123" },
  { name: "Prayer", icon: HandHeart, description: "Interceding and standing in the gap for the church", leader: "Eunice Chukwudi", members: "30+", time: "Mondays 5PM", contact: "prayer@truelight.org", phone: "+2348178901234" },
  { name: "Welfare", icon: Heart, description: "Caring for the needs of members and the less privileged", leader: "Ngozi Obinna", members: "18+", time: "Varies ", contact: "welfare@truelight.org", phone: "+2348189012345" },
  { name: "Creative Unit", icon: Paintbrush, description: "Designing visuals and creative content for the church", leader: "Chima Okoro", members: "11+", time: "Sundays 9PM", contact: "creative@truelight.org", phone: "+2348190123456" },
  { name: "Young Achievers Network", icon: Target, description: "Empowering youths for success and excellence", leader: "Tolu Adebayo", members: "24+", time: "Saturdays 1PM", contact: "yan@truelight.org", phone: "+2348201234567" },
  { name: "Partnership", icon: Handshake, description: "Supporting the church's vision through partnerships", leader: "Chike Nnamdi", members: "19+", time: "Monthly (Last Sunday)", contact: "partnership@truelight.org", phone: "+2348212345678" },
  { name: "Communion", icon: CupSoda, description: "Preparing and serving the Holy Communion with reverence", leader: "Helen Chika", members: "9+", time: "Monthly (First Sunday)", contact: "communion@truelight.org", phone: "+2348223456789" }
];

const testimonials = [
  { name: "Chika Blessing", unit: "Media", text: "Serving here transformed my life completely!" },
  { name: "DKK", unit: "Media", text: "We're changing lives through technology and faith!" },
  { name: "Mr. Flourish", unit: "Evangelism", text: "Nothing beats seeing souls transformed through outreach." },
  { name: "Ahaneku Chidera", unit: "Music Department", text: "Leading worship has deepened my relationship with God in ways I never imagined." },
  { name: "Aguruo Valentine", unit: "Protocol", text: "The discipline and excellence I've learned serving here has impacted every area of my life." },
  { name: "Mary Ben", unit: "Children Church", text: "Teaching children about God's love has renewed my own faith daily." },
  { name: "Ajeboh", unit: "Sound Hub", text: "Creating the perfect sound environment for worship is my way of contributing to the move of God." },
  { name: "Innocent Peace", unit: "Greeters", text: "The joy I feel welcoming people to God's house is indescribable." },
  { name: "Joshua Jude", unit: "Evangelism", text: "Every soul won to Christ through our outreach efforts is a testament to God's faithfulness." }
];

const stats = [
  { label: "Active Units", value: "22", icon: Target },
  { label: "Total Members", value: "500+", icon: Users },
  { label: "Lives Impacted", value: "50K+", icon: Heart },
  { label: "Years Strong", value: "10", icon: Award }
];

export default function MinistryUnits() {



  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };



  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);
  
  const filteredUnits = units.filter(unit => 
    unit.name.toLowerCase().includes(search.toLowerCase()) ||
    unit.description.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleJoinCall = () => {
    window.location.href = `tel:+2349134943551`;
  };
  
  const handleEmailClick = () => {
    window.location.href = 'mailto:info.truelight9@gmail.com?subject=Ministry Unit Interest&body=Hello,%0A%0AI would like to learn more about joining a ministry unit at True Light Chapel. Please provide me with more information.%0A%0AThank you!';
  };
  
  const handlePhoneClick = () => {
    window.location.href = 'tel:+2349010494622';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white overflow-hidden">
      {/* Magical Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.2),transparent_50%)]"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section - Refined */}
      <section 
      className="relative py-24 px-6 text-center overflow-hidden"
      onMouseMove={handleMouseMove}
     
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-yellow-300/20 rounded-full blur-xl animate-pulse animation-delay-1000" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Animated badge */}
        <div className={`inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-5 py-2 mb-8 border border-white/25 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Crown className="w-4 h-4 text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <span className="text-sm font-medium tracking-wider">Divine Assignment</span>
        </div>

        {/* Main heading with staggered animation */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-tight">
          <span className={`inline-block font-extralight transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`} style={{ transitionDelay: '0.2s' }}>
            Find Your
          </span>{' '}
          <span className={`inline-block font-semibold bg-gradient-to-r from-yellow-400 via-yellow-200 to-white bg-clip-text text-transparent transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`} style={{ transitionDelay: '0.4s' }}>
            <span className="relative bg-gradient-to-r from-yellow-500 via-slate-100 to-yellow-400 bg-clip-text text-transparent">
              Purpose
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-transparent blur animate-pulse" /> */}
            </span>
          </span>
          <br />
          <span className={`text-2xl md:text-4xl lg:text-5xl font-light text-yellow-200 block mt-2 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`} style={{ transitionDelay: '0.6s' }}>
            Serve with impact
          </span>
        </h1>

        {/* Description with fade-in */}
        <p className={`text-lg md:text-xl font-light mb-12 text-blue-200 leading-relaxed max-w-3xl mx-auto transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`} style={{ transitionDelay: '0.8s' }}>
          Join a ministry unit where your gifts meet God's perfect plan. Over{' '}
          <span className="text-yellow-300 font-medium relative">
            <span className="relative z-10">500 members</span>
            <span className="absolute inset-0 bg-yellow-300/20 blur rounded animate-pulse" />
          </span>{' '}
          serving across{' '}
          <span className="text-yellow-300 font-medium relative">
            <span className="relative z-10">22 dynamic units</span>
            <span className="absolute inset-0 bg-yellow-300/20 blur rounded animate-pulse animation-delay-500" />
          </span>.
        </p>

        {/* Animated CTA button */}
        <button
          onClick={() => document.getElementById('units')?.scrollIntoView({ behavior: 'smooth' })}
          className={`group relative bg-white/10 backdrop-blur-md text-white font-medium px-8 py-4 rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition-all duration-500 transform hover:scale-105 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{ transitionDelay: '1s' }}
        >
          {/* Button background glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/50 to-blue-500/50 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <span className="relative flex items-center gap-2">
            Discover Your Unit
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse group-hover:animate-bounce" />
          </span>
          
          {/* Ripple effect on hover */}
          <div className="absolute inset-0 rounded-full bg-white/20 transform scale-0 group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
        </button>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 animate-float">
        <div className="w-2 h-2 bg-yellow-400/60 rounded-full" />
      </div>
      <div className="absolute top-1/3 right-16 animate-float animation-delay-1000">
        <div className="w-1 h-1 bg-blue-300/60 rounded-full" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-float animation-delay-2000">
        <div className="w-1.5 h-1.5 bg-yellow-300/50 rounded-full" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>

     

      {/* Search - Refined */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for your calling..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-yellow-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all font-light"
          />
        </div>
      </section>

      {/* Units Grid - Simplified */}
      <section id="units" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUnits.map((unit, i) => (
              <div
                key={unit.name}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer flex flex-col"
                onClick={() => setSelectedUnit(unit)}
              >
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                      <unit.icon className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{unit.name}</h3>
                      <div className="text-yellow-300 text-sm font-light">{unit.members} members</div>
                    </div>
                  </div>
                  <p className="text-blue-200 text-sm font-light mb-4 flex-grow leading-relaxed">{unit.description}</p>
                  <div className="flex items-center gap-2 text-sm text-yellow-300 font-light">
                    <Clock className="w-4 h-4" />
                    <span>{unit.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Unit Button - Refined */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
            <span className="font-extralight">Ready to</span>{' '}
            <span className="font-medium bg-gradient-to-r from-yellow-400 via-yellow-200 to-white bg-clip-text text-transparent">
              Serve?
            </span>
          </h2>
          <p className="text-lg font-light text-blue-200 mb-8 leading-relaxed">
            Contact the <span className="text-yellow-300 font-medium">Head of Operations</span> to find your place in the church.
          </p>

          <a
            href="tel:+2349134943551"
            className="bg-white/10 backdrop-blur-md text-white font-medium px-8 py-4 rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition-all duration-500 transform hover:scale-105 inline-flex items-center gap-3"
          >
            <Phone className="w-5 h-5" />
            <span>Join a Unit</span>
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
          </a>
        </div>
      </section>

      {/* Testimonials - Refined */}
      <section className="py-20 px-6 bg-gradient-to-r from-yellow-400/5 to-yellow-500/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
              <span className="font-extralight">Member</span>{' '}
              <span className="font-medium bg-gradient-to-r from-yellow-400 via-yellow-200 to-white bg-clip-text text-transparent">
                Testimonies
              </span>
            </h2>
            <p className="text-lg font-light text-yellow-200">Stories from our ministry champions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300">
                <p className="text-blue-200 mb-4 font-light italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-yellow-300 text-sm font-light">{testimonial.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Detail Modal - Refined */}
      {selectedUnit && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50" onClick={() => setSelectedUnit(null)}>
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl max-w-2xl w-full p-8 border border-white/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <selectedUnit.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white">{selectedUnit.name}</h3>
                  <p className="text-yellow-300 font-light">{selectedUnit.members} members</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUnit(null)}
                className="text-white/60 hover:text-white transition-colors text-xl font-light"
              >
                ✕
              </button>
            </div>
            <p className="text-blue-200 text-lg font-light mb-6 leading-relaxed">{selectedUnit.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-yellow-300 font-light">
                <Clock className="w-5 h-5" />
                <span>{selectedUnit.time}</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300 font-light">
                <Users className="w-5 h-5" />
                <span>{selectedUnit.members} members</span>
              </div>
            </div>
            <p className="text-lg text-blue-200 mb-6 text-center font-light leading-relaxed">
              Contact the <span className="text-yellow-300 font-medium">Head of Operations</span> to join this ministry unit.
            </p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}