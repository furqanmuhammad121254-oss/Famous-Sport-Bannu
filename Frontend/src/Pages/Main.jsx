

import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import Navber from "../components/Navber";
import player from "../assets/player.png";
import background from "../assets/Background.png"

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
      <div className='w-full min-h-screen bg-neutral-950 text-white overflow-hidden relative selection:bg-yellow-400 selection:text-black'>
        {/* Background Pattern / Texture */}
        <img
          src={background}
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity pointer-events-none"
          alt=""
        />

        {/* Ambient Color Glows for Depth */}
        <div className="absolute top-1/4 left-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-yellow-500/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-yellow-600/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

        <Navber />

        {/* Main Layout Container */}
        <main className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 min-h-[calc(100vh-80px)] flex flex-col-reverse lg:flex-row items-center justify-between py-8 sm:py-12 lg:py-0 gap-6 sm:gap-0 mt-16 sm:mt-10'>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className='z-10 flex-1 text-center lg:text-left px-2 sm:px-0'
          >
            {/* Small Badge */}
            <span className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 mb-4 sm:mb-6">
              ⚡ Premium Gear Available
            </span>

            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.2] sm:leading-[1.1] text-neutral-50'>
              Welcome to <br />
              Famous <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 drop-shadow-sm'>Sports Bannu</span>
            </h1>

            <p className='mt-4 sm:mt-6 text-neutral-400 max-w-md mx-auto lg:mx-0 text-sm sm:text-base md:text-lg leading-relaxed font-normal px-2 sm:px-0'>
              Equipping athletes with premium-grade sports gear. Engineered for performance, built for champions.
            </p>

            {/* CTA Buttons */}
            <div className='mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0'>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/Shop")}
                className='px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl text-neutral-950 font-bold shadow-xl shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all duration-300 text-sm sm:text-base'
              >
                Shop Now
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  backgroundColor: "rgba(255, 255, 255, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/contact")}
                className='px-6 sm:px-8 py-3 sm:py-4 border border-neutral-700 hover:border-neutral-400 rounded-xl font-semibold text-neutral-300 hover:text-white transition-all duration-300 text-sm sm:text-base'
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex justify-center relative w-full mt-4 sm:mt-0"
          >
            {/* Subtle background glow directly behind the player image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] sm:w-[70%] h-[60%] sm:h-[70%] bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <img
              src={player}
              alt="Featured Athlete"
              className='w-[200px] sm:w-[260px] md:w-[320px] lg:w-[420px] xl:w-[540px] object-contain z-10 drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] filter contrast-[1.05]'
            />
          </motion.div>

        </main>
      </div>



      {/* CATEGORY SECTION */}

      <div className='w-full bg-neutral-950 py-16 sm:py-24 px-4 sm:px-6 relative selection:bg-yellow-400 selection:text-black'>
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-yellow-500/5 rounded-full blur-[120px] sm:blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Section Heading Header Block */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] sm:text-xs font-bold tracking-widest text-yellow-400 uppercase bg-yellow-400/10 px-3 sm:px-4 py-1.5 rounded-full border border-yellow-400/20"
            >
              Explore Gear
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mt-3 sm:mt-4 px-2'
            >
              Shop by <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500'>Category</span>
            </motion.h3>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto scroll-smooth pb-6 sm:pb-10 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="flex gap-4 sm:gap-6 md:gap-8 w-max px-2 sm:px-4"
            >
              {categoryList.length > 0 ? (
                categoryList.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                    }}
                    whileHover={{ y: -8 }}
                    className="group bg-neutral-900/40 backdrop-blur-md w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] p-3 sm:p-4 md:p-5 rounded-2xl border border-neutral-800/80 hover:border-yellow-400/40 transition-all duration-300 shadow-2xl flex flex-col justify-between snap-start"
                  >
                    <div>
                      {/* Image Container */}
                      <div className="overflow-hidden rounded-xl mb-4 sm:mb-5 relative bg-neutral-950 aspect-[16/11]">
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent z-10 transition-opacity group-hover:opacity-40" />

                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover filter contrast-[1.02] brightness-[0.95]"
                        />
                      </div>

                      {/* Info Metadata */}
                      <div className="px-1 sm:px-2">
                        <h2 className="text-xl sm:text-2xl font-black text-neutral-100 group-hover:text-yellow-400 transition-colors duration-200 uppercase tracking-tight">
                          {item.name}
                        </h2>

                        <p className="text-neutral-400 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 min-h-[40px] sm:min-h-[48px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="px-1 sm:px-2 mt-4 sm:mt-6">
                      <motion.button
                        onClick={() => navigate("/shop")}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 sm:py-4 bg-neutral-800 text-neutral-200 font-bold text-xs sm:text-sm md:text-base rounded-xl group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-amber-500 group-hover:text-neutral-950 transition-all duration-300 shadow-lg"
                      >
                        View Products
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="w-full text-center py-20">
                  <p className="text-neutral-500 font-medium text-base sm:text-lg">No categories found</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>


      {/* Describe */}

      <div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full min-h-[450px] sm:min-h-[500px] bg-black flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-16 py-10 sm:py-12 gap-8 sm:gap-10 overflow-hidden"
        >

          {/* LEFT SIDE: IMAGE WITH REVEAL */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center order-2 md:order-1 mt-6 md:mt-0"
          >
            <div className="relative group w-full max-w-md sm:max-w-lg">
              {/* Animated Glow Backdrop */}
              <div className="absolute -inset-1 bg-yellow-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

              <img
                src={bg}
                alt="sports equipment"
                className="relative w-full rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
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
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
            className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2 px-2"
          >
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight"
            >
              Famous Sports <br />
              <span className="text-yellow-400">Bannu</span>
            </motion.h1>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-gray-400 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-md mx-auto md:mx-0 px-4 sm:px-0"
            >
              Our range includes uniforms for team and individual sports, offering flexibility in sizing, fit, and color schemes. We cater to both small and large orders.
            </motion.h1>


            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start px-4 sm:px-0"
            >
              <motion.button
                onClick={() => navigate("/shop")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors shadow-lg shadow-yellow-400/20 text-sm sm:text-base"
              >
                Shop Now
              </motion.button>

              <motion.button
                onClick={() => navigate("/contact")}
                whileHover={{ scale: 1.05, backgroundColor: "white", color: "black" }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-all text-sm sm:text-base"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      {/* Contact */}

      <footer className="bg-[#1a1a1a] text-white py-10 sm:py-12 px-4 sm:px-6 md:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

        {/* COLUMN 1: BRAND INFO */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-white h-8 w-8 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-base sm:text-xl">S</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tighter">FAMOUS SPORTS</h2>
          </div>
          <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
            Famous Sports is a sports brand specializing in premium sportswear and equipment. 
            We deal in top-quality sports gear at the best rates in Pakistan.
          </p>
          <div className="flex gap-4 text-lg sm:text-xl">
            <a 
              href="https://www.facebook.com/p/Famous-sports-bannu-100064238853027/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* COLUMN 2: QUICK LINKS */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-4 sm:mb-6 tracking-widest text-white">Quick Links</h3>
          <ul className="space-y-3 text-gray-400 text-xs sm:text-sm">
            <li><a href="#" className="hover:text-yellow-400 hover:underline cursor-pointer transition-all">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400 hover:underline cursor-pointer transition-all">Shop Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 hover:underline cursor-pointer transition-all">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 hover:underline cursor-pointer transition-all">Contact</a></li>
          </ul>
        </div>

        {/* COLUMN 3: POPULAR CATEGORIES */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-4 sm:mb-6 tracking-widest text-white">Our Products</h3>
          <ul className="space-y-3 text-gray-400 text-xs sm:text-sm">
            <li><a href="#" className="hover:text-yellow-400 hover:underline cursor-pointer transition-all">Sportswear</a></li>
            <li><a href="#" className="hover:text-yellow-400 hover:underline cursor-pointer transition-all">Cricket Gear</a></li>
            <li><a href="#" className="hover:text-yellow-400 hover:underline cursor-pointer transition-all">Football Equipment</a></li>
            <li><a href="#" className="hover:text-yellow-400 hover:underline cursor-pointer transition-all">Fitness Accessories</a></li>
          </ul>
        </div>

        {/* COLUMN 4: STORE INFO */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase mb-4 sm:mb-6 tracking-widest text-white">Store Information</h3>

          <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-400">
            <FaMapMarkerAlt className="mt-1 text-yellow-400 flex-shrink-0" />
            <p className="leading-relaxed"><span className="font-semibold text-white">Address:</span> Parati Road, Bannu</p>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-400">
            <FaWhatsapp className="text-emerald-400 flex-shrink-0 text-base" />
            <p><span className="font-semibold text-white">WhatsApp:</span> +92 336 5397225</p>
          </div>

          <div className="pt-1">
            <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">For International Queries:</p>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-400">
              <FaPhoneAlt className="text-yellow-400 flex-shrink-0" />
              <p>+92 336 5397225</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-400 break-all">
            <FaEnvelope className="text-yellow-400 flex-shrink-0" />
            <p>contact@famoussports.pk</p>
          </div>
        </div>

      </div>

      {/* WHATSAPP FLOATING BUTTON */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <a
          href="https://wa.link/c0zu4c"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp className="text-white text-2xl sm:text-3xl md:text-4xl" />
        </a>
      </div>

      {/* COPYRIGHT SECTION */}
      <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-[10px] sm:text-xs">
          © {new Date().getFullYear()} Famous Sports Bannu. All rights reserved.
        </p>
      </div>
    </footer>
    </div>
  );
};

export default Main;

