const mongoose = require("mongoose");

let articleInfo = mongoose.model("articleInfo",new mongoose.Schema({
    tags : {
        type : Array,
        default : ["HTML&Css","JavaScript","Node","Vue&React","Anime&Game","Other"]
    },
    num : Number
}));


module.exports = articleInfo;