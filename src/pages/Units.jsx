import {motion} from "framer-motion"; 
import { ArrowRight, Users, Heart, Music, Shield, Mic, Camera, Lightbulb, Globe, UserCheck, Database, Star, Megaphone, Handshake, Smartphone, Home, UserPlus, Volume2, Baby, Palette, Rocket, DollarSign, Cross } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardHover = {
  hover: {
    scale: 1.05,
    rotateY: 5,
    z: 50,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export default function Units(){
    
  const units = [
    { 
      name: "Media", 
      description: "Handling audio, video, and digital content for powerful ministry impact.", 
      icon: Camera,
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    { 
      name: "Choir", 
      description: "Leading the congregation in spirit-filled worship and praise.", 
      icon: Music,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    { 
      name: "Protocol", 
      description: "Ensuring smooth flow and decorum during services and events.", 
      icon: UserCheck,
      gradient: "from-green-500 to-teal-500",
      bgColor: "bg-green-50"
    },
    { 
      name: "Logistics", 
      description: "Providing practical support for church operations and events.", 
      icon: Users,
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    },
    { 
      name: "Information Desk", 
      description: "Offering guidance and info to new and returning members.", 
      icon: Lightbulb,
      gradient: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50"
    },
    { 
      name: "Data Analysis", 
      description: "Utilizing data to track growth and enhance church systems.", 
      icon: Database,
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50"
    },
    { 
      name: "Company of the Great", 
      description: "Inspiring youth through mentorship and greatness-focused programs.", 
      icon: Star,
      gradient: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50"
    },
    { 
      name: "Evangelism", 
      description: "Taking the gospel to the streets, communities, and online.", 
      icon: Megaphone,
      gradient: "from-red-500 to-pink-500",
      bgColor: "bg-red-50"
    },
    { 
      name: "Follow-Up", 
      description: "Nurturing and connecting with new converts and guests.", 
      icon: Handshake,
      gradient: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50"
    },
    { 
      name: "Marketing", 
      description: "Promoting church events, messages, and outreach creatively.", 
      icon: Smartphone,
      gradient: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50"
    },
    { 
      name: "Sanctuary Keepers", 
      description: "Maintaining cleanliness and beauty in God's house.", 
      icon: Home,
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50"
    },
    { 
      name: "Ushering", 
      description: "Creating a welcoming and orderly worship environment.", 
      icon: UserPlus,
      gradient: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50"
    },
    { 
      name: "Greeters", 
      description: "Offering warm smiles and greetings to everyone who walks in.", 
      icon: Heart,
      gradient: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50"
    },
    { 
      name: "Sound Hub", 
      description: "Managing sound systems to ensure audio excellence.", 
      icon: Volume2,
      gradient: "from-slate-500 to-gray-500",
      bgColor: "bg-slate-50"
    },
    { 
      name: "Security", 
      description: "Ensuring the safety and protection of the church community.", 
      icon: Shield,
      gradient: "from-gray-600 to-slate-600",
      bgColor: "bg-gray-50"
    },
    { 
      name: "Children Church", 
      description: "Ministering to kids with love, care, and biblical truth.", 
      icon: Baby,
      gradient: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50"
    },
    { 
      name: "Prayer", 
      description: "Standing in the gap through fervent intercession.", 
      icon: Cross,
      gradient: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50"
    },
    { 
      name: "Welfare", 
      description: "Meeting the needs of members and supporting the needy.", 
      icon: Heart,
      gradient: "from-green-600 to-emerald-600",
      bgColor: "bg-green-50"
    },
    { 
      name: "Creative Unit", 
      description: "Bringing visual and performance arts to life for ministry.", 
      icon: Palette,
      gradient: "from-fuchsia-500 to-purple-500",
      bgColor: "bg-fuchsia-50"
    },
    { 
      name: "Young Achievers Network", 
      description: "Empowering youths to succeed spiritually and professionally.", 
      icon: Rocket,
      gradient: "from-orange-600 to-red-600",
      bgColor: "bg-orange-50"
    },
    { 
      name: "Partnership", 
      description: "Collaborating with the church financially and spiritually.", 
      icon: DollarSign,
      gradient: "from-green-700 to-emerald-700",
      bgColor: "bg-green-50"
    },
    { 
      name: "Communion", 
      description: "Preparing and serving the Lord's table with reverence.", 
      icon: Heart,
      gradient: "from-amber-600 to-yellow-600",
      bgColor: "bg-amber-50"
    },
  ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
             {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-32 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-blue-300/20 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-300/10 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
              Join a{" "}
              <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                Ministry Unit
              </span>
            </h1>
            <p className="text-blue-100 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light">
              Discover where you belong and serve God passionately. Every member has a place to contribute their unique gifts and talents.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
              <p className="text-white font-semibold text-lg">
                🌟 22 Amazing Units • Find Your Calling Today
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ministry Units Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text mb-6">
              Choose Your Ministry
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Each unit is a divine opportunity to serve, grow, and impact lives. Click on any unit to learn more about how you can get involved.
            </p>
          </motion.div>

          {/* Units Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {units.map((unit, i) => {
              const IconComponent = unit.icon;
              return (
                <motion.div
                  key={unit.name}
                  custom={i}
                  variants={fadeUp}
                  whileHover="hover"
                  className="group perspective-1000"
                >
                  <motion.div
                    variants={cardHover}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu cursor-pointer border border-gray-100"
                  >
                    {/* Image/Icon Section */}
                    <div className={`relative h-56 w-full bg-gradient-to-br ${unit.gradient} flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
                        <div className="absolute top-12 right-6 w-6 h-6 bg-white/20 rounded-full animate-bounce"></div>
                        <div className="absolute bottom-8 left-8 w-10 h-10 bg-white/25 rounded-full animate-pulse"></div>
                      </div>

                      <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                          <IconComponent className="w-16 h-16 text-white drop-shadow-lg" />
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content Section */}
                    <div className={`p-6 space-y-4 ${unit.bgColor} group-hover:bg-white transition-colors duration-300`}>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {unit.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {unit.description}
                      </p>
                      
                      <div className="pt-2">
                        <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all transform group-hover:translate-x-1">
                          Learn More 
                          <ArrowRight className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Serve?
            </h2>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto leading-relaxed">
              Don't wait for the perfect moment. Step into your calling today and be part of something bigger than yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105">
                Join a Unit Today
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
        </div>
    )
}