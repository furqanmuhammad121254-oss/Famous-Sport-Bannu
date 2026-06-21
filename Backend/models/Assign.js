// // import mongoose from "mongoose";

// // const assignSchema = new mongoose.Schema(
// //     {
// //         name: String,
// //         desc: String,
// //         price: String,
// //         image: String,
// //     },
// //     { timestamps: true }
// // );

// // export default mongoose.model("Assign", assignSchema);




// import mongoose from "mongoose";

// const assignSchema = new mongoose.Schema(
//     {
//         name: { type: String, required: true },
//         desc: { type: String, required: true },
//         originalPrice: { type: Number, required: true },
//         salePrice: { type: Number, required: true },
//         discount: { type: Number, default: 0 },
//         size: { type: String, required: true },
//         color: { type: String, required: true },
//         material: { type: String, required: true },
//         weight: { type: String, required: true },
//         mainImage: { type: String, required: true }, // Cloudinary URL
//         additionalImages: [{ type: String }]        // Cloudinary URLs array
//     },
//     { timestamps: true }
// );

// export default mongoose.model("Assign", assignSchema);



import mongoose from "mongoose";

const assignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    salePrice: {
      type: Number,
      required: [true, "Sale price is required"],
      min: [0, "Price cannot be a negative value"],
    },
    lowProductLimit: {
      type: Number,
      required: [true, "Low product alert limit is required"],
      min: [0, "Alert limit cannot be negative"],
      default: 10,
    },
    productStack: {
      type: Number,
      required: [true, "Product stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
      default: 0,
    },
    productCollection: {
      type: String,
      required: [true, "Product collection name is required"],
      trim: true,
    },
    mainImage: {
      type: String,
      required: [true, "Primary cover image URL is required"],
    },
    additionalImages: {
      type: [String],
      validate: [
        (val) => val.length <= 5,
        "Maximum 5 additional images allowed",
      ],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

const Assign = mongoose.model("Assign", assignSchema);

export default Assign;