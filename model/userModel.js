import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [5, "name is too short"],
    maxLength: [50, "name is too long"],
  },
  phone: {
    type: String,
    required: true,
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
    default: "example@gamil.com", // Default email value
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "password is too short"], // Minimum length for password
  },

  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },
  photo: {
    type: String,
    default: "",
  },
  nid: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", userSchema);

export default User;
