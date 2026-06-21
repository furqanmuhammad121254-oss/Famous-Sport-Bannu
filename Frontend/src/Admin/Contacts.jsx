import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/api/contact/allcontact");
      setContacts(res.data.contacts || res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await api.delete(`/api/contact/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    // Optional: Add a brief toast notification trigger here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#09090b]">
        <div className="relative flex h-10 w-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-10 w-10 bg-indigo-600"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200 antialiased font-sans">
      
      {/* Background Subtle Gradient Mesh for Realism */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Modern Header Interface */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-zinc-800/60">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-semibold text-zinc-50 tracking-tight">
                Inbox
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                {contacts.length} total
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-1.5">
              Review, copy, and manage customer service inquiries natively.
            </p>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-24 bg-[#161618] rounded-xl border border-zinc-800/80 shadow-2xl max-w-xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-zinc-600 mx-auto mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <p className="text-zinc-400 text-sm font-medium">All caught up! No active messages found.</p>
          </div>
        ) : (
          /* Hyper-Realistic Grid Blueprint Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-[#141416] rounded-xl border border-zinc-800/90 shadow-xl hover:border-zinc-700/80 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Main Body */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4 gap-3">
                    
                    {/* User Info Container with Avatar */}
                    <div className="flex items-center gap-3 max-w-[72%]">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 font-medium text-xs shadow-inner flex-shrink-0 uppercase">
                        {contact.name ? contact.name.substring(0, 2) : "??"}
                      </div>
                      <div className="truncate">
                        <h2 className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors duration-150">
                          {contact.name}
                        </h2>
                        <span className="text-xs text-zinc-400 truncate block">
                          {contact.email}
                        </span>
                      </div>
                    </div>

                    {/* Formatted Date Pill */}
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/80 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Clean Content Window */}
                  <div className="bg-[#1a1a1e]/40 rounded-lg p-3.5 min-h-[110px] max-h-[150px] overflow-y-auto border border-zinc-800/50 custom-scrollbar">
                    <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line selection:bg-indigo-500/40">
                      {contact.message}
                    </p>
                  </div>
                </div>

                {/* Micro Action Strip */}
                <div className="bg-[#18181b]/30 px-5 py-3 flex justify-between items-center border-t border-zinc-800/80">
                  
                  {/* Secondary Copy Utility */}
                  <button
                    onClick={() => copyToClipboard(contact.email)}
                    className="text-[11px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125v-9.75A1.125 1.125 0 0 1 4.875 9.75H8.25m7.5 7.25l3.375-3.375c.621-.504 1.125-1.125 1.125-1.125v-9.75A1.125 1.125 0 0 0 19.125 1.5h-9.75A1.125 1.125 0 0 0 8.25 2.625v1.125m7.5 13.5H12a2.25 2.25 0 0 1-2.25-2.25V12m7.5 5.25v-5.25m0 0h5.25m-5.25 0H12" />
                    </svg>
                    Copy Mail
                  </button>

                  {/* Clean Destructive Button */}
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-md text-red-400 hover:bg-red-950/30 hover:text-red-300 focus:outline-none transition-all duration-150"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}