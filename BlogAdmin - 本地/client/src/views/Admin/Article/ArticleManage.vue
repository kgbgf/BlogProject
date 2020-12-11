<template>
    <div>
        <el-table
                :data="articleList"
                style="width: 100%">
            <el-table-column
                    label="标题"
                    width="180"
                    prop="title"
            >
            </el-table-column>
            <el-table-column
                    label="时间"
                    width="180"
                    prop="date"
            >
            </el-table-column>
            <el-table-column
                    label="分类"
                    width="180"
                    prop="type"
            >
            </el-table-column>
            <el-table-column
                    label="标签"
                    width="180"
                    prop="tag"
            >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pageCut :pageSize="5" :total="total" @currentChange="handlePageCut"></pageCut>
        <el-dialog
                title="编辑"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                :close-on-click-modal="false"
        >
            <ArticleEdit
                    @handleSubmit="handleSubmit"
                    :default-data="defaultData"
            ></ArticleEdit>
        </el-dialog>
    </div>
</template>

<script>
    import pageCut from "../../../components/pageCut";
    import request from "../../../api/index";
    import ArticleEdit from "../../../components/ArticleEdit";
    let getArticle = request.getArticle;
    let getArticleInfo = request.getArticleInfo;
    let deleteArticle = request.deleteArticle;
    let updateArticle = request.updateArticle;

    export default {
        name: "ArticleManage",

        components:{
            pageCut,ArticleEdit
        },

        data(){
            return{
                //所有文章
                articleList:[],

                //分页相关数据
                total:0,

                PageCutIndex:1,
                PageCutSize:5,

                //编辑
                dialogVisible : false,
                defaultData : null,

            }
        },

        methods: {
            handleEdit(index, row) {
                this.dialogVisible = true;
                this.defaultData = row;
            },
            handleDelete(index, row) {
                deleteArticle(row._id).then(res=>{
                    if (res.data.code === 0) {
                        this.$message({
                            message: "删除成功",
                            type: 'success',
                            duration : 2000
                        });
                        //同时更新当前的文章列表
                        this.articleList.splice(index,1);
                    }
                }).catch(()=>{
                    this.$message({
                        message: "删除失败",
                        type: 'error',
                        duration : 2000
                    });
                });
            },

            handlePageCut(index,size){
                this.PageCutIndex = index;
                this.PageCutSize = size;
                this.changeArticleList();
                this.changeArticleInfoTotal();
            },

            //更新文章
            handleSubmit(data){
                updateArticle(this.defaultData._id,data)
                    .then(res=>{
                        if (res.data.code === 0) {
                            this.$message({
                                message: "更新成功",
                                type: 'success',
                                duration : 2000
                            });
                            setTimeout(()=>{
                                this.changeArticleList();
                                this.handleClose();
                            },1000)
                        }else{
                            this.$message({
                                message: "更新失败",
                                type: 'error',
                                duration : 2000
                            });
                        }
                    })
                    .catch(()=>{
                        this.$message({
                            message: "更新失败",
                            type: 'error',
                            duration : 2000
                        });
                    });
            },

            handleClose(){
                this.dialogVisible = false;
            },


            changeArticleList(){
                let skip = this.PageCutSize*(this.PageCutIndex-1);
                getArticle(skip,this.PageCutSize)
                .then(res=>{
                  this.articleList = res.data.data;
                })
            },
            changeArticleInfoTotal(){
                getArticleInfo()
                .then(res=>{
                    this.total = res.data.data?res.data.data.num:0;
                })
            }

        },

        mounted() {
            this.changeArticleList();

            this.changeArticleInfoTotal();
        }
    }
</script>

<style scoped>

</style>