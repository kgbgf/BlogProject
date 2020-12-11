
const express = require("express");
const multer = require('multer');
const path = require("path");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../public/img/upload/articleSurface'));
    },
    filename: function (req, file, cb) {
        let fileName = file.fieldname + '-' + Date.now() +file.originalname.match(/\.(jpg|png|gif|jpeg|jfif)$/i)[0];
        cb(null, fileName);
    }
});
let upload = multer({ storage }).single('file');

let router = express.Router();

router.post("/articleSurface",(req,res)=>{
    upload(req, res, function (err) {

        //发生错误
        if (err instanceof multer.MulterError) {
            res.send(500);
        } else if (err) {
            res.send(500);
        }else{
            //一切都好
            res.send({
                code : 0,
                msg : "",
                surface :  "http://localhost:3001/img/upload/articleSurface/"+req.file.filename
            })
        }
    })
});


module.exports = router;
