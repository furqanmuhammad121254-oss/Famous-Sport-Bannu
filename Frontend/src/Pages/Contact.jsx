import React from "react";
import Navber from "../components/Navber";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      
      <Navber />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 pt-10">Contact Us</h1>
        <p className="text-gray-400">
          Get in touch with Famous Sport Bannu 
        </p>
      </div>

      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      

        <div className="bg-[#242424] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">
            Famous Sports Bannu Shop
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              📍 <span className="font-semibold">Address:</span>{" "}
              Main Road, Bannu, KPK
            </p>
            <p>
              📞 <span className="font-semibold">Phone:</span>{" "}
              +92 300 1234567
            </p>
            <p>
              ✉️ <span className="font-semibold">Email:</span>{" "}
              famoussports@gmail.com
            </p>
            <p>
              ⏰ <span className="font-semibold">Timing:</span>{" "}
              9:00 AM – 5:00 PM
            </p>
            
          </div>
        </div>

       
        <form className="bg-[#242424] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">
            Send Us a Message
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-4 p-3 rounded-lg bg-[#181818] border border-gray-50 text-white focus:outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-4 p-3 rounded-lg bg-[#181818] border border-gray-50 text-white focus:outline-none focus:border-blue-500"
          />

          <textarea
            placeholder="Your Message"
            className="w-full mb-4 p-3 h-28 rounded-lg bg-[#181818] border border-gray-50 text-white focus:outline-none focus:border-blue-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      
      <div className="text-center mt-16 bg-[#181818]  text-gray-400">
        © {new Date().getFullYear()} Famous Sports
      </div>
    </div>
  );
};

export default Contact;
