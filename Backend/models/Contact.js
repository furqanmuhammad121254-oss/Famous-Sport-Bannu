import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);
const contactroutes = mongoose.model("Contact", contactSchema);
export default contactroutes