// REsource for populating nested objects: https://stackoverflow.com/questions/28179720/mongoose-populate-nested-array

const Order = require("../models/Order");
const createError = require("http-errors");

exports.getOrders = async (req, res, next) => {
  // An Admin should get everybody's orders, a user only theirs
  try {
    const orders = await Order.find().populate("records.record", " -__v");
    res.status(200).send(orders);
  } catch (e) {
    next(e);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("records.record")
      .populate("user", "userName fullName email"); // you can specify the fields you want to select, or if you dont want to select, put - infront of it
    if (!order) throw new createError.NotFound();
    res.status(200).send(order);
  } catch (e) {
    next(e);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) throw new createError.NotFound();
    res.status(200).send(order);
  } catch (e) {
    next(e);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!order) throw new createError.NotFound();
    res.status(200).send(order);
  } catch (e) {
    next(e);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(200).send(order);
  } catch (e) {
    next(e);
  }
};

// WHAT DOES THE POPULATE DO?
// Answer => https://stackoverflow.com/questions/38051977/what-does-populate-in-mongoose-mean
