// Resource: https://github.com/typicode/lowdb

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

// Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
const ordersRouter = require("./routes/orders");

// Our Middleware
const { setCors } = require("./middleware/security");

// Init the server
const app = express();

// Logs
app.use(logger("dev"));

// Setup LOWDB

const adapter = new FileSync("data/db.json");
const db = low(adapter);
db.defaults({ records: [], users: [], orders: [] }).write();

// Request Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors); // this one is inside the security.js file

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/orders", ordersRouter);

// Error Handling
// this error handling is only for the routers, if path name is written wrong, below error message will appear
app.use(function(req, res, next) {
  const err = new Error(`Looks like something is broken!`);

  next(err);
});

// in the below error message, the reason to put error and message inside different objects is that from the frontend this object is accessible with res.data.error
app.use(function(err, req, res, next) {
  res.status(400).send({
    error: {
      message: err.message
    }
  });
});

module.exports = app;