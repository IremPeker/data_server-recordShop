const mongoose = require("mongoose");
const { Schema } = mongoose;
const Address = require("./Address");
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
  {
    id: false,
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    birthday: {
      type: Date
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: Address,
      required: true
    },
    tokens: [
      {
        _id: false,
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

UserSchema.virtual("fullName").get(function() {
  return this.firstName + " " + this.lastName;
});

UserSchema.methods.generateAuthToken = function() {
  // this function is used inside userController
  const user = this; // this refers to the firstName of the user in this case
  const access = "x-auth";
  const token = jwt.sign({ _id: user._id.toHexString(), access }, "babylon")
    .toString(); // babylon is the secret key
  // console.log(token);  // when you create a new user in postman, you can see the token for this specific user in terminal
  user.tokens.push({ access, token }); // pushes and stores the token in the database
  return token;
};

UserSchema.methods.getPublicFields = function() {
  return{
    _id:this._id,
    firstName:this.firstName,
    lastName:this.lastName,
    email:this.email,
    fullName:this.fullName,
    birthday: new Date(this.birthday),
    address:this.address
  };
};


UserSchema.statics.findByToken = function(token) {
  const User = this; // in this case this refers to the model/schema itself // static methods are applied to the database
  let decoded;
  try {
    decoded= jwt.verify(token, "babylon");  // babylon is a secret key to create the token and you should never share the secret keys in github
  } catch (err) {
    return;
  }
 
//  return User.findOne({
// _id:decoded._id,
// tokens:[{
//   token:token,
//   access:decoded.access 
// }]
//  });

// Below there is another way to write the above code
 return User.findOne({
_id:decoded._id,
"tokens.token":token,
"tokens.access":decoded.access
 });
};

module.exports = mongoose.model("User", UserSchema);

// WHAT IS THE DIFFERENCE BETWEEN METHODS AND STATIC
// Answer => https://discuss.codecademy.com/t/whats-the-difference-between-instance-and-static-methods-in-mongoose/377582
