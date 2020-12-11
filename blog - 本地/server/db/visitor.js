const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let visitor = mongoose.model("visitor",new Schema({
  user : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : "user"
  },
  date : {
    type : Date,
    default : Date.now
  }
}));

module.exports = visitor;