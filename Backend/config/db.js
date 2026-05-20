import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDatabase;
