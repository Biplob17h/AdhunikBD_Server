import express from "express";
import {
  createAServiceInfo,
  createASubCategory,
  deleteAService,
  deleteASubCategory,
  getAllSubCategory,
  getASingleService,
  getSingleSubCategory,
  updateAService,
  updateASubCategory,
} from "../controller/subCategoryController.js";

const subCategoryRoute = express.Router();

// all post
subCategoryRoute.post("/create", createASubCategory);
subCategoryRoute.post("/createService", createAServiceInfo);

// all gets
subCategoryRoute.get("/single/:id", getSingleSubCategory);
subCategoryRoute.get(
  "/single/service/:subCategoryId/:serviceId",
  getASingleService
);
subCategoryRoute.get("/all", getAllSubCategory);


// all update
subCategoryRoute.patch("/update", updateASubCategory);
subCategoryRoute.patch("/updateService", updateAService);

// delete a category
subCategoryRoute.delete("/delete/:id", deleteASubCategory);
subCategoryRoute.delete("/deleteService", deleteAService);

export default subCategoryRoute;
