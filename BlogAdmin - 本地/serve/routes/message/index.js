const express = require("express");
let router = express.Router();
let message = require("../../db/message");

//获取留言
router.get("/get",(req,res)=>{
   message.find().populate("user") //populate("user")获取关联表的信息
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
               msg:"服务器错误",
               data:[]
           });
       });
});

//删除留言
router.post("/delete",(req,res)=>{
    let {_id} = req.body;

    message.deleteOne({_id})
        .then(()=>{
            res.send({
                code:0,
                msg:"删除成功"
            })
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"删除失败"
            })
        })
});




module.exports = router;