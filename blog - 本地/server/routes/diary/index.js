const express = require("express");
const diaryDB = require("../../db/diary");

let router = express.Router();

router.get("/",(req,res)=>{
  diaryDB.find({},{},{sort:{date:-1}})
    .then(data=>{
      res.send({
        code : 0,
        msg : "请求成功",
        data
      });
    })
    .catch(()=>{
      res.send({
        code : 4,
        msg : "服务器错误",
        data : []
      });
    })
});

module.exports = router;
