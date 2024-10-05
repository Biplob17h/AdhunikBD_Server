import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subCategory: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  serviceFeatures: [
    {
      serviceFeatures: {
        type: String,
      },
    },
  ],
  excluded: [
    {
      excluded: {
        type: String,
      },
    },
  ],
});

const SubCategory = mongoose.model("SubCategories", subCategorySchema);

export default SubCategory;
