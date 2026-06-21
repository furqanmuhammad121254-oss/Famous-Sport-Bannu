


import React, { useEffect, useState } from "react";
import { ShoppingBag, ArrowUpRight, Grid, Layers, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import Navber from "../components/Navber";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for handling the premium multi-image preview gallery modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/AllAssign");
      const data = await response.json();

      if (data.success) {
        setProducts(data.assignList);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getAllProductImages = (product) => {
    if (!product) return [];
    const images = [product.mainImage];
    if (Array.isArray(product.additionalImages)) {
      images.push(...product.additionalImages);
    }
    return images.filter(Boolean);
  };

  const productImagesCollection = getAllProductImages(selectedProduct);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % productImagesCollection.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + productImagesCollection.length) % productImagesCollection.length);
  };

  const handleAddToCart = (targetProduct) => {
    if (!targetProduct) return;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((cartItem) => cartItem.id === targetProduct._id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        id: targetProduct._id,
        name: targetProduct.name,
        price: targetProduct.salePrice,
        image: targetProduct.mainImage,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-[60vh] bg-black text-neutral-200 px-4">
        <div className="w-10 h-10 rounded-full border border-neutral-800 border-t-blue-500 animate-spin" />
        <p className="text-xs font-mono tracking-widest text-neutral-500 uppercase text-center">Synchronizing Catalog...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-neutral-200 antialiased font-sans selection:bg-blue-500/30 selection:text-white p-3 xs:p-4 sm:p-8 relative overflow-hidden mt-20">
      <Navber />
      
      {/* Premium Ambient Background Core Glows */}
      <div className="absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/[0.01] blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-indigo-500/[0.01] blur-[90px] sm:blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto space-y-6 sm:space-y-8 relative z-10">
        
        {/* ================= CATALOG HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-5 sm:pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-black">
              <Sparkles size={11} /> Live Inventory Matrix
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">Premium Collection</h1>
          </div>
          
          <div className="flex items-center gap-3 self-start sm:self-auto bg-neutral-950/60 p-1.5 rounded-2xl border border-neutral-900 font-mono text-[10px] sm:text-[11px] font-bold text-neutral-400">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900 text-white rounded-xl border border-neutral-800 shadow-sm">
              <Grid size={11} className="text-blue-400" />
              <span>Square Grid</span>
            </div>
            <div className="pr-2 py-1.5 flex items-center gap-1.5">
              <Layers size={11} className="text-neutral-600" />
              <span>Total: {products.length} Items</span>
            </div>
          </div>
        </div>

        {/* ================= LUXURY MULTI-COLUMN RESPONSIVE SQUARE GRID ================= */}
        {products.length === 0 ? (
          <div className="p-10 sm:p-20 text-center border border-dashed border-neutral-900 rounded-3xl bg-neutral-950/20">
            <ShoppingBag className="mx-auto text-neutral-800 w-8 h-8 mb-3 stroke-[1.2]" />
            <p className="text-neutral-500 font-bold text-xs font-mono tracking-widest">CATALOG_ARRAY_EMPTY</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-neutral-950/30 border border-neutral-900/80 hover:border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-xl relative"
              >
                {/* MODERN PERFECT SQUARE IMAGE BOX */}
                <div 
                  onClick={() => {
                    setSelectedProduct(product);
                    setActiveImageIndex(0);
                  }}
                  className="relative aspect-square w-full overflow-hidden bg-neutral-900/30 border-b border-neutral-900/60 cursor-zoom-in"
                >
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out grayscale-[5%] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  
                  {/* Image Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                  
                  {/* Floating Perspective Action Tag */}
                  <div className="absolute top-2.5 right-2.5 p-1.5 bg-black/60 backdrop-blur-md border border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-neutral-700 rounded-lg transition-all opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100">
                    <ArrowUpRight size={12} className="transform group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

                {/* SLIM PRODUCT CARD BOTTOM META PANEL */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h2 className="font-bold text-sm text-neutral-200 group-hover:text-white transition-colors tracking-wide line-clamp-1">
                      {product.name}
                    </h2>
                    <p className="text-[11px] text-neutral-500 leading-normal font-normal line-clamp-2 h-8">
                      {product.desc || "Premium specialized component module."}
                    </p>
                  </div>

                  {/* BOTTOM ACTION & VALUATION REGISTRY */}
                  <div className="pt-2 border-t border-neutral-900/80 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-mono text-xs font-black tracking-tight text-blue-400 bg-blue-500/[0.03] border border-blue-500/10 px-2 py-0.5 rounded-md truncate">
                        Rs {Number(product.salePrice).toLocaleString("en-PK")}
                      </p>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="h-8 bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-neutral-950 font-black rounded-lg flex items-center justify-center gap-1 px-2.5 text-[10px] uppercase tracking-wider cursor-pointer transition-all select-none shrink-0"
                    >
                      <span>Add</span>
                      <FaShoppingCart className="text-neutral-950 text-[10px]" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= PREMIUM DETAILED IMAGE VIEW MODAL ================= */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-neutral-950 border border-neutral-800 max-w-4xl w-full rounded-2xl overflow-hidden p-4 sm:p-6 relative flex flex-col md:flex-row gap-4 sm:gap-6 shadow-2xl my-auto max-h-[92vh] md:max-h-none overflow-y-auto md:overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button Top Right */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 p-2 rounded-xl border border-neutral-800 transition-colors z-30 shadow-md"
            >
              <X size={16} />
            </button>

            {/* LEFT AREA: INTERACTIVE DISPLAY WINDOW */}
            <div className="flex-1 bg-neutral-900/40 border border-neutral-900 rounded-2xl overflow-hidden relative flex items-center justify-center min-h-[220px] xs:min-h-[280px] sm:min-h-[350px] md:min-h-[450px] max-h-[35vh] md:max-h-[450px]">
              <img 
                src={productImagesCollection[activeImageIndex]} 
                alt="Active Perspective" 
                className="w-full h-full max-h-[220px] xs:max-h-[280px] sm:max-h-[350px] md:max-h-[450px] object-contain select-none p-2"
              />

              {/* Navigation Arrows */}
              {productImagesCollection.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-2.5 bg-black/70 hover:bg-black/90 text-white p-1.5 sm:p-2 rounded-xl border border-neutral-800/60 transition-all active:scale-90"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-2.5 bg-black/70 hover:bg-black/90 text-white p-1.5 sm:p-2 rounded-xl border border-neutral-800/60 transition-all active:scale-90"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* RIGHT AREA: SPECIFICATIONS & THUMBNAILS MATRIX */}
            <div className="w-full md:w-80 flex flex-col justify-between space-y-4 sm:space-y-6 shrink-0">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold block">Specification View</span>
                  <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-tight mt-0.5 line-clamp-2">{selectedProduct.name}</h2>
                </div>

                <div className="bg-neutral-900/30 border border-neutral-900 p-3 rounded-xl max-h-[100px] md:max-h-[160px] overflow-y-auto">
                  <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-normal">
                    {selectedProduct.desc || "No custom features configured for this catalog entry node module."}
                  </p>
                </div>

                <div className="border-t border-neutral-900 pt-3 flex items-center justify-between gap-3">
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-mono text-neutral-500 block">Valuation</span>
                    <p className="font-mono text-sm sm:text-lg font-black text-white truncate">
                      Rs {Number(selectedProduct.salePrice).toLocaleString("en-PK")}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="h-9 sm:h-10 bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-black rounded-xl flex items-center gap-2 px-3 sm:px-4 text-[11px] sm:text-xs uppercase tracking-wider transition-all select-none shadow-lg active:scale-95 shrink-0"
                  >
                    <span>Add to Cart</span>
                    <FaShoppingCart size={13} />
                  </button>
                </div>
              </div>

              {/* THUMBNAILS CONTAINER */}
              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-[8px] sm:text-[10px] uppercase font-mono text-neutral-500 tracking-wider block">
                  Media Layers ({productImagesCollection.length} Views)
                </span>
                <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-5 sm:gap-2">
                  {productImagesCollection.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`aspect-square border rounded-xl overflow-hidden transition-all bg-neutral-900 ${
                        activeImageIndex === index 
                          ? "border-blue-500 scale-95 shadow-lg shadow-blue-500/10" 
                          : "border-neutral-900 hover:border-neutral-700"
                      }`}
                    >
                      <img src={img} alt={`Asset Slice ${index}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

