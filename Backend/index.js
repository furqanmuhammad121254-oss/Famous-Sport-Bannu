import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from 'dotenv'
import connectDataBase from "./config/db.js";
import checkRole from "./middlewares/checkRole.js";
import checkToken from "./middlewares/checkToken.js";


const app = express();
env.config()
connectDataBase();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);



app.get("/", checkToken, checkRole('admin'), (req, res) => {
  res.json("working");
});


import authRoutes from "./Routes/auth.routes.js"
app.use("/auth", authRoutes);


import BookRoutes from "./Routes/Book.routes.js";
app.use("/Book", BookRoutes);

import StudentRouter from "./Routes/students.routes.js";
app.use("/", StudentRouter);

import assignRoutes from "./Routes/assign.routes.js";
app.use("/", assignRoutes);

import returnedroutes from "./Routes/returned.routes.js";
app.use("/", returnedroutes)

import cateigoriesroutes from "./Routes/categories.routes.js"
app.use("/", cateigoriesroutes)



app.listen(3000, () => {
  console.log("Server running on port 3000");
});


