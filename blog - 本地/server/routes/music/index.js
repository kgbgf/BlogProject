const express = require("express");
const musicIdList = require("../../db/musicIdList");
let axios = require("axios");
let router = express.Router();

router.get('/',(req,res)=>{

    let musicList = [];

    let songIdList = []
    musicIdList.find()
        .then(d=>{
            d.forEach(item=>{
                songIdList.push(item.songId);
            })
            console.log(songIdList);

            songIdList.forEach((item,index)=>{
                axios.get('https://api.paugram.com/netease/?id='+item)
                    .then(resp=>{
                        // console.log(resp.data);
                        let data = {
                            name:resp.data.title,
                            artist:resp.data.artist,
                            cover:resp.data.cover,
                            url:resp.data.link
                        }
                        musicList.push(data);
                        console.log(musicList);
                        if (musicList.length === songIdList.length){
                            res.send({
                                code:0,
                                data:musicList,
                                msg:"请求成功"
                            });
                        }
                    })
            })

        })
        .catch(err=>{

        })




    //  for (let i=0;i<15;i++){
    //     axios.get("https://api.paugram.com/acgm/")
    //         .then(resp=>{
    //             let data = {
    //                 name:resp.data.title,
    //                 artist:resp.data.artist,
    //                 cover:resp.data.cover,
    //                 url:resp.data.link
    //             }
    //             // console.log(data);
    //             if(data.name){
    //                 musicList.push(data);
    //             }
    //             console.log(musicList);
    //             console.log(musicList.length);
    //
    //             if(musicList.length === 10){
    //                 res.send({
    //                     code:0,
    //                     data:musicList
    //                 })
    //             }
    //
    //         })
    // }



})

module.exports = router