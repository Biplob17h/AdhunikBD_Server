import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "category Name must be unique"],
    maxLength: [50, "name is too long"],
  },
  subcategories: {
    type: Array,
    default: [],
  },
});

const Category = mongoose.model("categories", categorySchema);

export default Category;
