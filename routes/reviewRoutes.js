import express from "express";
import {
  createAReview,
  getAllReviews,
  getAllReviewsForAUser,
  getAllReviewsForAVendor,
  getASingleReview,
  updateReview,
} from "../controller/reviewController.js";

const reviewRoute = express.Router();

reviewRoute.post("/create", createAReview);

reviewRoute.get("/single/:id", getASingleReview);
reviewRoute.get("/all/user/:id", getAllReviewsForAUser);
reviewRoute.get("/all/vendor/:id", getAllReviewsForAVendor);
reviewRoute.get("/all", getAllReviews);

reviewRoute.patch("/update/:id", updateReview);

export default reviewRoute;
