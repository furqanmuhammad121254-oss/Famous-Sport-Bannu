import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role:"admin"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Signup Data:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Admin Signup
        </h2>
        <p className="text-center text-gray-300 mb-6 text-sm">
          Create secure admin account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:border-blue-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:border-blue-400"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:border-blue-400"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-300 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Secret Key (Important for Admin Access) */}
          <input
            type="password"
            name="secretKey"
            placeholder="Admin Secret Key"
            value={form.secretKey}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:border-red-400"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Create Admin Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;