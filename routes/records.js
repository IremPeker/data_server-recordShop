const express = require("express");
const router = express.Router();
const {
  getRecords,
  addRecord,
  getRecord,
  deleteRecord,
  updateRecord
} = require("../controllers/recordsController");
const auth = require("../middleware/authenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

router
  .route("/")
  .get(getRecords)
  .post(auth, isAdmin, addRecord);

router
  .route("/:id")
  .get(getRecord)
  .delete(auth, isAdmin, deleteRecord)
  .put(auth, isAdmin, updateRecord);

module.exports = router;
