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
//       const res = await api.post("/auth/signup", formData);
//       setMsg(res.data.msg);
//        localStorage.setItem("user", JSON.stringify(user));


//       if (formData.role === "admin") {
//         navigate("/home");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       setMsg(error.response?.data?.msg || "Signup failed. Try again.");
//     }
//   };

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



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Player name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); 

    if (!validateForm()) return; 

    try {
      const res = await api.post("/auth/signup", formData);
      
      // ✅ Store user data and token from response
      if (res.data.user && res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        setMsg(res.data.msg || "Signup successful!");
        
        // Navigate based on role
        if (res.data.user.role === "admin") {
          navigate("/home");
        } else {
          navigate("/");
        }
      } else {
        setMsg(res.data.msg || "Signup failed. Please try again.");
      }
    } catch (error) {
      setMsg(error.response?.data?.msg || "Signup failed. Try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl flex rounded-2xl overflow-hidden shadow-2xl">
        <div className="w-full md:w-1/2 bg-white p-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-lime-600 flex items-center justify-center mb-4 mx-auto shadow-lg">
            <span className="text-white text-2xl">🏀</span>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
            Create Sports Account 🏆
          </h1>
          <p className="text-center text-gray-500 text-sm mb-6">
            Join Famous Sports & upgrade your game
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="text-sm font-semibold text-gray-600">Player Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full mt-1 px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-lime-600 py-3 mt-4 rounded-lg text-white font-bold hover:brightness-110 active:scale-95 transition duration-300 shadow-lg"
            >
              Register Now
            </button>
          </form>

          {msg && (
            <div className={`mt-4 p-2 rounded text-center ${
              msg.includes("successful") ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            }`}>
              <p className={`text-sm font-medium ${
                msg.includes("successful") ? "text-green-600" : "text-red-600"
              }`}>{msg}</p>
            </div>
          )}

          <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an account?
            <button onClick={() => navigate("/login")} className="text-green-600 font-bold ml-2 hover:underline">
              Login
            </button>
          </p>
        </div>

        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-lime-700 items-center justify-center text-white p-12">
          <div className="text-center">
            <h2 className="text-4xl font-black mb-4">
              Famous <br /> Sports ⚽
            </h2>
            <p className="text-base opacity-90 leading-relaxed">
              Gear up with the best equipment in Bannu. Create your profile to track orders and get exclusive discounts.
            </p>
            <div className="mt-8 flex justify-center gap-6 text-3xl animate-bounce">
              🏏 🏀 👟
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;