const Record = require('../models/Record');
const createError = require('http-errors');

exports.getRecords = async (req, res, next) => {
  const title = req.body.title;
  try {
    const records = await Record.find({ title }).select('-__v');
    res.status(200).send(records);
  } catch (e) {
    next(e);
  }
};

exports.getRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id).select('-__v');
    if (!record) throw new createError.NotFound();
    res.status(200).send(record);
  } catch (e) {
    next(e);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) throw new createError.NotFound();
    res.status(200).send(record);
  } catch (e) {
    next(e);
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).select('-__v');
    if (!record) throw new createError.NotFound();
    res.status(200).send(record);
  } catch (e) {
    next(e);
  }
};

exports.addRecord = async (req, res, next) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.status(200).send(record);
  } catch (e) {
    next(e);
  }
};