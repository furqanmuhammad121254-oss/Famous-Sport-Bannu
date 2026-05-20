import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    Title: String,
    Author: String,
    Category: String,
    ISBN: String,
    Status: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);