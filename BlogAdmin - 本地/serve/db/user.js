const mongoose = require("mongoose");

let user = mongoose.model("user",new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    //注册时间
    regDate:{type:Number,default:Date.now},
    //头像
    userPhoto:{type:String,default:"https://api.ixiaowai.cn/mcapi/mcapi.php"},
    //是否禁止发言
    disabled:{type:Boolean,default:false},
    //是否是管理员
    admin:{type:Boolean,default:false}
}))

module.exports = user;