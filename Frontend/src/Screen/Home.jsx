import React from "react";
import { Users, FolderOpen, ShoppingBag, ClipboardList, TrendingUp } from "lucide-react";

const Home = () => {
  // Mock statistical data card matrix
  const stats = [
    {
      title: "Active Users",
      value: "10",
      change: "+12% this week",
      icon: Users,
      glow: "group-hover:shadow-blue-500/5",
    },
    {
      title: "Total Categories",
      value: "50",
      change: "Live categories",
      icon: FolderOpen,
      glow: "group-hover:shadow-amber-500/5",
    },
    {
      title: "Total Products",
      value: "5",
      change: "In stock items",
      icon: ShoppingBag,
      glow: "group-hover:shadow-yellow-500/5",
    },
    {
      title: "Total Orders",
      value: "12",
      change: "+4 new today",
      icon: ClipboardList,
      glow: "group-hover:shadow-emerald-500/5",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 selection:bg-yellow-400 selection:text-black">
      
      {/* Dynamic Title Header Bar Block */}
      <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-900/40 border border-neutral-800/80 p-8 rounded-2xl mb-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-[300px] h-full bg-yellow-400/5 blur-3xl rounded-full pointer-events-none" />
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
            Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Overview</span>
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Real-time management controls and sports storefront metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase text-neutral-400 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Metrics
        </div>
      </div>

      {/* Grid Matrix Metrics Block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className={`group bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/80 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-neutral-700 hover:-translate-y-1 ${stat.glow}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 text-sm font-bold tracking-wide uppercase">
                  {stat.title}
                </span>
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-yellow-400/30 group-hover:bg-yellow-400/10 text-neutral-400 group-hover:text-yellow-400 transition-all duration-300">
                  <Icon size={20} />
                </div>
              </div>
              
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white tracking-tight">
                  {stat.value}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                {stat.change.includes("+") ? (
                  <TrendingUp size={12} className="text-emerald-500" />
                ) : null}
                <span className={stat.change.includes("+") ? "text-emerald-500/90 font-semibold" : ""}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Secondary Section Area Layout */}
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-neutral-200 uppercase mb-5">
          Recently Issued Items
        </h2>

        {/* Empty Data Placeholder Empty Canvas Treatment */}
        <div className="bg-neutral-900/30 border border-dashed border-neutral-800 h-64 rounded-2xl flex flex-col items-center justify-center gap-3 text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/20 to-transparent pointer-events-none" />
          <div className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-600">
            <ClipboardList size={28} />
          </div>
          <div>
            <p className="text-neutral-400 font-bold text-base">No Data Available</p>
            <p className="text-neutral-500 text-xs mt-1 max-w-xs">
              When items are checked out or processed through the storefront, logs will propagate here.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;