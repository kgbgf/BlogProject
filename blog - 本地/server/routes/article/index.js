const express = require("express");
var article = require("../../db/article");
var articleInfo = require("../../db/articleInfo");

let router = express.Router();

/*获取单篇文章信息*/
router.post("/", (req, res) => {
  let {_id} = req.body;

  /*判断有没有_id*/
  if (!_id) {
    res.send({
      code: 2,
      msg: "请传入要查询的文章id"
    });
    return;
  }

  /*通过ID查文章*/
  article.findById(_id)
    .then(data => {
      /*判断data是否有值*/
      if (data) {
        //有对应的文章
        article.updateOne({_id},{$inc:{pv:1}}).then(()=>{});
        res.send({
          code: 0,
          msg: "查询成功",
          data
        });
      } else {
        //没有对应的文章
        res.send({
          code: 1,
          msg: "没有对应的文章"
        });
      }
    })
    .catch(() => {
      res.send({
        code: 4,
        msg: "服务器错误"
      });
    })
});

/*延伸阅读*/
router.post("/extend", (req, res) => {
  let {tag} = req.body;

  article.find({tag}, {_id: 1, title: 1}, {skip: 0, limit: 2, sort: {pv: -1}})
    .then(data => {
      res.send({
        code: 0,
        msg: "查询成功",
        data
      });
    })
    .catch(() => {
      res.send({
        code: 4,
        msg: "服务器异常~",
        data: []
      });
    });
});

/*获取文章Info*/
router.post("/getInfo", (req, res) => {
  articleInfo.findOne({}, {_id: 0, __v: 0})
    .then(data => {
      res.send({
        code: 0,
        msg: "请求成功",
        data
      });
    })
    .catch(() => {
      res.send({
        code: 4,
        msg: "服务器错误",
        data: null
      });
    });
});

/*获取热门文章 8 篇*/
router.post("/getHot", (req, res) => {
  let {limit} = req.body;
  article.find({}, {__v: 0}, {sort: {pv: -1}, skip: 0, limit})
    .then(data => {
      res.send({
        code: 0,
        data
      });
    })
    .catch(() => {
      res.send({
        code: 4,
        msg: "服务器错误",
        data: null
      });
    })
});

/*文章列表的显示*/
router.post("/getShow", (req, res) => {
  let {skip, limit, tag} = req.body;

  let options = tag ? {tag} : {}
  article.find(options, {__v: 0}, {skip, limit, sort: {pv: -1}})
    .then(data => {
      res.send({
        code: 0,
        data
      });
    })
    .catch(err => {
      res.send({
        code: 4,
        msg: "服务器错误"
      });
    });
});

/*文章搜索*/
router.post("/search", (req, res) => {
  let {keywords} = req.body;

  /*判断keyword存在*/
  if (!keywords) {
    res.send({
      code: 1,
      msg: "请传入关键词参数",
      data: []
    });
    return;
  }

  /*查找*/
  let reg = new RegExp(keywords,'i');
  article.find(
    {$or: [{title: reg}, {tag: reg}]},
    {_id: 1, title: 1},
    {skip:0,limit:5,sort: {pv: -1}}
  ).then(data => {
    res.send({
      code: 0,
      msg: "查询成功",
      data
    });
  }).catch(() => {
    res.send({
      code: 4,
      msg: "服务器异常~",
      data: []
    });
  })
});


//导出
module.exports = router;
