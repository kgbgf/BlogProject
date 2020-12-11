var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

/*连接数据库*/
mongoose.connect("mongodb://localhost:27017/blog",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{console.log("数据库连接成功")})
  .catch(()=>{console.log("数据库连接失败")});

//App实例
var app = express();
//中间件设置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//允许跨域
app.use((req,res,next)=>{
  res.header({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  });
  if (req.method === "OPTIONS"){
    res.sendStatus(200);
  }else{
    next();
  }
});

//设置session
app.use(require("./middleware/session"));

//设置路由
app.use('/', require('./routes/index'));




module.exports = app;
