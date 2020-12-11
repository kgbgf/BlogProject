const express = require("express");
const user = require("../../db/user");
const message = require("../../db/message");
const visitor = require("../../db/visitor");
const sessionDB = require("../../db/session");

let router = express.Router();

//获取用户列表
router.get("/get",(req,res)=>{
  user.find({},{password:0,__v:0})
      .then(data=>{
          res.send({
              code:0,
              msg:"查询成功",
              data
          });
      })
      .catch(()=>{
          res.send({
              code:4,
              msg:"查询失败，服务器错误",
              data:[]
          });
      })
});

//删除用户
router.post("/delete",(req,res)=>{
    let {_id} = req.body;

    //删除该用户所有留言
    message.deleteMany({user:_id}, ()=>{} );
    //删除该用户所有评论（子留言）
    message.updateMany({"children.user":_id},{$pull:{children:{user:_id}}}, ()=>{});

    user.deleteOne({_id})
        .then(()=>{
            //删除用户的session
            sessionDB.deleteMany({session:new RegExp(_id)},()=>{});
            //删除最近访客
            visitor.deleteMany({user:_id},()=>{});

            res.send({
                code:0,
                msg:"删除成功"
            });
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误"
            });
        })

});

//更新用户权限
router.post("/update",(req,res)=>{
    let {_id,disabled,admin} = req.body;

    user.updateOne({_id},{disabled,admin})
        .then(()=>{
            //删除用户session
            sessionDB.deleteMany({session:new RegExp(_id)},()=>{});

            res.send({
                code:0,
                msg:"更新成功"
            });
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误"
            });
        })

});




module.exports = router;