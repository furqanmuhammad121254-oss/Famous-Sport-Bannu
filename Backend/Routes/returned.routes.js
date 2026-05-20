import express from "express";
import multer from "multer";
import Returned from "../models/Returned.js";
import cloudinary from "../config/doudinary.js";
import fs from "fs";

const router = express.Router();


const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });



router.post("/Returned/create", upload.single("image"), async (req, res) => {
  try {
    const { name, book, cnic, phone, address } = req.body;

    let imageUrl = null;

    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    const returnedBook = await Returned.create({
      name,
      book,
      cnic,
      phone,
      address,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      msg: "Book Returned Successfully",
      returnedBook,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});



router.get("/AllReturned", async (req, res) => {
  try {
    const returnedList = await Returned.find();

    return res.status(200).json({
      success: true,
      returnedList,
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
});



router.put("/Returned/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, book, cnic, phone, address } = req.body;

    let updateData = { name, book, cnic, phone, address };

    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    const updated = await Returned.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Returned Book Updated Successfully",
      updated,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});



router.delete("/Returned/delete/:id", async (req, res) => {
  try {
    const deleted = await Returned.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      msg: "Returned Book Deleted Successfully",
      deleted,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;