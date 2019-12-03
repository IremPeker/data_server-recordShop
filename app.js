// Resource: https://github.com/typicode/lowdb

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
const ordersRouter = require("./routes/orders");

// Our Middleware
// Middleware functions are the functions that run every time a request is made
const { setCors } = require("./middleware/security");

// Init the server
const app = express();

// Logs
// this is to see the errors in developer tool
app.use(logger("dev"));

// Connect To MONGO
mongoose.connect("mongodb://localhost:27017/live-coding-ds", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error")
);
mongoose.connection.on("open", () => {
  console.log(`Connected to the database`);
});

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
