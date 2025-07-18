import { useState } from "react";
import { Search, Sparkles, Users, Heart, Award, Target, Phone, Mail, Star, ChevronRight, Clock, MonitorSpeaker, Music, Shield, Book, UserCheck, Globe, Crown, Zap, Truck, Info, Database, Megaphone, Smile, HandHeart, Paintbrush, Handshake, CupSoda } from "lucide-react";
import Footer from "../components/Footer";

const units = [
  { name: "Media", icon: Sparkles, description: "Amplifying God's message through digital excellence", leader: "Samuel Adeyemi", members: 18, time: "Saturdays 10AM", contact: "media@truelight.org" },
  { name: "Choir", icon: Music, description: "Leading souls into God's presence through worship", leader: "Esther Ifeanyi", members: 35, time: "Wednesdays 6:30PM", contact: "choir@truelight.org" },
  { name: "Protocol", icon: Award, description: "Excellence in events and hospitality", leader: "Chibuzor Okeke", members: 15, time: "Fridays 6PM", contact: "protocol@truelight.org" },
  { name: "Logistics", icon: Truck, description: "Ensuring seamless movement of resources and equipment", leader: "Grace Ojo", members: 10, time: "Saturdays 8AM", contact: "logistics@truelight.org" },
  { name: "Information Desk", icon: Info, description: "Providing information and assistance to members and guests", leader: "Favour Okechukwu", members: 12, time: "Sundays 9AM", contact: "info@truelight.org" },
  { name: "Data Analysis", icon: Database, description: "Analyzing and managing church data for strategic decisions", leader: "Ngozi Nwachukwu", members: 8, time: "Saturdays 3PM", contact: "data@truelight.org" },
  { name: "Company of the Great", icon: Crown, description: "Mentorship and leadership development for kingdom impact", leader: "Oluwatobi Ojo", members: 20, time: "Fridays 5PM", contact: "company@truelight.org" },
  { name: "Evangelism", icon: Globe, description: "Taking the gospel beyond church walls", leader: "Daniel Okafor", members: 42, time: "Saturdays 5PM", contact: "evangelism@truelight.org" },
  { name: "Follow-Up", icon: UserCheck, description: "Connecting and following up with new converts and visitors", leader: "Chinedu John", members: 14, time: "Thursdays 5PM", contact: "followup@truelight.org" },
  { name: "Marketing", icon: Megaphone, description: "Promoting church events and initiatives effectively", leader: "Nkechi Okorie", members: 16, time: "Wednesdays 4PM", contact: "marketing@truelight.org" },
  { name: "Sanctuary Keepers", icon: Sparkles, description: "Maintaining cleanliness and sanctity of God's house", leader: "Blessing Okafor", members: 22, time: "Saturdays 7AM", contact: "sanctuary@truelight.org" },
  { name: "Ushering", icon: UserCheck, description: "Creating order and comfort in God's house", leader: "Blessing Musa", members: 28, time: "Sundays 8AM", contact: "ushering@truelight.org" },
  { name: "Greeters", icon: Smile, description: "Giving a warm and friendly welcome to everyone", leader: "Ada Uche", members: 13, time: "Sundays 8:30AM", contact: "greeters@truelight.org" },
  { name: "Sound Hub", icon: MonitorSpeaker, description: "Delivering crystal-clear audio for worship", leader: "Emeka Obi", members: 12, time: "Fridays 5PM", contact: "sound@truelight.org" },
  { name: "Security", icon: Shield, description: "Protecting and securing God's people", leader: "Ikenna Umeh", members: 20, time: "Sundays 7:30AM", contact: "security@truelight.org" },
  { name: "Children Church", icon: Book, description: "Nurturing the next generation for Christ", leader: "Joy Eze", members: 25, time: "Sundays 9AM", contact: "children@truelight.org" },
  { name: "Prayer", icon: HandHeart, description: "Interceding and standing in the gap for the church", leader: "Eunice Chukwudi", members: 30, time: "Fridays 6PM", contact: "prayer@truelight.org" },
  { name: "Welfare", icon: Heart, description: "Caring for the needs of members and the less privileged", leader: "Ngozi Obinna", members: 18, time: "Saturdays 2PM", contact: "welfare@truelight.org" },
  { name: "Creative Unit", icon: Paintbrush, description: "Designing visuals and creative content for the church", leader: "Chima Okoro", members: 11, time: "Wednesdays 5PM", contact: "creative@truelight.org" },
  { name: "Young Achievers Network", icon: Target, description: "Empowering youths for success and excellence", leader: "Tolu Adebayo", members: 24, time: "Saturdays 4PM", contact: "yan@truelight.org" },
  { name: "Partnership", icon: Handshake, description: "Supporting the church's vision through partnerships", leader: "Chike Nnamdi", members: 19, time: "Monthly (Last Sunday)", contact: "partnership@truelight.org" },
  { name: "Communion", icon: CupSoda, description: "Preparing and serving the Holy Communion with reverence", leader: "Helen Chika", members: 9, time: "Monthly (First Sunday)", contact: "communion@truelight.org" }
];

const testimonials = [
  { name: "Sarah Johnson", unit: "Choir", text: "Serving here transformed my life completely!" },
  { name: "John Smith", unit: "Media", text: "We're changing lives through technology and faith!" },
  { name: "Grace Adebayo", unit: "Evangelism", text: "Nothing beats seeing souls transformed through outreach." }
];

const stats = [
  { label: "Active Units", value: "22", icon: Target },
  { label: "Total Members", value: "420+", icon: Users },
  { label: "Lives Impacted", value: "25K+", icon: Heart },
  { label: "Years Strong", value: "15", icon: Award }
];

export default function MinistryUnits() {
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);
  
  const filteredUnits = units.filter(unit => 
    unit.name.toLowerCase().includes(search.toLowerCase()) ||
    unit.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoin = (unit) => {
    window.location.href = `mailto:${unit.contact}?subject=Interest in ${unit.name}&body=Hello ${unit.leader},%0A%0AI'm interested in joining ${unit.name}. Please let me know the next steps.%0A%0AThank you!`;
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
            Join a ministry unit where your gifts meet God's perfect plan. Over 300 members serving across 22 dynamic units.
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
                className="group bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setSelectedUnit(unit)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <unit.icon className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{unit.name}</h3>
                      <div className="text-yellow-400 text-sm">{unit.members} members</div>
                    </div>
                  </div>
                  <p className="text-blue-200 text-sm mb-4">{unit.description}</p>
                  <div className="flex items-center gap-2 text-sm text-blue-300 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{unit.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-blue-400">Led by {unit.leader}</div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleJoin(unit); }}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold text-sm hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Join
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
                <div className="flex mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
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

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-white to-yellow-400 bg-clip-text mb-6">
            Ready for Your Divine Assignment?
          </h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            Your gifts can transform lives. Join a ministry unit today and discover your heavenly purpose.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = 'mailto:info@truelight.org?subject=Ministry Unit Interest'}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold rounded-full shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center"
            >
              <Mail className="w-5 h-5" />
              Start Your Journey
            </button>
            <button
              onClick={() => window.location.href = 'tel:+2349010494622'}
              className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 flex items-center gap-3 justify-center"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </button>
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
            <div className="text-blue-300 mb-6">
              <strong>Leader:</strong> {selectedUnit.leader}
            </div>
            <button
              onClick={() => handleJoin(selectedUnit)}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5" />
              Serve {selectedUnit.name}
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}