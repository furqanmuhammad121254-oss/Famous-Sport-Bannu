import React, { useState } from 'react';

const OrderCompletion = () => {
  const [isOrdered, setIsOrdered] = useState(false);

  const handleCompleteOrder = () => {
    setIsOrdered(true);
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-xl border border-gray-800">
      {/* Existing Cart Table from image_a1891e.png would be here */}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Form */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold border-b border-gray-700 pb-2">Shipping Details</h3>
          <input type="text" placeholder="Full Name" className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:border-white outline-none" />
          <input type="text" placeholder="Phone Number" className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:border-white outline-none" />
          <textarea placeholder="Delivery Address" className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:border-white outline-none h-24"></textarea>
        </div>

        {/* Order Summary & Button */}
        <div className="bg-gray-900 p-4 rounded-lg flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between"><span>Subtotal:</span><span>Rs 150</span></div>
            <div className="flex justify-between"><span>Shipping:</span><span>Rs 50</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-2">
              <span>Total:</span><span>Rs 200</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition-colors">
            COMPLETE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletion;