
// import express from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import checkToken from "../middlewares/CheckToken.js"


// const router = express.Router();
// const mykeyForToken = 'pass@1234';
// // const mykeyForToken = process.env.MY_KEY_FOR_TOKEN;


// // router.post("/signup", async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;
// //     if (!name || !email || !password) return res.status(400).json({ msg: "All fields are required" });

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) return res.status(400).json({ msg: "Email already exists" });

// //     const hashpassword = await bcrypt.hash(password, 10);

// //     let role = "user";
// //     const existingAdmin = await User.findOne({ role: "admin" })
// //     if (!existingAdmin) {
// //       role = "admin"
// //     }

// //     const newUser = await User.create({ name, email, password: hashpassword, role });


// //     const token = jwt.sign({ userId: newUser._id, role: newUser.role }, mykeyForToken, { expiresIn: "7d" });
// //     res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

// //     return res.status(201).json({ msg: "Account created successfully" });
// //   } catch (error) {
// //     return res.status(500).json({ msg: error.message });
// //   }
// // });


// export const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // check if admin already exists
//     const existingAdmin = await User.findOne({ role: "admin" });

//     if (existingAdmin) {
//       return res.status(400).json({ msg: "Admin already exists. Signup disabled." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "admin"
//     });

//     res.status(201).json({ msg: "Admin created successfully", admin });

//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };


// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     if (!email || !password) return res.status(400).json({ msg: "All fields are required" });

// //     const existingUser = await User.findOne({ email });
// //     if (!existingUser) return res.status(400).json({ msg: "User not found" });

// //     const isMatch = await bcrypt.compare(password, existingUser.password);
// //     if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

// //     const token = jwt.sign({ userId: existingUser._id, role: existingUser.role }, mykeyForToken, { expiresIn: "7d" });
// //     res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

// //     return res.status(200).json({ msg: "Logged in successfully" });
// //   } catch (error) {
// //     return res.status(500).json({ msg: error.message });
// //   }
// // });

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid email" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       msg: "Login successful",
//       token,
//       user
//     });

//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };



// router.get("/me",checkToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");
//     return res.status(200).json({ user });
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// });



// router.post("/logout", (req, res) => {
//   res.clearCookie("token");
//   return res.status(200).json({ msg: "Logged out successfully" });
// });

// export default router;



import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt, { hash } from "bcrypt";
import checkToken from "../middlewares/CheckToken.js";


const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;


// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({ msg: "Admin created", admin });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


// ================= ME =================
router.get("/me", checkToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


// ================= LOGOUT =================
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out" });
});

export default router;