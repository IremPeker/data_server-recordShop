const User = require("../models/User");
const createError = require("http-errors");

const auth = async (req,res,next)=>{
    try {
  const token = req.header("x-auth");
  const user = await User.findByToken(token);
  if(!user) throw new createError.NotFound();
  req.user=user;
  next();         // next moves it to the userController because in users.js we specified it like this =>
                  // router.route("/me").get(auth, authenticateUser);  => after auth go to authenticateUser
  
  } catch (e) {
     next(e);
  }
 
};

module.exports=auth;