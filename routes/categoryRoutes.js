import express from "express";
import { createACategory, deleteACategory, getAllCategory, getSingleCategory, updateACategory } from "../controller/categoryControllers.js";

const categoryRoute = express.Router();

// all post
categoryRoute.post("/create", createACategory);

// all gets
categoryRoute.get("/single/:id", getSingleCategory);
categoryRoute.get("/all", getAllCategory);

// all update
categoryRoute.patch("/update", updateACategory);

// delete a category
categoryRoute.delete("/delete/:id", deleteACategory);

export default categoryRoute;
