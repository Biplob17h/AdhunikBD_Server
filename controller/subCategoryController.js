import SubCategory from "../model/subCategoryModel.js";

export const createASubCategory = async (req, res) => {
  try {
    const { subCategory, categorySlug } = req.body;
    const newSubcategory = new SubCategory({ subCategory, categorySlug });
    const result = await newSubcategory.save();
    res.status(201).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getSingleSubCategory = async (req, res) => {
  try {
    const { id } = req.query;
    const subcategory = await SubCategory.findOne({ _id: id });
    if (!subcategory) {
      return res.status(404).json({
        status: "fail",
        message: "Subcategory not found",
      });
    }
    res.status(200).json({
      status: "success",
      subcategory,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getAllSubCategory = async (req, res) => {
  try {
    const { slug } = req.query;
    console.log(slug);
    const subcategories = await SubCategory.find({ categorySlug: slug });
    if (!subcategories) {
      return res.status(404).json({
        status: "fail",
        message: "Subcategories not found",
      });
    }
    res.status(200).json({
      status: "success",
      subcategories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const createAServiceInfo = async (req, res) => {
  const { info, serviceName, subCategoryId } = req.body;

  // get the target subcategory
  const subCategory = await SubCategory.findOne({
    _id: subCategoryId,
  });
  if (!subCategory) {
    return res.status(404).json({
      status: "fail",
      message: "Subcategory not found",
    });
  }
  // get the target service
  if (serviceName === "service") {
    const service = {
      serviceFeatures: info,
    };
    subCategory.serviceFeatures.push(service);
  } else if (serviceName === "excluded") {
    const service = {
      excluded: info,
    };
    subCategory.excluded.push(service);
  }

  // update the subcategory
  const result = await subCategory.save();

  res.status(200).json({
    status: "success",
    message: `Service information added successfully`,
    subCategory,
    result,
  });
};

export const updateAService = async (req, res) => {
  try {
    const { serviceId, subCategoryId, serviceName, serviceUpdate } = req.body;

    // Find the subcategory
    const subCategory = await SubCategory.findOne({
      _id: subCategoryId,
    });
    
    if (!subCategory) {
      return res.status(404).json({
        status: "fail",
        message: "Subcategory not found",
      });
    }

    if (serviceName === "service") {
      // Find the service by serviceId inside serviceFeatures array
      const serviceIndex = subCategory.serviceFeatures.findIndex(
        (service) => service._id.toString() === serviceId
      );

      if (serviceIndex === -1) {
        return res.status(404).json({
          status: "fail",
          message: "Service not found",
        });
      }

      // Update the serviceFeatures field with the new serviceUpdate value
      subCategory.serviceFeatures[serviceIndex].serviceFeatures = serviceUpdate;

      // Save the updated subCategory
      const result = await subCategory.save();

      // Respond with success
      return res.status(200).json({
        status: "success",
        message: `Service information updated successfully`,
        subCategory,
        result,
      });
    }
    if (serviceName === "excluded") {
      // Find the service by serviceId inside serviceFeatures array
      const serviceIndex = subCategory.excluded.findIndex(
        (service) => service._id.toString() === serviceId
      );

      if (serviceIndex === -1) {
        return res.status(404).json({
          status: "fail",
          message: "Service not found",
        });
      }

      // Update the serviceFeatures field with the new serviceUpdate value
      subCategory.excluded[serviceIndex].excluded = serviceUpdate;

      // Save the updated subCategory
      const result = await subCategory.save();

      // Respond with success
      return res.status(200).json({
        status: "success",
        message: `Service information updated successfully`,
        subCategory,
        result,
      });
    }

    return res.status(400).json({
      status: "fail",
      message: "Invalid service name",
    });
  } catch (error) {
    // Handle any errors
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const deleteAService = async (req, res) => {
  const { serviceId, subCategoryId, serviceName } = req.body;

  try {
    // Find the subcategory by subCategoryId
    const subCategory = await SubCategory.findOne({
      _id: subCategoryId,
    });

    if (!subCategory) {
      return res.status(404).json({
        status: "fail",
        message: "Subcategory not found",
      });
    }

    if (serviceName === "service") {
      // Find and remove the service from serviceFeatures array
      const newServiceFeatures = subCategory.serviceFeatures.filter(
        (service) => service._id.toString() !== serviceId
      );

      if (newServiceFeatures.length === subCategory.serviceFeatures.length) {
        return res.status(404).json({
          status: "fail",
          message: "Service not found",
        });
      }

      subCategory.serviceFeatures = newServiceFeatures;
    } else if (serviceName === "excluded") {
      // Find and remove the service from excluded array
      const newExcludedServices = subCategory.excluded.filter(
        (service) => service._id.toString() !== serviceId
      );

      if (newExcludedServices.length === subCategory.excluded.length) {
        return res.status(404).json({
          status: "fail",
          message: "Excluded service not found",
        });
      }

      subCategory.excluded = newExcludedServices;
    } else {
      return res.status(400).json({
        status: "fail",
        message: "Invalid service name",
      });
    }

    // Save the updated subCategory after deletion
    const result = await subCategory.save();

    // Respond with success
    return res.status(200).json({
      status: "success",
      message: `Service deleted successfully`,
      subCategory,
      // result,
    });
  } catch (error) {
    // Handle any errors
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};



export const updateASubCategory = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const deleteASubCategory = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
