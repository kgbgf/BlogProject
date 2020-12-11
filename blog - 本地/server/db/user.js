const mongoose = require("mongoose");
const crypto = require("crypto");

let userSchema = new mongoose.Schema({
  username : {type:String,required:true},
  password : {type:String,required: true},

  //注册时间
  regDate : {type:Number , default:Date.now},
  //头像
  userPhoto : {type:String,default:"https://api.ixiaowai.cn/mcapi/mcapi.php"},
  //是否权限禁用
  disabled : {type:Boolean,default: false},
  //是否是管理员
  admin : {type:Boolean,default:false}
});


userSchema.pre("save",function(next){
  /*密码加密*/
  let password = this.password;
  this.password = crypto.createHash("sha256").update(password).digest("hex");

  next();
});


let user = mongoose.model("user",userSchema);

module.exports = user;

