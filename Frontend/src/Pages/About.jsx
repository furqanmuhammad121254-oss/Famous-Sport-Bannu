import React from "react";
import Navber from "../components/Navber";
import ceo from "../assets/ceo.jpg";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navber />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        
        {/* IMAGE */}
        <div className="w-full md:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-64 h-64 bg-red-600 rounded-full blur-[80px] opacity-20"></div>

          <img
            src={ceo}
            alt="CEO"
            className="relative z-10 rounded-2xl shadow-2xl border-b-4 border-r-4 border-red-600 w-full h-[800px] object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* TEXT */}
        <div className="w-full md:w-1/2 space-y-6">
          <span className="text-gray-50 font-bold tracking-widest uppercase text-sm">
            Our Legacy
          </span>

          <h2 className="text-5xl font-extrabold leading-tight">
            About{" "}
            <span className="bg-yellow-400 text-transparent bg-clip-text">
              Famous Sports
            </span>
          </h2>

          <p className="text-gray-400 italic pt-4">
            We believe every athlete deserves the best equipment without high prices.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Famous Sports Bannu was founded with a simple mission — to bring
            high-quality sports gear to every athlete in Pakistan. What started
            as a small local shop has now grown into a trusted destination for
            sports lovers.
          </p>

          {/* CEO INFO */}
          <div className="pt-4">
            <h3 className="text-xl font-bold">Asad Khan</h3>
            <p className="text-yellow-500 text-sm">Founder & Owner</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="border-l-2 border-yellow-500 pl-4">
              <h4 className="text-3xl font-bold">10k+</h4>
              <p className="text-gray-500 text-sm uppercase">
                Equipments Sold
              </p>
            </div>

            <div className="border-l-2 h-15 border-yellow-500 pl-4">
              <h4 className="text-3xl font-bold">5k+</h4>
              <p className="text-gray-500 text-sm uppercase ">
                Happy Athletes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:scale-105 transition">
            <h4 className="text-xl font-bold text-yellow-400">Our Mission</h4>
            <p className="text-gray-400 mt-2 text-sm">
              Quality sports equipment can be available for every athlete in Pakistan.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:scale-105 transition">
            <h4 className="text-xl font-bold text-yellow-400">Our Vision</h4>
            <p className="text-gray-400 mt-2 text-sm">
              To become Pakistan’s leading sports brand trusted by professionals and beginners alike.
            </p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-zinc-900 py-20 px-6 mt-16">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          <h3 className="text-3xl font-bold">Why Choose Us</h3>
          <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>

          <div className="grid md:grid-cols-3 gap-10 mt-10">
            
            <div className="space-y-3 hover:scale-105 transition">
              <div className="text-yellow-400 text-4xl">🏆</div>
              <h5 className="font-bold text-xl">Premium Quality</h5>
              <p className="text-gray-400 text-sm">
                High-quality sports gear tested for durability.
              </p>
            </div>

            <div className="space-y-3 hover:scale-105 transition">
              <div className="text-yellow-400 text-4xl">💰</div>
              <h5 className="font-bold text-xl">Affordable Prices</h5>
              <p className="text-gray-400 text-sm">
                Best prices for every athlete in the community.
              </p>
            </div>

            <div className="space-y-3 hover:scale-105 transition">
              <div className="text-red-600 text-4xl">📍</div>
              <h5 className="font-bold text-xl">Local Support</h5>
              <p className="text-gray-400 text-sm">
                Proudly serving Bannu and nearby areas.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="text-center py-20">
        <h3 className="text-3xl font-bold mb-4">
          Join Our Sports Community
        </h3>
        <p className="text-gray-400 mb-6">
          Upgrade your game with the best sports gear today.
        </p>

        <button  onClick={()=> navigate("/shop")} className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
          Shop Now
        </button>
      </section>
    </div>
  );
};

export default About;