const express = require('express');
const router = express.Router();
const {
  getRecords,
  addRecord,
  getRecord,
  deleteRecord,
  updateRecord
} = require('../controllers/recordsController');
const auth = require('../middleware/authenticator');

router
  .route('/')
  .get(getRecords)
  .post(auth, addRecord);

router
  .route('/:id')
  .get(getRecord)
  .delete(auth, deleteRecord)
  .put(auth, updateRecord);

module.exports = router;