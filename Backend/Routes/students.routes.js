import express from "express";
import multer from "multer";
import Student from "../models/Student.js";
import cloudinary from "../config/doudinary.js";
import fs from "fs";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });



router.post("/student/create", upload.single("image"), async (req, res) => {
  try {
    const { name, fatherName, cnic, phone } = req.body;

    let imageUrl = "";

    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;

      
      fs.unlinkSync(req.file.path);
    }

    const student = await Student.create({
      name,
      fatherName,
      cnic,
      phone,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      msg: "Student created successfully",
      student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});



router.get("/AllStudents", async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json({ success: true, students });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});



router.put("/student/update/:id", upload.single("image"), async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, fatherName, cnic, phone } = req.body;

    let updatedData = { name, fatherName, cnic, phone };

    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedData.image = result.secure_url;

      
      fs.unlinkSync(req.file.path);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        msg: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Student updated successfully",
      updatedStudent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});



router.delete("/student/delete/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        msg: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Student deleted successfully",
      deletedStudent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;