// // import React, { useEffect, useState } from "react";
// // import api from "../services/api";
// // import Navber from "../components/Navber";
// // import { FaEye, FaTimes } from "react-icons/fa"; 

// // const Books = () => {
// //   const [assignList, setAssignList] = useState([]);
// //   const [selectedImg, setSelectedImg] = useState(null); // State for the popup

// //   const bookData = async () => {
// //     try {
// //       const res = await api.get("/AllAssign");
// //       const data = res.data.assignList || res.data.data || res.data || [];
// //       setAssignList([...data]);
// //     } catch (error) {
// //       console.error("Fetch error:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     bookData();
// //   }, []);

// //   return (
// //     <div className="w-full min-h-screen bg-black text-white">
// //       <Navber />


// //       {selectedImg && (
// //         <div 
// //           className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 transition-all duration-300"
// //           onClick={() => setSelectedImg(null)} 
// //         >
// //           <button 
// //             className="absolute top-8 right-8 text-white text-3xl hover:text-yellow-400 transition-colors"
// //             onClick={() => setSelectedImg(null)}
// //           >
// //             <FaTimes />
// //           </button>

// //           <img 
// //             src={selectedImg} 
// //             alt="Full Preview"
// //             className="max-w-full max-h-[85vh] rounded-lg shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-gray-800"
// //             onClick={(e) => e.stopPropagation()}
// //           />
// //         </div>
// //       )}

// //       <div className="min-h-screen bg-[#0a0a0a] p-8">
// //         <div className="max-w-7xl mx-auto mt-10">
// //           <header className="mb-10 border-l-4 border-blue-500 pl-6">
// //             <h1 className="text-5xl font-black tracking-tight text-white uppercase">
// //               Famous <span className="text-blue-500">Sports</span>
// //             </h1>
// //             <p className="text-gray-500 mt-2 font-medium italic">Bannu Premium Collection</p>
// //           </header>

// //           {assignList.length > 0 ? (
// //             <div className="flex flex-wrap gap-6 justify-center md:justify-start">
// //               {assignList.map((item) => (
// //                 <div
// //                   key={item._id}
// //                   className="w-72 ml-2 bg-[#161616] p-4 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300"
// //                 >
// //                   {/* --- IMAGE CONTAINER WITH HOVER --- */}
// //                   <div className="relative group overflow-hidden rounded-xl mb-4">
// //                     <img
// //                       src={item.image}
// //                       alt={item.name}
// //                       className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
// //                     />

// //                     {/* Centered Hover Overlay */}
// //                     <div 
// //                       onClick={() => setSelectedImg(item.image)}
// //                       className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
// //                     >
// //                       <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
// //                         <FaEye size={24} />
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <h2 className="text-lg font-bold text-white truncate px-1">
// //                     {item.name}
// //                   </h2>

// //                   <p className="text-gray-400 text-xs mt-2 h-8 line-clamp-2 px-1">
// //                     {item.desc}
// //                   </p>

// //                   {/* Price and Order Button */}
// //                   <div className="flex justify-between items-center mt-5 px-1">
// //                     <span className="text-blue-400 font-black text-xl">
// //                       price: {item.price}
// //                     </span>
// //                     <button className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-black px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-md">
// //                       Add
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center py-20 text-gray-500">
// //               No equipment found. Check back later!
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Books;



// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import Navber from "../components/Navber";
// import { FaEye, FaTimes, FaShoppingCart } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const Books = () => {
//   const [assignList, setAssignList] = useState([]);
//   const [selectedImg, setSelectedImg] = useState(null);

//   const bookData = async () => {
//     try {
//       const res = await api.get("/AllAssign");
//       const data = res.data.assignList || res.data.data || res.data || [];
//       setAssignList([...data]);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     bookData();
//   }, []);

//   return (
//     <div className="w-full min-h-screen bg-black text-white">
//       <Navber />

//       {/* --- IMAGE POPUP MODAL --- */}
//       <AnimatePresence>
//         {selectedImg && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
//             onClick={() => setSelectedImg(null)}
//           >
//             <button className="absolute top-8 right-8 text-white text-3xl hover:text-yellow-500 transition-colors">
//               <FaTimes />
//             </button>

//             <motion.img
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               src={selectedImg}
//               alt="Full Preview"
//               className="max-w-full max-h-[85vh] rounded-lg shadow-2xl border border-gray-800"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="min-h-screen bg-[#0a0a0a] p-8 pt-24">
//         <div className="max-w-7xl mx-auto">
//           {/* Section Header */}
//           <motion.header 
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="mb-12 border-l-4 border-yellow-500 pl-6"
//           >
//             <h1 className="text-5xl font-black tracking-tight text-white uppercase">
//               Famous <span className="text-yellow-400">Sports</span>
//             </h1>
//             <p className="text-gray-500 mt-2 font-medium italic">Bannu Premium Collection</p>
//           </motion.header>

//           {assignList.length > 0 ? (
//             <motion.div 
//               initial="hidden"
//               animate="show"
//               variants={{
//                 hidden: { opacity: 0 },
//                 show: {
//                   opacity: 1,
//                   transition: { staggerChildren: 0.1 }
//                 }
//               }}
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
//             >
//               {assignList.map((item) => (
//                 <motion.div
//                   key={item._id}
//                   variants={{
//                     hidden: { opacity: 0, y: 20 },
//                     show: { opacity: 1, y: 0 }
//                   }}
//                   whileHover={{ y: -5 }}
//                   className="bg-[#161616] p-4 rounded-2xl border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 shadow-lg group"
//                 >
//                   {/* Image Container */}
//                   <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/4]">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-70 h-70 object-cover transition-transform duration-700 group-hover:scale-110 mb-"
//                     />

//                     {/* Hover Overlay */}
//                     <div 
//                       onClick={() => setSelectedImg(item.image)}
//                       className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
//                     >
//                       <motion.div 
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         className="bg-yellow-400 text-white p-4 rounded-full shadow-xl"
//                       >
//                         <FaEye size={20} />
//                       </motion.div>
//                     </div>
//                   </div>

//                   {/* Text Content */}
//                   <h2 className="text-lg font-bold text-white truncate">
//                     {item.name}
//                   </h2>

//                   <p className="text-gray-500 text-sm mt-1 h-10 line-clamp-2">
//                     {item.desc}
//                   </p>

//                   {/* Price and Action */}
//                   <div className="flex justify-between items-center mt-6">
//                     <div className="flex flex-col">
//                       <span className="text-xs text-gray-600 uppercase font-bold tracking-wider">Price</span>
//                       <span className="text-yellow-400 font-black text-xl">
//                         Rs. {item.price}
//                       </span>
//                     </div>

//                     <motion.button 
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-xl font-bold transition-all shadow-lg shadow-yellow-400/10"
//                     >
//                       <FaShoppingCart size={18} />
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             <div className="text-center py-20 text-gray-600 border-2 border-dashed border-gray-900 rounded-3xl">
//               No equipment found. Check back later!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Books;


// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import Navber from "../components/Navber";
// import { FaEye, FaTimes, FaShoppingCart, FaSearch } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import Cart from "./Cart";

// const Books = () => {
//   const [assignList, setAssignList] = useState([]);
//   const [selectedImg, setSelectedImg] = useState(null);
//   const [search, setSearch] = useState(""); //  search state

//   const bookData = async () => {
//     try {
//       const res = await api.get("/AllAssign");
//       const data = res.data.assignList || res.data.data || res.data || [];
//       setAssignList([...data]);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     bookData();
//   }, []);

//   //  filtered data
//   const filteredList = assignList.filter((item) =>
//     item.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="w-full min-h-screen bg-black text-white">
//       <Navber />

//       {/* IMAGE POPUP */}
//       <AnimatePresence>
//         {selectedImg && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
//             onClick={() => setSelectedImg(null)}
//           >
//             <button className="absolute top-8 right-8 text-white text-3xl">
//               <FaTimes />
//             </button>

//             <motion.img
//               src={selectedImg}
//               className="max-w-full max-h-[85vh] rounded-lg"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="min-h-screen bg-[#0a0a0a] p-8 pt-24">
//         <div className="max-w-7xl mx-auto">

//           {/* HEADER */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

//             {/* LEFT SIDE - HEADING */}
//             <motion.header
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="border-l-4 border-yellow-500 pl-6"
//             >
//               <h1 className="text-3xl md:text-5xl font-black uppercase">
//                 Famous <span className="text-yellow-400">Sports</span>
//               </h1>
//               <p className="text-gray-500 mt-1 italic text-sm md:text-base">
//                 Bannu Premium Collection
//               </p>
//             </motion.header>

//             {/* RIGHT SIDE - SEARCH */}
//             <div className="relative w-full md:w-80">
//               <input
//                 type="text"
//                 placeholder="Search sports..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#161616] border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
//               />
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             </div>

//           </div>

//           {/* GRID */}
//           {filteredList.length > 0 ? (
//             <motion.div
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
//             >
//               {filteredList.map((item) => (
//                 <motion.div
//                   key={item._id}
//                   whileHover={{ y: -5 }}
//                   className="bg-[#161616] p-4 rounded-2xl border border-gray-800 hover:border-yellow-400/50 transition"
//                 >
//                   {/* IMAGE */}
//                   <div className="relative overflow-hidden rounded-xl mb-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-60 object-cover"
//                     />

//                     <div
//                       onClick={() => setSelectedImg(item.image)}
//                       className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer"
//                     >
//                       <div className="bg-yellow-400 p-4 rounded-full">
//                         <FaEye />
//                       </div>
//                     </div>
//                   </div>

//                   {/* TEXT */}
//                   <h2 className="text-lg font-bold truncate">
//                     {item.name}
//                   </h2>

//                   <p className="text-gray-500 text-sm mt-1 line-clamp-2">
//                     {item.desc}
//                   </p>

//                   {/* PRICE */}
//                   <div className="flex justify-between items-center mt-4">
//                     <span className="text-yellow-400 font-bold">
//                       Rs. {item.price}
//                     </span>


//                     <FaShoppingCart
//                       onClick={() => {
//                         const cart = JSON.parse(localStorage.getItem("cart")) || [];

//                         const newItem = {
//                           id: item._id,
//                           name: item.name,
//                           price: item.price,
//                           image: item.image,
//                           qty: 1,
//                         };

//                         cart.push(newItem);

//                         localStorage.setItem("cart", JSON.stringify(cart));
//                       }}
//                       className="text-gray-50 size-7 cursor-pointer"
//                     />
//                     <FaShoppingCart
//                       onClick={() => {
//                         // Get existing cart
//                         const cart = JSON.parse(localStorage.getItem("cart")) || [];

//                         // Check if item already exists
//                         const existingItem = cart.find(
//                           (cartItem) => cartItem.id === item._id
//                         );

//                         if (existingItem) {
//                           // Increase quantity
//                           existingItem.qty += 1;
//                         } else {
//                           // Add new item
//                           cart.push({
//                             id: item._id,
//                             name: item.name,
//                             price: item.price,
//                             image: item.image,
//                             qty: 1,
//                           });
//                         }

//                         // Save updated cart
//                         localStorage.setItem("cart", JSON.stringify(cart));

//                         // Update navbar notification instantly
//                         window.dispatchEvent(new Event("cartUpdated"));
//                       }}
//                       className="text-gray-50 size-7 cursor-pointer hover:text-yellow-400 transition"
//                     />
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             <div className="text-center py-20 text-gray-500">
//               ❌ No results found
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Books;



import React, { useEffect, useState } from "react";
import api from "../services/api";
import Navber from "../components/Navber";
import {
  FaEye,
  FaTimes,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Books = () => {
  const [assignList, setAssignList] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [search, setSearch] = useState("");

  const bookData = async () => {
    try {
      const res = await api.get("/AllAssign");
      const data =
        res.data.assignList ||
        res.data.data ||
        res.data ||
        [];

      setAssignList([...data]);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    bookData();
  }, []);

  // SEARCH FILTER
  const filteredList = assignList.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navber />

      {/* IMAGE POPUP */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-5 right-5 sm:top-8 sm:right-8 text-white text-2xl sm:text-3xl">
              <FaTimes />
            </button>

            <motion.img
              src={selectedImg}
              alt="preview"
              className="max-w-full max-h-[85vh] rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className="min-h-screen bg-[#0a0a0a] px-3 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

            {/* TITLE */}
            <motion.header
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="border-l-4 border-yellow-500 pl-4 sm:pl-6"
            >
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase">
                Sports <span className="text-yellow-400">Products</span>
              </h1>

              <p className="text-gray-500 mt-1 italic text-xs sm:text-base">
                Bannu Premium Collection
              </p>
            </motion.header>

            {/* SEARCH */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search sports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  pl-10
                  pr-4
                  py-3
                  rounded-xl
                  bg-[#161616]
                  border border-gray-700
                  text-white
                  text-sm sm:text-base
                  focus:outline-none
                  focus:border-yellow-400
                "
              />

              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* PRODUCTS GRID */}
          {filteredList.length > 0 ? (
            <motion.div
              className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-3 sm:gap-6
              "
            >
              {filteredList.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -5 }}
                  className="
                    bg-[#161616]
                    p-2 sm:p-4
                    rounded-2xl
                    border border-gray-800
                    hover:border-yellow-400/50
                    transition-all
                    duration-300
                  "
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden rounded-xl mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        w-full
                        h-32 sm:h-48 md:h-56
                        object-cover
                        transition-transform
                        duration-500
                        hover:scale-110
                      "
                    />

                    {/* OVERLAY */}
                    <div
                      onClick={() => setSelectedImg(item.image)}
                      className="
                        absolute inset-0
                        bg-black/40
                        flex items-center justify-center
                        opacity-0 hover:opacity-100
                        transition
                        cursor-pointer
                      "
                    >
                      <div className="bg-yellow-400 p-2 sm:p-4 rounded-full">
                        <FaEye className="text-black text-sm sm:text-lg" />
                      </div>
                    </div>
                  </div>

                  {/* NAME */}
                  <h2 className="text-xs sm:text-lg font-bold truncate">
                    {item.name}
                  </h2>

                  {/* DESC */}
                  <p className="text-gray-500 text-[10px] sm:text-sm mt-1 line-clamp-2">
                    {item.desc}
                  </p>

                  {/* PRICE + CART */}
                  <div className="flex justify-between items-center mt-3 sm:mt-4">
                    <span className="text-yellow-400 font-bold text-xs sm:text-lg">
                      Rs. {item.price}
                    </span>

                    <FaShoppingCart
                      onClick={() => {
                        const cart =
                          JSON.parse(
                            localStorage.getItem("cart")
                          ) || [];

                        const existingItem = cart.find(
                          (cartItem) =>
                            cartItem.id === item._id
                        );

                        if (existingItem) {
                          existingItem.qty += 1;
                        } else {
                          cart.push({
                            id: item._id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            qty: 1,
                          });
                        }

                        localStorage.setItem(
                          "cart",
                          JSON.stringify(cart)
                        );

                        window.dispatchEvent(
                          new Event("cartUpdated")
                        );
                      }}
                      className="
                        text-gray-50
                        text-lg sm:text-2xl
                        cursor-pointer
                        hover:text-yellow-400
                        transition
                      "
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              ❌ No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;