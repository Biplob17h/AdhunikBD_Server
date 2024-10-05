import express from "express";
import { createAService, deleteAService, getAllServiceForASubCategory, getAllServices, getAService, updateAService } from "../controller/serviceController.js";

const serviceRoute = express.Router();

// all post
serviceRoute.post('/create', createAService)

// all gets
serviceRoute.get('/single/:id', getAService)
serviceRoute.get('/all', getAllServices)
serviceRoute.get('/subCategory/:subCategoryId', getAllServiceForASubCategory)

// all update 
serviceRoute.patch('/update', updateAService)

// all delete
serviceRoute.delete('/delete', deleteAService)



export default serviceRoute;
