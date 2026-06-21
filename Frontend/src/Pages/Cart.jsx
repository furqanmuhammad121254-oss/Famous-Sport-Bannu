// import React, { useEffect, useState } from "react";
// import Navber from "../components/Navber";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   // Form States
//   const [showCheckoutForm, setShowCheckoutForm] = useState(false);
//   const [shippingDetails, setShippingDetails] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(data);
//   }, []);

//   const updateQty = (index, delta) => {
//     const updatedCart = [...cartItems];
//     const newQty = (updatedCart[index].qty || 1) + delta;

//     if (newQty >= 1) {
//       updatedCart[index].qty = newQty;
//       setCartItems(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//       window.dispatchEvent(new Event("cartUpdated"));
//     }
//   };

//   const removeItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * (item.qty || 1),
//     0
//   );

//   // Handle Input Changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShippingDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit Order Handlers
//   const handlePlaceOrder = (e) => {
//     e.preventDefault();

//     // Mapping relevant structured arrays from cart items
//     const orderData = {
//       product_ids: cartItems.map((item) => item.id || item._id), // assuming your objects have an id field
//       names: cartItems.map((item) => `${item.name} (x${item.qty || 1})`),
//       images: cartItems.map((item) => item.image),
//       customer_name: shippingDetails.name,
//       phone: shippingDetails.phone,
//       address: shippingDetails.address,
//       total_price: subtotal,
//       status: "pending", // Default pending status waiting for admin approval
//     };

//     console.log("Order Data payload ready for Backend/Firebase:", orderData);
    
//     // Example logic action: Send orderData to your backend API here
//     alert("Order submitted successfully! Awaiting Admin Approval.");
    
//     // Clear cart data cleanup
//     localStorage.removeItem("cart");
//     setCartItems([]);
//     setShowCheckoutForm(false);
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   return (
//     <div className="w-full min-h-screen bg-black text-white">
//       <Navber />

//       {/* MAIN WRAPPER */}
//       <div className="pt-20 md:pt-24 px-3 sm:px-6 md:px-10 lg:px-16 pb-10">
//         <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6">
//           Shopping Cart
//         </h1>

//         {cartItems.length === 0 ? (
//           <div className="bg-[#1b1b1b] p-6 sm:p-10 text-center rounded-lg shadow">
//             <p className="text-gray-500 mb-4 text-sm sm:text-base">
//               Your cart is currently empty.
//             </p>
//             <button
//               onClick={() => navigate("/Shop")}
//               className="bg-yellow-400 text-black px-4 sm:px-6 py-2 rounded text-sm sm:text-base font-semibold"
//             >
//               Return to Shop
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
//             {/* LEFT SIDE */}
//             <div className="lg:col-span-2 bg-[#161616] border border-[#3f3f3f] p-3 sm:p-5 md:p-6 rounded-lg shadow-sm overflow-x-auto">
//               {/* HEADER ROW */}
//               <div className="hidden sm:grid grid-cols-5 font-semibold border-b border-gray-700 pb-4 text-xs text-gray-400 uppercase">
//                 <p className="col-span-2">Product</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p className="text-right">Total</p>
//               </div>

//               {cartItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className="grid grid-cols-1 sm:grid-cols-5 items-center py-4 sm:py-6 border-b border-gray-800 gap-3 sm:gap-0"
//                 >
//                   {/* PRODUCT */}
//                   <div className="sm:col-span-2 flex items-center gap-3 sm:gap-4">
//                     <button
//                       onClick={() => removeItem(index)}
//                       className="text-red-400 hover:text-red-600 text-sm"
//                     >
//                       ✕
//                     </button>
//                     <img
//                       src={item.image}
//                       className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded border border-gray-700"
//                       alt={item.name}
//                     />
//                     <p className="text-xs text-gray-50 sm:text-sm font-medium">
//                       {item.name}
//                     </p>
//                   </div>

//                   {/* PRICE */}
//                   <p className="text-sm text-gray-50">Rs {item.price}</p>

//                   {/* QUANTITY */}
//                   <div className="flex items-center bg-gray-800 text-white border border-gray-700 rounded-md w-fit h-8 sm:h-9 mt-2 sm:mt-0">
//                     <button
//                       onClick={() => updateQty(index, -1)}
//                       className="px-2 sm:px-3 hover:bg-gray-700 h-full"
//                     >
//                       -
//                     </button>
//                     <span className="px-2 sm:px-3 text-sm font-semibold border-x border-gray-700">
//                       {item.qty || 1}
//                     </span>
//                     <button
//                       onClick={() => updateQty(index, 1)}
//                       className="px-2 sm:px-3 hover:bg-gray-700 h-full"
//                     >
//                       +
//                     </button>
//                   </div>

//                   {/* TOTAL */}
//                   <p className="text-left text-gray-50 sm:text-right font-bold text-sm mt-2 sm:mt-0">
//                     Rs {item.price * (item.qty || 1)}
//                   </p>
//                 </div>
//               ))}

//               <textarea
//                 className="w-full mt-5 border border-gray-700 p-3 bg-gray-900 rounded text-sm text-white placeholder-gray-500"
//                 rows="3"
//                 placeholder="Special instruction..."
//               />
//             </div>

//             {/* RIGHT SIDE: ORDER SUMMARY */}
//             <div className="bg-[#161616] p-5 sm:p-6 rounded-2xl shadow-xl border border-[#3f3f3f] h-fit">
//               <h2 className="text-xl font-bold text-white mb-5">
//                 Order Summary
//               </h2>

//               {/* CART ITEMS BREAKDOWN */}
//               <div className="space-y-4 border-b border-gray-700 pb-4 max-h-60 overflow-y-auto">
//                 {cartItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between gap-3"
//                   >
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-12 h-12 rounded object-cover"
//                       />
//                       <div>
//                         <h3 className="text-sm font-semibold text-white truncate max-w-[120px]">
//                           {item.name}
//                         </h3>
//                         <p className="text-xs text-gray-400">
//                           Qty: {item.qty || 1}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-bold text-yellow-400">
//                       Rs {item.price * (item.qty || 1)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* TOTAL */}
//               <div className="flex justify-between items-center mt-5 text-lg font-bold text-white">
//                 <span>Subtotal</span>
//                 <span className="text-yellow-400">Rs {subtotal}</span>
//               </div>

//               {/* CHECKOUT BUTTON Toggle Form */}
//               {!showCheckoutForm && (
//                 <button
//                   onClick={() => setShowCheckoutForm(true)}
//                   className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold shadow-md transition-all text-center"
//                 >
//                   Proceed to Checkout
//                 </button>
//               )}

//               {/* SHIPPING DETAILS FORM AREA */}
//               {showCheckoutForm && (
//                 <form onSubmit={handlePlaceOrder} className="mt-6 pt-6 border-t border-gray-700 space-y-4">
//                   <h3 className="text-md font-bold text-white mb-2">Shipping Information</h3>
                  
//                   <div>
//                     <label className="text-xs text-gray-400 block mb-1">Full Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       required
//                       value={shippingDetails.name}
//                       onChange={handleInputChange}
//                       className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-sm text-white focus:outline-none focus:border-yellow-400"
//                       placeholder="John Doe"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-xs text-gray-400 block mb-1">Phone Number</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       required
//                       value={shippingDetails.phone}
//                       onChange={handleInputChange}
//                       className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-sm text-white focus:outline-none focus:border-yellow-400"
//                       placeholder="03XXXXXXXXX"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-xs text-gray-400 block mb-1">Delivery Address</label>
//                     <textarea
//                       name="address"
//                       required
//                       rows="2"
//                       value={shippingDetails.address}
//                       onChange={handleInputChange}
//                       className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-sm text-white focus:outline-none focus:border-yellow-400"
//                       placeholder="Street, City, Country"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold shadow-md transition-all text-center mt-2"
//                   >
//                     Confirm & Pay Order (Rs {subtotal})
//                   </button>
                  
//                   <button
//                     type="button"
//                     onClick={() => setShowCheckoutForm(false)}
//                     className="w-full text-center text-xs text-gray-400 hover:text-white mt-1 underline"
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;


// import React, { useEffect, useState } from "react";
// import Navber from "../components/Navber";
// import { useNavigate } from "react-router-dom";

// // ⚠️ REPLACE THIS WITH YOUR BUSINESS WHATSAPP NUMBER (With Country Code, No spaces/plus signs)
// const WHATSAPP_NUMBER = "+923297229929"; 

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   // Form States
//   const [showCheckoutForm, setShowCheckoutForm] = useState(false);
//   const [shippingDetails, setShippingDetails] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(data);
//   }, []);

//   const updateQty = (index, delta) => {
//     const updatedCart = [...cartItems];
//     const newQty = (updatedCart[index].qty || 1) + delta;

//     if (newQty >= 1) {
//       updatedCart[index].qty = newQty;
//       setCartItems(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//       window.dispatchEvent(new Event("cartUpdated"));
//     }
//   };

//   const removeItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * (item.qty || 1),
//     0
//   );

//   // Handle Input Changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShippingDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit Order Handlers
//   const handlePlaceOrder = (e) => {
//     e.preventDefault();

//     // 1. Format the items text for WhatsApp
//     const itemsText = cartItems
//       .map((item, i) => `${i + 1}. *${item.name}* (x${item.qty || 1}) - Rs ${item.price * (item.qty || 1)}`)
//       .join("\n");

//     // 2. Build the full message payload
//     const message = `🛍️ *NEW ORDER RECEIVED* 🛍️\n\n` +
//                     `👤 *Customer Details:*\n` +
//                     `• Name: ${shippingDetails.name}\n` +
//                     `• Phone: ${shippingDetails.phone}\n` +
//                     `• Address: ${shippingDetails.address}\n\n` +
//                     `🛒 *Order Summary:*\n` +
//                     `${itemsText}\n\n` +
//                     `💰 *Total Amount:* Rs ${subtotal}\n\n` +
//                     `Thank you for shopping with us! Please confirm my order.`;

//     // 3. URL Encode the text safely
//     const encodedMessage = encodeURIComponent(message);
//     const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

//     // 4. Open WhatsApp in a new window/tab
//     window.open(whatsappUrl, "_blank");

//     // 5. Clear cart data cleanup
//     localStorage.removeItem("cart");
//     setCartItems([]);
//     setShowCheckoutForm(false);
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   return (
//     <div className="w-full min-h-screen bg-black text-white">
//       <Navber />

//       {/* MAIN WRAPPER */}
//       <div className="pt-20 md:pt-24 px-3 sm:px-6 md:px-10 lg:px-16 pb-10">
//         <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6">
//           Shopping Cart
//         </h1>

//         {cartItems.length === 0 ? (
//           <div className="bg-[#1b1b1b] p-6 sm:p-10 text-center rounded-lg shadow">
//             <p className="text-gray-500 mb-4 text-sm sm:text-base">
//               Your cart is currently empty.
//             </p>
//             <button
//               onClick={() => navigate("/Shop")}
//               className="bg-yellow-400 text-black px-4 sm:px-6 py-2 rounded text-sm sm:text-base font-semibold"
//             >
//               Return to Shop
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
//             {/* LEFT SIDE */}
//             <div className="lg:col-span-2 bg-[#161616] border border-[#3f3f3f] p-3 sm:p-5 md:p-6 rounded-lg shadow-sm overflow-x-auto">
//               {/* HEADER ROW */}
//               <div className="hidden sm:grid grid-cols-5 font-semibold border-b border-gray-700 pb-4 text-xs text-gray-400 uppercase">
//                 <p className="col-span-2">Product</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p className="text-right">Total</p>
//               </div>

//               {cartItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className="grid grid-cols-1 sm:grid-cols-5 items-center py-4 sm:py-6 border-b border-gray-800 gap-3 sm:gap-0"
//                 >
//                   {/* PRODUCT */}
//                   <div className="sm:col-span-2 flex items-center gap-3 sm:gap-4">
//                     <button
//                       onClick={() => removeItem(index)}
//                       className="text-red-400 hover:text-red-600 text-sm"
//                     >
//                       ✕
//                     </button>
//                     <img
//                       src={item.image}
//                       className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded border border-gray-700"
//                       alt={item.name}
//                     />
//                     <p className="text-xs text-gray-50 sm:text-sm font-medium">
//                       {item.name}
//                     </p>
//                   </div>

//                   {/* PRICE */}
//                   <p className="text-sm text-gray-50">Rs {item.price}</p>

//                   {/* QUANTITY */}
//                   <div className="flex items-center bg-gray-800 text-white border border-gray-700 rounded-md w-fit h-8 sm:h-9 mt-2 sm:mt-0">
//                     <button
//                       onClick={() => updateQty(index, -1)}
//                       className="px-2 sm:px-3 hover:bg-gray-700 h-full"
//                     >
//                       -
//                     </button>
//                     <span className="px-2 sm:px-3 text-sm font-semibold border-x border-gray-700">
//                       {item.qty || 1}
//                     </span>
//                     <button
//                       onClick={() => updateQty(index, 1)}
//                       className="px-2 sm:px-3 hover:bg-gray-700 h-full"
//                     >
//                       +
//                     </button>
//                   </div>

//                   {/* TOTAL */}
//                   <p className="text-left text-gray-50 sm:text-right font-bold text-sm mt-2 sm:mt-0">
//                     Rs {item.price * (item.qty || 1)}
//                   </p>
//                 </div>
//               ))}

//               <textarea
//                 className="w-full mt-5 border border-gray-700 p-3 bg-gray-900 rounded text-sm text-white placeholder-gray-500"
//                 rows="3"
//                 placeholder="Special instruction..."
//               />
//             </div>

//             {/* RIGHT SIDE: ORDER SUMMARY */}
//             <div className="bg-[#161616] p-5 sm:p-6 rounded-2xl shadow-xl border border-[#3f3f3f] h-fit">
//               <h2 className="text-xl font-bold text-white mb-5">
//                 Order Summary
//               </h2>

//               {/* CART ITEMS BREAKDOWN */}
//               <div className="space-y-4 border-b border-gray-700 pb-4 max-h-60 overflow-y-auto">
//                 {cartItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between gap-3"
//                   >
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-12 h-12 rounded object-cover"
//                       />
//                       <div>
//                         <h3 className="text-sm font-semibold text-white truncate max-w-[120px]">
//                           {item.name}
//                         </h3>
//                         <p className="text-xs text-gray-400">
//                           Qty: {item.qty || 1}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-bold text-yellow-400">
//                       Rs {item.price * (item.qty || 1)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* TOTAL */}
//               <div className="flex justify-between items-center mt-5 text-lg font-bold text-white">
//                 <span>Subtotal</span>
//                 <span className="text-yellow-400">Rs {subtotal}</span>
//               </div>

//               {/* CHECKOUT BUTTON Toggle Form */}
//               {!showCheckoutForm && (
//                 <button
//                   onClick={() => setShowCheckoutForm(true)}
//                   className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold shadow-md transition-all text-center"
//                 >
//                   Proceed to Checkout
//                 </button>
//               )}

//               {/* SHIPPING DETAILS FORM AREA */}
//               {showCheckoutForm && (
//                 <form onSubmit={handlePlaceOrder} className="mt-6 pt-6 border-t border-gray-700 space-y-4">
//                   <h3 className="text-md font-bold text-white mb-2">Shipping Information</h3>
                  
//                   <div>
//                     <label className="text-xs text-gray-400 block mb-1">Full Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       required
//                       value={shippingDetails.name}
//                       onChange={handleInputChange}
//                       className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-sm text-white focus:outline-none focus:border-yellow-400"
//                       placeholder="John Doe"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-xs text-gray-400 block mb-1">Phone Number</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       required
//                       value={shippingDetails.phone}
//                       onChange={handleInputChange}
//                       className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-sm text-white focus:outline-none focus:border-yellow-400"
//                       placeholder="03XXXXXXXXX"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-xs text-gray-400 block mb-1">Delivery Address</label>
//                     <textarea
//                       name="address"
//                       required
//                       rows="2"
//                       value={shippingDetails.address}
//                       onChange={handleInputChange}
//                       className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-sm text-white focus:outline-none focus:border-yellow-400"
//                       placeholder="Street, City, Country"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold shadow-md transition-all text-center mt-2"
//                   >
//                     Confirm & Send to WhatsApp (Rs {subtotal})
//                   </button>
                  
//                   <button
//                     type="button"
//                     onClick={() => setShowCheckoutForm(false)}
//                     className="w-full text-center text-xs text-gray-400 hover:text-white mt-1 underline"
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;



import React, { useEffect, useState } from "react";
import Navber from "../components/Navber";
import { useNavigate } from "react-router-dom";

// ⚠️ Ensure this has ONLY digits with country code (removed '+' and spaces for API safety)
const WHATSAPP_NUMBER = "923297229929"; 

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Form & Special Instructions States
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(data);
  }, []);

  const updateQty = (index, delta) => {
    const updatedCart = [...cartItems];
    const newQty = (updatedCart[index].qty || 1) + delta;

    if (newQty >= 1) {
      updatedCart[index].qty = newQty;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Order Handler
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // 1. Format the items text including their image URLs
    const itemsText = cartItems
      .map((item, i) => {
        const itemLine = `${i + 1}. *${item.name}* (x${item.qty || 1}) - Rs ${item.price * (item.qty || 1)}`;
        // Append image URL if it exists
        return item.image 
          ? `${itemLine}\n   🖼️ Image: ${item.image}`
          : itemLine;
      })
      .join("\n\n");

    // 2. Build the full structural message text payload
    let message = `🛍️ *NEW ORDER RECEIVED* 🛍️\n\n` +
                  `👤 *Customer Details:*\n` +
                  `• Name: ${shippingDetails.name}\n` +
                  `• Phone: ${shippingDetails.phone}\n` +
                  `• Address: ${shippingDetails.address}\n\n` +
                  `🛒 *Order Summary:*\n${itemsText}\n\n`;

    // Include special instructions if provided
    if (specialInstructions.trim()) {
      message += `📝 *Special Instructions:*\n"${specialInstructions.trim()}"\n\n`;
    }

    message += `💰 *Total Amount:* Rs ${subtotal}\n\n` +
               `Thank you for shopping with us! Please process my order.`;

    // 3. URL Encode payload safely
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // 4. Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");

    // 5. App State Cleanup
    localStorage.removeItem("cart");
    setCartItems([]);
    setSpecialInstructions("");
    setShowCheckoutForm(false);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navber />

      {/* MAIN WRAPPER */}
      <div className="pt-20 md:pt-24 px-3 sm:px-6 md:px-10 lg:px-16 pb-10">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-[#1b1b1b] p-6 sm:p-10 text-center rounded-lg shadow">
            <p className="text-gray-500 mb-4 text-sm sm:text-base">
              Your cart is currently empty.
            </p>
            <button
              onClick={() => navigate("/Shop")}
              className="bg-yellow-400 text-black px-4 sm:px-6 py-2 rounded text-sm sm:text-base font-semibold"
            >
              Return to Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 bg-[#161616] border border-[#3f3f3f] p-3 sm:p-5 md:p-6 rounded-lg shadow-sm overflow-x-auto">
              {/* HEADER ROW */}
              <div className="hidden sm:grid grid-cols-5 font-semibold border-b border-gray-700 pb-4 text-xs text-gray-400 uppercase">
                <p className="col-span-2">Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p className="text-right">Total</p>
              </div>

              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-5 items-center py-4 sm:py-6 border-b border-gray-800 gap-3 sm:gap-0"
                >
                  {/* PRODUCT */}
                  <div className="sm:col-span-2 flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-400 hover:text-red-600 text-sm"
                    >
                      ✕
                    </button>
                    <img
                      src={item.image}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded border border-gray-700"
                      alt={item.name}
                    />
                    <p className="text-xs text-gray-50 sm:text-sm font-medium">
                      {item.name}
                    </p>
                  </div>

                  {/* PRICE */}
                  <p className="text-sm text-gray-50">Rs {item.price}</p>

                  {/* QUANTITY */}
                  <div className="flex items-center bg-gray-800 text-white border border-gray-700 rounded-md w-fit h-8 sm:h-9 mt-2 sm:mt-0">
                    <button
                      onClick={() => updateQty(index, -1)}
                      className="px-2 sm:px-3 hover:bg-gray-700 h-full"
                    >
                      -
                    </button>
                    <span className="px-2 sm:px-3 text-sm font-semibold border-x border-gray-700">
                      {item.qty || 1}
                    </span>
                    <button
                      onClick={() => updateQty(index, 1)}
                      className="px-2 sm:px-3 hover:bg-gray-700 h-full"
                    >
                      +
                    </button>
                  </div>

                  {/* TOTAL */}
                  <p className="text-left text-gray-50 sm:text-right font-bold text-sm mt-2 sm:mt-0">
                    Rs {item.price * (item.qty || 1)}
                  </p>
                </div>
              ))}

              <textarea
                className="w-full mt-5 border border-gray-700 p-3 bg-gray-900 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                rows="3"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Special instruction..."
              />
            </div>

            {/* RIGHT SIDE: ORDER SUMMARY */}
            <div className="bg-[#161616] p-5 sm:p-6 rounded-2xl shadow-xl border border-[#3f3f3f] h-fit">
              <h2 className="text-xl font-bold text-white mb-5">
                Order Summary
              </h2>

              {/* CART ITEMS BREAKDOWN */}
              <div className="space-y-4 border-b border-gray-700 pb-4 max-h-60 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-white truncate max-w-[120px]">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          Qty: {item.qty || 1}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-yellow-400">
                      Rs {item.price * (item.qty || 1)}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="flex justify-between items-center mt-5 text-lg font-bold text-white">
                <span>Subtotal</span>
                <span className="text-yellow-400">Rs {subtotal}</span>
              </div>

              {/* CHECKOUT BUTTON Toggle Form */}
              {!showCheckoutForm && (
                <button
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold shadow-md transition-all text-center"
                >
                  Proceed to Checkout
                </button>
              )}

              {/* SHIPPING DETAILS FORM AREA */}
              {showCheckoutForm && (
                <form onSubmit={handlePlaceOrder} className="mt-6 pt-6 border-t border-gray-700 space-y-4">
                  <h3 className="text-md font-bold text-white mb-2">Shipping Information</h3>
                  
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={shippingDetails.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-sm text-white focus:outline-none focus:border-yellow-400"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-sm text-white focus:outline-none focus:border-yellow-400"
                      placeholder="03XXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Delivery Address</label>
                    <textarea
                      name="address"
                      required
                      rows="2"
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-sm text-white focus:outline-none focus:border-yellow-400"
                      placeholder="Street, City, Country"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold shadow-md transition-all text-center mt-2"
                  >
                    Confirm & Send to WhatsApp (Rs {subtotal})
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="w-full text-center text-xs text-gray-400 hover:text-white mt-1 underline"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;