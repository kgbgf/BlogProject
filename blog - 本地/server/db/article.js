const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let articleSchema = new Schema({
  type : {type: String,required: true},
  title : {type: String,required: true},
  content : {type:String,required: true},
  tag : {type: String,required: true},
  date : {type: Date, default: Date.now},
  surface : {type:String,default: "https://api.ixiaowai.cn/api/api.php"},
  pic: {type: Array},
  pv : {type: Number,default: 0},
  comment : [{type:Schema.Types.ObjectID,ref:"comment"}]
})


let article = mongoose.model("article",articleSchema);


module.exports = article;
