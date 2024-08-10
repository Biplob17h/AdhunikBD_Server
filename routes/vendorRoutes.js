import express from "express";
import {
  addVendorShopPhoto,
  createAVendor,
  deleteAShopPhoto,
  deleteVendorProfile,
  getAllVendor,
  getVendor,
  updateVendorPassword,
  updateVendorProfile,
  vendorLogIn,
} from "../controller/vendorControllers.js";
import verifyUser from "../utils/verifyUser.js";
import verifyVendor from "../utils/verifyVendor.js";

const vendorRouter = express.Router();

// ALL POSTS
vendorRouter.post("/signup", createAVendor);
vendorRouter.post("/signin", vendorLogIn);

// ALL GETS
vendorRouter.get("/allVendors", getAllVendor);
vendorRouter.get("/getVendor", verifyVendor, getVendor);

// ALL UPDATES
vendorRouter.patch("/updateVendor", updateVendorProfile);
vendorRouter.patch("/updateVendorPassword", updateVendorPassword);
vendorRouter.patch("/addAShopPhoto", addVendorShopPhoto);
vendorRouter.patch("/removeAShopPhoto", deleteAShopPhoto);

// ALL DELETES
vendorRouter.delete("/deleteVendor", deleteVendorProfile);

export default vendorRouter;
