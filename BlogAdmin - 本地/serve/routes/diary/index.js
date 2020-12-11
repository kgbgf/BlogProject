const express = require("express");
let router = express.Router();
const diary = require("../../db/diary");

//获取日记
router.get("/get",(req,res)=>{
    diary.find({},{},{sort:{date:-1}})
        .then(data=>{
            res.send({
                code:0,
                msg:"查找成功",
                data
            });
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误",
                data:[]
            });
        })
});

//发表日记
router.post("/submit",(req,res)=>{
    let {txt,img} = req.body;

    if(!txt && !img){
        res.send({
            code:2,
            msg:"没有数据！！"
        });
        return;
    }

    diary.create({txt,img})
        .then(()=>{
            res.send({
                code:0,
                msg:"发表成功"
            });
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误"
            });
        });

});

//删除日记
router.post("/delete",(req,res)=>{
    let {_id} = req.body;
    diary.deleteOne({_id})
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
        })
})



module.exports = router;