import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendors",
  },
  status: {
    type: String,
    enum: ["new", "active", "solved", "closed"],
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: {
    type: Date,
    default: null,
  },
  title: {
    type: String,
    required: true,
    maxLength: [100, "title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: true,
    maxLength: [500, "description cannot be more than 500 characters"],
    minLength: [10, "description cannot be less than 10 characters"],
  },
});

const Ticket = mongoose.model("tickets", ticketSchema);

export default Ticket;
