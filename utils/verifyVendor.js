import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../model/userModel.js";
import Vendor from "../model/vendorModel.js";
const verifyVendor = async (req, res, next) => {
  try {
    // get token 
    const token = await req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.json({
        status: "fail",
        error: "authentication error Please re login",
      });
    }

    const decode = await promisify(jwt.verify)(
      token,
      process.env.JWT_TOKEN_SECRET
    );

    const user = await Vendor.findOne({ phone: decode?.phone });

    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

export default verifyVendor;
