import mongoose from "mongoose";

const ReturnedSchema = new mongoose.Schema(
  {
    name: String,
    book: String,
    cnic: Number,
    phone: Number,
    address: String,
    image: String,
  },
  { timestamps: true }
);

const returnedBook = mongoose.model("ReturnedBook", ReturnedSchema);

export default returnedBook;