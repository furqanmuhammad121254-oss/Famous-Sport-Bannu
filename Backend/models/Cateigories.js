// models/Categories.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  desc: String,
  image: String,
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);