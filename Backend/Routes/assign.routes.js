
import express from "express";
import multer from "multer";
import Assign from "../models/Assign.js";
import cloudinary from "../config/doudinary.js"; // Kept your exact configuration import typo
import fs from "fs";


const router = express.Router();
// Multer Disk Storage Configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Multipart handles multiple field names safely
const cpUpload = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 4 }
]);

// ==========================================
// 1. CREATE PRODUCT
// ==========================================
router.post("/Assign/create", cpUpload, async (req, res) => {
  try {
    const { name, desc, salePrice, lowProductLimit, productStack, productCollection } = req.body;

    let mainImageUrl = "";
    let additionalImageUrls = [];

    // Process Main Image
    if (req.files && req.files['mainImage']) {
      const mainImageFile = req.files['mainImage'][0];
      const result = await cloudinary.uploader.upload(mainImageFile.path);
      mainImageUrl = result.secure_url;
      fs.unlinkSync(mainImageFile.path); 
    }

    // Process Gallery Images
    if (req.files && req.files['additionalImages']) {
      for (const file of req.files['additionalImages']) {
        const result = await cloudinary.uploader.upload(file.path);
        additionalImageUrls.push(result.secure_url);
        fs.unlinkSync(file.path); 
      }
    }

    const assignBook = await Assign.create({
      name, 
      desc, 
      salePrice, 
      lowProductLimit, 
      productStack, 
      productCollection,
      mainImage: mainImageUrl,
      additionalImages: additionalImageUrls,
    });

    return res.status(201).json({
      success: true,
      msg: "Product Created Successfully",
      assignBook,
    });

  } catch (error) {
    // 🔥 Enhanced 500 error management
    console.error("CRITICAL ERROR [/Assign/create]:", error);
    return res.status(500).json({ 
      success: false,
      error: "InternalServerError",
      msg: "The server encountered an error while compiling your file upload or generating the database entry." 
    });
  }
});

// ==========================================
// 2. READ ALL PRODUCTS
// ==========================================
router.get("/AllAssign", async (req, res) => {
  try {
    const assignList = await Assign.find().sort({ createdAt: -1 }); 
    return res.status(200).json({ success: true, assignList });
  } catch (error) {
    // 🔥 Enhanced 500 error management
    console.error("CRITICAL ERROR [/AllAssign]:", error);
    return res.status(500).json({ 
      success: false,
      error: "InternalServerError",
      msg: "The database cluster timed out or failed to parse current records request." 
    });
  }
});

// ==========================================
// 3. UPDATE PRODUCT (PUT)
// ==========================================
router.put("/Assign/update/:id", cpUpload, async (req, res) => {
  try {
    const { name, desc, salePrice, lowProductLimit, productStack, productCollection } = req.body;
    
    const existingProduct = await Assign.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    let updateData = { name, desc, salePrice, lowProductLimit, productStack, productCollection };

    if (req.files && req.files['mainImage']) {
      const mainImageFile = req.files['mainImage'][0];
      const result = await cloudinary.uploader.upload(mainImageFile.path);
      updateData.mainImage = result.secure_url;
      fs.unlinkSync(mainImageFile.path);
    }

    if (req.files && req.files['additionalImages']) {
      let newAdditionalImageUrls = [];
      for (const file of req.files['additionalImages']) {
        const result = await cloudinary.uploader.upload(file.path);
        newAdditionalImageUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
      
      updateData.additionalImages = [...existingProduct.additionalImages, ...newAdditionalImageUrls].slice(0, 4);
    }

    const updated = await Assign.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Updated Successfully",
      updated,
    });

  } catch (error) {
    // 🔥 Enhanced 500 error management
    console.error("CRITICAL ERROR [/Assign/update]:", error);
    return res.status(500).json({ 
      success: false,
      error: "InternalServerError",
      msg: "The server encountered an error while writing dynamic data stream configurations." 
    });
  }
});

// ==========================================
// 4. DELETE PRODUCT
// ==========================================
router.delete("/Assign/delete/:id", async (req, res) => {
  try {
    const deleted = await Assign.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      msg: "Deleted Successfully",
      deleted,
    });

  } catch (error) {
    // 🔥 Enhanced 500 error management
    console.error("CRITICAL ERROR [/Assign/delete]:", error);
    return res.status(500).json({ 
      success: false,
      error: "InternalServerError",
      msg: "The document deletion request failed because of an unhandled infrastructure break." 
    });
  }
});

export default router;