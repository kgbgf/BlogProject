
const express = require("express");
const svgCaptcha = require("svg-captcha");
const userDB = require("../../db/user")

let router = express.Router();

//注册的API
router.post("/",(req,res)=>{
  let {user,pwd,svgCode} = req.body;
  console.log(user,pwd,svgCode);

  //干掉req.session.registerVCodeTime
  req.session.registerVCodeTime = 0;
  //验证数据有效性
  if (!user || !pwd || !svgCode){
    res.send({
      code : 1,
      msg : "数据无效，请检查后再注册。"
    });
    return;
  }

  //后端再次验证验证码
  if (svgCode.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase()) {
    res.send({
      code : 2,
      msg : "验证码错误"
    });
    return;
  }

  //验证用户与密码
  if (!/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(user) || !/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(pwd)){
    res.send({
      code : 2,
      msg : "用户名或密码不符合规则"
    });
    return;
  }

  //检测用户名是否重复
  userDB.findOne({username:user})
    .then(data=>{
      /*data如果有值(是一个对象)，说明user重复
      * data如果没有值（是null），说明user不重复
      * */
      if (data){
        res.send({
          code : 3,
          msg : "用户名已存在"
        });
      }else{
        //用户名不存在，接着存数据到数据库
        userDB.create({username:user,password:pwd})
          .then(d=>{
            //走到这里说明注册成功
            res.send({
              code : 0,
              msg : "注册成功"
            });
          })
          .catch(e=>{
            res.send({
              code : 4,
              msg : "服务器错误"
            });
          });
      }
    })
    .catch(e=>{
      res.send({
        code : 4,
        msg : "服务器错误"
      });
    });

});

//验证码请求接口
router.post("/vcode",(req,res)=>{

  if (req.session.registerVCodeTime){

    let t_ = new Date - new Date(req.session.registerVCodeTime)
    if (t_ <= 60000){
      res.send({
        code : 2,
        data : req.session.registerVCode.data,
        msg : "请求过于频繁",
        time : 60000-t_
      });
      return;
    }
  }

  let captcha = svgCaptcha.create();

  //将正确答案存储到session
  req.session.registerVCode = captcha;
  req.session.registerVCodeTime = new Date();

  //将svg发送到前端
  res.send({
    code : 0,
    data : captcha.data,
    time : 60000
  });
});

//验证码失去焦点的请求
router.post("/checkVcode",(req,res)=>{
  let {svgCode} = req.body;

  if (!svgCode || (svgCode.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase())){
    res.send({
      code : 1,
      msg : "验证失败"
    });
  }else{
    res.send({
      code : 0,
      msg : "验证成功"
    });
  }
});


module.exports = router;