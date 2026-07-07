

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDatabase from "./config/db.js";

import checkToken from "./middlewares/checkToken.js";
import checkRole from "./middlewares/checkRole.js";

import authRoutes from "./Routes/auth.routes.js";
import BookRoutes from "./Routes/Book.routes.js";
import StudentRouter from "./Routes/students.routes.js";
import assignRoutes from "./Routes/assign.routes.js";
import returnedroutes from "./Routes/returned.routes.js";
import cateigoriesroutes from "./Routes/categories.routes.js";
import contactRoutes from "./routes/contactRoutes.js";

// Load .env
dotenv.config();

// Connect Database
connectDatabase();

const app = express();

// =======================
// Middlewares
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// =======================
// Test Route
// =======================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Working 🚀",
  });
});

// =======================
// Protected Route
// =======================
app.get(
  "/admin",
  checkToken,
  checkRole("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin Route Working ✅",
      user: req.user,
    });
  }
);

// =======================
// API Routes
// =======================
app.use("/auth", authRoutes);
app.use("/Book", BookRoutes);
app.use("/", StudentRouter);
app.use("/", assignRoutes);
app.use("/", returnedroutes);
app.use("/", cateigoriesroutes);
app.use("/api/contact", contactRoutes);

// =======================
// 404 Route
// =======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =======================
// Server
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});