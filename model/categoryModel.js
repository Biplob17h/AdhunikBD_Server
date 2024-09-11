import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  subCategory: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "category Name must be unique"],
    maxLength: [50, "name is too long"],
  },
  photo: {
    type: String,
    required: true,
    default : "",
  },
  categorySlug: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("categories", categorySchema);

export default Category;
