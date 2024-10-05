import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendors",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("reviews", reviewSchema);

export default Review;
