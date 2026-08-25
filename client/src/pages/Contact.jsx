import  { useState } from 'react'
import Header from '../components/Header'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <>
      <Header />

      <section
        id="contact"
        className="py-24 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
              Contact Us
            </span>

            <h2 className="mt-6 text-5xl font-bold text-gray-900 dark:text-white">
              Get In Touch
            </h2>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions about SOP Generator? We'd love to hear from you.
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left Side */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md border border-transparent dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  manishsuriyal21.com
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md border border-transparent dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Phone
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  +91 9411393411
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md border border-transparent dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Address
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Dehradun, Uttarakhand, India
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-transparent dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-5">

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                />

                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your Message"
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                ></textarea>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <p className="text-green-600 dark:text-green-400 text-center font-medium">
                    ✅ Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-600 dark:text-red-400 text-center font-medium">
                    ❌ Something went wrong. Try again.
                  </p>
                )}

              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;