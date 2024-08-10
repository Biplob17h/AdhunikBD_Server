import express from "express";
import {
  changeApplicationStatus,
  getAllApplication,
  getASingleApplication,
  handleDeleteApplications,
} from "../controller/applicationController.js";

const applicationRoutes = express.Router();
// All gets
applicationRoutes.get("/single/:id", getASingleApplication);
applicationRoutes.get("/getAllApplication", getAllApplication);

// all updates
applicationRoutes.patch("/updateApplicationStatus", changeApplicationStatus);

// all delete
applicationRoutes.delete("/deleteApplication/:id", handleDeleteApplications);
export default applicationRoutes;
