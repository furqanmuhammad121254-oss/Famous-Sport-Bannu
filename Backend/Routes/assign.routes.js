import express from "express";
import multer from "multer";
import Assign from "../models/Assign.js";
import cloudinary from "../config/doudinary.js";
import fs from "fs";

const router = express.Router();

// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });



router.post("/Assign/create", upload.array("image",5), async (req, res) => {
  try {
    const { name, desc, price } = req.body;

    let imageUrl = null;

    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path); 
    }

    const assignBook = await Assign.create({
      name,
      desc,
      price,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      msg: "Book Assigned Successfully",
      assignBook,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});



router.get("/AllAssign", async (req, res) => {
  try {
    const assignList = await Assign.find();

    return res.status(200).json({
      success: true,
      assignList,
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
});



router.put("/Assign/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, desc, price } = req.body;

    let updateData = { name, desc, price };

    if (req.file?.path) {
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
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});



router.delete("/Assign/delete/:id", async (req, res) => {
  try {
    const deleted = await Assign.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      msg: "Deleted Successfully",
      deleted,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;