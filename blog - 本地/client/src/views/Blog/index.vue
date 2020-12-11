<template>
  <div class="Blog">
    <Nav></Nav>
    <Container></Container>
  </div>
</template>

<script>
  import Nav from "../../components/Nav";
  import Container from "../../components/Container";
  export default {
    name: "Blog",
    components:{
      Nav,Container
    },

    data(){
      return{
        /*picList:[
          {
            src:"https://api.ixiaowai.cn/api/api.php/1",
          },
          {
            src:"https://api.ixiaowai.cn/api/api.php/2",
          },
          {
            src:"https://api.ixiaowai.cn/api/api.php/3",
          }
        ],*/
      }
    },

    mounted() {
      setTimeout(() => {
        window.L2Dwidget.init({
          pluginRootPath: 'live2dw/',
          pluginJsPath: 'lib/',
          pluginModelPath: 'live2d-widget-model-shizuku/assets/',
          tagMode: false,
          debug: false,
          model: { jsonPath: '../live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json' },
          display: { position: 'right', width: 200, height: 400 },
          mobile: { show: true },
          log: false
        })
      }, 1000)
    },
  }
</script>

<style scoped lang="less">

</style>