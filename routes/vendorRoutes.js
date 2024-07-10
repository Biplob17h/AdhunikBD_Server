import express from "express";
import {
  createAVendor,
  deleteVendorProfile,
  getAllVendor,
  getVendor,
  updateVendorPassword,
  updateVendorProfile,
  updateVendorStatus,
  vendorLogIn,
} from "../controller/vendorControllers.js";
import verifyUser from "../utils/verifyUser.js";

const vendorRouter = express.Router();

// ALL POSTS
vendorRouter.post("/signup", createAVendor);
vendorRouter.post("/signin", vendorLogIn);

// ALL GETS
vendorRouter.get("/allVendors", getAllVendor);
vendorRouter.get("/getVendor", verifyUser, getVendor);

// ALL UPDATES
vendorRouter.patch("/updateVendor", updateVendorProfile);
vendorRouter.patch("/updateVendorStatus", updateVendorStatus);
vendorRouter.patch("/updateVendorPassword", updateVendorPassword)

// ALL DELETES
vendorRouter.delete('/deleteVendor', deleteVendorProfile);

export default vendorRouter;
