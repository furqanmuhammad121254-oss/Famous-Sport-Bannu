// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { HiMenuAlt3, HiX } from "react-icons/hi";
// import { FaCartShopping } from "react-icons/fa6";

// const Navber = () => {
//   const navigate = useNavigate();
//   const [cartCount, setCartCount] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   // Function to sync cart count from localStorage
//   const updateCartCount = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartCount(cart.length);
//   };

//   useEffect(() => {
//     loadUserData();
//     updateCartCount();

//     // Listen for changes in localStorage from other tabs
//     window.addEventListener("storage", () => {
//       loadUserData();
//       updateCartCount();
//     });

//     // Listen for custom "cartUpdated" event from within the same tab
//     window.addEventListener("cartUpdated", updateCartCount);

//     return () => {
//       window.removeEventListener("storage", loadUserData);
//       window.removeEventListener("cartUpdated", updateCartCount);
//     };
//   }, []);

//   const loadUserData = () => {
//     try {
//       const userData = localStorage.getItem("user");
//       const token = localStorage.getItem("token");
//       if (userData && token) {
//         setUser(JSON.parse(userData));
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error("Error loading user data:", error);
//       setUser(null);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "Shop", path: "/shop" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <nav className="w-full h-16 bg-[#1a1a1a] text-white flex items-center justify-between px-6 md:px-12 fixed top-0 left-0 z-50 shadow-lg">

//       {/* Logo */}
//       <motion.h1
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         onClick={() => navigate("/")}
//         className="text-2xl font-black cursor-pointer tracking-tighter"
//       >
//         FAMOUS<span className="text-yellow-400">SPORTS</span>
//       </motion.h1>

//       {/* Desktop Menu */}
//       <ul className="hidden md:flex items-center gap-8 font-medium">
//         {menuItems.map((item) => (
//           <li
//             key={item.name}
//             onClick={() => navigate(item.path)}
//             className="cursor-pointer hover:text-yellow-400 transition-colors"
//           >
//             {item.name}
//           </li>
//         ))}
//       </ul>

//       {/* Desktop Right Section */}
//       <div className="hidden md:flex items-center gap-6">

//         {/* Cart Icon with Corrected Badge */}
//         <div
//           className="relative cursor-pointer group"
//           onClick={() => navigate("/cart")}
//         >
//           <FaCartShopping className="text-2xl group-hover:text-yellow-400 transition-all duration-300" />

//           {cartCount > 0 && (
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1a1a1a]"
//             >
//               {cartCount}
//             </motion.span>
//           )}
//         </div>

//         {user ? (
//           <div className="flex items-center gap-4 border-l border-gray-700 pl-4">
//             <span className="text-yellow-400 font-semibold text-sm">
//               {user.name}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate("/login")}
//             className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/10"
//           >
//             Login
//           </motion.button>
//         )}
//       </div>

//       {/* Mobile Toggle */}
        
//         <div
//           className="relative cursor-pointer group"
//           onClick={() => navigate("/cart")}
//         >

//           {/* Cart Icon with Corrected Badge */}
//           <FaCartShopping className="text-2xl group-hover:text-yellow-400 transition-all duration-300 ml-16" />

//           {cartCount > 0 && (
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1a1a1a]"
//             >
//               {cartCount}
//             </motion.span>
//           )}
//         </div>


//        <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-3xl text-yellow-400"
//         >
//           {isOpen ? <HiX /> : <HiMenuAlt3 />}
//         </button>
      
      

//       {/* Mobile Sidebar */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-16 right-0 w-64 h-screen bg-[#1a1a1a] shadow-lg flex flex-col p-6 gap-6 md:hidden"
//           >
            
//             <button
//               onClick={() => {
//                 navigate("/");
//                 setIsOpen(false);
//               }}
//               className="text-left text-lg hover:text-yellow-400"
//             >
//               Home
//             </button>

//             <button
//               onClick={() => {
//                 navigate("/shop");
//                 setIsOpen(false);
//               }}
//               className="text-left text-lg hover:text-yellow-400"
//             >
//               Shop
//             </button>

//             <button
//               onClick={() => {
//                 navigate("/about");
//                 setIsOpen(false);
//               }}
//               className="text-left text-lg hover:text-yellow-400"
//             >
//               About
//             </button>

//             <button
//               onClick={() => {
//                 navigate("/contact");
//                 setIsOpen(false);
//               }}
//               className="text-left text-lg hover:text-yellow-400"
//             >
//               Contact
//             </button>
            
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//     </nav>
//   );
// };

// export default Navber;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaCartShopping } from "react-icons/fa6";

const Navber = () => {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Update cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  // Load user
  const loadUserData = () => {
    try {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (userData && token) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserData();
    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    navigate("/login");
  };

  // Menu Items
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full h-16 bg-[#1a1a1a] text-white flex items-center justify-between px-6 md:px-12 fixed top-0 left-0 z-50 shadow-lg">

      {/* Logo */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="text-2xl font-black cursor-pointer tracking-tighter"
      >
        FAMOUS<span className="text-yellow-400">SPORTS</span>
      </motion.h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.path)}
            className="cursor-pointer hover:text-yellow-400 transition-colors"
          >
            {item.name}
          </li>
        ))}
      </ul>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-6">

        {/* Cart */}
        <div
          className="relative cursor-pointer group"
          onClick={() => navigate("/cart")}
        >
          <FaCartShopping className="text-2xl group-hover:text-yellow-400 transition-all duration-300" />

          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1a1a1a]"
            >
              {cartCount}
            </motion.span>
          )}
        </div>

        {/* User/Login */}
        {user ? (
          <div className="flex items-center gap-4 border-l border-gray-700 pl-4">
            <span className="text-yellow-400 font-semibold text-sm">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/10"
          >
            Login
          </motion.button>
        )}
      </div>

      {/* Mobile Right Section */}
      <div className="flex items-center gap-4 md:hidden">

        {/* Cart */}
        <div
          className="relative cursor-pointer group"
          onClick={() => navigate("/cart")}
        >
          <FaCartShopping className="text-2xl group-hover:text-yellow-400 transition-all duration-300" />

          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1a1a1a]"
            >
              {cartCount}
            </motion.span>
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

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 right-0 w-64 h-screen bg-[#1a1a1a] shadow-lg flex flex-col p-6 gap-6 md:hidden"
          >

            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className="text-left text-lg hover:text-yellow-400 transition"
              >
                {item.name}
              </button>
            ))}

            {/* Mobile User/Login */}
            <div className="border-t border-gray-700 pt-4 mt-4">

              {user ? (
                <div className="flex flex-col gap-3">

                  <span className="text-yellow-400 font-semibold">
                    {user.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="bg-yellow-400 text-black py-2 rounded-lg font-bold"
                >
                  Login
                </button>
              )}

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navber;