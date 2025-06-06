import Footer from "../components/Footer"

export default function About() {
    return (
         <div className="text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-28 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Truelight Glory House</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl">
         This is where we disciple the nation, and discipline the devil.
        </p>
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
          <h2 className="text-3xl font-bold mb-10">Meet Our Leaders</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img
                src="/pastor.jpg"
                alt="Pastor John Doe"
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
              <h3 className="mt-4 font-semibold text-xl">Pastor Ifeanyi Uwakwe</h3>
              <p className="text-sm text-gray-600">Senior Pastor</p>
            </div>
            
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
    )
}