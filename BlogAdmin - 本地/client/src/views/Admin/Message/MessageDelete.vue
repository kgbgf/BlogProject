<template>
    <div>
        <el-table
                :data="messageList"
                style="width: 100%">
            <el-table-column
                    label="用户名"
                    width="100"
                    prop="user.username"
            >
            </el-table-column>
            <el-table-column
                    label="留言内容"
                    width="200"
            >
                <template slot-scope="scope">
                    <span>{{getText(scope.row.content)}}</span>
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
    import request from "../../../api"
    let getMessage = request.getMessage;
    let deleteMessage = request.deleteMessage;

    export default {
        name: "MessageDelete",

        data(){
            return{
                messageList:[]
            }
        },

        methods:{
            getMessage(){
                getMessage().then(res=>{
                    this.messageList = res.data.data;
                }).catch(()=>{

                });
            },

            getText(content) {
                let div = document.createElement("div");
                div.innerHTML = content;
                return div.innerText
            },

            handleDelete(index,row){
                this.$confirm('即将删除该留言, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    deleteMessage(row._id).then(res=>{
                        this.messageList.splice(index, 1);
                        this.$message({
                            message: "删除成功",
                            type: 'success',
                            duration: 2000
                        });
                    }).catch(()=>{
                        this.$message({
                            message: "删除失败",
                            type: 'error',
                            duration: 2000
                        });
                    });
                }).catch(()=>{

                })
            }
        },

        mounted() {
            this.getMessage();
        }
    }
</script>

<style scoped>

</style>