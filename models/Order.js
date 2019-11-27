const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  quantity: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  records: [
    {
     type: Schema.Types.ObjectId, 
     ref: 'Record' 
    }
  ]
});

module.exports = mongoose.model("Order", OrderSchema);
