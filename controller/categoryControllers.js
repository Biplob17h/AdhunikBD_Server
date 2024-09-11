import Category from "../model/categoryModel.js";

export const createACategory = async (req, res) => {
  try {
    const { category, slug } = req.body;

    // Check if category already exists
    const categoryExists = await Category.findOne({ slug });
    if (categoryExists) {
      return res.status(400).json({
        status: "fail",
        message: "Category with the same slug already exists.",
      });
    }
    // Create a new category
    const newCategory = new Category({ category, slug });
    const result = await newCategory.save();

    res.status(201).json({
      status: "success",
      message: "Category created successfully.",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getSingleCategory = async (req, res) => {
  try {
    const { slug } = req.query;
    

    // find category
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found.",
      });
    }
    res.json({
      status: "success",
      message: "Category fetched successfully.",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getAllCategory = async (req, res) => {
  const categories = await Category.find({});

  res.json({
    status: "success",
    message: "Categories fetched successfully.",
    categories,
  });
  try {
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const updateACategory = async (req, res) => {
  try {
    const { category, slug } = req.body;
    // find the category
    const result = await Category.findOneAndUpdate(
      { slug },
      { category },
      { new: true, runValidators: true }
    );
    if (!result) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found.",
      });
    }
    res.json({
      status: "success",
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const deleteACategory = async (req, res) => {
  try {
    const { slug } = req.query;
    // find the category
    const result = await Category.findOneAndDelete({ slug });
    if (!result) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found.",
      });
    }
    res.json({
      status: "success",
      message: "Category deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
