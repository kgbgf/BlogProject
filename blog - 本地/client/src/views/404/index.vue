<template>
  <div class="NotFound">
    <Nav></Nav>
    <img src="../../assets/img/404.gif" alt="">
  </div>
</template>

<script>
  import Nav from "../../components/Nav";
  export default {
    name: "NotFound",
    components:{Nav}
  }
</script>

<style scoped>
  .NotFound{
    background-color: #fff;
  }
  img{
    display: block;
    margin: 0 auto;
  }
</style>