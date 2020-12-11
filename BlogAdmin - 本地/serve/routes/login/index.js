const express = require("express");
let router = express.Router();
let userDB = require("../../db/user");
const crypto = require("crypto");//密码加密 加密方式: crypto.createHash("sha256").update(pwd).digest("hex")

router.post("/",(req,res)=>{
    let {user,pwd} = req.body;

    userDB.findOne({username:user})
        .then(data=>{
            if (data){
                //用户存在
                if (data.password===crypto.createHash("sha256").update(pwd).digest("hex")){
                    //密码正确
                    if(data.admin){
                        //是管理员

                        //写入session
                        req.session.login = data;

                        res.send({
                            code : 0,
                            msg : "登陆成功"
                        });

                    }else{
                        //不是管理员
                        res.send({
                            code : 1,
                            msg : "您不是管理员，没有登录权限"
                        });
                    }

                }else {
                    //密码错误
                    res.send({
                        code : 1,
                        msg : "密码错误"
                    });
                }

            }else {
                /*用户不存在*/
                res.send({
                    code : 1,
                    msg : "用户不存在"
                });
            }

        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误~"
            });
        })

});

/*验证登陆*/
router.post("/ifLogin",(req,res)=>{
    /*判断session*/
    if (req.session.login && req.session.login.admin) {
        res.send({
            code : 0,
            msg : "已登录",
            data : req.session.login
        });
    }else{
        res.send({
            code : 1,
            msg : "未登录登录",
            data : null
        });
    }
});




module.exports = router;