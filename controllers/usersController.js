/////////////////////////////////////////////
const User = require("../models/User");
const createError = require("http-errors");

exports.getUsers = async (req, res, next) => {
  // if there is nothing else to run after this function you dont have to define next
  // const users = db.get("users").value();
  try {
    const users = await User.find()
      .select('-password -__v -tokens._id')
      .sort("-lastName");
    // if you select like this .select("-password -_v"), then the user doesnt see the password and the version
    // you can sort the items .sort("-lastName");
    // you can choose a limit per page
    res.status(200).send(users);
  } catch (e) {
    next(e); // this next is to display the error message which is described in app.js Error Handling
    // wherever it is called, next is used to connect the middleware functions
    // in this case, after catching error, it will go to the next middleware function
  }
};

// users/:id
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password -_v");
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // if the user is found, delete
    if (!user) throw new createError.NotFound(); // if the user is not found show an error
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

// https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) throw new createError.NotFound(); // if the user is not found show an error
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const token = user.generateAuthToken();
    await user.save();
    const data = user.getPublicFields();
    res
      .status(200)
      .header("x-auth", token) // token is returned as a header
      .send(user); // to add custom headers there are some convention rules (for example it has to start with x, like x-auth)
  } catch (e) {
    next(e);
  }
};

// users/:login

exports.loginUser=async(req,res,next)=>{

// Get email and pass from the body
const email=req.body.email;
const password=req.body.password;
try {
  // Get the user by email
  const user=await User.findOne({email});
  const token = user.generateAuthToken();
// Access user.password (hashed password)
// Write a method that takes in user.password and password
const canLogin=await user.checkPassword(password); // user.password is the hashed password
if(!canLogin) throw new createError.NotFound();
 const data = user.getPublicFields();
 res.status(200).header('x-auth',token).send(data);
} catch (e) {
  next(e);
}

};

exports.authenticateUser = async (req, res, next) => {
  res.status(200).send(req.user);
 
};
