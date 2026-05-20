import React from "react";

const Home = () => {
  return (
    <div className="h-137 bg-black p-6 overflow-y-auto">

     
      <div className="bg-[#2c2c2c] text-white text-3xl font-serif p-6 rounded-2xl mb-8 shadow-lg">
        Dashboard Overview
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        
        <div className="bg-[#2c2c2c] rounded-2xl p-6 shadow-md hover:scale-105 transition">
          <h2 className="text-yellow-400 text-lg font-semibold">
            Active Users
          </h2>
          <p className="text-white text-4xl mt-4 font-bold">10</p>
        </div>

        
        <div className="bg-[#2c2c2c] rounded-2xl p-6 shadow-md hover:scale-105 transition">
          <h2 className="text-yellow-400 text-lg font-semibold">
            Total Categories
          </h2>
          <p className="text-white text-4xl mt-4 font-bold">50</p>
        </div>


        <div className="bg-[#2c2c2c] rounded-2xl p-6 shadow-md hover:scale-105 transition">
          <h2 className="text-yellow-400 text-lg font-semibold">
            Total Products
          </h2>
          <p className="text-white text-4xl mt-4 font-bold">5</p>
        </div>

      
        <div className="bg-[#2c2c2c] rounded-2xl p-6 shadow-md hover:scale-105 transition">
          <h2 className="text-yellow-400 text-lg font-semibold">
            Total Orders
          </h2>
          <p className="text-white text-4xl mt-4 font-bold">12</p>
        </div>

      </div>

     
      <h2 className="text-2xl font-serif text-white mt-10 mb-4">
        Recently Issued Items
      </h2>

     
      <div className="bg-[#1e1e1e] h-64 rounded-2xl flex items-center justify-center text-gray-400">
        No Data Available
      </div>

    </div>
  );
};

export default Home;