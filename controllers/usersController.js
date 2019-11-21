
/////////////////////////////////////////////
const User=require("../models/User");
const createError=require("http-errors");

exports.getUsers = async (req, res, next) => {
  // if there is nothing else to run after this function you dont have to define next
  // const users = db.get("users").value();
  try {
  const users = await User.find();
  res.status(200).send(users);
  } catch (e) {
    next(e);  // this next is to display the error message which is described in app.js Error Handling
             // wherever it is called, next is used to connect the middleware functions
             // in this case, after catching error, it will go to the next middleware function
  }
 
};

// users/:id
exports.getUser = async(req, res, next) => {
  try {
     const { id } = req.params;
     const user = await User.findById(id);
     if(!user) throw new createError.NotFound();
     res.status(200).send(user);
  } catch (e) {
    next(e);
  }

 };

exports.deleteUser = async (req, res, next) => {
  try {
     const user = await User.findByIdAndDelete(req.params.id);  // if the user is found, delete
     if(!user) throw new createError.NotFound();        // if the user is not found show an error
     res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

// https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
    if(!user) throw new createError.NotFound();        // if the user is not found show an error
    res.status(200).send(user);
  } catch (e) {
     next(e);
  }
};

exports.addUser = async (req, res, next) => {

  // SOMETHING WRONG HERE

  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};
