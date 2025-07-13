import React, { useState } from 'react';

import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { motion } from 'framer-motion'; // ✅ Added Framer Motion

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' }); // Reset form
  };

  return (
    <div className='bg-blue-100'>
    <motion.div
      className="bg-blue-100 min-h-screen p-6"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* Contact Information */}
        <motion.div
          className="flex flex-col gap-6"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold font-[Chivo] text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text mb-4">
            Contact Arbaz WebCraft
          </h1>
          <p className="text-lg text-gray-700 font-[Chivo]">
            Got a project in mind? Let’s talk about your ideas and bring them to life! Reach out via the form or use the details below.
          </p>
          <div className="flex flex-col gap-4 mt-4 text-gray-800">
            <div className="flex items-center gap-3">
              <MdLocationOn className="text-blue-600 text-2xl" />
              <span className="font-[Chivo]">Lahore, Pakistan</span>
            </div>
            <div className="flex items-center gap-3">
              <MdEmail className="text-blue-600 text-2xl" />
              <a href="mailto:muhammad.arbazhere@gmail.com" className="hover:underline">muhammad.arbazhere@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <MdPhone className="text-blue-600 text-2xl" />
              <a href="tel:+923104163789" className="hover:underline">+92 310 4163789</a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, type: "spring", bounce: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-[Comfortaa]">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
          {submitted && (
            <motion.p
              className="text-green-600 mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              ✅ Your message has been sent successfully!
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
    </div>
  );
};

export default Contact;
