<template>
    <div>
       <el-container>
           <el-aside width="200px">
               <Menu></Menu>
           </el-aside>
           <el-main>
               <Nav></Nav>
               <router-view></router-view>
           </el-main>
       </el-container>
    </div>
</template>

<script>
    import Menu from "../../components/Menu";
    import Nav from "../../components/Nav";

    export default {
        name: "Admin",

        components:{
            Menu,Nav
        }
    }
</script>

<style scoped lang="less">
    .el-aside{
        overflow: hidden;
        height: 100vh;
        background-color: rgb(84, 92, 100);;
    }

    .el-main{
        position: relative;
        height: 100vh;
        padding-top: 60px;
    }

</style>