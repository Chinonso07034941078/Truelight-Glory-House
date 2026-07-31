import { motion } from 'framer-motion';
import { useState } from "react";
import { Video, Recycle, Search, Users, Heart, Award, Target, Phone, Clock, MonitorSpeaker, Music, Shield, Book, UserCheck, Globe, Crown, Truck, Info, Database, Megaphone, Smile, HandHeart, Paintbrush, Handshake, CupSoda, X } from "lucide-react";
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
  { name: "Mary Ben", unit: "Children Church", text: "Teaching children about God's love has renewed my own faith daily." }
];

export default function MinistryUnits() {
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);
  
  const filteredUnits = units.filter(unit => 
    unit.name.toLowerCase().includes(search.toLowerCase()) ||
    unit.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
       
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Floating shapes */}
        
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-blue-600/5 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-2 h-40 bg-gradient-to-b from-blue-600/40 to-transparent"></div>
        
        {/* Diagonal accent lines */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-600/20 via-transparent to-blue-600/20 transform -skew-x-12"></div>
        
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(18deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <section className="relative min-h-screen flex items-center overflow-hidden">
  
 {/* Background Image Container */}
<div className="absolute inset-0 z-0 bg-black">
  <img 
    src="https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto,w_1600/v1771202142/629486041_1310175651143462_620369017042103686_n_ci87yq.jpg"
    alt="Ministry Background"
    loading="eager"
    fetchpriority="high"
    decoding="async"
    className="w-full h-full object-cover transition-opacity duration-700 opacity-0"
    onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/65 to-black/70 lg:via-black/70 lg:to-transparent"></div>
</div>


  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
    
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="space-y-8 lg:space-y-12 max-w-4xl"
    >
      
      {/* Bold Blue Line Accent */}
      <div className="flex items-center gap-4">
        <div className="w-16 sm:w-20 h-1 bg-blue-600"></div>
        <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
          Ministry Units
        </span>
      </div>

      {/* Massive Heading */}
      <div>
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black text-white leading-none tracking-tighter">
          Find Your
        </h1>
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-black leading-none tracking-tighter mt-2">
          <span className="text-blue-600">
            Service
          </span>
        </h1>
      </div>

      {/* Subheading */}
      <div className="max-w-xl">
        <p className="text-xl sm:text-2xl lg:text-3xl text-white font-light leading-relaxed">
          Join a ministry where your gifts meet God's perfect plan.
        </p>
      </div>

      {/* Stats - Desktop */}
      <div className="hidden lg:grid grid-cols-4 gap-8 pt-8">
        <div>
          <div className="text-5xl font-black text-blue-700">22</div>
          <div className="text-xs uppercase tracking-wider text-gray-600 mt-1">Active Units</div>
        </div>
        <div>
          <div className="text-5xl font-black text-blue-700">500+</div>
          <div className="text-xs uppercase tracking-wider text-gray-600 mt-1">Members</div>
        </div>
        <div>
          <div className="text-5xl font-black text-blue-700">50K+</div>
          <div className="text-xs uppercase tracking-wider text-gray-600 mt-1">Lives Impacted</div>
        </div>
        <div>
          <div className="text-5xl font-black text-blue-700">10</div>
          <div className="text-xs uppercase tracking-wider text-gray-600 mt-1">Years Strong</div>
        </div>
      </div>

    </motion.div>
  </div>

  {/* Bottom Blue Stripe */}
  <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-600 z-20"></div>
</section>

      {/* Search Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for your calling..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border-b-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg transition-colors bg-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Units Grid */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {filteredUnits.map((unit, index) => (
              <motion.div
                key={unit.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setSelectedUnit(unit)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden h-full min-h-[280px] sm:min-h-[320px] bg-white/40 backdrop-blur-xl border border-white/60 hover:bg-white/60 hover:border-blue-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10">
                  
                  {/* Blue accent on hover */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-500 z-10"></div>
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/5 group-hover:to-blue-600/10 transition-all duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col p-4 sm:p-6">
                    
                    {/* Icon with enhanced glassmorphism */}
                    <div className="mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md border border-white/40 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:scale-110 transition-all duration-500 flex items-center justify-center shadow-lg">
                        <unit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 leading-tight mb-1">
                        {unit.name}
                      </h3>
                      <div className="text-xs sm:text-sm text-blue-600 font-medium mb-3">{unit.members} members</div>
                      
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-auto line-clamp-3">
                        {unit.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 pt-3 mt-3 border-t border-gray-300/50">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                        <span className="line-clamp-1">{unit.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          
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
                Testimonies
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
              Member Stories
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-md border border-white/40 p-6 hover:bg-white/80 transition-all duration-300"
              >
                <div className="border-l-4 border-blue-600 pl-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className="text-gray-900 font-bold">{testimonial.name}</h4>
                    <p className="text-blue-600 text-sm font-medium">{testimonial.unit}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 justify-center">
              <div className="w-16 h-1 bg-blue-600"></div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Get Started
              </span>
            </div>

            <div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-none tracking-tighter mb-2">
                Ready to
              </h2>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-blue-600 leading-none tracking-tighter">
                Serve?
              </h2>
            </div>

            <p className="text-xl sm:text-2xl text-gray-700 font-light max-w-2xl mx-auto">
              Contact the Head of Operations Team to find your place in the church.
            </p>

            <div className="pt-4">
              <a
                href="tel:+2349134943551"
                className="group relative bg-blue-600 text-white font-bold px-12 py-5 text-lg uppercase tracking-wider hover:bg-gray-900 transition-all duration-300 inline-block"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Join a Unit
                </span>
                <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unit Detail Modal */}
      {selectedUnit && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm" 
          onClick={() => setSelectedUnit(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Blue top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
            
            <div className="p-8">
              
              <button
                onClick={() => setSelectedUnit(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-start gap-4 mb-6 pr-12">
                <div className="w-16 h-16 bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <selectedUnit.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-900 leading-tight mb-1">
                    {selectedUnit.name}
                  </h3>
                  <p className="text-blue-600 font-bold">{selectedUnit.members} members</p>
                </div>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 mb-8">
                <p className="text-xl text-gray-700 leading-relaxed">
                  {selectedUnit.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-gray-50">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-2">Meeting Time</div>
                  <div className="text-gray-900 font-medium">{selectedUnit.time}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-2"></div>
                  <div className="text-gray-900 font-medium"></div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-gray-700 mb-6">
                  Contact the <a href="tel:+2349134943551" className="text-blue-600 font-bold hover:underline">Head of Operations</a> to join this ministry unit.
                </p>
                
                <a
                  href="tel:+2349134943551"
                  className="group relative bg-blue-600 text-white font-bold px-8 py-4 uppercase tracking-wider hover:bg-gray-900 transition-colors inline-block"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute inset-0 border-2 border-blue-600 transform translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300"></div>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}