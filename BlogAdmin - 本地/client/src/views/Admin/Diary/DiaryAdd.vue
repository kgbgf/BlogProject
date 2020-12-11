<template>
    <div>
        <el-form
                ref="form"
                :model="form"
                label-width="80px"
        >
            <el-form-item label="日记内容">
                <el-input
                        type="textarea"
                        :rows="2"
                        v-model="form.txt"
                        placeholder="请输入内容"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="日记图片">
                <Upload @uploadSuccess="uploadSuccess"></Upload>
            </el-form-item>
            <el-form-item>
            </el-form-item>
        </el-form>
        <el-button
                type="primary"
                @click="handleSubmit"
        >
            发表日记
        </el-button>
    </div>

</template>

<script>
    import Upload from "../../../components/Upload";
    import request from "../../../api/index";
    let postDiary = request.postDiary;

    export default {
        name: "DiaryAdd",

        components:{
            Upload
        },

        data(){
            return{
                form:{
                    txt:"",
                    img:""
                }
            }
        },

        methods:{
            uploadSuccess(url){
                console.log(url);
                this.form.img = url;
            },

            handleSubmit(){
                let txt = this.form.txt,
                    img = this.form.img;

                //数据验证
                if(!txt && !img){
                    this.$message({
                        message:"内容不能为空",
                        type:"error",
                        duration:2000
                    });
                    return;
                }

                postDiary(txt,img).then(res=>{
                    if(res.data.code===0){
                        this.$message({
                            message:"上传成功",
                            type:"success",
                            duration:2000
                        });
                        setTimeout(()=>{
                            window.location.reload();
                        },1000)
                    }else {
                        this.$message({
                            message:"上传失败",
                            type:"error",
                            duration:2000
                        });
                    }
                }).catch(()=>{
                    this.$message({
                        message:"由于服务器原因，上传失败",
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