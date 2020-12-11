<template>
    <el-table
            :data="linksList"
            style="width: 100%">
        <el-table-column
                label="名称"
                width="200"
                prop="name"
        >
        </el-table-column>
        <el-table-column
                label="地址"
                width="200"
                prop="href"
        >
        </el-table-column>
        <el-table-column label="图片">
            <template slot-scope="scope">
                <img  :src="scope.row.icon" height="50" alt="">
            </template>
        </el-table-column>
        <el-table-column
                label="描述"
                width="200"
                prop="des"
        >
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import request from "../../../api/index";
    let getLinks = request.getLinks;
    let deleteLinks = request.deleteLinks;

    export default {
        name: "LinkDelete",

        data(){
            return{
                linksList:[]
            }
        },

        methods:{
            getLinks(){
                getLinks().then(res=>{
                    this.linksList = res.data.data;
                })
            },

            handleDelete(index,row){
                deleteLinks(row._id).then(()=>{
                    //重新获取删除后的友链列表
                    this.getLinks();
                    this.$message({
                        message : "删除成功",
                        type : "success",
                        duration : 2000
                    });
                })
            }
        },

        created() {
            this.getLinks();
        }
    }
</script>

<style scoped>

</style>