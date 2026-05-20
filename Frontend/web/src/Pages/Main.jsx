import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import Navber from "../components/Navber";
import player from "../assets/player.png";
import bg from "../assets/bg1.jpg";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Main = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);

  // FETCH CATEGORIES
  const getCategories = async () => {
    try {
      const res = await api.get("/AllCategories");

      const data = res.data?.categories || res.data;

      if (Array.isArray(data)) {
        setCategoryList(data);
      } else {
        setCategoryList([]);
      }

    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryList([]);
    }
  };

  // RUN ON PAGE LOAD
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>

      {/* HERO SECTION */}
      {/* <div className='w-full h-[600px] bg-black text-white overflow-hidden'>
        <Navber />
        <main className='relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center'>


          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='z-10 flex-1 text-center lg:text-left'
          >
            <h1 className='text-6xl md:text-7xl font-black pb-5 leading-tight'>
              Welcome to <br /> Famous <span className='text-yellow-400'>Sports</span>
            </h1>

            <h1 className='mt-0 text-gray-400 max-w-md text-lg'>
              Premium sports gear for every athlete.
            </h1>

            <div className='mt-10 flex gap-4 mb-20 lg:mb-50 justify-center lg:justify-start'>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/Shop")}
                className='px-10 py-4 bg-yellow-400 rounded-2xl text-black font-bold shadow-lg shadow-yellow-400/20'
              >
                Shop Now
              </motion.button>


              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className='px-10 py-4 border border-white rounded-2xl font-bold transition-colors'
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }} // Start from right and slightly smaller
            animate={{ opacity: 1, x: 0, scale: 1 }}    // Slide in and grow to full size
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <img
              src={player}
              alt="Player"
              className='mb-10 w-full max-w-xl object-contain'
            />
          </motion.div>

        </main>
      </div> */}


      <div className='w-full min-h-screen bg-black text-white overflow-hidden'>
        <Navber />

        <main className='relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-between pt-10 lg:pt-0'>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='z-10 flex-1 text-center lg:text-left mb-10 lg:mt-0'
          >
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight'>
              Welcome to <br />
              Famous <span className='text-yellow-400'>Sports</span>
            </h1>

            <p className='mt-5 text-gray-400 max-w-md mx-auto lg:mx-0 text-base md:text-lg'>
              Premium sports gear for every athlete.
            </p>

            <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/Shop")}
                className='px-8 py-4 bg-yellow-400 rounded-2xl text-black font-bold shadow-lg shadow-yellow-400/20'
              >
                Shop Now
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className='px-8 py-4 border border-white rounded-2xl font-bold transition-colors'
              >
                Contact Us
              </motion.button>

            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex-1 flex justify-center mt-0 lg:mb-0"
          >
            <img
              src={player}
              alt="Player"
              className='w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] object-contain'
            />
          </motion.div>

        </main>
      </div>



      {/* CATEGORY SECTION */}

      <div className='w-full min-h-[500px] bg-[#0e0e0e] py-12 px-6'>

        {/* Section Heading */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-white text-3xl text-center font-black border-b-2 border-yellow-400/20 rounded-2xl pb-3 mx-auto w-fit px-10'
        >
          Catego<span className='text-yellow-400'>ries</span>
        </motion.h3>

        {/* Horizontal Scroll Container */}
        <div className="mt-10 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="flex gap-6 w-max px-4"
          >
            {categoryList.length > 0 ? (
              categoryList.map((item) => (
                <motion.div
                  key={item._id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 30 },
                    show: { opacity: 1, scale: 1, y: 0 }
                  }}
                  whileHover={{ y: -10 }}
                  className="bg-[#1e1e1e] w-[320px] p-5 rounded-xl border border-transparent hover:border-yellow-400/50 transition-colors duration-300 shadow-xl flex flex-col justify-between snap-start"
                >
                  <div>
                    {/* Image Container */}
                    <div className="overflow-hidden rounded-lg mb-4">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={item.image}
                        alt={item.name}
                        className="w-full h-56 object-cover"
                      />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-yellow-400">
                      {item.name}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 mt-2 text-sm line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={() => navigate("/shop")}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors shadow-md shadow-yellow-400/10"
                  >
                    View Products
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center py-10">
                <p className="text-gray-500">No categories found</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>



      {/* Describe */}

      <div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the section is visible
          className="w-full min-h-[500px] bg-black flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-10 overflow-hidden"
        >

          {/* LEFT SIDE: IMAGE WITH REVEAL */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center order-2 md:order-1"
          >
            <div className="relative group">
              {/* Animated Glow Backdrop */}
              <div className="absolute -inset-1 bg-yellow-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

              <img
                src={bg}
                alt="sports equipment"
                className="relative w-full max-w-lg rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>


          {/* RIGHT SIDE: TEXT WITH STAGGERED REVEAL */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  staggerChildren: 0.2, // Animate h1, then h1, then buttons
                  delayChildren: 0.3
                }
              }
            }}
            className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2"
          >
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-white text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Famous Sports <br />
              <span className="text-yellow-400">Bannu</span>
            </motion.h1>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-gray-400 text-lg md:text-xl mb-8 max-w-md mx-auto md:mx-0"
            >
              Premium quality sports equipment for champions. Gear up with the best at prices that fit your budget.
            </motion.h1>


            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-yellow-400/20"
              >
                Shop Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "white", color: "black" }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white font-bold py-3 px-8 rounded-lg transition-all"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      {/* Contact */}

      <footer className="bg-[#1a1a1a] text-white py-12 px-6 md:px-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">


          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-white h1-1 rounded">
                <span className="text-black font-bold text-xl">S</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tighter">FAMOUS SPORTS</h2>
            </div>
            <h1 className="text-gray-400 leading-relaxed text-sm">
              Famous Sports is a Sports brand that specializes in providing premium
              sportswear and equipment. We deal in all quality sports gear at the best
              available rates in Pakistan.
            </h1>
            <div className="flex gap-4 text-xl">
              <FaFacebookF className="hover:text-yellow-400 cursor-pointer transition-colors" />
              <FaInstagram className="hover:text-yellow-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-6 tracking-widest">About Famous Sports</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Home</li>
              <li className="hover:text-white cursor-pointer transition-colors">Shop Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">About us us</li>
              <li className="hover:text-white cursor-pointer transition-colors"> Contact</li>
            </ul>
          </div>

          {/* COLUMN 3: GUIDES */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-6 tracking-widest">Why We Choose</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Find your perfect Kitbag guide</li>
              <li className="hover:text-white cursor-pointer transition-colors">A guide for Your English Willow Bat</li>
              <li className="hover:text-white cursor-pointer transition-colors">Shipping & Handling</li>
              <li className="hover:text-white cursor-pointer transition-colors">Returns & Exchange</li>
              <li className="hover:text-white cursor-pointer transition-colors">Order Your Customized Kits</li>
            </ul>
          </div>

          {/* COLUMN 4: STORE INFO */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase mb-6 tracking-widest">Store Information</h3>

            <div className="flex items-start gap-3 text-sm text-gray-400">
              <FaMapMarkerAlt className="mt-1 text-white" />
              <h1>Main Bazar Bannu, near Chowk Market, <br />Khyber Pakhtunkhwa - Pakistan</h1>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FaWhatsapp className="text-white" />
              <h1>+92 300 1234567</h1>
            </div>

            <div className="space-y-1">
              <h1 className="text-xs text-gray-500 font-bold">For International Queries:</h1>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <FaPhoneAlt className="text-white" />
                <h1>+971 50 1234567</h1>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FaEnvelope className="text-white" />
              <h1>contact@famoussports.pk</h1>
            </div>

            {/* PAYMENT ICONS */}
            {/* <div className="pt-4 flex items-center gap-4 grayscale opacity-70 hover:grayscale-0 transition-all">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Easapice" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            </div> */}
          </div>

        </div>

        {/* WHATSAPP FLOATING BUTTON */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] h1-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <FaWhatsapp className="text-white text-3xl" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Main;





