import React, { useEffect, useState } from "react";
import { 
  Users, 
  Mail, 
  Calendar, 
  AlertCircle, 
  Loader2, 
  UserCheck, 
  ShieldCheck,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Fingerprint,
  Info,
  Zap,
  Activity
} from "lucide-react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/auth/all-users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setUsers(data.users || data || []);
    } catch (error) {
      console.error("Users load nahi ho sakay:", error);
      setError("Failed to synchronize secure user directory matrix.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && users.length === 0) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-zinc-950 text-zinc-200 antialiased">
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border border-emerald-500/10 absolute animate-ping" />
          <div className="w-14 h-14 rounded-full border-2 border-t-emerald-400 border-r-transparent border-b-emerald-400/30 border-l-transparent absolute animate-spin" />
          <Loader2 className="animate-spin text-emerald-400 w-7 h-7 relative" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] font-bold text-zinc-500">System Sync</p>
          <p className="text-xs text-zinc-700 font-mono">auth/all-users_pulling</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 antialiased font-sans selection:bg-emerald-500/20 selection:text-emerald-100 relative overflow-x-hidden p-4 sm:p-8">
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .glass-panel {
          background: rgba(24, 24, 27, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .glow-emerald {
          box-shadow: 0 0 40px -10px rgba(52, 211, 153, 0.08);
        }
        .glow-rose {
          box-shadow: 0 0 40px -10px rgba(244, 63, 94, 0.08);
        }
      `}</style>

      {/* Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">

        {/* HEADER */}
        <div className="glass-panel border border-zinc-800/60 rounded-2xl p-6 glow-emerald flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 p-2.5 rounded-xl text-emerald-400 shadow-lg shadow-emerald-900/20">
                <Users size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Directory</h2>
                <p className="text-[11px] text-zinc-500 font-medium tracking-wide uppercase">User Management System</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchUsers}
              disabled={loading}
              className="p-2.5 bg-zinc-900/80 border border-zinc-700/50 hover:border-emerald-500/40 disabled:opacity-50 text-zinc-400 hover:text-emerald-400 rounded-xl transition-all active:scale-95 flex items-center justify-center group"
            >
              <RefreshCw size={15} className={`transition-transform duration-500 ${loading ? "animate-spin" : "group-hover:rotate-180"}`} />
            </button>
            <div className="bg-zinc-900/80 border border-zinc-800 px-4 py-2.5 rounded-xl font-mono text-xs text-emerald-400 font-bold shadow-inner flex items-center gap-2">
              <Activity size={12} className="text-emerald-500 animate-pulse" />
              {users.length} Active
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <div className="relative w-full group">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-emerald-500/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 font-medium outline-none transition-all focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>
          <button className="w-full sm:w-auto px-5 py-3 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white rounded-xl transition-all font-medium text-sm flex items-center justify-center gap-2 shrink-0">
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* TABLE */}
          <div className="lg:col-span-2">
            {error ? (
              <div className="glass-panel border border-rose-900/30 rounded-2xl p-8 text-center glow-rose">
                <div className="w-14 h-14 rounded-full bg-rose-950/30 border border-rose-900/30 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="text-rose-400 w-6 h-6" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">Connection Error</h3>
                <p className="text-zinc-500 text-xs font-mono mb-6">{error}</p>
                <button 
                  onClick={fetchUsers} 
                  className="px-6 py-2.5 text-xs font-semibold bg-rose-950/20 border border-rose-900/30 hover:bg-rose-900/30 text-rose-400 rounded-xl transition-all"
                >
                  Retry Connection
                </button>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-16 text-center glass-panel border border-dashed border-zinc-800/60 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-3">
                  <Users className="text-zinc-600 w-5 h-5" />
                </div>
                <p className="text-zinc-400 font-medium text-sm">No users found</p>
                <p className="text-xs text-zinc-600 mt-1">Try adjusting your search query</p>
              </div>
            ) : (
              <div className="glass-panel border border-zinc-800/60 rounded-2xl overflow-hidden glow-emerald">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-zinc-800/80 text-[11px] font-bold uppercase tracking-wider text-zinc-500 select-none">
                        <th className="py-4 px-6">User</th>
                        <th className="py-4 px-6 hidden sm:table-cell">Email</th>
                        <th className="py-4 px-6 text-center">Role</th>
                        <th className="py-4 px-6 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/40">
                      {filteredUsers.map((user) => (
                        <tr 
                          key={user._id} 
                          onClick={() => setSelectedUser(user)}
                          className={`group cursor-pointer transition-all duration-200 ${
                            selectedUser?._id === user._id 
                              ? "bg-emerald-950/20 border-l-2 border-l-emerald-500" 
                              : "hover:bg-zinc-900/40 border-l-2 border-l-transparent"
                          }`}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                                selectedUser?._id === user._id
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 group-hover:border-zinc-600 group-hover:text-zinc-200"
                              }`}>
                                {(user.name || "NA").slice(0, 2).toUpperCase()}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className={`font-semibold text-sm transition-colors truncate max-w-[140px] sm:max-w-none ${
                                  selectedUser?._id === user._id ? "text-emerald-100" : "text-zinc-200 group-hover:text-white"
                                }`}>
                                  {user.name || "N/A"}
                                </span>
                                <span className="text-[10px] text-zinc-600 font-mono sm:hidden truncate max-w-[140px]">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 hidden sm:table-cell">
                            <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                              <Mail size={13} className="text-zinc-700" />
                              <span className="font-mono text-xs">{user.email || "N/A"}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center whitespace-nowrap">
                            {user.role === "admin" ? (
                              <span className="inline-flex items-center gap-1.5 bg-rose-950/30 text-rose-400 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-rose-900/30">
                                <ShieldCheck size={12} />
                                Admin
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 bg-zinc-800/50 text-zinc-300 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-zinc-700/50">
                                <UserCheck size={12} />
                                User
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <ChevronRight size={16} className={`ml-auto transition-all ${
                              selectedUser?._id === user._id ? "text-emerald-400 translate-x-0" : "text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5"
                            }`} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR DETAILS */}
          <div className="glass-panel border border-zinc-800/60 rounded-2xl p-6 space-y-6 sticky top-6 glow-emerald">
            <div className="border-b border-zinc-800/60 pb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-400 flex items-center gap-2">
                <Info size={14} className="text-emerald-400" />
                Details
              </h3>
              {selectedUser && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </div>

            {selectedUser ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/60">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center text-lg font-bold text-emerald-400 shadow-lg shadow-emerald-900/20">
                    {selectedUser.name?.slice(0,2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-bold text-white truncate">{selectedUser.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-block font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                        selectedUser.role === "admin" 
                          ? "bg-rose-950/30 text-rose-400 border-rose-900/30" 
                          : "bg-zinc-800 text-zinc-400 border-zinc-700"
                      }`}>
                        {selectedUser.role || "user"}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                        <Zap size={10} />
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="space-y-1.5 bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50">
                    <span className="text-zinc-600 block text-[10px] uppercase tracking-wider font-bold">User ID</span>
                    <span className="text-zinc-300 select-all flex items-center gap-2">
                      <Fingerprint size={13} className="text-zinc-600 shrink-0" />
                      {selectedUser._id}
                    </span>
                  </div>

                  <div className="space-y-1.5 bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50">
                    <span className="text-zinc-600 block text-[10px] uppercase tracking-wider font-bold">Email</span>
                    <span className="text-zinc-300 select-all flex items-center gap-2 break-all">
                      <Mail size={13} className="text-zinc-600 shrink-0" />
                      {selectedUser.email}
                    </span>
                  </div>

                  <div className="space-y-1.5 bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50">
                    <span className="text-zinc-600 block text-[10px] uppercase tracking-wider font-bold">Registered</span>
                    <span className="text-zinc-300 flex items-center gap-2">
                      <Calendar size={13} className="text-zinc-600 shrink-0" />
                      {selectedUser.createdAt ? (
                        new Date(selectedUser.createdAt).toLocaleString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        })
                      ) : (
                        <span className="text-zinc-600 italic">Not available</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center border border-dashed border-zinc-800/40 rounded-xl bg-zinc-900/20">
                <Fingerprint className="mx-auto text-zinc-800 w-10 h-10 mb-3 stroke-1" />
                <span className="text-xs text-zinc-600 block font-mono font-bold tracking-wider">SELECT A USER</span>
                <p className="text-[11px] text-zinc-700 mt-2">Click on any row to view details</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default User;