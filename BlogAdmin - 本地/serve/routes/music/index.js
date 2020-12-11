const express = require("express");
const musicIdList = require("../../db/musicIdList");
let router = express.Router();

//获取音乐
router.get("/get",(req,res)=>{
    musicIdList.find({})
        .then((data)=>{
            console.log(data);
            res.send({
                code:0,
                msg:"查询成功",
                data
            })
        })
        .catch(e=>{
            res.send({
                code:4,
                msg:"服务器错误",
                data:[]
            });
        })
});

//删除音乐
router.post("/delete",(req,res)=>{
    let {_id} = req.body;
    musicIdList.deleteOne({_id})
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
});

//添加音乐
router.post("/add",(req,res)=>{
    let {songId} = req.body;

    if(!songId){
        res.send({
            code:2,
            msg:"没有数据！！"
        });
        return;
    }

    musicIdList.create({songId})
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


module.exports = router;