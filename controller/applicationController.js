import Application from "../model/applicationModel.js";
import Vendor from "../model/vendorModel.js";

const getNotificationMark = async (req, res) => {
  try {
    // Find all new applications
    const newApplication = await Application.find({ status: "new" });

    // Send response
    res.status(200).json({
      status: "success",
      data: newApplication.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;

    // Find application
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status: "read" },
      { new: true }
    );

    // Check if application was found and updated
    if (!application) {
      return res.status(404).json({
        status: "fail",
        message: "Application not found",
      });
    }

    // Send response
    res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const changeApplicationStatus = async (req, res) => {
  try {
    const { phone, newStatus } = req.body;

    const vendor = await Vendor.findOne({ phone });
    const application = await Application.findOne({ vendorPhone: phone });

    if (newStatus === "active") {
      vendor.status = "active";
      application.vendor.status = "active";
    }
    if (newStatus === "rejected") {
      vendor.status = "rejected";
      application.vendor.status = "rejected";
    }

    // Update vendor status
    const result = await Vendor.updateOne({ phone }, { $set: vendor });
    const applicationResult = await Application.updateOne(
      { vendorPhone: phone },
      { $set: application }
    );
    // Send response
    res.status(200).json({
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

const getASingleApplication = async (req, res) => {
  try {
    const _id = req.params.id;
    // query
    const application = await Application.findById(_id);

    // send response
    res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllApplication = async (req, res) => {
  try {
    const applications = await Application.find({});

    // send response
    res.status(200).json({
      status: "success",
      applications,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const handleDeleteApplications = async (req, res) => {
  try {
    const _id = req.params.id;

    // query
    const deletedApplication = await Application.findByIdAndDelete(_id);

    // send response
    res.status(200).json({
      status: "success",
      message: `Application with ID ${_id} deleted successfully`,
      data: deletedApplication,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  getNotificationMark,
  markAsRead,
  changeApplicationStatus,
  getASingleApplication,
  getAllApplication,
  handleDeleteApplications,
};
