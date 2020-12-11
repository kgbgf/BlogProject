const mongoose = require("mongoose");
const articleInfo = require("../db/articleInfo");


let Schema = mongoose.Schema;
let articleSchema = new Schema({
    type : {type: String,required: true},
    title : {type: String,required: true},
    content : {type: String,required: true},
    date : {type: Date, default: Date.now},
    tag : {type: String,required: true},
    //文章封面
    surface : {type: String,default: "https://api.ixiaowai.cn/api/api.php"},
    //文章图片
    pic: {type: Array},
    pv : {type: Number,default: 0},
    message : [
        {type: Schema.Types.ObjectID, ref:"message"}
    ]

});


//监听添加文章 使articleInfo的num自加
articleSchema.pre("save",function(next){
    //保存的时候，更新articleInfo表
    articleInfo.findOne({})
        .then(data=>{
            if (data){
                //如果已经存在了data 更新num
                articleInfo
                    .updateOne({},{$inc:{num:1}})
                    .then(d=>{}).catch(e=>{})
            }else{
                //如果还没有数据，就新建一条
                articleInfo.create({
                    num : 1
                });
            }
        })
    next();
});

//监听删除文章   remove中间件使用必须加上{ query: true, document: false }
articleSchema.pre("remove",{ query: true, document: false },function(){
    articleInfo.findOne({})
        .then(data=>{
            if (data){
                //如果已经存在了data 更新num
                articleInfo
                    .updateOne({},{$inc:{num:-1}})
                    .then(d=>{}).catch(e=>{})
            }
        })
});

let article = mongoose.model("article",articleSchema);

//假数据
/*for (let i=0;i<50;i++){
    article.create({
        type: ["原创","转载"][(Math.random()*2)|0],
        title: "第"+(i+1)+"篇文章",
        content: ("文章内容 哈哈哈哈哈哈哈哈哈哈").repeat(10),
        pv : Math.random()*99999|0,
        tag: ["个人日记","HTML5&CSS3","JavaScript","NodeJs","Vue"][(Math.random()*5)|0],

    });
}*/


module.exports = article;