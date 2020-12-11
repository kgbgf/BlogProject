const express = require("express");
let router = express.Router();
const links = require("../../db/links");

//添加友链
router.post("/add",(req,res)=>{
   let  options = req.body;

   links.create(options)
       .then(()=>{
           res.send({
               code : 0,
               msg : "发表成功"
           });
       })
       .catch(()=>{
           res.send({
               code : 4,
               msg : "服务器错误"
           });
       });
});

//获取友链
router.get("/get",(req,res)=>{
    links.find()
        .then(data=>{
            res.send({
               code:0,
               msg:"获取成功",
               data
            });
        })
        .catch(()=>{
            res.send({
                code:0,
                msg:"获取成功",
                data:[]
            });
        })
});

//删除友链
router.post("/delete",(req,res)=>{
    let {_id} = req.body;

    links.deleteOne({_id})
        .then(()=>{
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
        });
});




module.exports = router;