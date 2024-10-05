import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("admin", adminSchema);

export { Admin };
