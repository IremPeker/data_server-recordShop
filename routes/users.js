const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../controllers/usersController");

/* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("inside irem users"); // res.send is used to send objects
// });

// GET all the records
router.get("/", getUsers);

// POST a new record
router.post("/", addUser);

module.exports = router;
