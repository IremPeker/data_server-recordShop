const express = require('express');
const router = express.Router();
const {
  getOrders,
  addOrder,
  getOrder,
  deleteOrder,
  updateOrder
} = require('../controllers/ordersController');
const auth = require('../middleware/authenticator');

router
  .route('/')
  .get(auth, getOrders)
  .post(auth, addOrder);

router
  .route('/:id')
  .get(auth, getOrder)
  .delete(auth, deleteOrder)
  .put(auth, updateOrder);

module.exports = router;