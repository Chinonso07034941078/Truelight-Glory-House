import { useState } from "react";
import { Search, Sparkles, Users, Heart, Award, Target, Phone, Mail, Star, ChevronRight, Clock, MonitorSpeaker, Music, Shield, Book, UserCheck, Globe, Crown, Zap, Truck, Info, Database, Megaphone, Smile, HandHeart, Paintbrush, Handshake, CupSoda } from "lucide-react";

const units = [
  { name: "Media", icon: Sparkles, description: "Amplifying God's message through digital excellence", leader: "Min. Moyo", members: "30+", time: "Tuesday 9PM", contact: "media@truelight.org", phone: "+2348012345678" },
  { name: "Music Department", icon: Music, description: "Leading souls into God's presence through worship", leader: "Esther Ifeanyi", members: "35+", time: "Saturdays 5PM, Mondays 9PM", contact: "choir@truelight.org", phone: "+2348023456789" },
  { name: "Protocol", icon: Award, description: "Excellence in events and hospitality", leader: "Chibuzor Okeke", members: "18+", time: "Varies", contact: "protocol@truelight.org", phone: "+2348034567890" },
  { name: "Logistics", icon: Truck, description: "Ensuring seamless movement of resources and equipment", leader: "Grace Ojo", members: "7+", time: "online", contact: "logistics@truelight.org", phone: "+2348045678901" },
  { name: "Information Desk", icon: Info, description: "Providing information and assistance to members and guests", leader: "Favour Okechukwu", members: "12+", time: "Sundays Services", contact: "info@truelight.org", phone: "+2348056789012" },
  { name: "Data Analysis", icon: Database, description: "Analyzing and managing church data for strategic decisions", leader: "Ngozi Nwachukwu", members: "8+", time: "Online", contact: "data@truelight.org", phone: "+2348067890123" },
  { name: "Company of the Great", icon: Crown, description: "Mentorship and leadership development for kingdom impact", leader: "Oluwatobi Ojo", members: "10+", time: "Saturday 5PM", contact: "company@truelight.org", phone: "+2348078901234" },
  { name: "Evangelism", icon: Globe, description: "Taking the gospel beyond church walls", leader: "Daniel Okafor", members: "22+", time: "Saturdays 5PM", contact: "evangelism@truelight.org", phone: "+2348089012345" },
  { name: "Follow-Up", icon: UserCheck, description: "Connecting and following up with new converts and visitors", leader: "Chinedu John", members: "14+", time: "Saturday 5PM", contact: "followup@truelight.org", phone: "+2348090123456" },
  { name: "Marketing", icon: Megaphone, description: "Promoting church events and initiatives effectively", leader: "Nkechi Okorie", members: "16+", time: "Sunday Services", contact: "marketing@truelight.org", phone: "+2348101234567" },
  { name: "Sanctuary Keepers", icon: Sparkles, description: "Maintaining cleanliness and sanctity of God's house", leader: "Blessing Okafor", members: "22+", time: "Saturdays 5PM", contact: "sanctuary@truelight.org", phone: "+2348112345678" },
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
  { name: "Min. Moyo", unit: "Media", text: "Serving here transformed my life completely!" },
  { name: "DKK", unit: "Media", text: "We're changing lives through technology and faith!" },
  { name: "Mr. Flourish", unit: "Evangelism", text: "Nothing beats seeing souls transformed through outreach." },
  { name: "Esther Ifeanyi", unit: "Music Department", text: "Leading worship has deepened my relationship with God in ways I never imagined." },
  { name: "Chibuzor Okeke", unit: "Protocol", text: "The discipline and excellence I've learned serving here has impacted every area of my life." },
  { name: "Joy Eze", unit: "Children Church", text: "Teaching children about God's love has renewed my own faith daily." },
  { name: "Emeka Obi", unit: "Sound Hub", text: "Creating the perfect sound environment for worship is my way of contributing to the move of God." },
  { name: "Ada Uche", unit: "Greeters", text: "The joy I feel welcoming people to God's house is indescribable." },
  { name: "Daniel Okafor", unit: "Evangelism", text: "Every soul won to Christ through our outreach efforts is a testament to God's faithfulness." }
];

const stats = [
  { label: "Active Units", value: "22", icon: Target },
  { label: "Total Members", value: "500+", icon: Users },
  { label: "Lives Impacted", value: "50K+", icon: Heart },
  { label: "Years Strong", value: "15", icon: Award }
];

import Footer from "../components/Footer";

export default function MinistryUnits() {
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);
  
  const filteredUnits = units.filter(unit => 
    unit.name.toLowerCase().includes(search.toLowerCase()) ||
    unit.description.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleJoin = (unit) => {
    // Updated to call the team lead's phone number
    window.location.href = `tel:${unit.phone}`;
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

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 border border-yellow-400/50 rounded-full text-yellow-400 font-bold mb-8">
            <Crown className="w-4 h-4" />
            Find Your Divine Assignment
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="text-transparent bg-gradient-to-r from-white via-yellow-400 to-white bg-clip-text">
              Transform Lives
            </span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text">
              Serve with Purpose
            </span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-12">
            Join a ministry unit where your gifts meet God's perfect plan. Over 500 members serving across 22 dynamic units.
          </p>
          <button
            onClick={() => document.getElementById('units').scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold rounded-full shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-500 flex items-center gap-3 mx-auto"
          >
            <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Discover Your Unit
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-blue-900" />
              </div>
              <div className="text-3xl font-black text-yellow-400 mb-1">{stat.value}</div>
              <div className="text-blue-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Search */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for your divine calling..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
          />
        </div>
      </section>

      {/* Units Grid */}
      <section id="units" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUnits.map((unit, i) => (
              <div
                key={unit.name}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col"
                onClick={() => setSelectedUnit(unit)}
              >
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <unit.icon className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{unit.name}</h3>
                      <div className="text-yellow-400 text-sm">{unit.members} members</div>
                    </div>
                  </div>
                  <p className="text-blue-200 text-sm mb-4 flex-grow">{unit.description}</p>
                  <div className="flex items-center gap-2 text-sm text-blue-300 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{unit.time}</span>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleJoin(unit); }}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold text-sm hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Join this unit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-white to-yellow-400 bg-clip-text mb-4">
              Divine Testimonies
            </h2>
            <p className="text-xl text-blue-200">Hear from our ministry champions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300">
                <p className="text-blue-200 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-yellow-400 text-sm">{testimonial.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Detail Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50" onClick={() => setSelectedUnit(null)}>
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl max-w-2xl w-full p-8 border border-white/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <selectedUnit.icon className="w-8 h-8 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{selectedUnit.name}</h3>
                  <p className="text-yellow-400">{selectedUnit.members} members</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUnit(null)}
                className="text-white/60 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>
            <p className="text-blue-200 text-lg mb-6">{selectedUnit.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-blue-300">
                <Clock className="w-5 h-5" />
                <span>{selectedUnit.time}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <Users className="w-5 h-5" />
                <span>{selectedUnit.members} souls</span>
              </div>
            </div>
            <button
              onClick={() => handleJoin(selectedUnit)}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Call {selectedUnit.leader} to Join
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}