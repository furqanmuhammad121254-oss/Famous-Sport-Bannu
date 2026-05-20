

import React, { useEffect, useState } from "react";
import Navber from "../components/Navber";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate('')

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
    <div className="w-full min-h-screen bg-black">
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
            <button onClick={() => navigate("/Shop")} className="bg-yellow-400 text-black px-4 sm:px-6 py-2 rounded text-sm sm:text-base">
              Return to Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 bg-[#161616] border border-[#3f3f3f] p-3 sm:p-5 md:p-6 rounded-lg shadow-sm overflow-x-auto">

              {/* HEADER ROW (hidden on mobile small) */}
              <div className="hidden sm:grid grid-cols-5 font-semibold border-b pb-4 text-xs text-gray-50 uppercase">
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

                    <p className="text-xs text-gray-50 sm:text-sm font-medium">
                      {item.name}
                    </p>
                  </div>

                  {/* PRICE (mobile stacked) */}
                  <p className="text-sm text-gray-50 sm:block">
                    Rs {item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center bg-amber-50 border rounded-md w-fit h-8 sm:h-9 mt-2 sm:mt-0">

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
                  <p className="text-left text-gray-50 sm:text-right font-bold text-sm mt-2 sm:mt-0">
                    Rs {item.price * (item.qty || 1)}
                  </p>
                </div>
              ))}

              <textarea
                className="w-full mt-5 border p-3 bg-gray-50 rounded text-sm"
                rows="3"
                placeholder="Special instruction..."
              />
            </div>


            {/* Oder Complete RIGHT SIDE */}
            <div className="bg-[#161616] p-5 sm:p-6 rounded-2xl shadow-xl border border-[#3f3f3f]h-fit">


              {/* ORDER SUMMARY RIGHT SIDE */}
              <div className="bg-[#161616] p-5 sm:p-6 rounded-2xl shadow-xl border border-[#3f3f3f] h-fit">

                <h2 className="text-xl font-bold text-white mb-5">
                  Order Summary
                </h2>

                {/* CART ITEMS */}
                <div className="space-y-4 border-b border-gray-700 pb-4">

                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3"
                    >

                      {/* LEFT */}
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded object-cover"
                        />

                        <div>
                          <h3 className="text-sm font-semibold text-white">
                            {item.name}
                          </h3>

                          <p className="text-xs text-gray-400">
                            Qty: {item.qty || 1}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <p className="text-sm font-bold text-yellow-400">
                        Rs {item.price * (item.qty || 1)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="flex justify-between items-center mt-5 text-lg font-bold text-white">
                  <span>Subtotal</span>
                  <span className="text-yellow-400">
                    Rs {subtotal}
                  </span>
                </div>

               
                {/* BUTTON */}
                <button className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold shadow-md transition-all">
                  Confirm & Pay Order
                </button>

              </div>

             

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;

