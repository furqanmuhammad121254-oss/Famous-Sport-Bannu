import express from "express";
import Book from "../models/Book.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.get("/AllBook", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { Title, Author, Category, ISBN, Status } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newBook = await Book.create({
      Title,
      Author,
      Category,
      ISBN,
      Status,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      book: newBook,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.put("/update", upload.single("image"), async (req, res) => {
  try {
    const { id, Title, Author, Category, ISBN, Status } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }


    if (req.file && book.image) {
      const oldPath = path.join(
        "uploads",
        path.basename(book.image)
      );

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const updateData = {
      Title,
      Author,
      Category,
      ISBN,
      Status,
      image,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    await Book.findByIdAndUpdate(id, updateData);

    res.json({
      success: true,
      message: "Book updated successfully",
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }


    if (book.image) {
      const imagePath = path.join(
        "uploads",
        path.basename(book.image)
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Book.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;