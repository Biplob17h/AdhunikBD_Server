import Service from "../model/serviceModel.js";
import SubCategory from "../model/subCategoryModel.js";

// Create a new Service
export const createAService = async (req, res) => {
  try {
    const { name, price, categorySlug, subCategoryId } = req.body;

    // Find the subcategory to ensure it exists
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({
        status: "fail",
        message: "SubCategory not found",
      });
    }

    // Create a new service
    const service = new Service({
      name,
      price,
      categorySlug,
      subCategoryId,
    });

    const result = await service.save();

    return res.status(201).json({
      status: "success",
      message: "Service created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get a specific Service by ID
export const getAService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById({ _id: id });
    if (!service) {
      return res.status(404).json({
        status: "fail",
        message: "Service not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get all Services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    return res.status(200).json({
      status: "success",
      data: services,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getAllServiceForASubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.query;

    const services = await Service.find({ subCategoryId });
    if (!services) {
      return res.status(404).json({
        status: "fail",
        message: "No services found for this subcategory",
      });
    }
    return res.status(200).json({
      status: "success",
      services,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const updateAService = async (req, res) => {
  try {
    const { name, price, categorySlug, subCategoryId, serviceId } = req.body;

    // Find the service by ID
    const service = await Service.findById({ _id: serviceId });

    if (!service) {
      return res.status(404).json({
        status: "fail",
        message: "Service not found",
      });
    }

    // Update the service fields with new data if provided
    if (name) service.name = name;
    if (price) service.price = price;

    // Save the updated service
    const updatedService = await service.save();

    return res.status(200).json({
      status: "success",
      message: "Service updated successfully",
      updatedService,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Delete a Service
export const deleteAService = async (req, res) => {
  try {
    const { serviceId } = req.query;

    const result = await Service.findByIdAndDelete({ _id: serviceId });
    if (!service) {
      return res.status(404).json({
        status: "fail",
        message: "Service not found",
        result,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
