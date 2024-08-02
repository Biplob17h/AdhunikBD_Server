import Category from "../model/categoryModel.js";

// ** CREATE A CATEGORY **
const createCategory = async (req, res) => {
  try {
    // get category and subcategories from request body
    const { category, subcategories } = req.body;

    // Generate a unique 8-character hex ID
    const generateUniqueHex = () => {
      let hex = "";
      for (let i = 0; i < 8; i++) {
        hex += Math.floor(Math.random() * 16).toString(16);
      }
      return hex;
    };

    // Add unique hex ID to each subcategory
    const updatedSubcategories = subcategories.map((subcategory) => ({
      ...subcategory,
      subcategoryId: generateUniqueHex(),
    }));

    // create a new category document
    const newCategory = new Category({
      category,
      subcategories: updatedSubcategories,
    });

    // save the category to the database
    const result = await newCategory.save();

    // send response
    res.json({
      status: "success",
      message: "Category created successfully",
      subcategories: updatedSubcategories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** CREATE A SUBCATEGORY **
const createSubcategory = async (req, res) => {
  try {
    // get the category ID and new subcategory from the request parameters
    const { categoryId, subcategory } = req.body;

    // generate a unique 8-character hex ID
    const generateUniqueHex = () => {
      let hex = "";
      for (let i = 0; i < 8; i++) {
        hex += Math.floor(Math.random() * 16).toString(16);
      }
      return hex;
    };

    // add unique hex ID to the subcategory
    subcategory.subcategoryId = generateUniqueHex();

    // find a category by its ID in the database
    const category = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { $push: { subcategories: subcategory } },
      { new: true }
    );

    // if the category is not found, send a 404 response
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    // send response
    res.status(200).json({
      status: "success",
      message: "Subcategory added successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** GET ALL CATEGORIES **
const getAllCategories = async (req, res) => {
  try {
    // find all categories in the database
    const categories = await Category.find({});

    // send response
    res.json({
      status: "success",
      message: "Categories retrieved successfully",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** GET A CATEGORY **
const getACategory = async (req, res) => {
  try {
    // get the category ID from the request parameters
    const categoryId = req.params.categoryId;

    // find a category by its ID in the database
    const category = await Category.findById({ _id: categoryId });

    // if the category is not found, send a 404 response
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    // send response
    res.json({
      status: "success",
      message: "Category retrieved successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** UPDATE A CATEGORY NAME **
const updateCategoryName = async (req, res) => {
  try {
    // get the category ID and new name from the request parameters
    const { categoryId, name } = req.body;

    // find a category by its ID in the database
    const category = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { category: name },
      { new: true }
    );

    // if the category is not found, send a 404 response
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    // send response
    res.status(200).json({
      status: "success",
      message: "Category name updated successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** UPDATE A CATEGORY SUBCATEGORY NAME **
const updateSubcategoryName = async (req, res) => {
  try {
    // get the category ID, subcategory ID, and new name from the request parameters
    const { categoryId, subcategoryId, name } = req.body;

    // find a category by its ID in the database
    const category = await Category.findOne({ _id: categoryId });

    // find the subcategory in the category
    const updatedSubcategories = category.subcategories.map((subcategory) => {
      if (subcategory.subcategoryId === subcategoryId) {
        return { ...subcategory, name: name };
      }
      return subcategory;
    });

    // update the category in the database
    const result = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { subcategories: updatedSubcategories },
      { new: true }
    );

    // send response
    res.status(200).json({
      status: "success",
      message: "Subcategory name updated successfully",
      categoryId,
      subcategoryId,
      name,
      category,
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** DELETE A CATEGORY **
const deleteACategory = async (req, res) => {
  try {
    // get the category ID from the request parameters
    const categoryId = req.params.categoryId;

    // find a category by its ID in the database
    const category = await Category.findByIdAndDelete({ _id: categoryId });

    // if the category is not found, send a 404 response
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    // send response
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ** DELETE A CATEGORY SUBCATEGORY **
const deleteASubcategory = async (req, res) => {
  try {
    // get the category ID and subcategory ID from the request parameters
    const { categoryId, subcategoryId } = req.query;

    // find a category by its ID in the database
    const category = await Category.findOne({ _id: categoryId });

    // find the subcategory in the category
    const updatedSubcategories = category.subcategories.filter(
      (subcategory) => subcategory.subcategoryId !== subcategoryId
    );

    // update the category in the database
    const result = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { subcategories: updatedSubcategories },
      { new: true }
    );

    // send response
    res.status(200).json({
      status: "success",
      message: "Subcategory deleted successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  createCategory,
  getAllCategories,
  getACategory,
  deleteACategory,
  updateCategoryName,
  updateSubcategoryName,
  createSubcategory,
  deleteASubcategory,
};
