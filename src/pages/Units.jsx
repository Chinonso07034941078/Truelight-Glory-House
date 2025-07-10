

export default function Units(){
    
  const units = [
    { name: "Media", description: "Handling audio, video, and digital content for powerful ministry impact.", image: "/images/media.jpg", icon: "📹" },
    { name: "Choir", description: "Leading the congregation in spirit-filled worship and praise.", image: "/images/choir.jpg", icon: "🎵" },
    { name: "Protocol", description: "Ensuring smooth flow and decorum during services and events.", image: "/images/protocol.jpg", icon: "📋" },
    { name: "Logistics", description: "Providing practical support for church operations and events.", image: "/images/logistics.jpg", icon: "🚚" },
    { name: "Information Desk", description: "Offering guidance and info to new and returning members.", image: "/images/info.jpg", icon: "ℹ️" },
    { name: "Data Analysis", description: "Utilizing data to track growth and enhance church systems.", image: "/images/data.jpg", icon: "📊" },
    { name: "Company of the Great", description: "Inspiring youth through mentorship and greatness-focused programs.", image: "/images/company.jpg", icon: "🌟" },
    { name: "Evangelism", description: "Taking the gospel to the streets, communities, and online.", image: "/images/evangelism.jpg", icon: "📢" },
    { name: "Follow-Up", description: "Nurturing and connecting with new converts and guests.", image: "/images/followup.jpg", icon: "🤝" },
    { name: "Marketing", description: "Promoting church events, messages, and outreach creatively.", image: "/images/marketing.jpg", icon: "📱" },
    { name: "Sanctuary Keepers", description: "Maintaining cleanliness and beauty in God's house.", image: "/images/sanctuary.jpg", icon: "🏠" },
    { name: "Ushering", description: "Creating a welcoming and orderly worship environment.", image: "/images/ushering.jpg", icon: "👥" },
    { name: "Greeters", description: "Offering warm smiles and greetings to everyone who walks in.", image: "/images/greeters.jpg", icon: "👋" },
    { name: "Sound Hub", description: "Managing sound systems to ensure audio excellence.", image: "/images/sound.jpg", icon: "🔊" },
    { name: "Security", description: "Ensuring the safety and protection of the church community.", image: "/images/security.jpg", icon: "🛡️" },
    { name: "Children Church", description: "Ministering to kids with love, care, and biblical truth.", image: "/images/children.jpg", icon: "👶" },
    { name: "Prayer", description: "Standing in the gap through fervent intercession.", image: "/images/prayer.jpg", icon: "🙏" },
    { name: "Welfare", description: "Meeting the needs of members and supporting the needy.", image: "/images/welfare.jpg", icon: "❤️" },
    { name: "Creative Unit", description: "Bringing visual and performance arts to life for ministry.", image: "/images/creative.jpg", icon: "🎨" },
    { name: "Young Achievers Network", description: "Empowering youths to succeed spiritually and professionally.", image: "/images/youngachievers.jpg", icon: "🚀" },
    { name: "Partnership", description: "Collaborating with the church financially and spiritually.", image: "/images/partnership.jpg", icon: "🤝" },
    { name: "Communion", description: "Preparing and serving the Lord's table with reverence.", image: "/images/communion.jpg", icon: "🍞" },
  ];


    return (
        <div>
             {/* Ministry Units Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text mb-4">
              Join a Ministry Unit
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover where you belong and serve God passionately. Every member has a place to contribute their unique gifts and talents.
            </p>
          </motion.div>

          {/* Units Grid */}
          <div className="grid grid-cols-2 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {units.map((unit, i) => (
              <motion.div
                key={unit.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 w-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-4xl mb-2">{unit.icon}</div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-600 transition-colors">
                    {unit.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {unit.description}
                  </p>
                  <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        </div>
    )
}