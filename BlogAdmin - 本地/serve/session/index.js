const session = require("express-session");
const connectMongo = require("connect-mongo")(session);

module.exports = session({
  secret : "afei" //密钥，一个字符，用于加密，可以随便写个字符串
  ,cookie : {maxAge:30*60*1000} //给前端设置的cookie有效期时长
  ,rolling : true //每次用户和后端交互时（访问连接，ajax...），刷新cookie有效期
  ,resave : false //是否每次重新存储session
  ,saveUninitialized : false //初始化
  ,store : new connectMongo({url : "mongodb://localhost:27017/blog"})//将session存储到数据库
});
