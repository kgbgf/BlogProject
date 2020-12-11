<template>
    <div class="nav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                    v-for="item in getRouters"
                    :to="item.path">
                {{item.meta.cnName}}
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.cnName}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "Nav",

        computed:{
          getRouters(){
              //获取当前路由的matched数组
              let arr = [...this.$route.matched];
              arr.pop();//获取arr数组中的最后一个
              return arr;
          }
        },

        /*watch:{
            $route(router){
                console.log(router);
            }
        }*/
    }
</script>

<style lang="less">
.nav{
    width: 100%;
    height: 50px;
    background-color: rgb(163, 235, 255);
    box-sizing: border-box;
    padding: 0 20px;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 1px #999 solid;


    .el-breadcrumb{
        line-height: 50px;

    }
}
</style>