import express from "express";
import multer from "multer";
import Assign from "../models/Cateigories.js"; // Note: Check spelling of "Cateigories" in your filename
import cloudinary from "../config/doudinary.js";
import fs from "fs";

const router = express.Router();


const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });


router.post("/categories/create", upload.single("image"), async (req, res) => {
  try {
    const { name, desc } = req.body;
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    
      fs.unlinkSync(req.file.path); 
    }

    const category = await Assign.create({
      name,
      desc,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      msg: "Category Created Successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(500).json({ msg: "Internal server error" });
  }
});


router.get("/AllCategories", async (req, res) => {
  try {
    const categories = await Assign.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      categories, 
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
});


router.put("/categories/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, desc } = req.body;
    let updateData = { name, desc };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updated = await Assign.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Updated Successfully",
      updated,
    });
  } catch (error) {
    console.error(error);
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(500).json({ msg: "Internal server error" });
  }
});


router.delete("/categories/delete/:id", async (req, res) => {
  try {
    await Assign.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      msg: "Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;