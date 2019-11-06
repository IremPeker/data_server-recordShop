const express = require("express");
const router = express.Router();
const { getOrders, addOrder } = require("../controllers/ordersController");

// GET all the records
router.get("/", getOrders);

// POST a new record
router.post("/", addOrder);

module.exports = router;
