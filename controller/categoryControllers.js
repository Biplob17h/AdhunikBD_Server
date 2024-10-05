import Category from "../model/categoryModel.js";

export const createACategory = async (req, res) => {
  try {
    const { category, photo } = req.body;

    // Create a new category
    const newCategory = new Category({ category, photo });
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
    const { id } = req.params;

    // find category
    const category = await Category.findOne({ _id: id });
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
    const { category, _id, photo } = req.body;
    // find the category
    const result = await Category.findOneAndUpdate(
      { _id },
      { category, photo },
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
    const { id } = req.params;
    // find the category
    const result = await Category.findOneAndDelete({ _id : id});
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
