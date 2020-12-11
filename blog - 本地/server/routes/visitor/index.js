const express = require("express");
const visitorDB = require("../../db/visitor");

let router = express.Router();

router.post("/",(req,res)=>{

  visitorDB
    .find({},{},{skip:0,limit:12,sort:{date:-1}})
    .populate("user",{_id:1,username:1,userPhoto:1})
    .then(data=>{
      res.send({
        code : 0,
        msg : "请求成功",
        data
      })
    })
    .catch(()=>{
      res.send({
        code : 4,
        msg : "服务器异常",
        data : []
      })
    })

});

module.exports = router;