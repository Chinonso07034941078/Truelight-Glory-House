import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import heroImage from "../assets/papa4.jpg";
import papa from "../assets/papa.jpg";
import { Typewriter } from 'react-simple-typewriter'
import {missionVisionValues, pastorInfo, history} from "../components/data"


export default function About() {
  return (
    <div className="text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-white text-center px-4 overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover filter brightness-50 z-0"
          initial={{ scale: 1.1, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white mt-6 drop-shadow-lg leading-tight"
            initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            Welcome to Truelight Glory House
          </motion.h1>
          <motion.p
             className="mt-8 text-lg md:text-lg text-gray-200 italic"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2, duration: 1 }}
           >
             <Typewriter
                words={[
                  "This is where we disciple the nations",
                   "And discipline the devil",
                       
                 ]}
                  loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={1800}
               />
           </motion.p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
    <section className="py-16 px-4 bg-gray-100">
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.3 }}
      >
        {missionVisionValues.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            <p>{item.content}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>

      {/* History */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">{history.title}</h2>
          <p>{history.content}</p>
        </motion.div>
      </section>

      {/* Leadership */}
      <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col lg:flex-row items-center justify-center px-6 py-24 gap-16">
             <motion.div 
               className="w-full lg:w-1/2" 
               initial={{ x: -100, opacity: 0 }} 
               whileInView={{ x: 0, opacity: 1 }} 
               transition={{ duration: 1 }} 
               viewport={{ once: true }}
             >
               <div className="relative">
                 <img 
                   src={papa} 
                   alt={pastorInfo.imageAlt} 
                   className="w-full h-auto object-cover rounded-[3rem] shadow-2xl" 
                 />
                 <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-black/30 to-transparent"></div>
               </div>
             </motion.div>
             
             <motion.div 
               className="w-full lg:w-1/2 space-y-8 text-center lg:text-left" 
               initial={{ x: 100, opacity: 0 }} 
               whileInView={{ x: 0, opacity: 1 }} 
               transition={{ duration: 1 }} 
               viewport={{ once: true }}
             >
               <div className="space-y-4">
                 <div className="text-blue-400 text-base font-bold tracking-widest uppercase">
                   {pastorInfo.subtitle}
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black tracking-wide uppercase bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                   {pastorInfo.title}
                 </h2>
               </div>
               <p className="text-xl leading-relaxed text-gray-300">
                 {pastorInfo.description}
               </p>
             </motion.div>
           </section>


      {/* What We Believe */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">What We Believe</h2>
          <ul className="text-left space-y-4">
            <li>✅ The Bible is the inspired word of God.</li>
            <li>✅ Jesus Christ is the Son of God and Savior of the world.</li>
            <li>✅ Salvation is by grace through faith in Jesus.</li>
            <li>✅ The Holy Spirit empowers us for holy living and service.</li>
            <li>✅ The Church is the body of Christ and a light to the world.</li>
          </ul>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
