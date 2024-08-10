import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ["new", "read"],
    default: "new",
  },
  vendorPhone: {
    type: String,
    required: true,
  },
  vendor: {
    type: Object,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
