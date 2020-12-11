<template>
    <div>
        <el-table
                :data="diaryList"
                style="width: 100%">
            <el-table-column
                    label="时间"
                    width="180"
                    prop="date"
            >
            </el-table-column>
            <el-table-column
                    label="内容"
                    width="300"
                    prop="txt"
            >
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img v-if="scope.row.img" :src="scope.row.img" height="50" alt="">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import request from "../../../api/index";
    let getDiary = request.getDiary;
    let deleteDiary = request.deleteDiary;

    export default {
        name: "DiaryManage",

        data(){
            return{
                diaryList:[]
            }
        },

        methods:{
            getDiary(){
                getDiary().then(res=>{
                    this.diaryList = res.data.data;
                })
            },

            handleDelete(index,row){
                deleteDiary(row._id).then(res=>{
                    //重新请求所有日记 获取新的日记列表
                    this.getDiary();
                    this.$message({
                        message:"删除成功",
                        type:"success",
                        duration:2000
                    });
                })
            }
        },

        created() {
            this.getDiary();
        }
    }
</script>

<style scoped>

</style>