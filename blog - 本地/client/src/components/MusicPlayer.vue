<template>
    <div id="main">
        <aplayer :audio="musicList" :lrcType="0" fixed :autoplay="true" :volume="0.3" :listFolded="true"/>
    </div>
</template>

<script>
    import request from "../api/index"
    let getMusic = request.getMusic

    export default {
        name: "MusicPlayer",

        components: {},

        data() {
            return {
                musicList:[]
            }
        },

        methods: {
            randomColor() {
                return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
            },

        },

        created() {
            getMusic()
            .then(res=>{
                // this.musicList.name = res.data.data.name;
                // this.musicList.artist = res.data.data.artist;
                // this.musicList.url = res.data.data.url;
                // this.musicList.cover = res.data.data.cover;
                // console.log(this.musicList);
                console.log(res.data.data);
                this.musicList = res.data.data;
            })
        },

    }


</script>

<style lang="less">

    #main{
        display: inline-block;
    }


</style>