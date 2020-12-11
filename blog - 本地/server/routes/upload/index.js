const express = require("express");

let router = express.Router();

/*接口访问测试*/
/*router.post("/",(req,res)=>{
  res.send("OK");
});*/

/*头像上传*/
router.use("/avatar",require("./avatar"));


module.exports = router;