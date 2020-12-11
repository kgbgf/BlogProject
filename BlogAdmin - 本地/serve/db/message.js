const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let message = mongoose.model("message",new Schema({
    //关联用户表
    user: {type:Schema.Types.ObjectId, ref:"user", required:true},

    //留言内容
    content:{type: String, required: true},

    //留言日期
    date:{type:Date, default:Date.now},

    //留言下面的评论
    children : [
        {
            //子留言 用户
            user : {type:Schema.Types.ObjectId , ref:"user" , required:true},
            //子留言 内容
            content : {type:String,required: true},
            //子留言 评论对象
            reUser : {type:String,required: true},
            //子留言 日期
            date : {type:Date,default:Date.now}
        }
    ]

}));

/*for (let i=0;i<=100;i++){
    message.create({
        user:"5ea80b905bfe4f24f8023940",
        content:"呵呵呵呵呵呵呵呵"+i,

    });
}*/

module.exports = message;