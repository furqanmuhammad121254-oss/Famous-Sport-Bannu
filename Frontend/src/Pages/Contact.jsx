
import React, { useState } from "react";
import axios from "axios";
import Navber from "../components/Navber";
import { FaFacebook, FaWhatsapp, FaTiktok, } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 1. Standard Database Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/contact/create",
        formData
      );

      alert(res.data.message);

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.response?.data?.message || "Failed to send message");
    }
  };

  // 2. WhatsApp Direct Redirect Submission
  const handleWhatsAppSend = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields before sending via WhatsApp.");
      return;
    }

    // Replace this with your exact shop phone number (include country code without + or zeros)
    const phoneNumber = "+923297229929";

    // Formatting the text layout cleanly for your WhatsApp chat view
    const formattedMessage = `*New Contact Message - Famous Sports Bannu*%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Email:* ${encodeURIComponent(formData.email)}%0A` +
      `*Message:* ${encodeURIComponent(formData.message)}`;

    // Generate link and open in a separate tab
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <Navber />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 pt-10">Contact Us</h1>
        <p className="text-gray-400">
          Get in touch with Famous Sports Bannu
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info Card */}
        <div className="bg-[#242424] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">
            Famous Sports Bannu Shop
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>📍 <span className="font-semibold">Address:</span> Parati Road Bannu</p>
            <p>📞 <span className="font-semibold">Phone:</span> +92 336 5397225 </p>
            {/* <p>✉️ <span className="font-semibold">Email:</span> famoussports@gmail.com</p> */}
            <p>⏰ <span className="font-semibold">Timing:</span> 9:00 AM – 5:00 PM</p>
          </div>

          <div className="flex gap-4 text-3xl text-gray-600 mt-6">

           <a
  href="https://www.facebook.com/profile.php?id=100064238853027&sk=followers"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 text-2xl hover:scale-110 transition"
>
  <FaFacebook />
</a>

            <a
              href="https://wa.me/03365397225"
              target="_blank"
              className="text-green-500 transition"
            >
              <FaWhatsapp />
            </a>



           <a
  href="https://www.tiktok.com/@amirkhan19338?is_from_webapp=1&sender_device=pc"
  target="_blank"
  rel="noopener noreferrer"
  className="text-black text-2xl hover:scale-110 transition"
>
  <FaTiktok />
</a>



          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#242424] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full mb-4 p-3 rounded-lg bg-[#181818] border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full mb-4 p-3 rounded-lg bg-[#181818] border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full mb-4 p-3 h-28 rounded-lg bg-[#181818] border border-gray-700 text-white focus:outline-none focus:border-yellow-400 resize-none"
            ></textarea>

            {/* Actions Buttons Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Send to Database
              </button>

              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
              >
                💬 Send via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center mt-16 bg-[#181818] text-gray-400 py-4">
        © {new Date().getFullYear()} Famous Sports
      </div>
    </div>
  );
};

export default Contact;