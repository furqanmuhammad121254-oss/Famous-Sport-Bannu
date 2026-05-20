import React, { useState } from "react";
import { FaWhatsapp, FaUser, FaPhone, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

const OrderModal = ({ product, isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.match(/^((\+92)|(0))3\d{9}$/)) newErrors.phone = "Invalid Pakistan phone number";
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (validate()) {
      // Logic to send to WhatsApp or API
      const message = `New Order: ${product.name}%0AAddress: ${formData.address}%0APhone: ${formData.phone}`;
      window.open(`https://wa.me/923001234567?text=${message}`, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col md:flex-row relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10">
          <FaTimes size={24} />
        </button>

        {/* Left Side: Product Summary */}
        <div className="w-full md:w-1/2 bg-[#222] p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-800">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover rounded-2xl shadow-lg mb-6"
          />
          <h2 className="text-3xl font-black text-white uppercase">{product.name}</h2>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">{product.desc}</p>
          
          <div className="mt-6 flex items-baseline gap-3">
             <span className="text-4xl font-black text-yellow-400">Rs. {Math.round(product.price * 280)}</span>
             <span className="text-gray-500 line-through text-lg">${product.price}</span>
          </div>
        </div>

        {/* Right Side: Order Form */}
        <div className="w-full md:w-1/2 p-8 bg-[#1a1a1a]">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
            Complete Your Order
          </h3>

          <form onSubmit={handleConfirmOrder} className="space-y-5">
            {/* Name Input */}
            <div className="relative">
              <FaUser className="absolute left-4 top-11 text-gray-500" />
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
              <input 
                type="text"
                placeholder="Enter your name"
                className={`w-full mt-1 bg-black border ${errors.name ? 'border-red-500' : 'border-gray-800'} text-white px-12 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none`}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1 uppercase">{errors.name}</p>}
            </div>

            {/* Phone Input */}
            <div className="relative">
              <FaPhone className="absolute left-4 top-11 text-gray-500" />
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
              <input 
                type="text"
                placeholder="03xx xxxxxxx"
                className={`w-full mt-1 bg-black border ${errors.phone ? 'border-red-500' : 'border-gray-800'} text-white px-12 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none`}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1 uppercase">{errors.phone}</p>}
            </div>

            {/* Address Input */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-11 text-gray-500" />
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Shipping Address</label>
              <textarea 
                rows="2"
                placeholder="House #, Street, City"
                className={`w-full mt-1 bg-black border ${errors.address ? 'border-red-500' : 'border-gray-800'} text-white px-12 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none`}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              ></textarea>
              {errors.address && <p className="text-red-500 text-[10px] mt-1 ml-1 uppercase">{errors.address}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(250,204,21,0.2)] active:scale-95"
            >
              <FaWhatsapp size={20} />
              CONFIRM VIA WHATSAPP
            </button>
            <p className="text-center text-gray-600 text-[10px] uppercase tracking-widest">Fast Delivery in 2-3 Working Days</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;