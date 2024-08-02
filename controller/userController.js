import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../model/userModel.js";
import nodemailer from "nodemailer";
import generateToken from "../utils/token.js";
import getUserByEmail from "../utils/getUserByEmail.js";
import fs from "fs";

// ** SIGN UP USER **
const createAUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    console.log(phone.length);

    // checked credentials
    if (!name || !phone || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide your credentials",
      });
    }

    // checked if phone number is from BD
    if (phone[0] !== "0" || phone[1] !== "1" || phone.length !== 11) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide a correct phone number",
      });
    }

    // check if user already exists
    const oldUser = await User.findOne({ phone });
    if (oldUser) {
      return res.status(400).json({
        status: "fail",
        message: "Number already in use",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // fix unique email problem
    function generateRandomHex() {
      let hex = "";
      for (let i = 0; i < 6; i++) {
        hex += Math.floor(Math.random() * 16).toString(16);
      }
      return hex;
    }
    const randomNumber = generateRandomHex();
    const email = `example${randomNumber}@gamil.com`;

    // create user data
    const userData = {
      name,
      phone,
      password: hashPassword,
      email,
    };

    // send data to database
    const user = new User(userData);
    const result = await user.save();

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

// ** USER LOGIN **
const userLogIn = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // get credentials
    if (!phone || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide your credentials",
      });
    }

    // find user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "No user found",
      });
    }

    // check password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: "fail",
        message: "wrong password",
      });
    }

    // generate token
    const token = generateToken(user);

    // client data
    const userData = await User.findOne({ phone }).select("-password");

    // send response
    res.status(200).json({
      status: "success",
      message: "User sign in successfully",
      data: {
        userData,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** SEND USER DATA TO CLIENT SIDE **
const getUser = async (req, res) => {
  try {
    // get user data
    const user = req.user;

    // find user data
    const userData = await User.findOne({ phone: user.phone }).select(
      "-password"
    );

    // send response
    res.status(200).json({
      status: "success",
      userData,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** UPDATE USER **
const updateUserProfile = async (req, res) => {
  try {
    // get update information
    const { name, email, nid, dateOfBirth, gender, address } = req.body;

    // query
    const { phone } = req.body;
    const query = {
      phone: phone,
    };

    // get user form database
    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }
    // update user information
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (nid) {
      user.nid = nid;
    }
    if (dateOfBirth) {
      user.dateOfBirth = dateOfBirth;
    }
    if (gender) {
      user.gender = gender;
    }
    if (address) {
      user.address = address;
    }

    const result = await User.updateOne(query, { $set: user });

    // send response
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** GET ALL USERS **
const getAllUser = async (req, res) => {
  try {
    // find all users
    const allUser = await User.find({});

    // send response
    res.json({
      allUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** DELETE USER **
const deleteUser = async (req, res) => {
  try {
    // get phone number from query parameters
    const phone = req.query.phone;

    // query
    const query = { phone: phone };

    // check user
    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }

    // delete user from database
    const result = await User.findOneAndDelete(query);

    // send response
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    // get information
    const { oldPassword, newPassword, phone } = req.body;

    // query
    const query = { phone: phone };

    // check user
    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }

    // check old password
    const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkOldPassword) {
      return res.status(400).json({
        status: "fail",
        message: "wrong old password",
      });
    }

    // hash new password
    const slot = await bcrypt.genSalt(10); // salt rounds
    const hashPassword = await bcrypt.hash(newPassword, slot);

    // update user status
    user.password = hashPassword;

    // update user in database
    const result = await User.updateOne(query, { $set: user });

    // send response
    res.status(200).json({
      status: "success",
      message: "User password updated successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  createAUser,
  getUser,
  userLogIn,
  updateUserProfile,
  getAllUser,
  deleteUser,
  changeUserPassword,
};
