import express from "express";
import {
  createCategory,
  createSubcategory,
  deleteACategory,
  deleteASubcategory,
  getACategory,
  getAllCategories,
  updateCategoryName,
  updateSubcategoryName,
} from "../controller/categoryControllers.js";

const categoryRouter = express.Router();

// ALL POSTS
categoryRouter.post("/createCategory", createCategory);
categoryRouter.post('/createSubcategory', createSubcategory);

// ALL GETS
categoryRouter.get("/allCategories", getAllCategories);
categoryRouter.get("/getCategory/:categoryId", getACategory);

// ALL UPDATES
categoryRouter.patch('/updateCategoryName', updateCategoryName);
categoryRouter.patch('/updateSubCategoryName', updateSubcategoryName);


// ALL DELETES
categoryRouter.delete("/deleteCategory/:categoryId", deleteACategory);
categoryRouter.delete("/deleteSubCategory", deleteASubcategory);

export default categoryRouter;
