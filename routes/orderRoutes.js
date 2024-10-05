import express from "express";
import { createAOrder, getAOrder, getAllOrders, updateAOrder } from "../controller/orderController.js";

const orderRoute = express.Router();

// All post
orderRoute.post("/create", createAOrder);

// All gets
orderRoute.get("/single/:id", getAOrder);
orderRoute.get("/all", getAllOrders);


// All updates
orderRoute.patch("/update/:id", updateAOrder);


export default orderRoute;
