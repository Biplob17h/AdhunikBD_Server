import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../model/userModel.js";
import nodemailer from "nodemailer";
import generateToken from "../utils/token.js";
import getUserByEmail from "../utils/getUserByEmail.js";
import fs from "fs";
import Vendor from "../model/vendorModel.js";

// **VENDOR SIGN UP  **
const createAVendor = async (req, res) => {
  try {
    const { vendorName, shopName, shopAddress, phone, password } = req.body;
    // checked credentials
    if (!vendorName || !shopName || !shopAddress || !phone || !password) {
      return res.status(400).json({
        status: "fail",
        message: "please provide your credentials",
      });
    }

    // checked is phone number from BD
    if (phone[0] !== "0" || phone[1] !== "1") {
      return res.status(400).json({
        status: "fail",
        message: "please provide a correct phone number",
      });
    }

    // check is vendor already in use
    const oldVendor = await Vendor.findOne({ phone });
    if (oldVendor) {
      return res.status(400).json({
        status: "fail",
        message: "number already in use",
      });
    }

    // hash password
    const slot = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, slot);

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

    // gen vendor
    const vendorData = {
      vendorName,
      shopName,
      shopAddress,
      email,
      phone,
      password: hashPassword,
    };

    // send data to database
    const vendor = new Vendor(vendorData);
    const result = await vendor.save();

    // send response
    res.status(200).json({
      status: "success",
      message: "Vendor created successfully",
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

// ** VENDOR LOGIN **
const vendorLogIn = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // get credentials
    if (!phone || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide your credentials",
      });
    }

    // find Vendor
    const vendor = await Vendor.findOne({ phone });
    if (!vendor) {
      return res.status(400).json({
        status: "fail",
        message: "No vendor found",
      });
    }

    // check password
    const checkPassword = await bcrypt.compare(password, vendor.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: "fail",
        message: "wrong password",
      });
    }

    // generate token
    const token = generateToken(vendor);

    // client data
    const vendorData = await Vendor.findOne({ phone }).select("-password");

    // send response
    res.status(200).json({
      status: "success",
      message: "Vendor Login successfully",
      data: {
        vendorData,
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

// ** SEND VENDOR DATA TO CLIENT SIDE **
const getVendor = async (req, res) => {
  try {
    // get vendor data
    const user = req.user;

    // find vendor data
    const vendorData = await Vendor.findOne({ phone: user.phone }).select(
      "-password"
    );

    // send response
    res.status(200).json({
      status: "success",
      vendorData,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** UPDATE VENDOR **
const updateVendorProfile = async (req, res) => {
  try {
    // get update information
    const {
      vendorName,
      shopName,
      shopAddress,
      email,
      vendorPhoto,
      nid,
      newPhone,
    } = req.body;

    // query
    const { phone } = req.body;
    const query = {
      phone: phone,
    };

    // get vendor form database
    const vendor = await Vendor.findOne(query);
    if (!vendor) {
      return res.status(400).json({
        status: "fail",
        message: "Vendor not found",
      });
    }
    // update vendor information
    if (vendorName) {
      vendor.vendorName = vendorName;
    }
    if (email) {
      vendor.email = email;
    }
    if (shopName) {
      vendor.shopName = shopName;
    }
    if (shopAddress) {
      vendor.shopAddress = shopAddress;
    }
    if (vendorPhoto) {
      vendor.vendorPhoto = vendorPhoto;
    }
    if (nid) {
      vendor.nid = nid;
    }
    if (newPhone) {
      vendor.phone = newPhone;
    }

    const result = await Vendor.updateOne(query, { $set: vendor });

    // send response
    res.status(200).json({
      status: "success",
      message: "Vendor updated successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** GET ALL VENDOR **
const getAllVendor = async (req, res) => {
  try {
    // find all Vendors
    const vendors = await Vendor.find({});

    // send response
    res.status(200).json({
      status: "success",
      vendors,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** DELETE VENDOR **
const deleteVendorProfile = async (req, res) => {
  try {
    // get phone number from query parameters
    const phone = req.query.phone;

    // query
    const query = { phone: phone };

    // check vendor
    const vendor = await Vendor.findOne(query);
    if (!vendor) {
      return res.status(400).json({
        status: "fail",
        message: "Vendor not found",
      });
    }

    // delete vendor from database
    const result = await Vendor.findOneAndDelete(query);

    // send response
    res.status(200).json({
      status: "success",
      message: "Vendor deleted successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** UPDATE VENDOR STATUS **
const updateVendorStatus = async (req, res) => {
  try {
    // get phone number from query parameters
    const phone = req.query.phone;
    const status = req.query.status;

    // query
    const query = { phone: phone };

    // check vendor
    const vendor = await Vendor.findOne(query);
    if (!vendor) {
      return res.status(400).json({
        status: "fail",
        message: "Vendor not found",
      });
    }

    // update vendor status
    vendor.status = status;

    const result = await Vendor.updateOne(query, { $set: vendor });

    // send response
    res.status(200).json({
      status: "success",
      message: "Vendor status updated successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** UPDATE VENDOR PASSWORD **
const updateVendorPassword = async (req, res) => {
  try {
    // get information
    const { oldPassword, newPassword, phone } = req.body;

    // query
    const query = { phone: phone };

    // check vendor
    const vendor = await Vendor.findOne(query);
    if (!vendor) {
      return res.status(400).json({
        status: "fail",
        message: "Vendor not found",
      });
    }

    // check old password
    const checkOldPassword = await bcrypt.compare(oldPassword, vendor.password);
    if (!checkOldPassword) {
      return res.status(400).json({
        status: "fail",
        message: "wrong old password",
      });
    }

    // hash new password
    const slot = await bcrypt.genSalt(10); // salt rounds
    const hashPassword = await bcrypt.hash(newPassword, slot);

    // update vendor status
    vendor.password = hashPassword;

    // update vendor in database
    const result = await Vendor.updateOne(query, { $set: vendor });

    // send response
    res.status(200).json({
      status: "success",
      message: "Vendor password updated successfully",
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
  createAVendor,
  vendorLogIn,
  getAllVendor,
  getVendor,
  updateVendorProfile,
  updateVendorStatus,
  deleteVendorProfile,
  updateVendorPassword,
};
