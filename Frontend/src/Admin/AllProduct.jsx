



import React, { useState, useEffect } from "react";
import { Trash2, Edit2, Layers, Package, RefreshCw, X, Save, DollarSign, Tag, Sliders, Folder, ImagePlus, Images } from "lucide-react";

const API_BASE_URL = "http://localhost:3000";

const AllProduct = ({ onEditProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // --- Dynamic File Binary States for 5 Images ---
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");

  // Array states tracking the 4 sub-gallery fields
  const [subImageFiles, setSubImageFiles] = useState([null, null, null, null]);
  const [subImagePreviews, setSubImagePreviews] = useState(["", "", "", ""]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/AllAssign`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.assignList); 
      } else {
        console.error("Data syncing process failure.");
      }
    } catch (error) {
      console.error("Network Layer Exception:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap sach me is product ko hamesha ke liye delete karna chahte hain?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/Assign/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setProducts((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(`Error operational flow: ${data.msg}`);
      }
    } catch (error) {
      console.error("Deletion Failure Exception:", error);
    }
  };

  const handleEditClick = (product) => {
    if (onEditProduct) onEditProduct(product);
    setEditingProduct({ ...product });
    
    // Reset file uploads
    setMainImageFile(null);
    setMainImagePreview(product.mainImage || "");

    // Populate existing gallery images from DB if they exist, otherwise fallback empty
    const existingSubImages = product.subImages || [];
    setSubImageFiles([null, null, null, null]);
    setSubImagePreviews([
      existingSubImages[0] || "",
      existingSubImages[1] || "",
      existingSubImages[2] || "",
      existingSubImages[3] || "",
    ]);

    setIsEditModalOpen(true);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handles cover image assignment
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMainImageFile(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  // Handles dynamic indexed updates to sub-gallery array configurations
  const handleSubImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update specific file pointer
    const updatedFiles = [...subImageFiles];
    updatedFiles[index] = file;
    setSubImageFiles(updatedFiles);

    // Render targeted virtual layout stream preview
    const updatedPreviews = [...subImagePreviews];
    updatedPreviews[index] = URL.createObjectURL(file);
    setSubImagePreviews(updatedPreviews);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      formData.append("name", editingProduct.name);
      formData.append("desc", editingProduct.desc);
      formData.append("salePrice", editingProduct.salePrice);
      formData.append("lowProductLimit", editingProduct.lowProductLimit);
      formData.append("productStack", editingProduct.productStack);
      formData.append("productCollection", editingProduct.productCollection);

      // 1. Cover Image payload assignment
      if (mainImageFile) {
        formData.append("mainImage", mainImageFile);
      }

      // 2. Append subImages array block elements sequentially 
      subImageFiles.forEach((file, index) => {
        if (file) {
          // Appends files under field key name: "subImages" matching standard array uploads
          formData.append("subImages", file);
        } else if (subImagePreviews[index]) {
          // Optional: send existing cloud image path references back if untouched
          formData.append("existingSubImages", subImagePreviews[index]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/Assign/update/${editingProduct._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setIsEditModalOpen(false);
        fetchProducts();
      } else {
        alert(`Update operational error: ${data.msg}`);
      }
    } catch (error) {
      console.error("Submission Layer Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-6 md:p-12 font-sans antialiased selection:bg-yellow-400 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Dynamic Context Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Enterprise Storage Engine
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              All Active Products
            </h1>
            <p className="text-sm text-zinc-500 mt-1">Live catalog data synchronization workspace.</p>
          </div>
          
          <button 
            onClick={fetchProducts}
            className="group flex items-center gap-2 px-4 py-2.5 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-all duration-300 backdrop-blur-md"
          >
            <RefreshCw size={14} className={`${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            Refresh Data
          </button>
        </div>

        {/* Runtime Template Renderer States */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 gap-4">
            <div className="h-10 w-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono text-zinc-500 tracking-wider">Syncing database assets...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-3xl backdrop-blur-sm max-w-xl mx-auto">
            <Package className="mx-auto text-zinc-700 mb-4" size={40} />
            <h3 className="text-md font-bold text-zinc-300">No Inventory Found</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">Database is currently empty. Populate items via your dashboard panel layout.</p>
          </div>
        ) : (
          /* Product Cards Workspace Matrix */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              return (
                <div 
                  key={product._id} 
                  className="group relative bg-[#121214] border border-zinc-900 hover:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Main Frame Containment */}
                  <div className="relative aspect-[16/10] bg-[#0d0d0e] overflow-hidden flex items-center justify-center p-4 group-hover:bg-[#070708] transition-colors duration-500">
                    <img 
                      src={product.mainImage} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Operational Matrix Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1 duration-300">
                          {product.name}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 mt-1">
                          ACTIVE
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-light">
                        {product.desc}
                      </p>
                    </div>

                    {/* Spec Sheet Blocks */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#18181b]/60 border border-zinc-900/50 p-2.5 rounded-xl flex items-center gap-2 col-span-2">
                        <Folder size={13} className="text-amber-400" />
                        <span className="text-zinc-400 line-clamp-1">Collection: <strong className="text-zinc-200 font-medium">{product.productCollection || "General"}</strong></span>
                      </div>
                      <div className="bg-[#18181b]/60 border border-zinc-900/50 p-2.5 rounded-xl flex items-center gap-2">
                        <Layers size={13} className="text-zinc-500" />
                        <span className="text-zinc-400 line-clamp-1">Stack: <strong className="text-zinc-200 font-medium">{product.productStack || "0"}</strong></span>
                      </div>
                      <div className="bg-[#18181b]/60 border border-zinc-900/50 p-2.5 rounded-xl flex items-center gap-2">
                        <Sliders size={13} className="text-zinc-500" />
                        <span className="text-zinc-400 line-clamp-1">Alert Limit: <strong className="text-zinc-200 font-medium">{product.lowProductLimit || "0"}</strong></span>
                      </div>
                    </div>

                    {/* Pricing Grid Architecture */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-900/80">
                      <div className="space-y-0.5">
                        <span className="block text-[9px] uppercase font-mono tracking-widest text-zinc-500">Active Sale Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-white">Rs {product.salePrice}</span>
                        </div>
                      </div>

                      {/* Control Interface Nodes */}
                      <div className="flex items-center gap-2">
                        <button 
                          type="button"
                          onClick={() => handleEditClick(product)}
                          className="p-2.5 bg-zinc-900 border border-zinc-800/80 rounded-xl text-zinc-400 hover:text-amber-400 hover:border-amber-400 hover:bg-amber-400/5 transition-all duration-300"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          className="p-2.5 bg-zinc-900 border border-zinc-800/80 rounded-xl text-zinc-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ==========================================
            PREMIUM CONTEXT MULTI-IMAGE EDIT MODAL
        ========================================== */}
        {isEditModalOpen && editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto">
            <div className="bg-[#121214] border border-zinc-800 rounded-2xl w-full max-w-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl space-y-6">
              
              <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">Configuration System</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Update configuration metrics & gallery mapping.</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)} 
                  className="p-2 bg-zinc-900 text-zinc-400 hover:text-white rounded-xl transition-colors border border-zinc-800"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-6">
                
                {/* 🌟 COVER SHOT ROW */}
                <div className="bg-[#0d0d0e] border border-zinc-900 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-32 h-24 bg-[#050505] border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center p-2 shrink-0">
                    {mainImagePreview ? (
                      <img src={mainImagePreview} alt="Cover shot" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[10px] text-zinc-600 uppercase font-mono">No Cover</span>
                    )}
                  </div>
                  <div className="space-y-2 text-center sm:text-left w-full">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-400 flex items-center justify-center sm:justify-start gap-1.5">
                      <ImagePlus size={12} className="text-amber-400" /> Main Cover Shot
                    </h4>
                    <p className="text-[11px] text-zinc-500 leading-normal">Primary layout profile viewport binary canvas matrix.</p>
                    <label className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 cursor-pointer transition-colors">
                      Upload New Cover
                      <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* 🌟 ADDITIONAL 4 SUB-GALLERY IMAGES BLOCK */}
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                    <Images size={13} className="text-zinc-500" /> Extended Layout Gallery (4 Additional Slots)
                  </label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {subImagePreviews.map((preview, index) => (
                      <div key={index} className="bg-[#0d0d0e] border border-zinc-900 p-2 rounded-xl flex flex-col items-center gap-2 text-center">
                        <div className="w-full aspect-square bg-[#050505] border border-zinc-800/80 rounded-lg overflow-hidden flex items-center justify-center p-1 relative">
                          {preview ? (
                            <img src={preview} alt={`Sub slot ${index + 1}`} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <span className="text-[9px] text-zinc-700 font-mono">SLOT_{index + 1}</span>
                          )}
                        </div>
                        
                        <label className="w-full text-center py-1 bg-zinc-900 border border-zinc-800/50 hover:border-zinc-700 rounded-md text-[10px] text-zinc-400 cursor-pointer transition-colors block font-medium truncate px-1">
                          Browse File
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleSubImageChange(e, index)} 
                            className="hidden" 
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text parameter mappings */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Product Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-600">
                          <Tag size={14} />
                        </span>
                        <input type="text" name="name" value={editingProduct.name} onChange={handleModalInputChange} className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl pl-10 pr-4 py-3 outline-none text-sm text-white transition-all font-medium" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Product Collection</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-600">
                          <Folder size={14} />
                        </span>
                        <input type="text" name="productCollection" value={editingProduct.productCollection} onChange={handleModalInputChange} className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl pl-10 pr-4 py-3 outline-none text-sm text-white transition-all font-medium" required />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Description Manifest</label>
                    <textarea name="desc" value={editingProduct.desc} onChange={handleModalInputChange} className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-4 py-3 outline-none text-sm text-zinc-300 transition-all h-24 font-light leading-relaxed resize-none" required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Sale Price (Rs)</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-600">
                          <DollarSign size={14} />
                        </span>
                        <input type="number" name="salePrice" value={editingProduct.salePrice} onChange={handleModalInputChange} className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-400 rounded-xl pl-9 pr-4 py-2.5 outline-none text-sm font-mono text-white" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Product Stack (Stock)</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-600">
                          <Layers size={14} />
                        </span>
                        <input type="number" name="productStack" value={editingProduct.productStack} onChange={handleModalInputChange} className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-400 rounded-xl pl-9 pr-4 py-2.5 outline-none text-sm font-mono text-white" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">Low Product Limit</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-600">
                          <Sliders size={14} />
                        </span>
                        <input type="number" name="lowProductLimit" value={editingProduct.lowProductLimit} onChange={handleModalInputChange} className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-400 rounded-xl pl-9 pr-4 py-2.5 outline-none text-sm font-mono text-white" required />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xl text-xs font-semibold hover:text-white hover:bg-zinc-800 transition-colors">
                    Discard Changes
                  </button>
                  <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black rounded-xl text-xs flex items-center gap-2 hover:opacity-95 transition-all shadow-xl shadow-amber-500/5">
                    <Save size={14} />
                    <span>Commit Manifest</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllProduct;