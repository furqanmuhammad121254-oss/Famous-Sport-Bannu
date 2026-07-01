import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaCartShopping } from "react-icons/fa6";
import { GiSoccerBall } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    const syncUser = () => setUser(JSON.parse(localStorage.getItem("user")));
    window.addEventListener("storage", syncUser);
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const CartIcon = () => (
    <div
      onClick={() => { navigate("/cart"); setIsOpen(false); }}
      className="relative cursor-pointer"
    >
      <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
        <FaCartShopping className="text-yellow-400" />
      </div>
      {cartCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center"
        >
          {cartCount}
        </motion.span>
      )}
    </div>
  );

  return (
    <nav className="w-full h-20 bg-black/80 text-white fixed top-0 left-0 border-b border-gray-900 z-[100]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
        {/* LOGO */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
          <GiSoccerBall className="text-3xl text-yellow-400" />
          <h1 className="text-xl font-bold">Famous <span className="text-yellow-400">Sports</span></h1>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-sm">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer ${location.pathname === item.path ? "text-yellow-400" : "text-gray-300"}`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          <CartIcon />
          {user ? (
             <button onClick={() => navigate("/login")} className="bg-yellow-400 text-black px-7 py-2 rounded font-semibold">
              Login
            </button>
          ) : (
           <div></div>
          )}
        </div>

        

        {/* MOBILE TOGGLE */}
        <div className="flex md:hidden items-center gap-3">
          <CartIcon />
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-20 right-0 w-72 h-[calc(100vh-5rem)] bg-black p-5 md:hidden"
          >
            {menuItems.map((item) => (
              <div key={item.name} onClick={() => { navigate(item.path); setIsOpen(false); }} className="py-3 text-gray-300 border-b border-neutral-800">
                {item.name}
              </div>
            ))}
            <div className="mt-6">
              {user ? (
                <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded">Logout ({user.name})</button>
              ) : (
                <button onClick={() => { navigate("/login"); setIsOpen(false); }} className="w-full bg-yellow-400 text-black py-2 rounded font-semibold">Login</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;