import mongoose from "mongoose";
import validator from "validator";

const vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
    trim: true,
    minLength: [5, "name is too short"],
    maxLength: [50, "name is too long"],
  },
  shopName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [50, "name is too long"],
  },
  shopAddress: {
    type: String,
    trim: true,
    maxLength: [50, "name is too long"],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    unique: [true, "phone number already in use"],
    validate: {
      validator: validator.isMobilePhone,
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    unique: [true, "please provide a unique email"],
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid email address!`,
    },
    default: "example@gamil.com",
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "password is too short"], // Minimum length for password
  },
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "vendor",
  },
  vendorPhoto: {
    type: String,
    default: "",
  },
  shopPhoto: {
    type: Array,
    default: [],
  },
  nid: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "blocked", "rejected"],
    default: "inactive",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vendor = mongoose.model("vendors", vendorSchema);

export default Vendor;
