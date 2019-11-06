const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser
} = require("../controllers/usersController");

router
  .route("/")
  .get(getUsers)
  .post(addUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
