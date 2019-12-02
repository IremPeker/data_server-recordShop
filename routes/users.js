const express = require("express");
const router = express.Router();
const {
  userValidationRules,
  userValidationErrorHandling
} = require("../validators/validator");
const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
  authenticateUser
} = require("../controllers/usersController");

router
  .route("/")
  .get(getUsers)
  .post(userValidationRules(), userValidationErrorHandling, addUser);

router.route("/me").get(authenticateUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(userValidationRules(), userValidationErrorHandling, updateUser);

module.exports = router;
