import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  totalOrder: {
    type: Number,
    default: 0,
    minLength: [0, "Order length cannot be negative"],
  },
  acceptOrder: {
    type: Number,
    default: 0,
    minLength: [0, "Order length cannot be negative"],
  },
  pendingOrder: {
    type: Number,
    default: 0,
    minLength: [0, "Order length cannot be negative"],
  },
  servedOrder: {
    type: Number,
    default: 0,
    minLength: [0, "Order length cannot be negative"],
  },
  completedOrder: {
    type: Number,
    default: 0,
    minLength: [0, "Order length cannot be negative"],
  },
  cancelledOrder: {
    type: Number,
    default: 0,
    minLength: [0, "Order length cannot be negative"],
  },
  newTicket: {
    type: Number,
    default: 0,
    minLength: [0, "Ticket length cannot be negative"],
  },
  activeTicket: {
    type: Number,
    default: 0,
    minLength: [0, "Ticket length cannot be negative"],
  },
  solvedTicket: {
    type: Number,
    default: 0,
    minLength: [0, "Ticket length cannot be negative"],
  },
  closedTicket: {
    type: Number,
    default: 0,
    minLength: [0, "Ticket length cannot be negative"],
  },
  totalSale: {
    type: Number,
    default: 0,
    minLength: [0, "Sale length cannot be negative"],
  },
});

const Counter = mongoose.model("counter", counterSchema);

export default Counter;
