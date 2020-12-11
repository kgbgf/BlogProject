<template>
    <div>
        <el-table
                :data="musicList"
                style="width: 100%">
            <el-table-column
                    label="网易云音乐ID值"
                    width="300"
                    prop="songId"
            >
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
    let getMusic = request.getMusic;
    let deleteMusic = request.deleteMusic;

    export default {
        name: "MusicManage",

        data(){
            return{
                musicList:[],
            }
        },

        methods:{
            getMusic(){
                getMusic().then(res=>{
                    this.musicList = res.data.data;
                })
            },

            handleDelete(index,row){
                deleteMusic(row._id).then(res=>{
                    //重新请求所有音乐 获取新的音乐列表
                    this.getMusic();
                    this.$message({
                        message:"删除成功",
                        type:"success",
                        duration:2000
                    });
                })
            }
        },

        created() {
            this.getMusic();
        }
    }
</script>

<style scoped>

</style>