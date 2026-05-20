import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";



const router = express.Router();
// const mykeyForToken = '';
const mykeyForToken = process.env.MY_KEY_FOR_TOKEN;


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already exists" });

    const hashpassword = await bcrypt.hash(password, 10);

    let role = "user";
    const existingAdmin = await User.findOne({ role: "admin" })
    if (!existingAdmin) {
      role = "admin"
    }

    const newUser = await User.create({ name, email, password: hashpassword, role });


    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, mykeyForToken, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

    return res.status(201).json({ msg: "Account created successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

    const token = jwt.sign({ userId: existingUser._id, role: existingUser.role }, mykeyForToken, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

    return res.status(200).json({ msg: "Logged in successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});


router.get("/me", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});



router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "Logged out successfully" });
});

export default router;