import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCircle, Heart, Globe, Building, Gift } from "lucide-react";
import Footer from "../components/Footer";

// Mock images - replace with your actual imports
const BGI = "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
const ACCESS = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80";
const UBA = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80";

export default function GivingSection() {
  const [activeTab, setActiveTab] = useState("naira");
  const [copiedAccount, setCopiedAccount] = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleCopyAccount = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(""), 2000);
  };

  return (
    <section className="w-full bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={BGI}
            alt="Giving Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-950/90" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            className="bg-white/10 backdrop-blur-sm text-white rounded-full px-6 py-3 text-sm font-medium uppercase tracking-wide flex items-center gap-2 border border-white/20"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <Heart className="w-4 h-4" />
            Give Generously
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <span className="text-blue-300">Your</span> Generosity.<br />
            <span className="text-white">Our</span> <span className="text-blue-300">Mission.</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            Partner with us in reaching a billion souls across ten thousand cities 
            with the transformative message of the gospel.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <button
              onClick={() =>
                document.getElementById("bank-details")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-blue-950 font-bold px-8 py-4 rounded-full shadow-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              Give Now
            </button>

            <button
              onClick={() =>
                document.getElementById("other-ways")?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-blue-950 transition-all duration-300"
            >
              Other Ways to Give
            </button>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1">
              <motion.div
                className="bg-blue-100 text-blue-950 font-semibold px-6 py-3 rounded-full flex items-center gap-2 w-fit"
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
              >
                <Globe className="w-5 h-5" />
                Give to TLGH
              </motion.div>
            </div>
            
            <motion.div
              className="flex-1 lg:text-right"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                Join us as we put our money right where our faith is,<br />
                partnering with God for the spread of the gospel in our day.
              </p>
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <motion.div
            className="mt-12 flex justify-center gap-2"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <button
              onClick={() => setActiveTab("naira")}
              className={`px-6 sm:px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeTab === "naira"
                  ? "bg-blue-950 text-white shadow-lg"
                  : "bg-blue-100 text-blue-950 hover:bg-blue-200"
              }`}
            >
              Naira Account
            </button>
            <button
              onClick={() => setActiveTab("domiciliary")}
              className={`px-6 sm:px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeTab === "domiciliary"
                  ? "bg-blue-950 text-white shadow-lg"
                  : "bg-blue-100 text-blue-950 hover:bg-blue-200"
              }`}
            >
              Domiciliary Account
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bank Details Section */}
      <section id="bank-details" className="bg-blue-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-blue-100"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <div className="flex items-center gap-3 mb-8">
              <Gift className="w-8 h-8 text-blue-950" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">REGULAR GIVINGS</h2>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
            >
              {[
                {
                  label: "Offering/Tithes",
                  number: "1025313120",
                  bank: "UBA",
                  logo: UBA,
                },
                {
                  label: "Offering/Tithe",
                  number: "0094316383",
                  bank: "ACCESS",
                  logo: ACCESS,
                },
                {
                  label: "Project",
                  number: "1911578888",
                  bank: "ACCESS",
                  logo: ACCESS,
                },
              ].map(({ label, number, bank, logo }, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100"
                  variants={fadeUp}
                >
                  <p className="font-bold text-blue-950 uppercase mb-4 text-sm tracking-wide">
                    {label}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={logo}
                        alt={`${bank} logo`}
                        className="w-12 sm:w-16 h-8 object-contain rounded"
                      />
                      <div>
                        <span className="text-lg sm:text-xl font-bold text-gray-900 block">
                          {number}
                        </span>
                        <span className="text-sm text-gray-600">{bank}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyAccount(number)}
                      className="group relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 transition-all duration-300 hover:scale-110"
                      title="Copy account number"
                    >
                      {copiedAccount === number ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-blue-950" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Building Project Section */}
      <section id="other-ways" className="bg-gradient-to-br from-blue-50 to-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-blue-100"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <div className="flex items-center gap-3 mb-8">
              <Building className="w-8 h-8 text-blue-950" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                GLORY LAND BUILDING PROJECT
              </h2>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
            >
              {[
                {
                  label: "Naira Account",
                  number: "1025413161",
                  bank: "UBA",
                  logo: UBA,
                  currency: "₦",
                },
                {
                  label: "Dollar Account",
                  number: "3003743459",
                  bank: "UBA",
                  logo: UBA,
                  currency: "$",
                },
              ].map(({ label, number, bank, logo, currency }, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100"
                  variants={fadeUp}
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-bold text-blue-950 uppercase text-sm tracking-wide">
                      {label}
                    </p>
                    <span className="text-2xl font-bold text-blue-950">{currency}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={logo}
                        alt={`${bank} logo`}
                        className="w-12 sm:w-16 h-8 object-contain rounded"
                      />
                      <div>
                        <span className="text-lg sm:text-xl font-bold text-gray-900 block">
                          {number}
                        </span>
                        <span className="text-sm text-gray-600">{bank}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyAccount(number)}
                      className="group relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 transition-all duration-300 hover:scale-110"
                      title="Copy account number"
                    >
                      {copiedAccount === number ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-blue-950" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-950 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Every Gift Makes a Difference
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Your generosity fuels our mission to spread hope and transform lives 
              across communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="bg-white text-blue-950 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300">
                Give Online
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-blue-950 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </section>
  );
}