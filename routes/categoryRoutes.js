import express from "express";
import { createACategory, deleteACategory, getAllCategory, getSingleCategory, updateACategory } from "../controller/categoryControllers.js";

const categoryRoute = express.Router();

// all post
categoryRoute.post("/create", createACategory);

// all gets
categoryRoute.get("/single", getSingleCategory);
categoryRoute.get("/all", getAllCategory);

// all update
categoryRoute.patch("/update", updateACategory);

// delete a category
categoryRoute.delete("/delete", deleteACategory);

export default categoryRoute;
