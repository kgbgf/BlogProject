<template>
  <div id="root">
    <router-view/>
    <MusicPlayer class="musicPlayer"></MusicPlayer>
    <BackTop></BackTop>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import MusicPlayer from "./components/MusicPlayer";
  import BackTop from "./components/BackTop";
  import Bottom from "./components/Bottom";

  export default {
    name : "App",

    components:{
      MusicPlayer,BackTop,Bottom
    },



  }
</script>

<style lang="less">
  @import "assets/css/reset.css";
  @import "assets/css/font.css";
  #root{
    width: 100%;
    /*height: 3000px;*/
    background: url("./assets/img/bg.jpg") center top/cover fixed;

    .musicPlayer{
      position: fixed;
      z-index: 999;
    }
  }
</style>
