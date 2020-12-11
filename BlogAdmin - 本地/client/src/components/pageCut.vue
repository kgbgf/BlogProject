<template>
    <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :page-count="5"
            @current-change="currentChange"
            :total="total"
            >
    </el-pagination>
</template>

<script>



    export default {
        name: "pageCut",

        data(){
            return{

            }
        },

        props:["pageSize","total"],


        methods:{
            //当前页数改变时触发
            //参数 当前页的数字
            currentChange(pageIndex){
                this.$emit("currentChange",pageIndex,this.pageSize);
            }
        }
    }

</script>

<style scoped>

</style>