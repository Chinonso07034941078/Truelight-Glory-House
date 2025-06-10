import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import bg1 from "../assets/truelight-photo1.jpg"
import bg2 from "../assets/truelight-photo2.jpg"
import bg3 from "../assets/truelight-photo3.jpg"

const images = [bg1, bg2, bg3];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000); // change image every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-gray-800">
      {/* Hero Section with Slideshow Background */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 transition-all duration-1000">
          <img
            src={images[currentIndex]}
            alt="Hero background"
            className="w-full h-full object-cover filter blur-sm brightness-50 transition-opacity duration-1000"
          />
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Truelight Glory House</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            This is where we disciple the nation, and discipline the devil.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p>To lead people into a growing relationship with Jesus Christ.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p>A world transformed by the light of God's truth.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
            <p>Faith, Love, Unity, Prayer, and Discipleship.</p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our History</h2>
          <p>
            Truelight Church was founded in 2005 with a small group of believers passionate about spreading
            the gospel. Since then, we've grown into a vibrant, multicultural community reaching hundreds
            every week through worship, outreach, and teaching.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-gray-100 py-16 px-4 text-center">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Meet Our Global Senior Pastor</h2>
            <div>
              {/* <img
                src="/pastor.jpg"
                alt="Pastor Ifeanyi Uwakwe"
                className="w-32 h-32 mx-auto rounded-full object-cover"
              /> */}
              <h3 className="mt-4 font-semibold text-xl">Pastor Ifeanyi Uwakwe</h3>
            </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What We Believe</h2>
          <ul className="text-left space-y-4">
            <li>✅ The Bible is the inspired word of God.</li>
            <li>✅ Jesus Christ is the Son of God and Savior of the world.</li>
            <li>✅ Salvation is by grace through faith in Jesus.</li>
            <li>✅ The Holy Spirit empowers us for holy living and service.</li>
            <li>✅ The Church is the body of Christ and a light to the world.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}
