// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [msg, setMsg] = useState("");
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   // Validation Logic
//   const validateForm = () => {
//     let newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Player name is required";
//     }

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMsg("");

//     if (!validateForm()) return;

//     try {
//     const res = await api.post("/auth/signup", formData);

//     setMsg(res.data.msg);

//     // Navigate to Home Page
//     navigate("/home");

//   } catch (error) {
//     setMsg(
//       error.response?.data?.msg ||
//       "Signup failed. Try again."
//     );
//   }
// };

//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="w-full min-h-screen bg-black flex items-center justify-center p-4">
//       <div className="relative w-full max-w-5xl flex rounded-2xl overflow-hidden shadow-2xl">

//         {/* Left Form */}
//         <div className="w-full md:w-1/2 bg-white p-8">
//           <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-lime-600 flex items-center justify-center mb-4 mx-auto shadow-lg">
//             <span className="text-white text-2xl">🏀</span>
//           </div>

//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
//             Create Sports Account 🏆
//           </h1>
//           <p className="text-center text-gray-500 text-sm mb-6">
//             Join Famous Sports & upgrade your game
//           </p>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//             {/* Name Field */}
//             <div>
//               <label className="text-sm font-semibold text-gray-600">Player Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter your name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`w-full mt-1 px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//               />
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//             </div>

//             {/* Email Field */}
//             <div>
//               <label className="text-sm font-semibold text-gray-600">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full mt-1 px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//               />
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//             </div>

//             {/* Password Field */}
//             <div className="relative">
//               <label className="text-sm font-semibold text-gray-600 px-1">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"} // Dynamic type
//                   name="password"
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full mt-1 px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"
//                     } focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
//                 />

//                 {/* Toggle Button */}
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-gray-500 hover:text-green-600 transition-colors"
//                 >
//                   {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//                 </button>
//               </div>
//               {errors.password && <p className="text-red-500 text-xs mt-1 px-1">{errors.password}</p>}
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-green-500 to-lime-600 py-3 mt-4 rounded-lg text-white font-bold hover:brightness-110 active:scale-95 transition duration-300 shadow-lg"
//             >
//               Register Now
//             </button>
//           </form>

//           {/* General Message */}
//           {msg && (
//             <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded text-center">
//               <p className="text-red-600 text-sm font-medium">{msg}</p>
//             </div>
//           )}

//           <p className="text-center mt-6 text-gray-600 text-sm">
//             Already have an account?
//             <button onClick={() => navigate("/login")} className="text-green-600 font-bold ml-2 hover:underline">
//               Login
//             </button>
//           </p>
//         </div>

//         {/* Right Side UI */}
//         <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-lime-700 items-center justify-center text-white p-12">
//           <div className="text-center">
//             <h2 className="text-4xl font-black mb-4">
//               Famous <br /> Sports ⚽
//             </h2>
//             <p className="text-base opacity-90 leading-relaxed">
//               Gear up with the best equipment in Bannu. Create your profile to track orders and get exclusive discounts.
//             </p>
//             <div className="mt-8 flex justify-center gap-6 text-3xl animate-bounce">
//               🏏 🏀 👟
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Signup;


// src/pages/Signup.jsx



import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/signup", form);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Admin
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800">
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
}