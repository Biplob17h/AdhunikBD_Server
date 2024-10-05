import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../model/userModel.js";
import Vendor from "../model/vendorModel.js";
const verifyVendor = async (req, res, next) => {
  try {
    // get token
    const token = await req.headers?.authorization?.split(" ")[1];

    // verify token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_TOKEN_SECRET
    );
    const vendor = await Vendor.findById({ _id: decoded.userId }).select([
      "-_id",
      "-password",
    ]);

    if (!vendor) {
      return res.status(404).json({
        status: "fail",
        message: "Vendor not found",
      });
    }
    req.vendor = vendor;
    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

export default verifyVendor;
