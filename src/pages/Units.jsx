import React, { useState } from "react";
import {
  Users, Calendar, Mail, X, Star, ChevronRight, Award, Sparkles, Shield, Music, Heart, Book, Handshake
} from "lucide-react";
import Footer from "../components/Footer";

// Blue & Royal Yellow color codes
const blueGradient = "from-blue-800 to-blue-600";
const yellowGradient = "from-yellow-400 to-yellow-300";
const blueText = "text-blue-800";
const yellowText = "text-yellow-500";
const unitBg = "bg-gradient-to-br from-blue-50 to-yellow-50";

// List of units with images & sample details
const units = [
  {
    name: "Media",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80",
    description: "Delivering the message of Christ through sound, video, and creative digital media.",
    leader: "Samuel Adeyemi",
    contact: "media@truelight.org",
    meetingTime: "Saturdays, 10:00 AM",
    members: 18,
    icon: Sparkles,
  },
  {
    name: "Choir",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    description: "Leading worship with spirit-filled music and praise.",
    leader: "Esther Ifeanyi",
    contact: "choir@truelight.org",
    meetingTime: "Wednesdays, 6:30 PM",
    members: 27,
    icon: Music,
  },
  {
    name: "Protocol",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    description: "Upholding order and smooth coordination during services and events.",
    leader: "Chibuzor Okeke",
    contact: "protocol@truelight.org",
    meetingTime: "Fridays, 6:00 PM",
    members: 12,
    icon: Handshake,
  },
  {
    name: "Logistics",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&q=80",
    description: "Ensuring resources and materials are always ready for every ministry activity.",
    leader: "Grace Ojo",
    contact: "logistics@truelight.org",
    meetingTime: "Sundays, 8:30 AM",
    members: 10,
    icon: Star,
  },
  {
    name: "Information Desk",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&q=80",
    description: "Greeting guests and offering help with a smile.",
    leader: "Ifeanyi Nwosu",
    contact: "info@truelight.org",
    meetingTime: "Sundays, 9:00 AM",
    members: 7,
    icon: Users,
  },
  {
    name: "Data Analysis",
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=600&q=80",
    description: "Transforming numbers into insights for church growth.",
    leader: "Ngozi Nwachukwu",
    contact: "data@truelight.org",
    meetingTime: "Saturdays, 3:00 PM",
    members: 8,
    icon: Star,
  },
  {
    name: "Company of the Great",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    description: "Raising and equipping leaders of tomorrow.",
    leader: "Oluwatobi Ojo",
    contact: "great@truelight.org",
    meetingTime: "Fridays, 5:00 PM",
    members: 14,
    icon: Award,
  },
  {
    name: "Evangelism",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    description: "Taking the gospel beyond the church walls.",
    leader: "Daniel Okafor",
    contact: "evangelism@truelight.org",
    meetingTime: "Saturdays, 4:00 PM",
    members: 22,
    icon: Heart,
  },
  {
    name: "Follow-Up",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
    description: "Connecting, caring and ensuring every new member feels welcome.",
    leader: "Chinyere Obi",
    contact: "followup@truelight.org",
    meetingTime: "Sundays, 2:00 PM",
    members: 11,
    icon: Users,
  },
  {
    name: "Marketing",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80",
    description: "Promoting events, services, and the church vision with creativity.",
    leader: "Peter Ade",
    contact: "marketing@truelight.org",
    meetingTime: "Wednesdays, 5:30 PM",
    members: 8,
    icon: Sparkles,
  },
  {
    name: "Sanctuary Keepers",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&q=80",
    description: "Keeping God's house clean and beautiful.",
    leader: "Blessing Uche",
    contact: "sanctuary@truelight.org",
    meetingTime: "Saturdays, 7:00 AM",
    members: 15,
    icon: Star,
  },
  {
    name: "Ushering",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=600&q=80",
    description: "Directing guests and maintaining order during services.",
    leader: "Emeka Eze",
    contact: "ushering@truelight.org",
    meetingTime: "Sundays, 8:00 AM",
    members: 18,
    icon: Handshake,
  },
  {
    name: "Greeters",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    description: "Offering warm greetings and first impressions to all.",
    leader: "Sandra Okon",
    contact: "greeters@truelight.org",
    meetingTime: "Sundays, 8:00 AM",
    members: 9,
    icon: Star,
  },
  {
    name: "Sound Hub",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&q=80",
    description: "Ensuring every word and note is heard clearly.",
    leader: "Chris Chukwu",
    contact: "sound@truelight.org",
    meetingTime: "Saturdays, 11:00 AM",
    members: 6,
    icon: Star,
  },
  {
    name: "Security",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a6a16?w=600&q=80",
    description: "Protecting lives and property at every gathering.",
    leader: "Olabode Lawal",
    contact: "security@truelight.org",
    meetingTime: "Sundays, 7:00 AM",
    members: 12,
    icon: Shield,
  },
  {
    name: "Children Church",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=600&q=80",
    description: "Nurturing faith and joy in the youngest hearts.",
    leader: "Joy Ike",
    contact: "children@truelight.org",
    meetingTime: "Sundays, 9:00 AM",
    members: 18,
    icon: Book,
  },
  {
    name: "Prayer",
    image: "https://images.unsplash.com/photo-1457694587812-e8bf29a43845?w=600&q=80",
    description: "Covering the church and its people in fervent prayer.",
    leader: "Paul Nwankwo",
    contact: "prayer@truelight.org",
    meetingTime: "Saturdays, 6:00 AM",
    members: 14,
    icon: Star,
  },
  {
    name: "Welfare",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&q=80",
    description: "Caring for the needs of the flock.",
    leader: "Amaka Obi",
    contact: "welfare@truelight.org",
    meetingTime: "Saturdays, 2:00 PM",
    members: 13,
    icon: Heart,
  },
  {
    name: "Creative Unit",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80",
    description: "Expressing the gospel through arts, drama, and creativity.",
    leader: "Funmi Salami",
    contact: "creative@truelight.org",
    meetingTime: "Fridays, 4:00 PM",
    members: 10,
    icon: Sparkles,
  },
  {
    name: "Young Achievers N",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&q=80",
    description: "Empowering young adults to lead, grow, and impact.",
    leader: "Tosin Ajayi",
    contact: "yan@truelight.org",
    meetingTime: "Saturdays, 12:00 PM",
    members: 16,
    icon: Star,
  },
  {
    name: "Partnership",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    description: "Mobilizing support for church projects and outreach.",
    leader: "Ngozi Opara",
    contact: "partnership@truelight.org",
    meetingTime: "Sundays, 1:30 PM",
    members: 8,
    icon: Handshake,
  },
  {
    name: "Communion",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&q=80",
    description: "Preparing and coordinating Holy Communion services.",
    leader: "Margaret Nnaji",
    contact: "communion@truelight.org",
    meetingTime: "First Sundays, 7:30 AM",
    members: 6,
    icon: Star,
  },
];

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    unit: "Choir",
    image: "https://images.unsplash.com/photo-1494790108755-2616c23c5b95?w=120&h=120&fit=crop&crop=face",
    text: "Serving in the Choir has enriched my faith and friendships!",
    rating: 5
  },
  {
    name: "John Smith",
    unit: "Media",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    text: "Media unit is a family, and I love being a part of it.",
    rating: 5
  }
];

// Main component
export default function Units() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase())
    || unit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${unitBg} font-sans`}>
      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${blueGradient} py-24 px-6`}>
        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-300/20 rounded-full text-yellow-400 text-sm font-medium shadow-lg">
            <Sparkles className="w-4 h-4" />
            Welcome to Truelight Glory House Units
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-lg">
            Join a <span className="text-yellow-400">Ministry Unit</span>
          </h1>
          <p className="text-yellow-200 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Find your place. Serve with your gifts. Shine His light.
          </p>
        </div>
      </section>

      {/* Search and Units List */}
      <section className="py-14 px-6 bg-white/80">
        <div className="max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="Search units..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full mb-10 px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-yellow-400 text-blue-900 placeholder-blue-400"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredUnits.map((unit, i) => (
              <div
                key={unit.name}
                className={`bg-gradient-to-br from-blue-100 to-yellow-100 rounded-2xl shadow-lg p-0 relative cursor-pointer border-2 border-yellow-200 hover:shadow-xl transition`}
                onClick={() => setSelectedUnit(unit)}
              >
                <div className="h-44 w-full rounded-t-2xl overflow-hidden relative">
                  <img src={unit.image} alt={unit.name} className="object-cover w-full h-full" />
                  <div className="absolute left-4 top-4 bg-yellow-300 text-blue-900 px-3 py-1 rounded-full text-xs font-bold shadow">
                    {unit.icon && React.createElement(unit.icon, { className: "inline mr-1 w-4 h-4 text-blue-700" })}
                    {unit.name}
                  </div>
                </div>
                <div className="p-6">
                  <p className={`${blueText} font-bold text-lg mb-2`}>{unit.name}</p>
                  <p className="text-blue-700 text-sm mb-4 min-h-[48px]">{unit.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-yellow-800 mb-2">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{unit.members} members</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{unit.meetingTime}</span>
                  </div>
                  <div className="flex justify-end">
                    <button className="flex items-center gap-1 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full font-bold hover:bg-yellow-300 transition text-xs">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredUnits.length === 0 && (
            <div className="text-center py-16 text-blue-400 text-lg">
              <span>No units found.</span>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 bg-gradient-to-r from-blue-100 to-yellow-100 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-300/30 rounded-full text-blue-900 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Stories of Impact
          </div>
          <h3 className="text-4xl font-black text-blue-900 mb-4">
            Testimonies
          </h3>
          <p className="text-blue-700 text-lg max-w-2xl mx-auto">
            Hear from our members whose lives have been transformed serving in the units.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border-2 border-yellow-200">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full border-4 border-blue-200 mb-4 object-cover"
              />
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
              <p className="text-blue-700 font-medium mb-4">"{t.text}"</p>
              <div className="text-blue-900 font-bold">{t.name}</div>
              <div className="text-xs text-yellow-700">{t.unit}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Unit Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-0 relative overflow-hidden">
            <button
              onClick={() => setSelectedUnit(null)}
              className="absolute top-4 right-4 bg-blue-100 rounded-full p-2 hover:bg-yellow-100 text-blue-500 hover:text-yellow-600 transition z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="h-52 w-full rounded-t-3xl overflow-hidden relative">
              <img src={selectedUnit.image} alt={selectedUnit.name} className="object-cover w-full h-full" />
              <div className="absolute left-4 bottom-4 bg-yellow-300 text-blue-900 px-3 py-1 rounded-full text-xs font-bold shadow">
                {selectedUnit.icon && <selectedUnit.icon className="inline mr-1 w-4 h-4 text-blue-700" />}
                {selectedUnit.name}
              </div>
            </div>
            <div className="p-8">
              <h4 className="text-2xl font-black text-blue-900 mb-2">{selectedUnit.name}</h4>
              <p className="text-blue-700 mb-4">{selectedUnit.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 text-xs text-blue-500 bg-blue-100 rounded-full px-3 py-1">
                  <Users className="w-3 h-3" /> {selectedUnit.members} Members
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-yellow-700 bg-yellow-100 rounded-full px-3 py-1">
                  <Calendar className="w-3 h-3" /> {selectedUnit.meetingTime}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-blue-900">Unit Leader:</span> {selectedUnit.leader}
              </div>
              <div className="mb-6">
                <span className="font-bold text-blue-900">Contact:</span> <a className="text-blue-700 underline" href={`mailto:${selectedUnit.contact}`}>{selectedUnit.contact}</a>
              </div>
              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedUnit.contact}`}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-800 to-yellow-400 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                  <Mail className="w-5 h-5" />
                  Contact / Join
                </a>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}