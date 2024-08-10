import bcrypt from "bcrypt";
import { Admin } from "../model/adminModel.js";

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checked credentials
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide your credentials",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create admin data
    const adminData = {
      email,
      password: hashPassword,
    };

    // send data to database
    const result = await Admin.create(adminData);

    // send response
    res.status(200).json({
      status: "success",
      message: "User created successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

const adminLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // get credentials
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide your credentials",
      });
    }
    const admin = await Admin.findOne({ email });

    // check password
    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: "fail",
        message: "wrong password",
      });
    }

    // client data
    const adminData = await Admin.findOne({ email }).select("-password");

    // send response
    res.status(200).json({
      status: "success",
      message: "User sign in successfully",
      adminData,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const changeAdminPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    admin.password = hashedPassword;
    const query = {
      email: email,
    };
    const result = await Admin.updateOne(query, { $set: admin });
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createAdmin, adminLogIn, changeAdminPassword };
