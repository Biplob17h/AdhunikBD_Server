import express from "express";
import {
  adminLogIn,
  changeAdminPassword,
  createAdmin,
} from "../controller/adminController.js";

const adminRoutes = express.Router();

adminRoutes.post("/signup", createAdmin);
adminRoutes.post("/login", adminLogIn);
adminRoutes.patch("/updatePassword", changeAdminPassword);

export default adminRoutes;
