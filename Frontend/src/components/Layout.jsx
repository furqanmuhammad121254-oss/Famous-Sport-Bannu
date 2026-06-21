// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { LayoutDashboard, ShoppingBag, Users, FolderOpen, LogOut, ShieldAlert, } from "lucide-react";
// import api from "../services/api.js";
// import { FaTachometerAlt } from "react-icons/fa";

// function Layout() {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const handleLogout = async () => {
//         try {
//             await api.post("/auth/logout");
//             navigate("/", { replace: true });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // Helper to style active sidebar navigation link
//     const isActive = (path) => location.pathname === path;

//     const navItems = [
//         { path: "desboard", label: "Home", icon: LayoutDashboard },
//         { path: "assign", label: "Products create", icon: ShoppingBag },
//         { path: "allproduct", label: "All Products", icon: ShoppingBag },
//         { path: "Order", label: "Orders", icon: ShoppingBag },
//         { path: "user", label: "Users", icon: Users },
//         { path: "categories", label: "Categories", icon: FolderOpen },
//         { path: "contacts", label: "Contacts", icon: FolderOpen },
//     ];

//     return (
//         <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased selection:bg-yellow-400 selection:text-black">

//             {/* Header */}
//             <header className="h-16 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
//                 <div className="flex items-center gap-3">
//                     <div className="h-8 w-1 bg-yellow-400 rounded-full" />
//                     <h1 className="font-black text-xl tracking-tight uppercase">
//                         Famous <span className="text-yellow-400">Sports</span>
//                     </h1>
//                 </div>

//                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700/60">
//                     <ShieldAlert size={15} className="text-yellow-400" />
//                     <span className="text-xs font-bold tracking-wide uppercase text-neutral-300 pr-1">Admin Panel</span>
//                 </div>
//             </header>

//             <div className="flex flex-1">

//                 {/* Sidebar */}
//                 <aside className="w-64 fixed left-0 top-16 bottom-0 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between p-4 z-40 hidden md:flex">

//                     {/* Navigation Links */}
//                     <div className="w-full">
//                         <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 pl-3 mb-4">
//                             Management Core
//                         </p>

//                         <div className="flex items-center gap-2 mb-10 ml-9 text-white  hover:text-yellow-500 cursor-pointer">
//                             <FaTachometerAlt />
//                             <span>Dashboard</span>
//                         </div>

//                         <ul className="space-y-8">
//                             {navItems.map((item) => {
//                                 const Icon = item.icon;
//                                 const active = isActive(item.path);
//                                 return (
//                                     <li key={item.path}>
//                                         <button
//                                             onClick={() => navigate(item.path)}
//                                             className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${active
//                                                     ? "bg-yellow-400 text-neutral-950 font-bold shadow-lg shadow-yellow-400/10"
//                                                     : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60"
//                                                 }`}
//                                         >
//                                             <Icon size={18} className={active ? "text-neutral-950" : "text-neutral-400 group-hover:text-yellow-400 transition-colors"} />
//                                             <span>{item.label}</span>

//                                             {active && (
//                                                 <div className="absolute right-3 w-1.5 h-1.5 bg-neutral-950 rounded-full" />
//                                             )}
//                                         </button>
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                     </div>

//                     {/* Footer / Logout segment */}
//                     <div className="pt-4 border-t border-neutral-800">
//                         <button
//                             onClick={handleLogout}
//                             className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 border border-neutral-700/50 hover:border-red-900/50 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
//                         >
//                             <LogOut size={16} />
//                             <span>Exit Session</span>
//                         </button>
//                     </div>

//                 </aside>

//                 {/* Main Dynamic Viewport Window */}
//                 <main className="flex-1 min-h-[calc(100vh-64px)] md:pl-64">
//                     <div className="p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
//                         <Outlet />
//                     </div>
//                 </main>

//             </div>
//         </div>
//     );
// }

// export default Layout;


import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Users, 
    FolderOpen, 
    LogOut, 
    ShieldAlert,
    Menu,
    X
} from "lucide-react";
import api from "../services/api.js";
import { FaTachometerAlt } from "react-icons/fa";

function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            navigate("/", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: "desboard", label: "Home", icon: LayoutDashboard },
        { path: "assign", label: "Products create", icon: ShoppingBag },
        { path: "allproduct", label: "All Products", icon: ShoppingBag },
        { path: "Order", label: "Orders", icon: ShoppingBag },
        { path: "user", label: "Users", icon: Users },
        { path: "categories", label: "Categories", icon: FolderOpen },
        { path: "contacts", label: "Contacts", icon: FolderOpen },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false); // Close mobile drawer immediately on navigation split
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased selection:bg-yellow-400 selection:text-black relative">

            {/* Header */}
            <header className="h-16 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    {/* Mobile Menu Action Toggle Switch */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 -ml-2 text-neutral-400 hover:text-white bg-neutral-800/40 hover:bg-neutral-800 rounded-xl border border-neutral-800 md:hidden transition-colors"
                        aria-label="Toggle navigation drawer"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="h-8 w-1 bg-yellow-400 rounded-full hidden xs:block" />
                    <h1 className="font-black text-lg sm:text-xl tracking-tight uppercase">
                        Famous <span className="text-yellow-400">Sports</span>
                    </h1>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700/60">
                    <ShieldAlert size={14} className="text-yellow-400" />
                    <span className="text-[10px] sm:text-xs font-bold tracking-wide uppercase text-neutral-300 pr-1">Admin Panel</span>
                </div>
            </header>

            <div className="flex flex-1">

                {/* Desktop Sidebar Panel View (Visible md layout grids and higher) */}
                <aside className="w-64 fixed left-0 top-16 bottom-0 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between p-4 z-40 hidden md:flex">
                    <div className="w-full">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 pl-3 mb-4">
                            Management Core
                        </p>

                        <div className="flex items-center gap-2 mb-10 ml-9 text-white hover:text-yellow-500 cursor-pointer transition-colors text-sm font-medium">
                            <FaTachometerAlt />
                            <span>Dashboard</span>
                        </div>

                        <ul className="space-y-4">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (
                                    <li key={item.path}>
                                        <button
                                            onClick={() => handleNavigation(item.path)}
                                            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                                                active
                                                    ? "bg-yellow-400 text-neutral-950 font-bold shadow-lg shadow-yellow-400/10"
                                                    : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60"
                                            }`}
                                        >
                                            <Icon size={18} className={active ? "text-neutral-950" : "text-neutral-400 group-hover:text-yellow-400 transition-colors"} />
                                            <span>{item.label}</span>
                                            {active && <div className="absolute right-3 w-1.5 h-1.5 bg-neutral-950 rounded-full" />}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-neutral-800">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 border border-neutral-700/50 hover:border-red-900/50 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
                        >
                            <LogOut size={16} />
                            <span>Exit Session</span>
                        </button>
                    </div>
                </aside>

                {/* Mobile Drawer Navigation System */}
                {/* Backdrop Overlay Component */}
                <div 
                    className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
                        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Mobile Slideout Canvas Segment */}
                <aside 
                    className={`fixed top-16 bottom-0 left-0 w-72 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between p-4 z-40 transition-transform duration-300 transform md:hidden ${
                        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="w-full overflow-y-auto pr-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 pl-3 mb-4">
                            Management Core
                        </p>

                        <div className="flex items-center gap-2 mb-6 ml-9 text-white hover:text-yellow-500 cursor-pointer text-sm font-medium">
                            <FaTachometerAlt />
                            <span>Dashboard</span>
                        </div>

                        <ul className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (
                                    <li key={item.path}>
                                        <button
                                            onClick={() => handleNavigation(item.path)}
                                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                                                active
                                                    ? "bg-yellow-400 text-neutral-950 font-bold shadow-lg shadow-yellow-400/10"
                                                    : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60"
                                            }`}
                                        >
                                            <Icon size={18} className={active ? "text-neutral-950" : "text-neutral-400"} />
                                            <span>{item.label}</span>
                                            {active && <div className="absolute right-3 w-1.5 h-1.5 bg-neutral-950 rounded-full" />}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 bg-neutral-900">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 border border-neutral-700/50 hover:border-red-900/50 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                        >
                            <LogOut size={16} />
                            <span>Exit Session</span>
                        </button>
                    </div>
                </aside>

                {/* Main Dynamic Viewport Window */}
                <main className="flex-1 min-h-[calc(100vh-64px)] w-full md:pl-64 transition-all duration-300">
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
}

export default Layout;