import Order from "../model/orderModel.js";
import { increaseTotalOrder } from "../utils/counterFunctions.js";

const createAOrder = async (req, res) => {
  try {
    const {
      serviceId,
      date,
      time,
      location,
      area,
      rode,
      house,
      phone,
      customerPhone,
      email,
      problem,
      coupon,
    } = req.body;
    const newOrder = new Order({
      serviceId,
      date,
      time,
      location,
      area,
      rode,
      house,
      phone,
      customerPhone,
      email,
      problem,
      coupon,
    });
    const order = await newOrder.save();
    // add a order to counter
    increaseTotalOrder();

    // send response
    res.status(201).json({
      status: "success",
      newOrder,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAOrder = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.id });
    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }
    res.status(200).json({
      status: "success",
      order,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      status: "success",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateAOrder = async (req, res) => {
  try {
    const {
      date,
      time,
      location,
      area,
      rode,
      house,
      customerPhone,
      email,
      problem,
      coupon,
    } = req.body;
    const order = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }
    res.status(200).json({
      status: "success",
      updatedOrder: order,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export { createAOrder, getAOrder, getAllOrders, updateAOrder };
