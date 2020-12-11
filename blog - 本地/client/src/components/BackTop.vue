<template>
    <el-backtop target="" :bottom="350" :right="50">
        <div class="top">
            <!--<i class="el-icon-arrow-up"></i>-->
            <img src="http://localhost:2333/img/backTop.jpg">
        </div>
    </el-backtop>
</template>

<script>
    export default {
        name: "BackTop"
    }
</script>

<style scoped lang="less">
    .el-backtop{
        background: none;
        position: fixed;
        z-index: 999;
    .top{
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 40px;

        img{
            position: absolute;
            left: -20px;
            top: -20px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }

    }
    }
</style>