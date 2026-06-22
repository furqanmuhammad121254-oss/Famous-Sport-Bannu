


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "dotenv";

import connectDataBase from "./config/db.js";

import checkRole from "./middlewares/checkRole.js";
import checkToken from "./middlewares/checkToken.js";

import authRoutes from "./Routes/auth.routes.js";
import BookRoutes from "./Routes/Book.routes.js";
import StudentRouter from "./Routes/students.routes.js";
import assignRoutes from "./Routes/assign.routes.js";
import returnedroutes from "./Routes/returned.routes.js";
import cateigoriesroutes from "./Routes/categories.routes.js";
import contactRoutes from "./routes/contactRoutes.js";

env.config();

const app = express();

// Database
connectDataBase();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_ONLINE_URL,
    credentials: true,
  })
);

// Public Route
app.get("/", (req, res) => {
  res.json({
    message: "Backend Working 🚀",
  });
});

// Protected Route
app.get(
  "/admin",
  checkToken,
  checkRole("admin"),
  (req, res) => {
    res.json({
      message: "Admin Route Working ✅",
    });
  }
);



// Routes
app.use("/auth", authRoutes);
app.use("/Book", BookRoutes);
app.use("/", StudentRouter);
app.use("/", assignRoutes);
app.use("/", returnedroutes);
app.use("/", cateigoriesroutes);
app.use("/api/contact", contactRoutes);



// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});