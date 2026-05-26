import React, { useState, useEffect } from "react";
import api from "../services/api.js";
import { SlidersHorizontal, Plus, Pencil, Trash2, X, ImagePlus } from "lucide-react";

const Assign = () => {
  const [assignList, setAssignList] = useState([]);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    image: null,
  });

  /* =====================
     HANDLE INPUT
  ===================== */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* =====================
     FETCH DATA
  ===================== */
  const bookData = async () => {
    try {
      const res = await api.get("/AllAssign");
      setAssignList(res.data.assignList || []);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    bookData();
  }, []);

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("desc", form.desc);
    data.append("price", form.price);

    if (form.image) data.append("image", form.image);

    try {
      if (updateId) {
        await api.put(`/Assign/update/${updateId}`, data);
      } else {
        await api.post("/Assign/create", data);
      }
      bookData();
      handleCancel();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  /* =====================
     EDIT
  ===================== */
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      desc: item.desc,
      price: item.price,
      image: null,
    });

    setPreview(item.image?.[0]);
    setUpdateId(item._id);
    setShowForm(true);
  };

  /* =====================
     DELETE
  ===================== */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await api.delete(`/Assign/delete/${id}`);
        bookData();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  /* =====================
     CANCEL
  ===================== */
  const handleCancel = () => {
    setShowForm(false);
    setUpdateId(null);
    setPreview(null);
    setForm({ name: "", desc: "", price: "", image: null });
  };

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 selection:bg-yellow-400 selection:text-black">
      
      {/* HEADER SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-900/40 border border-neutral-800/80 p-6 rounded-2xl mb-8 shadow-xl flex items-center justify-between">
        <div className="absolute top-0 right-0 w-[250px] h-full bg-yellow-400/5 blur-3xl rounded-full pointer-events-none" />
        <div className="flex items-center gap-4">
          <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-yellow-400 shadow-inner">
            <SlidersHorizontal size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight uppercase text-white">
              Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Panel</span>
            </h1>
            <p className="text-neutral-400 text-xs mt-0.5">Create, adjust, or remove products from your catalog database.</p>
          </div>
        </div>

        {/* INLINE HEADER ADD BUTTON */}
        <button
          onClick={() => setShowForm(true)}
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-yellow-500/10 active:scale-95"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Product</span>
        </button>
      </div>

      {/* FLOATING ACTION FLOATER BUTTON FOR MOBILE POPUPS */}
      <button
        onClick={() => setShowForm(true)}
        className="sm:hidden fixed bottom-6 right-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-neutral-950 p-4 rounded-full font-bold shadow-2xl z-40 active:scale-95"
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {/* MODAL SYSTEM OVERLAY POPUP */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fadeIn">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800/80 p-6 rounded-2xl space-y-5 shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="text-lg font-black uppercase text-white tracking-tight">
                {updateId ? "Modify" : "Register"} Product Entry
              </h2>
              <button type="button" onClick={handleCancel} className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* AVATAR / CARD IMAGE UPLOAD WORKSPACE PREVIEWER AREA */}
            <div className="flex justify-center">
              {preview ? (
                <div className="relative group w-28 h-28">
                  <img src={preview} className="w-full h-full rounded-2xl object-cover border border-neutral-700 shadow-md" alt="upload context visual" />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                    <p className="text-[10px] text-white font-semibold">Change Image</p>
                  </div>
                </div>
              ) : (
                <div className="w-28 h-28 border border-dashed border-neutral-700 bg-neutral-950/60 rounded-2xl flex flex-col items-center justify-center text-neutral-500 gap-1">
                  <ImagePlus size={22} />
                  <span className="text-[10px] font-medium">No Graphic</span>
                </div>
              )}
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5 pl-0.5">Product Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Premium Leather Cricket Bat"
                  className="w-full h-11 px-4 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-100 outline-none focus:border-yellow-400/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5 pl-0.5">Item Description</label>
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  placeholder="Write item technical parameters, size metrics, etc..."
                  className="w-full p-4 h-24 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-100 outline-none focus:border-yellow-400/50 transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5 pl-0.5">Price Target</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold text-sm">$</span>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full h-11 pl-8 pr-4 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-100 outline-none focus:border-yellow-400/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5 pl-0.5">Upload Asset</label>
                <input 
                  type="file" 
                  name="image"
                  onChange={handleChange} 
                  className="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-neutral-200 hover:file:bg-neutral-700 file:cursor-pointer bg-neutral-950 p-2 border border-neutral-800 rounded-xl" 
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 h-11 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-neutral-950 font-bold text-sm rounded-xl shadow-lg transition-colors">
                {updateId ? "Update Product" : "Publish Item"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 h-11 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-sm rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}


      <div className="hidden sm:block overflow-hidden bg-neutral-900/40 border border-neutral-800/80 rounded-2xl shadow-2xl">
        <table className="w-full min-w-[700px] text-left border-collapse">
          <thead>
            <tr className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 text-xs font-bold uppercase tracking-wider">
              <th className="p-4 pl-6">Display Frame</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Description Info</th>
              <th className="p-4">Asset Value</th>
              <th className="p-4 pr-6 text-center">Controls</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-800/60 bg-transparent">
            {assignList.length > 0 ? (
              assignList.map((item) => (
                <tr key={item._id} className="hover:bg-neutral-900/30 transition-colors group">
                  <td className="p-4 pl-6">
                    <img
                      src={item.image?.[0]}
                      className="w-12 h-12 rounded-xl object-cover bg-neutral-950 border border-neutral-800 group-hover:border-neutral-700 transition-colors"
                      alt=""
                    />
                  </td>
                  <td className="p-4 font-bold text-white tracking-tight">{item.name}</td>
                  <td className="p-4 text-neutral-400 text-sm max-w-xs truncate">{item.desc}</td>
                  <td className="p-4 text-yellow-400 font-black text-sm">{item.price}</td>
                  <td className="p-4 pr-6">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-yellow-400 hover:border-yellow-400/20 transition-all"
                        title="Edit entry"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/20 transition-all"
                        title="Delete entry"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-16 text-center text-neutral-500 font-medium">
                  No inventory data available currently.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
      <div className="sm:hidden space-y-4">
        {assignList.length > 0 ? (
          assignList.map((item) => (
            <div
              key={item._id}
              className="bg-neutral-900/40 rounded-2xl overflow-hidden border border-neutral-800/80 shadow-lg flex flex-col"
            >
              <div className="relative aspect-video w-full bg-neutral-950">
                <img
                  src={item.image?.[0]}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-yellow-400 font-black text-sm border border-neutral-800">
                  ${item.price}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h2 className="text-base font-black text-white tracking-tight">{item.name}</h2>
                  <p className="text-neutral-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex gap-2 pt-1 border-t border-neutral-800/60">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-2.5 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Pencil size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-red-950/40 border border-red-900/30 text-red-400 py-2.5 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-neutral-500 text-sm font-medium">
            No inventory data available currently.
          </div>
        )}
      </div>

    </div>
  );
};

export default Assign;