<template>
    <div>
        <el-form
                ref="form"
                :model="form"
                label-width="80px"
        >
            <el-form-item label="音乐ID">
                <el-input
                        type="textarea"
                        :rows="2"
                        v-model="form.songId"
                        placeholder="请输入网易云音乐id值"
                >
                </el-input>
            </el-form-item>

        </el-form>
        <el-button
                type="primary"
                @click="handleSubmit"
        >
            添加音乐
        </el-button>
    </div>

</template>

<script>
    import request from "../../../api/index";
    let addMusic = request.addMusic;

    export default {
        name: "MusicAdd",

        data(){
            return{
                form:{
                    songId:"",
                }
            }
        },

        methods:{

            handleSubmit(){
                let songId = this.form.songId;
                //数据验证
                if(!songId){
                    this.$message({
                        message:"内容不能为空",
                        type:"error",
                        duration:2000
                    });
                    return;
                }

                addMusic(songId).then(res=>{
                    if(res.data.code===0){
                        this.$message({
                            message:"添加成功",
                            type:"success",
                            duration:2000
                        });
                        setTimeout(()=>{
                            window.location.reload();
                        },1000)
                    }else {
                        this.$message({
                            message:"添加失败",
                            type:"error",
                            duration:2000
                        });
                    }
                }).catch(()=>{
                    this.$message({
                        message:"由于服务器原因，添加失败",
                        type:"error",
                        duration:2000
                    });
                })
            }
        }

    }
</script>

<style scoped>

</style>