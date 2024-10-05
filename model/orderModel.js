import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  rode: {
    type: String,
    required: true,
  },
  house: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
  },
  problem: {
    type: String,
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendors",
    default: null,
  },
  vendorAcceptedStatus: {
    type: String,
    default: "not set",
    enum: ["not set", "pending", "accepted", "rejected"],
  },
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reviews",
    default: null,
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tickets",
    default: null,
  },
  status: {
    type: String,
    default: "new",
    enum: ["new", "pending", "accepted", "served", "completed", "cancelled"],
  },
  coupon: {
    type: String,
    default: "working on it, this function will be at later",
  },
  orderAt: {
    type: Date,
    default: Date.now(),
  },
  completedAt: {
    type: Date,
    default: "",
  },
  vendorParseint: {
    type: Number,
    default: 20,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const Order = mongoose.model("orders", orderSchema);

export default Order;
