import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
  subCategory: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  categorySlug: {
    type: String,
    required: true,
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
