


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "dotenv";

import connectDatabase from "./config/db.js";


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
connectDatabase();

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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});