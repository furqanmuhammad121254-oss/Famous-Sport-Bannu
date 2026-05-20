import mongoose from "mongoose";

const assignSchema = new mongoose.Schema(
    {
        name: String,
        desc: String,
        price: String,
        image: String,
    },
    { timestamps: true }
);

export default mongoose.model("Assign", assignSchema);
