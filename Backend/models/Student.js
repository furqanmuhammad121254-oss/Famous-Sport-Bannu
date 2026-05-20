import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: 
  { type: String, 
   required: true },

  fatherName: 
  { type: String, 
    required: true },

  cnic: 
  { type: String,
     required: true },

  phone: 
  { type: String,
     required: true },

  image:
   { type: String },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
