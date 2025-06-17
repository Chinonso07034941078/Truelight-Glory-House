import Footer from "../components/Footer"

export default function Contact() {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          We'd love to hear from you! Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      {/* Contact Form */}
      <div className="bg-blue-50 flex justify-center px-4 py-16">
        <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl space-y-6">
          <h2 className="text-2xl font-bold text-blue-950 text-center">Contact Us</h2>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded transition"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
