import { Outlet, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function Layout() {
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            navigate("/",
                { replace: true });
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <div className="flex flex-col">

            <header className="py-4 bg-linear-to-r from-[#0F0F0F] to-[#1C1C1C] text-white flex items-center justify-between">
                <h1 className="font-bold text-lg pl-2">Famous Sports</h1>
                <p className="pr-3"> Admin </p>

            </header>

            <div className="flex flex-1">

                {/* Sidebar */}
                <aside className="w-64 h-137 bg-[#0f0f0f] text-white flex flex-col justify-between p-4 shadow-xl">

                    {/* Menu */}
                    <ul className="pt-6 space-y-3">
                         
                        <h1 className="pl-5 font-extrabold"> 📊 Dashboard</h1>

                        <li>
                            <button
                                onClick={() => navigate("/home")}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-blue-600 transition-all"
                            >
                                🏠 <span>Home</span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => navigate("/assign")}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-blue-600 transition-all"
                            >
                                📦 <span>Products</span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => navigate("/returned")}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-blue-600 transition-all"
                            >
                                👥 <span>Users</span>
                            </button>
                        </li>

                          <li>
                            <button
                                onClick={() => navigate("/cateigories")}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-blue-600 transition-all"
                            >
                                🎯 <span>Categories</span>
                            </button>
                        </li>
                        {/* Hidden / empty buttons removed for clean UI */}

                    </ul>

                    {/* Logout */}
                    <div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-red-600 py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg"
                        >
                            🚪 Logout
                        </button>
                    </div>

                </aside>

                {/* Main */}
                <main className="flex-1 text-white p-0">
                    <Outlet />
                </main>

            </div>
        </div>

    );
}

export default Layout;
