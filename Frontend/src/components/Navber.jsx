import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaCartShopping } from "react-icons/fa6";
import { GiSoccerBall } from "react-icons/gi";

const Navber = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Cart Count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // Menu Items
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-screen h-20 bg-black/80 backdrop-blur-md text-white fixed top-0 left-0 z-50 border-b border-gray-800 ">

      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <GiSoccerBall className="text-4xl text-yellow-400 rotate-12" />

          <h1 className="text-2xl md:text-3xl font-black tracking-wide">
            FAMOUS
            <span className="text-yellow-400"> SPORTS</span>
          </h1>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 font-semibold">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`relative cursor-pointer transition-all duration-300 hover:text-yellow-400 ${
                location.pathname === item.path
                  ? "text-yellow-400"
                  : "text-white"
              }`}
            >
              {item.name}

              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 w-full h-[2px] bg-yellow-400 rounded-full"
                />
              )}
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400 transition-all duration-300">
              <FaCartShopping className="text-xl text-yellow-400 group-hover:text-black" />
            </div>

            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </div>
        </div>

        {/* Mobile Section */}
        <div className="flex md:hidden items-center gap-4">

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <FaCartShopping className="text-2xl text-yellow-400" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>



          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-yellow-400"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-0 w-72 h-screen bg-[#111111] border-l border-gray-800 p-8 flex flex-col gap-8 md:hidden"
          >
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`text-left text-xl font-semibold transition-all duration-300 hover:text-yellow-400 ${
                  location.pathname === item.path
                    ? "text-yellow-400"
                    : "text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navber;

