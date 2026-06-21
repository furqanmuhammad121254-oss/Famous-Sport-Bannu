// import React from "react";
// import Navber from "../components/Navber";
// import ceo from "../assets/ceo.jpg";
// import image from "../assets/image.jpeg"
// import { useNavigate } from "react-router-dom";

// const About = () => {

//   const navigate = useNavigate()

//   return (
//     <div className="min-h-screen bg-black text-white font-sans">
//       <Navber />

//       {/* HERO SECTION */}
//       <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">

//         {/* IMAGE */}
//         <div className="w-full md:w-1/2 relative">
//           <div className="absolute -top-4 -left-4 w-64 h-64 bg-red-600 rounded-full blur-[80px] opacity-20"></div>

//           <img
//             src={ceo}
//             alt="CEO"
//             className="relative z-10 rounded-2xl shadow-2xl border-b-4 border-r-4 border-red-600 w-[400px] h-[500px] object-cover hover:scale-105 transition duration-300 mt-15"
//           />
//           <img
//             src={image}
//             alt="CEO"
//             className="relative z-10 rounded-2xl shadow-2xl border-b-4 border-r-4 border-red-600 w-[400px] h-[500px] object-cover hover:scale-105 transition duration-300 mt-15"
//           />
//         </div>

//         {/* TEXT */}
//         <div className="w-full md:w-1/2 space-y-6">
//           <span className="text-gray-50 font-bold tracking-widest uppercase text-sm">
//             Our Legacy
//           </span>

//           <h2 className="text-5xl font-extrabold leading-tight">
//             About{" "}
//             <span className="bg-yellow-400 text-transparent bg-clip-text">
//               Famous Sports
//             </span>
//           </h2>

//           <p className="text-gray-400 italic pt-4">
//             We believe every athlete deserves the best equipment without high prices.
//           </p>

//           <p className="text-gray-300 leading-relaxed">
//             Famous Sports Bannu was founded with a simple mission — to bring
//             high-quality sports gear to every athlete in Pakistan. What started
//             as a small local shop has now grown into a trusted destination for
//             sports lovers.
//           </p>

//           {/* CEO INFO */}
//           <div className="pt-4">
//             <h3 className="text-xl font-bold">Asad Khan 
//               <span className="pl-3">Qasim Khan</span>
//             </h3>
//             <p className="text-yellow-500 text-sm">Founder & Owner</p>

//             {/* <h3 className="text-xl font-bold"></h3> */}
            
//           </div>

//           {/* STATS */}
//           <div className="grid grid-cols-2 gap-6 pt-6">
//             <div className="border-l-2 border-yellow-500 pl-4">
//               <h4 className="text-3xl font-bold">10k+</h4>
//               <p className="text-gray-500 text-sm uppercase">
//                 Equipments Sold
//               </p>
//             </div>

//             <div className="border-l-2 h-15 border-yellow-500 pl-4">
//               <h4 className="text-3xl font-bold">5k+</h4>
//               <p className="text-gray-500 text-sm uppercase ">
//                 Happy Athletes
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* MISSION & VISION */}
//       <section className="max-w-6xl mx-auto px-6 mt-10">
//         <div className="grid md:grid-cols-2 gap-8">

//           <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:scale-105 transition">
//             <h4 className="text-xl font-bold text-yellow-400">Our Mission</h4>
//             <p className="text-gray-400 mt-2 text-sm">
//               Quality sports equipment can be available for every athlete in Pakistan.
//             </p>
//           </div>

//           <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:scale-105 transition">
//             <h4 className="text-xl font-bold text-yellow-400">Our Vision</h4>
//             <p className="text-gray-400 mt-2 text-sm">
//               To become Pakistan’s leading sports brand trusted by professionals and beginners alike.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* WHY CHOOSE US */}
//       <section className="bg-zinc-900 py-20 px-6 mt-16">
//         <div className="max-w-5xl mx-auto text-center space-y-8">

//           <h3 className="text-3xl font-bold">Why Choose Us</h3>
//           <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>

//           <div className="grid md:grid-cols-3 gap-10 mt-10">

//             <div className="space-y-3 hover:scale-105 transition">
//               <div className="text-yellow-400 text-4xl">🏆</div>
//               <h5 className="font-bold text-xl">Premium Quality</h5>
//               <p className="text-gray-400 text-sm">
//                 High-quality sports gear tested for durability.
//               </p>
//             </div>

//             <div className="space-y-3 hover:scale-105 transition">
//               <div className="text-yellow-400 text-4xl">💰</div>
//               <h5 className="font-bold text-xl">Affordable Prices</h5>
//               <p className="text-gray-400 text-sm">
//                 Best prices for every athlete in the community.
//               </p>
//             </div>

//             <div className="space-y-3 hover:scale-105 transition">
//               <div className="text-red-600 text-4xl">📍</div>
//               <h5 className="font-bold text-xl">Local Support</h5>
//               <p className="text-gray-400 text-sm">
//                 Proudly serving Bannu and nearby areas.
//               </p>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* CALL TO ACTION */}
//       <section className="text-center py-20">
//         <h3 className="text-3xl font-bold mb-4">
//           Join Our Sports Community
//         </h3>
//         <p className="text-gray-400 mb-6">
//           Upgrade your game with the best sports gear today.
//         </p>

//         <button onClick={() => navigate("/shop")} className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
//           Shop Now
//         </button>
//       </section>
//     </div>
//   );
// };

// export default About;


import React from "react";
import Navber from "../components/Navber";
import ceo from "../assets/ceo.jpg";
import image from "../assets/image.jpeg";
import { useNavigate } from "react-router-dom";
import { Award, DollarSign, MapPin, Target, Eye, ArrowRight, Sparkles } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans antialiased selection:bg-yellow-400/30 selection:text-white relative overflow-hidden">
      <Navber />

      {/* Background Ambient Light Flares */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-red-600/[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* ================= HERO HERO & LEGACY SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
        
        {/* LMDX MODERN COLLAGE GRID LAYOUT */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 order-2 lg:order-1">
          <div className="relative w-full max-w-[440px] aspect-[4/5]">
            
            {/* Background Accent Backdrop Border */}
            <div className="absolute inset-0 border border-neutral-900 rounded-3xl translate-x-4 translate-y-4 pointer-events-none" />
            
            {/* Secondary Image: Shifted Down & Back */}
            <div className="absolute bottom-0 left-0 w-[75%] aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl z-10 transform -translate-x-6 translate-y-4 hover:scale-[1.02] hover:z-20 transition-all duration-500 group ml-50">
              <img
                src={image}
                alt="Famous Sports Operations"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 "
              />
              
            </div>

            

            {/* Primary Image (CEO Asset Focus): Layered Forward */}
            <div className="top-0 right-0 w-[80%] aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl z-20 hover:scale-[1.02] transition-all duration-500 group mb-50">
              <img
                src={ceo}
                alt="Executive Leadership Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            
          </div>
        </div>

        {/* TEXT CONTENT COLUMN */}
        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 order-1 lg:order-2">
          <div className="space-y-2">
            <span className="text-yellow-400 font-mono text-xs tracking-[0.25em] uppercase font-bold flex items-center gap-2">
              <Sparkles size={12} /> Our Legacy & Foothold
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.05]">
              About <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600 text-transparent bg-clip-text">
                Famous Sports
              </span>
            </h1>
          </div>

          <div className="space-y-4 border-l-2 border-neutral-900 pl-4 sm:pl-6 py-1">
            <p className="text-neutral-400 text-sm sm:text-base italic leading-relaxed font-light">
              "We believe every single athlete deserves premium elite-tier equipment without carrying excessive high-premium markup price tags."
            </p>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Famous Sports Bannu was established with an uncompromised vision—to deliver premium, high-caliber sports gear to dedicated athletes across Pakistan. What began as a boutique local outlet has scaled reliably into a top destination for professionals and sports enthusiasts alike.
            </p>
          </div>

          {/* FOUNDERS METADATA MATRICES */}
          <div className="bg-neutral-950/60 backdrop-blur-md border border-neutral-900/80 rounded-2xl p-4 sm:p-5 flex flex-col xs:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black text-white tracking-wide truncate">Asad Khan</h3>
              <p className="text-yellow-500 font-mono text-[11px] uppercase tracking-wider mt-0.5">Founder & Director</p>
            </div>
            <div className="hidden xs:block w-px bg-neutral-900 self-stretch" />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black text-white tracking-wide truncate">Qasim Khan</h3>
              <p className="text-yellow-500 font-mono text-[11px] uppercase tracking-wider mt-0.5">Co-Owner & Strategist</p>
            </div>
          </div>

          {/* PERFORMANCE HISTORICAL STATS */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
            <div className="bg-neutral-950/40 border border-neutral-900/60 rounded-2xl p-4 transition-colors hover:border-neutral-900">
              <h4 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">1K+</h4>
              <p className="text-neutral-500 text-[10px] sm:text-xs uppercase tracking-widest font-mono mt-1 font-bold">
                Equipments Dispatched
              </p>
            </div>

            <div className="bg-neutral-950/40 border border-neutral-900/60 rounded-2xl p-4 transition-colors hover:border-neutral-900">
              <h4 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">2K+</h4>
              <p className="text-neutral-500 text-[10px] sm:text-xs uppercase tracking-widest font-mono mt-1 font-bold">
                Active Verified Athletes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STRATEGIC CORE TARGETS (MISSION/VISION) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-neutral-950/40 border border-neutral-900 p-6 sm:p-8 rounded-3xl hover:border-neutral-800 transition-all duration-300 relative group">
            <div className="w-10 h-10 bg-yellow-400/5 text-yellow-400 rounded-xl flex items-center justify-center border border-yellow-400/10 mb-4 group-hover:scale-110 transition-transform">
              <Target size={18} />
            </div>
            <h4 className="text-lg font-bold text-white uppercase tracking-wide">Our Mission</h4>
            <p className="text-neutral-400 mt-2 text-xs sm:text-sm leading-relaxed">
              To democratize premium sports infrastructure, ensuring world-class equipment is fully accessible to every aspiring athlete across Pakistan without exception.
            </p>
          </div>

          <div className="bg-neutral-950/40 border border-neutral-900 p-6 sm:p-8 rounded-3xl hover:border-neutral-800 transition-all duration-300 relative group">
            <div className="w-10 h-10 bg-yellow-400/5 text-yellow-400 rounded-xl flex items-center justify-center border border-yellow-400/10 mb-4 group-hover:scale-110 transition-transform">
              <Eye size={18} />
            </div>
            <h4 className="text-lg font-bold text-white uppercase tracking-wide">Our Vision</h4>
            <p className="text-neutral-400 mt-2 text-xs sm:text-sm leading-relaxed">
              To scale as Pakistan's premium benchmark sports brand, trusted equally by elite domestic professionals on day one and foundational beginners starting their journeys.
            </p>
          </div>
        </div>
      </section>

      {/* ================= VALUES DIFFERENTIATORS VALUE STREAM ================= */}
      <section className="bg-neutral-950/60 border-y border-neutral-950 py-16 md:py-24 px-4 sm:px-6 mt-16 relative">
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Why Choose Us</h3>
            <div className="w-12 h-[2px] bg-yellow-400 mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 mt-10">
            <div className="space-y-3 group">
              <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-yellow-400 mx-auto border border-neutral-800 group-hover:border-yellow-400/30 transition-all shadow-inner">
                <Award size={20} />
              </div>
              <h5 className="font-bold text-neutral-100 text-lg uppercase tracking-wide">Premium Quality</h5>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                High-end materials engineered and vetted comprehensively for extreme on-field durability.
              </p>
            </div>

            <div className="space-y-3 group">
              <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-yellow-400 mx-auto border border-neutral-800 group-hover:border-yellow-400/30 transition-all shadow-inner">
                <DollarSign size={20} />
              </div>
              <h5 className="font-bold text-neutral-100 text-lg uppercase tracking-wide">Honest Pricing</h5>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                Direct cost efficiency mapping designed to maximize community athletic accessibility.
              </p>
            </div>

            <div className="space-y-3 group">
              <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-red-500 mx-auto border border-neutral-800 group-hover:border-red-500/30 transition-all shadow-inner">
                <MapPin size={20} />
              </div>
              <h5 className="font-bold text-neutral-100 text-lg uppercase tracking-wide">Local Hub Support</h5>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                Proudly servicing Bannu, regional hubs, and surrounding districts with immediate local processing.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= ENGAGEMENT CALL TO ACTION (CTA) ================= */}
      <section className="text-center py-20 sm:py-28 px-4 max-w-4xl mx-auto relative z-10">
        <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3">
          Elevate Your Performance Metrics
        </h3>
        <p className="text-neutral-400 text-sm sm:text-base max-w-lg mx-auto mb-8 font-light">
          Upgrade your structural operational game with engineered elite sports assets right now.
        </p>

        <button 
          onClick={() => navigate("/shop")} 
          className="group bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 select-none active:scale-95 transition-all shadow-xl shadow-yellow-400/5 cursor-pointer"
        >
          <span>Explore Catalog</span>
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </section>
    </div>
  );
};

export default About;