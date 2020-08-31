// same instance of mongoose
const mongoose = require("mongoose");
//doctor schema design
const doctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//passing the doctorSchema instance to mongoose.model
const Doctor = mongoose.model("Doctor", doctorSchema);
//exporting the schema to be used further
module.exports = Doctor;
