<template>
    <div>
        <el-table
                :data="userList"
                style="width: 100%">
            <el-table-column
                    label="用户名"
                    width="180"
                    prop="username"
            >
            </el-table-column>
            <el-table-column
                    label="禁用发言"
                    width="180"
            >
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.disabled" @change="handleChange(scope.$index, scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="管理员权限"
                    width="180"
            >
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.admin" @change="handleChange(scope.$index, scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            :disabled="scope.row.switch"
                            @click="handleSave(scope.$index, scope.row)">保存</el-button>
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

    let getUserList = request.getUserList;
    let deleteUser = request.deleteUser;
    let updateUser = request.updateUser;

    export default {
        name: "UserManage",

        data(){
            return{
                userList:[],

                metaData:[]
            }
        },

        methods:{
            //获取用户列表
            getUserList(){
                getUserList().then(res=>{
                    //原数据
                    this.metaData = res.data.data;
                    //把userList 和 metaData 之间的引用关系解除
                    this.userList = JSON.parse(JSON.stringify(res.data.data));
                    //加上switch属性 判断保存按钮是否禁用
                    this.userList.forEach(item=>{
                        item.switch = true;
                    });
                });
            },

            //删除用户
            handleDelete(index,row){
                //防止误操作提示
                this.$confirm('即将删除该用户及其留言等数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    //确定 删除用户
                    deleteUser(row._id).then(res=>{
                        console.log(row);
                        this.userList.splice(index,1);
                        this.$message({
                            message: "删除成功",
                            type: 'success',
                            duration : 2000
                        });
                    }).catch(()=>{
                        this.$message({
                            message: "删除失败",
                            type: 'error',
                            duration : 2000
                        });
                    });

                }).catch(()=>{
                    //取消 不做操作
                });


            },

            //修改用户权限
            handleSave(index,row){
                updateUser(row._id,row.disabled,row.admin).then(res=>{
                    if (res.data.code===0){
                        //更新成功后 再发送一次请求 更新userList
                        this.getUserList();
                        this.$message({
                            message : "更新成功",
                            type : "success",
                            duration : 2000
                        });
                    }else {
                        this.$message({
                            message : "更新失败",
                            type : "error",
                            duration : 2000
                        });
                    }
                }).catch(()=>{
                    this.$message({
                        message : "更新失败",
                        type : "success",
                        duration : 2000
                    });
                });
            },

            //判断数据是否改变 改变就取消保存按钮的禁用状态
            handleChange(index,row){
                let metaData = this.metaData[index];
                row.switch = metaData.disabled === row.disabled && metaData.admin === row.admin;
            }
        },

        mounted() {
            this.getUserList();
        }


    }
</script>

<style scoped>

</style>