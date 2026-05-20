// import React, { useEffect, useState } from "react";
// import Navber from "../components/Navber";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState('');

//   // 1. Load Data
//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(data);
//   }, []);

//   // 2. Update Quantity Logic
//   const updateQty = (index, delta) => {
//     const updatedCart = [...cartItems];
//     const newQty = (updatedCart[index].qty || 1) + delta;

//     if (newQty >= 1) {
//       updatedCart[index].qty = newQty;
//       setCartItems(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     }
//   };

//   // 3. Remove Item Logic
//   const removeItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * (item.qty || 1),
//     0
//   );

//   return (
//     <div className="w-full min-h-screen bg-gray-100">
//       <Navber />

//       <div className="pt-24 px-4 md:px-10 pb-10">
//         <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

//         {cartItems.length === 0 ? (
//           <div className="bg-white p-10 text-center rounded-lg shadow">
//             <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
//             <button className="bg-black text-white px-6 py-2 rounded">Return to Shop</button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//             {/* LEFT SIDE - CART ITEMS */}
//             <div className="lg:col-span-2 bg-white p-6 shadow-sm rounded-lg">
//               <div className="grid grid-cols-5 font-semibold border-b pb-4 text-xs text-gray-400 uppercase tracking-wider">
//                 <p className="col-span-2">Product</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p className="text-right">Total</p>
//               </div>

//               {cartItems.map((item, index) => (
//                 <div key={index} className="grid grid-cols-5 items-center py-6 border-b last:border-0">
//                   <div className="col-span-2 flex items-center gap-4">
//                     <button onClick={() => removeItem(index)} className="text-gray-300 hover:text-red-500 transition-colors">✕</button>
//                     <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
//                     <p className="text-sm font-medium">{item.name}</p>
//                   </div>

//                   <p className="text-sm text-gray-600">Rs {item.price}</p>

//                   <div className="flex items-center border rounded-md w-fit h-9">
//                     <button onClick={() => updateQty(index, -1)} className="px-3 hover:bg-gray-100">-</button>
//                     <span className="px-3 text-sm font-semibold border-x h-full flex items-center">{item.qty || 1}</span>
//                     <button onClick={() => updateQty(index, 1)} className="px-3 hover:bg-gray-100">+</button>
//                   </div>

//                   <p className="text-right font-bold text-sm">Rs {item.price * (item.qty || 1)}</p>
//                 </div>
//               ))}

//               <textarea
//                 className="w-full mt-6 border p-3 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none"
//                 rows="3"
//                 placeholder="Special instruction for seller..."
//               />
//             </div>

//             {/* RIGHT SIDE - ORDER SUMMARY */}
//             <div className="bg-white p-6 shadow-xl rounded-xl h-fit border border-gray-100">
//               <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>

//               <div className="flex justify-between mb-4 text-gray-600">
//                 <span>Subtotal</span>
//                 <span className="font-semibold text-gray-900">Rs {subtotal.toLocaleString()}</span>
//               </div>

//               <hr className="my-4" />

//               <h3 className="text-sm font-bold text-gray-700 mb-3">Select Payment Method</h3>
//               <div className="grid grid-cols-3 gap-2 mb-6">
//                 <button
//                   onClick={() => setPaymentMethod('easypaisa')}
//                   className={`py-2 px-1 text-xs font-bold rounded border transition-all ${paymentMethod === 'easypaisa' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-400'}`}
//                 >
//                   EasyPaisa
//                 </button>
//                 <button
//                   onClick={() => setPaymentMethod('jazzcash')}
//                   className={`py-2 px-1 text-xs font-bold rounded border transition-all ${paymentMethod === 'jazzcash' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 text-gray-400'}`}
//                 >
//                   JazzCash
//                 </button>
//                 <button
//                   onClick={() => setPaymentMethod('bank')}
//                   className={`py-2 px-1 text-xs font-bold rounded border transition-all ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-400'}`}
//                 >
//                   Bank
//                 </button>
//               </div>

//               {paymentMethod && (
//                 <div className="bg-gray-50 p-4 rounded-lg mb-6 transition-all duration-300">
//                   <p className="text-[10px] font-bold uppercase text-gray-400 mb-3">Details for {paymentMethod}</p>
//                   {paymentMethod === 'bank' ? (
//                     <div className="space-y-3">
//                       <input className="w-full border p-2 rounded text-sm focus:border-blue-400 outline-none" placeholder="Account Holder Name" />
//                       <input className="w-full border p-2 rounded text-sm focus:border-blue-400 outline-none" placeholder="IBAN / Account Number" />
//                       <select className="w-full border p-2 rounded text-sm focus:border-blue-400 outline-none">
//                         <option>Select Bank</option>
//                         <option>HBL</option>
//                         <option>Meezan Bank</option>
//                         <option>United Bank Limited (UBL)</option>
//                         <option>Bank Alfalah</option>
//                         <option>Allied Bank Limited (ABL)</option>
//                         <option>National Bank of Pakistan (NBP)</option>
//                         <option>Askari Bank</option>
//                         <option>Faysal Bank</option>
//                         <option>JS Bank</option>
//                         <option>Standard Chartered Bank Pakistan</option>
//                         <option>Soneri Bank</option>
//                         <option>Dubai Islamic Bank Pakistan</option>
//                         <option>Sindh Bank</option>
//                         <option>Punjab Provincial Cooperative Bank</option>
//                       </select>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       <input className="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-green-400 outline-none" placeholder="Mobile Number (03xx xxxxxxx)" type="tel" />
//                       <p className="text-[10px] text-gray-400 italic">* Ensure your {paymentMethod} app is ready for the prompt.</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               <div className="flex justify-between font-extrabold text-lg border-t pt-4 mb-6">
//                 <span>Total</span>
//                 <span className="text-green-600">Rs {subtotal.toLocaleString()}</span>
//               </div>

//               <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all shadow-md active:scale-95">
//                 Confirm & Pay Now
//               </button>
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

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");

//   // Load Cart
//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(data);
//   }, []);

//   // Update Quantity
//   const updateQty = (index, delta) => {
//     const updatedCart = [...cartItems];

//     const newQty = (updatedCart[index].qty || 1) + delta;

//     if (newQty >= 1) {
//       updatedCart[index].qty = newQty;

//       setCartItems(updatedCart);

//       localStorage.setItem("cart", JSON.stringify(updatedCart));

//       // Navbar Notification Update
//       window.dispatchEvent(new Event("cartUpdated"));
//     }
//   };

//   // Remove Product
//   const removeItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);

//     setCartItems(updatedCart);

//     localStorage.setItem("cart", JSON.stringify(updatedCart));

//     // Navbar Notification Update
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   // Subtotal
//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * (item.qty || 1),
//     0
//   );

//   return (
//     <div className="w-full min-h-screen bg-gray-100">
//       <Navber />

//       <div className="pt-24 px-4 md:px-10 pb-10">
//         <h1 className="text-2xl font-bold mb-6">
//           Shopping Cart
//         </h1>

//         {cartItems.length === 0 ? (
//           <div className="bg-white p-10 text-center rounded-lg shadow">
//             <p className="text-gray-500 mb-4">
//               Your cart is currently empty.
//             </p>

//             <button className="bg-black text-white px-6 py-2 rounded">
//               Return to Shop
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//             {/* Left Side */}
//             <div className="lg:col-span-2 bg-white p-6 shadow-sm rounded-lg">

//               <div className="grid grid-cols-5 font-semibold border-b pb-4 text-xs text-gray-400 uppercase tracking-wider">
//                 <p className="col-span-2">Product</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p className="text-right">Total</p>
//               </div>

//               {cartItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className="grid grid-cols-5 items-center py-6 border-b last:border-0"
//                 >

//                   {/* Product */}
//                   <div className="col-span-2 flex items-center gap-4">

//                     <button
//                       onClick={() => removeItem(index)}
//                       className="text-gray-300 hover:text-red-500 transition-colors"
//                     >
//                       ✕
//                     </button>

//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-md border"
//                     />

//                     <p className="text-sm font-medium">
//                       {item.name}
//                     </p>
//                   </div>

//                   {/* Price */}
//                   <p className="text-sm text-gray-600">
//                     Rs {item.price}
//                   </p>

//                   {/* Quantity */}
//                   <div className="flex items-center border rounded-md w-fit h-9">

//                     <button
//                       onClick={() => updateQty(index, -1)}
//                       className="px-3 hover:bg-gray-100"
//                     >
//                       -
//                     </button>

//                     <span className="px-3 text-sm font-semibold border-x h-full flex items-center">
//                       {item.qty || 1}
//                     </span>

//                     <button
//                       onClick={() => updateQty(index, 1)}
//                       className="px-3 hover:bg-gray-100"
//                     >
//                       +
//                     </button>
//                   </div>

//                   {/* Total */}
//                   <p className="text-right font-bold text-sm">
//                     Rs {item.price * (item.qty || 1)}
//                   </p>
//                 </div>
//               ))}

//               {/* Note */}
//               <textarea
//                 className="w-full mt-6 border p-3 rounded-lg text-sm outline-none"
//                 rows="3"
//                 placeholder="Special instruction for seller..."
//               />
//             </div>

//             {/* Right Side */}
//             <div className="bg-white p-6 shadow-xl rounded-xl h-fit border border-gray-100">

//               <h2 className="text-xl font-bold mb-6 text-gray-800">
//                 Order Summary
//               </h2>

//               {/* Subtotal */}
//               <div className="flex justify-between mb-4 text-gray-600">
//                 <span>Subtotal</span>

//                 <span className="font-semibold text-gray-900">
//                   Rs {subtotal.toLocaleString()}
//                 </span>
//               </div>

//               <hr className="my-4" />

//               {/* Payment Methods */}
//               <h3 className="text-sm font-bold text-gray-700 mb-3">
//                 Select Payment Method
//               </h3>

//               <div className="grid grid-cols-3 gap-2 mb-6">

//                 <button
//                   onClick={() => setPaymentMethod("easypaisa")}
//                   className={`py-2 px-1 text-xs font-bold rounded border ${
//                     paymentMethod === "easypaisa"
//                       ? "border-green-500 bg-green-50 text-green-700"
//                       : "border-gray-200 text-gray-400"
//                   }`}
//                 >
//                   EasyPaisa
//                 </button>

//                 <button
//                   onClick={() => setPaymentMethod("jazzcash")}
//                   className={`py-2 px-1 text-xs font-bold rounded border ${
//                     paymentMethod === "jazzcash"
//                       ? "border-red-500 bg-red-50 text-red-700"
//                       : "border-gray-200 text-gray-400"
//                   }`}
//                 >
//                   JazzCash
//                 </button>

//                 <button
//                   onClick={() => setPaymentMethod("bank")}
//                   className={`py-2 px-1 text-xs font-bold rounded border ${
//                     paymentMethod === "bank"
//                       ? "border-blue-500 bg-blue-50 text-blue-700"
//                       : "border-gray-200 text-gray-400"
//                   }`}
//                 >
//                   Bank
//                 </button>
//               </div>

//               {/* Total */}
//               <div className="flex justify-between font-extrabold text-lg border-t pt-4 mb-6">
//                 <span>Total</span>

//                 <span className="text-green-600">
//                   Rs {subtotal.toLocaleString()}
//                 </span>
//               </div>

//               {/* Checkout */}
//               <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all">
//                 Confirm & Pay Now
//               </button>

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

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

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

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navber />

      {/* MAIN WRAPPER */}
      <div className="pt-20 md:pt-24 px-3 sm:px-6 md:px-10 lg:px-16 pb-10">

        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-6 sm:p-10 text-center rounded-lg shadow">
            <p className="text-gray-500 mb-4 text-sm sm:text-base">
              Your cart is currently empty.
            </p>
            <button className="bg-black text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base">
              Return to Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 bg-white p-3 sm:p-5 md:p-6 rounded-lg shadow-sm overflow-x-auto">

              {/* HEADER ROW (hidden on mobile small) */}
              <div className="hidden sm:grid grid-cols-5 font-semibold border-b pb-4 text-xs text-gray-400 uppercase">
                <p className="col-span-2">Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p className="text-right">Total</p>
              </div>

              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-5 items-center py-4 sm:py-6 border-b gap-3 sm:gap-0"
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
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded border"
                    />

                    <p className="text-xs sm:text-sm font-medium">
                      {item.name}
                    </p>
                  </div>

                  {/* PRICE (mobile stacked) */}
                  <p className="text-sm text-gray-600 sm:block">
                    Rs {item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center border rounded-md w-fit h-8 sm:h-9 mt-2 sm:mt-0">

                    <button onClick={() => updateQty(index, -1)} className="px-2 sm:px-3">
                      -
                    </button>

                    <span className="px-2 sm:px-3 text-sm font-semibold border-x">
                      {item.qty || 1}
                    </span>

                    <button onClick={() => updateQty(index, 1)} className="px-2 sm:px-3">
                      +
                    </button>
                  </div>

                  {/* TOTAL */}
                  <p className="text-left sm:text-right font-bold text-sm mt-2 sm:mt-0">
                    Rs {item.price * (item.qty || 1)}
                  </p>
                </div>
              ))}

              <textarea
                className="w-full mt-5 border p-3 rounded text-sm"
                rows="3"
                placeholder="Special instruction..."
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="bg-gradient-to-br from-white to-gray-50 p-5 sm:p-6 rounded-2xl shadow-xl border border-gray-200 h-fit">

              <h2 className="text-xl font-bold mb-5 text-gray-800">
                Order Summary
              </h2>

              {/* SUBTOTAL */}
              <div className="flex justify-between text-sm sm:text-base mb-3 text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">
                  Rs {subtotal.toLocaleString()}
                </span>
              </div>

              <hr className="my-3" />

              {/* PAYMENT METHOD */}
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Select Payment Method
              </p>

              <div className="grid grid-cols-3 gap-2 mb-4 text-xs sm:text-sm">

                {/* EASYPAISA */}
                <button
                  onClick={() => setPaymentMethod("easypaisa")}
                  className={`p-3 rounded-xl border transition-all duration-200 ${paymentMethod === "easypaisa"
                      ? "bg-green-500 text-white border-green-600 shadow-md"
                      : "bg-white hover:bg-green-50"
                    }`}
                >
                  EasyPaisa
                </button>

                {/* JAZZCASH */}
                <button
                  onClick={() => setPaymentMethod("jazzcash")}
                  className={`p-3 rounded-xl border transition-all duration-200 ${paymentMethod === "jazzcash"
                      ? "bg-red-500 text-white border-red-600 shadow-md"
                      : "bg-white hover:bg-red-50"
                    }`}
                >
                  JazzCash
                </button>

                {/* BANK */}
                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-3 rounded-xl border transition-all duration-200 ${paymentMethod === "bank"
                      ? "bg-blue-600 text-white border-blue-700 shadow-md"
                      : "bg-white hover:bg-blue-50"
                    }`}
                >
                  Bank
                </button>

              </div>

              {/* PAYMENT DETAILS BOX */}
              {paymentMethod === "easypaisa" && (
                <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-3 text-sm">
                  <p className="font-semibold text-green-700">EasyPaisa Number</p>
                  <p className="text-gray-700">03XX-XXXXXXX</p>
                </div>
              )}

              {paymentMethod === "jazzcash" && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-3 text-sm">
                  <p className="font-semibold text-red-700">JazzCash Number</p>
                  <p className="text-gray-700">03XX-XXXXXXX</p>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-3 text-sm">
                  <p className="font-semibold text-blue-700">Bank Account</p>
                  <p className="text-gray-700">HBL / Meezan / UBL</p>
                  <p className="text-gray-700">Account: 123456789</p>
                </div>
              )}

              {/* TOTAL */}
              <div className="flex justify-between font-bold text-lg border-t pt-3 mb-4 text-gray-800">
                <span>Total</span>
                <span className="text-green-600">
                  Rs {subtotal.toLocaleString()}
                </span>
              </div>

              {/* BUTTON */}
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all">
                Confirm & Pay Now
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;