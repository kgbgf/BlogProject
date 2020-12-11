const mongoose = require("mongoose");


let musicIdList = mongoose.model("musicIdList",new mongoose.Schema({
  songId : {
    type : Number,
    default : 691504
  },
}));

//[4894309,691504,473403164,1311347835,691506]

// let List = [4894309,691504,473403164,1311347835,691506]
//
// List.forEach(item=>{
//   musicIdList.create(
//       {songId: item}
//   ).then(()=>{
//     console.log("添加成功")
//   })
// })



module.exports = musicIdList;
