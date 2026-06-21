
// import React, { useState } from "react";
// import { Plus, ImagePlus, X, Info, DollarSign, Sliders, Layers, Folder } from "lucide-react";

// const SportsProductForm = () => {
//   // 1. CONDENSED FORM STATE (Only requested fields)
//   const [form, setForm] = useState({
//     name: "",          
//     desc: "",   
//     salePrice: "",
//     lowProductLimit: "",    
//     productStack: "",       
//     productCollection: "",  
//     mainImage: null,        
//     additionalImages: []    
//   });

//   // Asset Preview States
//   const [mainPreview, setMainPreview] = useState(null);
//   const [additionalPreviews, setAdditionalPreviews] = useState([]);

//   // Generic Input Change Handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // 2. MEDIA ASSETS HANDLERS
//   const handleMainImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (mainPreview) URL.revokeObjectURL(mainPreview);

//     setForm((prev) => ({ ...prev, mainImage: file }));
//     setMainPreview(URL.createObjectURL(file));
//   };

//   const handleAdditionalImagesChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const slotsAvailable = 4 - form.additionalImages.length;
//     if (slotsAvailable <= 0) return;

//     const filesToAdd = selectedFiles.slice(0, slotsAvailable);

//     setForm((prev) => ({
//       ...prev,
//       additionalImages: [...prev.additionalImages, ...filesToAdd],
//     }));

//     const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
//     setAdditionalPreviews((prev) => [...prev, ...newPreviews]);
//   };

//   const handleRemoveMainImage = () => {
//     if (mainPreview) URL.revokeObjectURL(mainPreview);
//     setForm((prev) => ({ ...prev, mainImage: null }));
//     setMainPreview(null);
//   };

//   const handleRemoveAdditionalImage = (indexToRemove) => {
//     URL.revokeObjectURL(additionalPreviews[indexToRemove]);

//     setForm((prev) => ({
//       ...prev,
//       additionalImages: prev.additionalImages.filter((_, i) => i !== indexToRemove),
//     }));
//     setAdditionalPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
//   };

//   // 3. BACKEND SUBMISSION
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.mainImage) {
//       alert("⚠️ Please upload a main product cover image.");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       // Appending only the requested payload
//       formData.append("name", form.name);
//       formData.append("desc", form.desc); 
//       formData.append("salePrice", form.salePrice);
//       formData.append("lowProductLimit", form.lowProductLimit);
//       formData.append("productStack", form.productStack);
//       formData.append("productCollection", form.productCollection);

//       formData.append("mainImage", form.mainImage);
//       form.additionalImages.forEach((file) => {
//         formData.append("additionalImages", file);
//       });

//       const response = await fetch("http://localhost:3000/Assign/create", {
//         method: "POST",
//         body: formData, 
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert("🚀 Product processed and updated successfully.");
        
//         // Reset state
//         setForm({
//           name: "", desc: "", salePrice: "",
//           lowProductLimit: "", productStack: "", productCollection: "",
//           mainImage: null, additionalImages: []
//         });
//         setMainPreview(null);
//         setAdditionalPreviews([]);
//       } else {
//         alert(`❌ Failed: ${data.msg}`);
//       }

//     } catch (error) {
//       console.error("Submission Error:", error);
//       alert("❌ Something went wrong while communicating with the server.");
//     }
//   };

//   // Tailwind UI Config Classes
//   const inputClass = "w-full bg-neutral-900/60 border border-neutral-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-neutral-100 placeholder-neutral-500 rounded-xl px-4 py-3 text-sm transition-all outline-none duration-200 backdrop-blur-sm";
//   const labelClass = "block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2";
//   const sectionCard = "bg-neutral-900/30 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl shadow-black/20";

//   return (
//     <div className="min-h-screen bg-neutral-950 text-white font-sans antialiased p-4 md:p-8">
//       <div className="max-w-6xl mx-auto relative">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-yellow-500/10 blur-[120px] pointer-events-none rounded-full" />

//         {/* Top Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-neutral-900 relative z-10">
//           <div>
//             <div className="flex items-center gap-2 mb-1.5">
//               <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
//               <p className="text-xs font-bold text-yellow-400 tracking-widest uppercase">Catalog Subsystem</p>
//             </div>
//             <h1 className="text-3xl font-black tracking-tight text-neutral-100 md:text-4xl">
//               Sports Product Configuration
//             </h1>
//           </div>

//           <button
//             type="submit"
//             form="sports-product-form"
//             className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-neutral-950 px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all duration-200 group"
//           >
//             <Plus size={18} className="stroke-[3] group-hover:rotate-90 transition-transform" />
//             <span>Publish Product</span>
//           </button>
//         </div>

//         {/* Form Grid Layout */}
//         <form id="sports-product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          
//           <div className="lg:col-span-2 space-y-8">
//             {/* Core Details */}
//             <div className={sectionCard}>
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2 bg-neutral-800/60 rounded-lg text-neutral-400"><Info size={18} /></div>
//                 <h2 className="text-lg font-bold tracking-tight text-neutral-200">Identity & Taxonomy</h2>
//               </div>

//               <div className="space-y-5">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>Product Name</label>
//                     <input name="name" value={form.name} onChange={handleChange} placeholder="e.g., Elite Carbon Fiber Tennis Racket" className={inputClass} required />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Product Collection</label>
//                     <div className="relative">
//                       <input name="productCollection" value={form.productCollection} onChange={handleChange} placeholder="e.g., Summer Olympics Pro Series" className={inputClass} required />
//                       <Folder size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500" />
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClass}>Description / Specifications</label>
//                   <textarea name="desc" value={form.desc} onChange={handleChange} placeholder="Detail core sporting utilities..." className={`${inputClass} h-32 resize-none`} required />
//                 </div>
//               </div>
//             </div>

//             {/* Pricing & Stock Grid unified */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Pricing */}
//               <div className={sectionCard}>
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-neutral-800/60 rounded-lg text-neutral-400"><DollarSign size={18} /></div>
//                   <h2 className="text-lg font-bold tracking-tight text-neutral-200">Pricing Matrix</h2>
//                 </div>
//                 <div>
//                   <label className={labelClass}>Active Sale Price</label>
//                   <div className="relative">
//                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">$</span>
//                     <input type="number" name="salePrice" value={form.salePrice} onChange={handleChange} placeholder="0.00" className={`${inputClass} pl-8`} required />
//                   </div>
//                 </div>
//               </div>

//               {/* Inventory Control */}
//               <div className={sectionCard}>
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-neutral-800/60 rounded-lg text-neutral-400"><Sliders size={18} /></div>
//                   <h2 className="text-lg font-bold tracking-tight text-neutral-200">Inventory Control</h2>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <label className={labelClass}>Product Stack (Stock Quantity)</label>
//                     <input type="number" name="productStack" value={form.productStack} onChange={handleChange} placeholder="e.g., 150" min="0" className={inputClass} required />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Low Product Alert Limit</label>
//                     <input type="number" name="lowProductLimit" value={form.lowProductLimit} onChange={handleChange} placeholder="e.g., 10" min="0" className={inputClass} required />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Media Engine Ingestion Sidebar (1 Main + 4 Additional) */}
//           <div className="space-y-8">
//             <div className={sectionCard}>
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2 bg-neutral-800/60 rounded-lg text-neutral-400"><Layers size={18} /></div>
//                 <h2 className="text-lg font-bold tracking-tight text-neutral-200">Media Management (5 Images)</h2>
//               </div>

//               <div className="space-y-6">
//                 {/* Main Cover (Image 1) */}
//                 <div>
//                   <label className={labelClass}>Main Product Cover Image</label>
//                   {mainPreview ? (
//                     <div className="relative aspect-video rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden group">
//                       <img src={mainPreview} alt="Hero representation" className="w-full h-full object-contain" />
//                       <button
//                         type="button"
//                         onClick={handleRemoveMainImage}
//                         className="absolute top-3 right-3 bg-neutral-900/90 hover:bg-red-500 p-2 rounded-full text-white backdrop-blur-md transition-colors"
//                       >
//                         <X size={14} />
//                       </button>
//                     </div>
//                   ) : (
//                     <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-yellow-500/40 rounded-xl transition-all cursor-pointer text-center p-4">
//                       <ImagePlus size={24} className="mb-2 text-neutral-500" />
//                       <span className="text-sm font-semibold text-neutral-300">Upload Cover Shot</span>
//                       <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
//                     </label>
//                   )}
//                 </div>

//                 <hr className="border-neutral-900" />

//                 {/* Additional Gallery Engine (Remaining 4 Images) */}
//                 <div>
//                   <div className="flex justify-between items-center mb-2">
//                     <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Supporting Gallery Images (4)</label>
//                     <span className="text-[10px] bg-neutral-900 px-2 py-0.5 rounded font-mono text-neutral-500">
//                       {form.additionalImages.length} / 4
//                     </span>
//                   </div>

//                   {additionalPreviews.length > 0 && (
//                     <div className="grid grid-cols-4 gap-2.5 mb-4">
//                       {additionalPreviews.map((src, index) => (
//                         <div key={index} className="relative aspect-square rounded-lg border border-neutral-800 bg-neutral-950 overflow-hidden">
//                           <img src={src} alt="" className="w-full h-full object-cover" />
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveAdditionalImage(index)}
//                             className="absolute top-1 right-1 bg-black/80 hover:bg-red-500 p-0.5 rounded-full text-white backdrop-blur-xs transition-colors"
//                           >
//                             <X size={10} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <label className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl transition-all cursor-pointer p-4 text-center ${
//                     form.additionalImages.length >= 4
//                       ? "border-neutral-900 bg-neutral-950/20 text-neutral-700 pointer-events-none"
//                       : "border-neutral-800 bg-neutral-900/10 hover:bg-neutral-900/30 hover:border-yellow-500/30 text-neutral-400"
//                   }`}>
//                     <Plus size={20} className="mb-1" />
//                     <span className="text-xs font-semibold">
//                       {form.additionalImages.length >= 4 ? "All slots filled" : "Attach Support Views"}
//                     </span>
//                     <input type="file" multiple accept="image/*" onChange={handleAdditionalImagesChange} disabled={form.additionalImages.length >= 4} className="hidden" />
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black py-4 rounded-xl shadow-lg hover:opacity-95 active:scale-[0.99] transition-all uppercase tracking-wider text-sm"
//             >
//               Commit Configuration
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SportsProductForm;

import React, { useState } from "react";
import { X, UploadCloud, Tag, DollarSign, Layers, Folder } from "lucide-react";

const SportsProductForm = () => {
  // Controlled State matching all interactive fields
  const [form, setForm] = useState({
    name: "",
    desc: "",
    salePrice: "",
    lowProductLimit: "10", // reasonable default value
    productStack: "",
    productCollection: "",
    mainImage: null,
  });

  const [mainPreview, setMainPreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]); // Array of objects: { file, preview }

  // Generic Input Change Handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Main Cover Image Handler
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Revoke old object URL if exists to clear memory
    if (mainPreview) URL.revokeObjectURL(mainPreview);

    setForm((prev) => ({ ...prev, mainImage: file }));
    setMainPreview(URL.createObjectURL(file));
  };

  // Remove Main Cover
  const handleRemoveMainImage = () => {
    if (mainPreview) URL.revokeObjectURL(mainPreview);
    setForm((prev) => ({ ...prev, mainImage: null }));
    setMainPreview(null);
  };

  // Supporting Gallery Images Handler (Max 4 slots total)
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const slotsAvailable = 4 - additionalImages.length;
    if (slotsAvailable <= 0) return;

    const filesToAdd = files.slice(0, slotsAvailable);
    const mapped = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setAdditionalImages((prev) => [...prev, ...mapped]);
  };

  // Remove single image from secondary slots
  const handleRemoveAdditionalImage = (indexToRemove) => {
    URL.revokeObjectURL(additionalImages[indexToRemove].preview);
    setAdditionalImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  // Full Backend Ingestion Integration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom UI Validation check
    if (!form.mainImage) {
      alert("⚠️ Please upload a primary main product image.");
      return;
    }

    try {
      const formData = new FormData();

      // Append standard string fields
      formData.append("name", form.name);
      formData.append("desc", form.desc);
      formData.append("salePrice", form.salePrice);
      formData.append("productStack", form.productStack);
      formData.append("lowProductLimit", form.lowProductLimit);
      formData.append("productCollection", form.productCollection);

      // Append Main Image File
      formData.append("mainImage", form.mainImage);

      // Append multi-file Array to "additionalImages" field key
      additionalImages.forEach((imgObj) => {
        formData.append("additionalImages", imgObj.file);
      });

      const response = await fetch("http://localhost:3000/Assign/create", {
        method: "POST",
        body: formData, // Automatically sets multi-part headers
      });

      const data = await response.json();

      if (data.success) {
        alert("🚀 Product processed and pushed to the inventory system successfully!");
        
        // Reset local states safely
        setForm({
          name: "",
          desc: "",
          salePrice: "",
          lowProductLimit: "10",
          productStack: "",
          productCollection: "",
          mainImage: null,
        });

        // Clear references
        if (mainPreview) URL.revokeObjectURL(mainPreview);
        additionalImages.forEach((img) => URL.revokeObjectURL(img.preview));

        setMainPreview(null);
        setAdditionalImages([]);
      } else {
        alert(`❌ API Target Failure: ${data.msg}`);
      }
    } catch (error) {
      console.error("Transmission Error:", error);
      alert("❌ Communication breakdown during server-side API ingestion.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white p-6 flex justify-center antialiased">
      <div className="w-full max-w-5xl">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Create Sports Product
          </h1>
          <p className="text-zinc-500 text-sm mt-2">
            Add a new item configuration to your digital platform catalog
          </p>
        </div>

        {/* FORM SYSTEM */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-10 space-y-8 backdrop-blur-lg shadow-2xl"
        >
          {/* MAIN FORM FIELDS GRID */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* LEFT COLUMN: IDENTIFICATION & METRICS */}
            <div className="space-y-5">

              {/* NAME */}
              <div>
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Product Name</label>
                <div className="flex items-center bg-zinc-950 border border-zinc-800 focus-within:border-amber-500 rounded-xl px-3 mt-1.5 transition-colors">
                  <Tag size={16} className="text-zinc-500" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-transparent p-3 outline-none text-sm text-zinc-100 placeholder-zinc-700"
                    placeholder="e.g., Elite Match Willow Cricket Bat"
                    required
                  />
                </div>
              </div>

              {/* PRICE */}
              <div>
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Sale Price</label>
                <div className="flex items-center bg-zinc-950 border border-zinc-800 focus-within:border-amber-500 rounded-xl px-3 mt-1.5 transition-colors">
                  <DollarSign size={16} className="text-zinc-500" />
                  <input
                    name="salePrice"
                    value={form.salePrice}
                    onChange={handleChange}
                    className="w-full bg-transparent p-3 outline-none text-sm text-zinc-100 placeholder-zinc-700"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* STACK / INVENTORY QUANTITIES */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Stock Level</label>
                  <div className="flex items-center bg-zinc-950 border border-zinc-800 focus-within:border-amber-500 rounded-xl px-3 mt-1.5 transition-colors">
                    <Layers size={16} className="text-zinc-500" />
                    <input
                      name="productStack"
                      value={form.productStack}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      className="w-full bg-transparent p-3 outline-none text-sm text-zinc-100 placeholder-zinc-700"
                      placeholder="e.g., 45"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Low Stock Limit</label>
                  <div className="flex items-center bg-zinc-950 border border-zinc-800 focus-within:border-amber-500 rounded-xl px-3 mt-1.5 transition-colors">
                    <Layers size={16} className="text-zinc-500 text-opacity-40" />
                    <input
                      name="lowProductLimit"
                      value={form.lowProductLimit}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      className="w-full bg-transparent p-3 outline-none text-sm text-zinc-100 placeholder-zinc-700"
                      placeholder="10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* COLLECTION TAXONOMY */}
              <div>
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Collection / Grouping</label>
                <div className="flex items-center bg-zinc-950 border border-zinc-800 focus-within:border-amber-500 rounded-xl px-3 mt-1.5 transition-colors">
                  <Folder size={16} className="text-zinc-500" />
                  <input
                    name="productCollection"
                    value={form.productCollection}
                    onChange={handleChange}
                    className="w-full bg-transparent p-3 outline-none text-sm text-zinc-100 placeholder-zinc-700"
                    placeholder="e.g., Premium Pro Equipment"
                    required
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 5 IMAGE MEDIA SYSTEM */}
            <div className="space-y-5">

              {/* COVER PICTURE CAPTURE SLOT */}
              <div>
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Main Cover Image</label>
                <div className="mt-1.5 border border-dashed border-zinc-800 bg-zinc-950/30 rounded-xl p-4 text-center min-h-[174px] flex flex-col justify-center items-center relative">
                  {mainPreview ? (
                    <div className="relative w-full">
                      <img
                        src={mainPreview}
                        alt="Catalog Primary Cover"
                        className="w-full h-36 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveMainImage}
                        className="absolute top-1 right-1 bg-zinc-900 border border-zinc-800 hover:bg-red-500 p-1.5 rounded-full text-white transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors py-4 w-full h-full">
                      <UploadCloud size={28} />
                      <span className="text-xs font-medium">Upload primary storefront banner</span>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleMainImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* ADDITIONAL SUPPORTING GRAPHICS MODULE */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                    Gallery Views (Max 4)
                  </label>
                  <span className="text-[10px] font-mono bg-zinc-950 border border-zinc-800 text-zinc-500 rounded px-1.5 py-0.5">
                    {additionalImages.length} / 4 Used
                  </span>
                </div>

                {/* VISUAL FILE DISPLAY SYSTEM */}
                <div className="grid grid-cols-4 gap-2 border border-zinc-950 bg-zinc-950/40 p-2 rounded-xl mb-3 min-h-[74px] items-center">
                  {additionalImages.map((img, i) => (
                    <div key={i} className="relative aspect-square border border-zinc-800 bg-black rounded-lg overflow-hidden group">
                      <img
                        src={img.preview}
                        alt="Sub Asset"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAdditionalImage(i)}
                        className="absolute top-0.5 right-0.5 bg-black/80 hover:bg-red-500 text-white p-0.5 rounded-full transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  {additionalImages.length === 0 && (
                    <div className="col-span-4 text-center text-xs text-zinc-600 italic py-2">
                      No angle perspectives loaded
                    </div>
                  )}
                </div>

                {/* CONDITIONAL ADD BUTTON OVERLAY */}
                <label className={`flex items-center justify-center gap-2 border border-dashed rounded-xl p-3 text-center transition-all ${
                  additionalImages.length >= 4
                    ? "border-zinc-900 bg-zinc-950/20 text-zinc-700 pointer-events-none"
                    : "border-zinc-800 bg-zinc-950/50 hover:border-zinc-600 text-zinc-400 cursor-pointer"
                }`}>
                  <span className="text-xs font-semibold">
                    {additionalImages.length >= 4 ? "Slots Full" : "+ Append Side Angles"}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleAdditionalImagesChange}
                    disabled={additionalImages.length >= 4}
                    hidden
                  />
                </label>
              </div>

            </div>
          </div>

          {/* DESCRIPTION CONTAINER */}
          <div>
            <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Product Scope & Utilities</label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl p-4 mt-1.5 h-24 outline-none text-sm text-zinc-100 placeholder-zinc-700 resize-none transition-colors"
              placeholder="Provide a breakdown of product performance metrics, sport configurations, and construction profiles..."
              required
            />
          </div>

          {/* COMMIT / ACTIONS EXECUTION ROW */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-3.5 rounded-xl font-black text-sm tracking-wider uppercase hover:opacity-95 active:scale-[0.99] transition-all shadow-lg shadow-amber-500/5"
            >
              Commit Configuration
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SportsProductForm;