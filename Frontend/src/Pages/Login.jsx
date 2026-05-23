import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Validation Logic
  const validateForm = () => {
    let newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMsg(""); // Reset previous messages

  //   if (!validateForm()) return; // Stop if validation fails

  //   try {
  //     const res = await api.post("/auth/login", formData);
  //     setMsg(res.data.msg);

  //     const user = res.data;

  //     // role check

  //       navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!validateForm()) return;

    try {
      const res = await api.post("/auth/login", formData);

      setMsg(res.data.msg);

      // 👇 IMPORTANT FIX
      const user = res.data.user; // backend se user object hona chahiye
      const token = res.data.token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // redirect
      navigate("/");

    } catch (error) {
      setMsg(error.response?.data?.msg || "Login failed. Please check your credentials.");
    }

  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-4">
      {/* Container */}
      <div className="relative w-full max-w-5xl flex rounded-2xl overflow-hidden shadow-2xl">

        {/* Left Side Form */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-lime-600 flex items-center justify-center mb-4 mx-auto shadow-lg">
            <span className="text-white text-2xl">⚽</span>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
            Sports Login 🏆
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">
            Welcome back to Famous Sports
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <div>
              <label className="text-sm font-semibold text-gray-600 px-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="player@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-3 rounded-lg border ${errors.email ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 px-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="text-sm font-semibold text-gray-600 px-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Dynamic type
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full mt-1 px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
                />

                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-gray-500 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 px-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-lime-600 py-3 mt-4 rounded-lg text-white font-bold hover:brightness-110 active:scale-95 transition duration-300 shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-between mt-6 text-sm">
            <button className="text-gray-500 hover:text-green-600 transition-colors">
              Forgot Password?
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-green-600 font-bold hover:underline"
            >
              Create Account
            </button>
          </div>

          {/* Backend Error Message */}
          {msg && (
            <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-center text-red-600 text-sm font-medium">{msg}</p>
            </div>
          )}
        </div>

        {/* Right Side UI */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-lime-700 items-center justify-center text-white p-12">
          <div className="text-center">
            <h2 className="text-4xl font-black mb-4 leading-tight">
              Welcome Back <br /> Player 👋⚽
            </h2>
            <p className="text-base opacity-90 leading-relaxed max-w-xs mx-auto">
              Login to access your personalized dashboard and track your sports gear orders.
            </p>

            <div className="mt-8 flex justify-center gap-4 text-3xl">
              🏏 🏀 👟
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-12 px-8 py-3 bg-white text-green-700 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all shadow-xl"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


