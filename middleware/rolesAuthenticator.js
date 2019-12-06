const createError = require("http-errors");

const isAdmin = (req, res, next) => {
  const role = req.user.role; // this is coming from the previous middleware (authenticator), it gets the req.user
  if (role !== "Admin") throw new createError.NotFound();
  // const isAdmin = role === 'Admin' ? next() : throw new createError.NotFound(); // => this is a way to write with a ternary
  next();
};

module.exports = isAdmin;
