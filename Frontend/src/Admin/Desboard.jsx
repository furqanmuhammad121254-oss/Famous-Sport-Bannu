// import React, { useState, useEffect } from "react";
// import { 
//   Users, 
//   FolderOpen, 
//   ShoppingBag, 
//   ClipboardList, 
//   TrendingUp, 
//   Activity, 
//   RefreshCcw, 
//   ArrowUpRight 
// } from "lucide-react";

// const API_BASE_URL = "http://localhost:3000";

// const Dashboard = () => {
//   // State variables for dynamic data metrics
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalCategories, setTotalCategories] = useState(0);
  
//   // Isolated async status flags
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [usersLoading, setUsersLoading] = useState(true);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // 1. Fetch categories from /AllCategories endpoint
//   const fetchCategories = async () => {
//     setCategoriesLoading(true);
//     try {
//       // Replaced your snippet's generic 'api.get' with native fetch matching your boilerplate
//       const response = await fetch(`${API_BASE_URL}/AllCategories`);
//       if (!response.ok) throw new Error(`Category server error: ${response.status}`);
      
//       const data = await response.json();
//       // Safe checks for data.categories or top-level array formats
//       const categoryList = data.categories || data || [];
//       setTotalCategories(Array.isArray(categoryList) ? categoryList.length : 0);
//     } catch (error) {
//       console.error("Categories Network Layer Exception:", error);
//     } finally {
//       setCategoriesLoading(false);
//     }
//   };

//   // 2. Fetch products from /AllAssign endpoint
//   const fetchProducts = async () => {
//     setProductsLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/AllAssign`);
//       if (!response.ok) throw new Error(`Products server error: ${response.status}`);
      
//       const data = await response.json();

//       if (data.success && data.assignList) {
//         setTotalProducts(data.assignList.length); 
//       } else if (Array.isArray(data)) {
//         setTotalProducts(data.length);
//       } else {
//         console.error("Products sync process failure.");
//       }
//     } catch (error) {
//       console.error("Products Network Layer Exception:", error);
//     } finally {
//       setProductsLoading(false);
//     }
//   };

//   // 3. Fetch users from /auth/all-users endpoint
//   const fetchUsers = async () => {
//     setUsersLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/all-users`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const data = await response.json();
//       const userList = data.users || data.assignList || (Array.isArray(data) ? data : []);
//       setTotalUsers(userList.length);
//     } catch (error) {
//       console.error("Users Network Layer Exception:", error);
//     } finally {
//       setUsersLoading(false);
//     }
//   };

//   // Synchronize initial data loading operations concurrently
//   const loadDashboardData = async () => {
//     await Promise.all([fetchProducts(), fetchUsers(), fetchCategories()]);
//     setIsRefreshing(false);
//   };

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   // Manual explicit refresh dispatch trigger 
//   const handleManualRefresh = () => {
//     setIsRefreshing(true);
//     loadDashboardData();
//   };

//   // Statistical data array configuration matrix
//   const stats = [
//     {
//       title: "Active Users",
//       value: totalUsers.toString(),
//       change: "+12% this week",
//       icon: Users,
//       glow: "hover:shadow-blue-500/5 hover:border-blue-500/30",
//       accent: "text-blue-400",
//       isLoading: usersLoading,
//     },
//     {
//       title: "Total Categories",
//       value: totalCategories.toString(), // Updated from your static placeholder string "50"
//       change: "Live categories",
//       icon: FolderOpen,
//       glow: "hover:shadow-amber-500/5 hover:border-amber-500/30",
//       accent: "text-amber-400",
//       isLoading: categoriesLoading,
//     },
//     {
//       title: "Total Products",
//       value: totalProducts.toString(),
//       change: "In stock items",
//       icon: ShoppingBag,
//       glow: "hover:shadow-yellow-500/5 hover:border-yellow-400/30",
//       accent: "text-yellow-400",
//       isLoading: productsLoading,
//     },
//     {
//       title: "Total Orders",
//       value: "12",
//       change: "+4 new today",
//       icon: ClipboardList,
//       glow: "hover:shadow-emerald-500/5 hover:border-emerald-500/30",
//       accent: "text-emerald-400",
//       isLoading: false,
//     },
//   ];

//   const isGlobalLoading = productsLoading || usersLoading || categoriesLoading || isRefreshing;

//   return (
//     <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-8 md:p-12 font-sans antialiased selection:bg-yellow-400 selection:text-black relative overflow-x-hidden">
      
//       {/* GLOW BACKGROUND EFFX AMBIENTS */}
//       <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-yellow-500/5 blur-[160px] rounded-full pointer-events-none z-0" />
//       <div className="absolute bottom-12 left-10 w-[400px] h-[400px] bg-amber-500/5 blur-[130px] rounded-full pointer-events-none z-0" />

//       <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
//         {/* ================= HEADER PANEL ROW ================= */}
//         <div className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-900/40 border border-neutral-800/80 p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-md">
//           <div className="space-y-1">
//             <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase flex items-center gap-2.5">
//               <Activity className="text-yellow-400 animate-pulse w-6 h-6" />
//               Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Overview</span>
//             </h1>
//             <p className="text-neutral-400 text-xs md:text-sm">
//               Real-time monitoring node classifications, database instances, and registration variables.
//             </p>
//           </div>

//           <div className="flex items-center gap-3 self-start sm:self-auto">
//             <button 
//               onClick={handleManualRefresh}
//               disabled={isGlobalLoading}
//               className="p-2.5 bg-neutral-900 border border-neutral-900 hover:border-neutral-800 disabled:opacity-40 text-neutral-400 hover:text-white rounded-xl transition-all active:scale-95 flex items-center justify-center shadow-md group"
//               title="Force Refresh Matrices"
//             >
//               <RefreshCcw size={14} className={`group-hover:rotate-180 transition-transform duration-500 ${isGlobalLoading ? "animate-spin" : ""}`} />
//             </button>

//             <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 px-3.5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase text-neutral-400 shadow-inner font-mono">
//               <span className={`w-1.5 h-1.5 rounded-full ${isGlobalLoading ? "bg-amber-500 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
//               {isGlobalLoading ? "syncing_nodes" : "system_live"}
//             </div>
//           </div>
//         </div>

//         {/* ================= METRICS DATA CARDS LAYER ================= */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {stats.map((stat, i) => {
//             const Icon = stat.icon;

//             return (
//               <div 
//                 key={i} 
//                 className={`group bg-neutral-900/30 backdrop-blur-xl border border-neutral-800/60 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 select-none flex flex-col justify-between relative overflow-hidden ${stat.glow}`}
//               >
//                 <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent transition-opacity duration-300" />

//                 <div>
//                   <div className="flex items-center justify-between gap-4">
//                     <span className="text-neutral-400 text-[11px] font-extrabold tracking-wider uppercase font-mono">
//                       {stat.title}
//                     </span>
//                     <div className={`p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-neutral-700 transition-colors duration-300 ${stat.accent}`}>
//                       <Icon size={16} />
//                     </div>
//                   </div>
                  
//                   <div className="mt-4">
//                     {stat.isLoading ? (
//                       <div className="h-10 flex items-center">
//                         <div className="w-16 h-7 bg-neutral-900 animate-pulse rounded-lg border border-neutral-800" />
//                       </div>
//                     ) : (
//                       <div className="flex items-baseline gap-1.5">
//                         <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
//                           {stat.value}
//                         </span>
//                         {stat.change.includes("+") && (
//                           <ArrowUpRight size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 duration-300" />
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-5 pt-3 border-t border-neutral-800/40 flex items-center gap-1.5 text-xs text-neutral-500 font-medium font-mono">
//                   {stat.change.includes("+") ? (
//                     <TrendingUp size={12} className="text-emerald-500 shrink-0" />
//                   ) : (
//                     <span className="w-1 h-1 rounded-full bg-neutral-700 shrink-0" />
//                   )}
//                   <span className={`text-[11px] ${stat.change.includes("+") ? "text-emerald-500/80 font-bold" : "text-neutral-500"}`}>
//                     {stat.change}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* ================= SECONDARY LIST CANVAS AREA ================= */}
//         <div className="space-y-4">
//           <div className="border-b border-neutral-900 pb-2">
//             <h2 className="text-sm font-extrabold tracking-widest text-neutral-400 uppercase">
//               Recently Issued Allocation Logs
//             </h2>
//           </div>

//           <div className="bg-neutral-900/10 border border-dashed border-neutral-800/80 h-64 rounded-2xl flex flex-col items-center justify-center gap-3 text-center px-6 relative overflow-hidden backdrop-blur-sm">
//             <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/40 to-transparent pointer-events-none" />
//             <div className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-600 shadow-inner">
//               <ClipboardList size={24} />
//             </div>
//             <div className="space-y-1">
//               <p className="text-neutral-300 font-bold text-xs font-mono uppercase tracking-wider">No Activity Logged</p>
//               <p className="text-neutral-500 text-[11px] max-w-xs mx-auto leading-relaxed">
//                 When items are assigned or altered across active nodes, live stream updates populate right inside this canvas tracking block.
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { 
  Users, 
  FolderOpen, 
  ShoppingBag, 
  ClipboardList, 
  TrendingUp, 
  Activity, 
  RefreshCcw, 
  ArrowUpRight 
} from "lucide-react";

const API_BASE_URL = "http://localhost:3000";

const Dashboard = () => {
  // State variables for dynamic data metrics
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  
  // Isolated async status flags
  const [productsLoading, setProductsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Fetch categories from /AllCategories endpoint
  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/AllCategories`);
      if (!response.ok) throw new Error(`Category server error: ${response.status}`);
      
      const data = await response.json();
      const categoryList = data.categories || data || [];
      setTotalCategories(Array.isArray(categoryList) ? categoryList.length : 0);
    } catch (error) {
      console.error("Categories Network Layer Exception:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // 2. Fetch products from /AllAssign endpoint
  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/AllAssign`);
      if (!response.ok) throw new Error(`Products server error: ${response.status}`);
      
      const data = await response.json();

      if (data.success && data.assignList) {
        setTotalProducts(data.assignList.length); 
      } else if (Array.isArray(data)) {
        setTotalProducts(data.length);
      } else {
        console.error("Products sync process failure.");
      }
    } catch (error) {
      console.error("Products Network Layer Exception:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  // 3. Fetch users from /auth/all-users endpoint
  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/all-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const userList = data.users || data.assignList || (Array.isArray(data) ? data : []);
      setTotalUsers(userList.length);
    } catch (error) {
      console.error("Users Network Layer Exception:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  // Synchronize initial data loading operations concurrently
  const loadDashboardData = async () => {
    await Promise.all([fetchProducts(), fetchUsers(), fetchCategories()]);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Manual explicit refresh dispatch trigger 
  const handleManualRefresh = () => {
    setIsRefreshing(true);
    loadDashboardData();
  };

  // Statistical data array configuration matrix
  const stats = [
    {
      title: "Active Users",
      value: totalUsers.toString(),
      change: "+12% this week",
      icon: Users,
      glow: "hover:shadow-blue-500/5 hover:border-blue-500/30",
      accent: "text-blue-400",
      isLoading: usersLoading,
    },
    {
      title: "Total Categories",
      value: totalCategories.toString(),
      change: "Live categories",
      icon: FolderOpen,
      glow: "hover:shadow-amber-500/5 hover:border-amber-500/30",
      accent: "text-amber-400",
      isLoading: categoriesLoading,
    },
    {
      title: "Total Products",
      value: totalProducts.toString(),
      change: "In stock items",
      icon: ShoppingBag,
      glow: "hover:shadow-yellow-500/5 hover:border-yellow-400/30",
      accent: "text-yellow-400",
      isLoading: productsLoading,
    },
    {
      title: "Total Orders",
      value: "12",
      change: "+4 new today",
      icon: ClipboardList,
      glow: "hover:shadow-emerald-500/5 hover:border-emerald-500/30",
      accent: "text-emerald-400",
      isLoading: false,
    },
  ];

  const isGlobalLoading = productsLoading || usersLoading || categoriesLoading || isRefreshing;

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-6 md:p-10 lg:p-12 font-sans antialiased selection:bg-yellow-400 selection:text-black relative overflow-x-hidden">
      
      {/* GLOW BACKGROUND EFFX AMBIENTS - Hidden on Mobile for Performance Optimization */}
      <div className="hidden sm:block absolute top-0 right-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-yellow-500/5 blur-[100px] sm:blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="hidden sm:block absolute bottom-12 left-10 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-amber-500/5 blur-[80px] sm:blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        
        {/* ================= HEADER PANEL ROW ================= */}
        <div className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-900/40 border border-neutral-800/80 p-5 sm:p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 backdrop-blur-md">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white uppercase flex items-center gap-2.5">
              <Activity className="text-yellow-400 animate-pulse w-5 h-5 sm:w-6 sm:h-6" />
              Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Overview</span>
            </h1>
            <p className="text-neutral-400 text-[11px] sm:text-xs md:text-sm max-w-2xl leading-relaxed">
              Real-time monitoring node classifications, database instances, and registration variables.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto w-full md:w-auto justify-end">
            <button 
              onClick={handleManualRefresh}
              disabled={isGlobalLoading}
              className="p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 disabled:opacity-40 text-neutral-400 hover:text-white rounded-xl transition-all active:scale-95 flex items-center justify-center shadow-md group"
              title="Force Refresh Matrices"
            >
              <RefreshCcw size={14} className={`group-hover:rotate-180 transition-transform duration-500 ${isGlobalLoading ? "animate-spin" : ""}`} />
            </button>

            <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 px-3.5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase text-neutral-400 shadow-inner font-mono">
              <span className={`w-1.5 h-1.5 rounded-full ${isGlobalLoading ? "bg-amber-500 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
              {isGlobalLoading ? "syncing_nodes" : "system_live"}
            </div>
          </div>
        </div>

        {/* ================= METRICS DATA CARDS LAYER ================= */}
        {/* Mobile: 1 Col | Tablet: 2 Col | Desktop: 4 Col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <div 
                key={i} 
                className={`group bg-neutral-900/30 backdrop-blur-xl border border-neutral-800/60 rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 sm:hover:-translate-y-1 select-none flex flex-col justify-between relative overflow-hidden ${stat.glow}`}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-neutral-400 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase font-mono">
                      {stat.title}
                    </span>
                    <div className={`p-2 sm:p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-neutral-700 transition-colors duration-300 ${stat.accent}`}>
                      <Icon size={14} className="sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  
                  <div className="mt-3 sm:mt-4">
                    {stat.isLoading ? (
                      <div className="h-9 sm:h-10 flex items-center">
                        <div className="w-14 sm:w-16 h-6 sm:h-7 bg-neutral-900 animate-pulse rounded-lg border border-neutral-800" />
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                          {stat.value}
                        </span>
                        {stat.change.includes("+") && (
                          <ArrowUpRight size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 duration-300 hidden sm:block" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 sm:mt-5 pt-3 border-t border-neutral-800/40 flex items-center gap-1.5 text-[10px] sm:text-xs text-neutral-500 font-medium font-mono">
                  {stat.change.includes("+") ? (
                    <TrendingUp size={12} className="text-emerald-500 shrink-0" />
                  ) : (
                    <span className="w-1 h-1 rounded-full bg-neutral-700 shrink-0" />
                  )}
                  <span className={`text-[10px] sm:text-[11px] ${stat.change.includes("+") ? "text-emerald-500/80 font-bold" : "text-neutral-500"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= SECONDARY LIST CANVAS AREA ================= */}
        <div className="space-y-3 sm:space-y-4">
          <div className="border-b border-neutral-900 pb-2">
            <h2 className="text-xs sm:text-sm font-extrabold tracking-widest text-neutral-400 uppercase">
              Recently Issued Allocation Logs
            </h2>
          </div>

          <div className="bg-neutral-900/10 border border-dashed border-neutral-800/80 h-56 sm:h-64 rounded-2xl flex flex-col items-center justify-center gap-3 text-center px-4 sm:px-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/40 to-transparent pointer-events-none" />
            <div className="p-3 sm:p-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-600 shadow-inner">
              <ClipboardList size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-neutral-300 font-bold text-[11px] sm:text-xs font-mono uppercase tracking-wider">No Activity Logged</p>
              <p className="text-neutral-500 text-[10px] sm:text-[11px] max-w-xs mx-auto leading-relaxed">
                When items are assigned or altered across active nodes, live stream updates populate right inside this canvas tracking block.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;