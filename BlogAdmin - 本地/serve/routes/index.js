var express = require('express');
var router = express.Router();

/*上传接口*/
router.use("/upload",require("./upload/index"));

router.use("/uploadPic",require("./uploadPic/index"));

/* 文章接口 */
router.use("/article",require("./article/index"));

/* 用户接口 */
router.use("/user",require("./user/index"));

/* 留言接口 */
router.use("/message",require("./message/index"));

/* 日记接口 */
router.use("/diary",require("./diary/index"));

/* 友链接口 */
router.use("/links",require("./links/index"));

/* 登录接口 */
router.use("/login",require("./login/index"));

/* 音乐接口 */
router.use("/music",require('./music/index'));

module.exports = router;
