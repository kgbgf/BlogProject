<template>
    <el-upload
            class="upload-demo"
            action="http://localhost:3001/uploadPic/articlePic"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :with-credentials="true"
            list-type="picture"
            :on-success="handleSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
    </el-upload>
</template>

<script>
    export default {
        name: "UploadPic",
        data() {
            return {
                fileList: [],
                pic: [],
            };
        },
        methods: {
            handleSuccess(res,file,fileList){
                console.log(res.pic);
                this.pic.push(res.pic);
                console.log(this.pic);
                this.$emit("uploadPicSuccess",this.pic);
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },

        }
    }
</script>

<style scoped>

</style>