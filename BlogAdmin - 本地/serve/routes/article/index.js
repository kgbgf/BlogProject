const express = require("express");
const article = require("../../db/article");
const articleInfo = require("../../db/articleInfo");

let router = express.Router();

//文章发表
router.post("/add",(req,res)=>{
    let {type,title,tag,content,surface,pic} = req.body;


    //后端数据验证
    if (!type||!title||!tag||!content){
        res.send({
            code : 1,
            msg : "数据不完整",
        });
        return;
    }

    console.log({type,title,tag,content,surface,pic});
    if(!surface){
        let date = Date.now();
        surface = "https://api.ixiaowai.cn/api/api.php/"+date;
    }

    console.log(surface);

    /*数据库存储*/
    article.create(
        // surface?{type,title,tag,content,surface,pic}:{type,title,tag,content,pic}
        {type,title,tag,content,surface,pic}
    ).then(d=>{
        res.send({
            code : 0,
            msg : "发表成功"
        })
    }).catch(()=>{
        res.send({
            code : 4,
            msg : "发表失败，请稍后再试"
        })
    })

});

//文章获取
router.get("/get",(req,res)=>{
    let {skip,limit} = req.query;

    console.log({skip,limit});

    article.find({},{},{skip:skip*1,limit:limit*1})
        .then(data=>{
            res.send({
                code:0,
                msg:"查找成功",
                data
            })
        }).catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误",
                data:[]
            })
    });

});

//文章信息获取
router.get("/getInfo",(req,res)=>{
    articleInfo.findOne()
        .then(data=>{
            res.send({
                code:0,
                msg:"查询成功",
                data
            });
        }).catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误"
            })
    })
});

//文章删除
router.post("/delete",(req,res)=>{
    let {id} = req.body;

    article.remove({_id:id})
        .then(()=>{
            res.send({
                code:0,
                msg:"删除成功"
            })
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误"
            })
         })

});

//文章更新
router.post("/update",(req,res)=>{
    let {id,options} = req.body;
    article.updateOne({_id:id},options)
        .then(()=>{
            res.send({
                code:0,
                msg:"更新成功"
            })
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"更新失败，服务器错误"
            })
        })
});

module.exports = router;
