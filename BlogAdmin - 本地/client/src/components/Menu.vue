<template>
    <div>
        <el-menu
                :default-active="defaultActive"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :unique-opened="true"
                :router="true"
                @open="handleOpen"
                ref="menu"
        >
            <el-submenu index="Article">
                <template slot="title">
                    <i class="el-icon-document-copy"></i>
                    <span>文章管理</span>
                </template>
                <el-menu-item @click="handleClick" index="/admin/ArticleAdd">发表文章</el-menu-item>
                <el-menu-item @click="handleClick" index="/admin/ArticleManage">修改/删除文章</el-menu-item>
            </el-submenu>

            <el-submenu index="User">
                <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item @click="handleClick" index="/admin/UserManage">权限管理</el-menu-item>
            </el-submenu>

            <el-submenu index="Message">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span>留言管理</span>
                </template>
                <el-menu-item @click="handleClick" index="/admin/MessageDelete">删除留言</el-menu-item>
            </el-submenu>

            <el-submenu index="Diary">
                <template slot="title">
                    <i class="el-icon-chat-dot-round"></i>
                    <span>日记管理</span>
                </template>
                <el-menu-item @click="handleClick" index="/admin/DiaryAdd">发表日记</el-menu-item>
                <el-menu-item @click="handleClick" index="/admin/DiaryManage">修改/删除日记</el-menu-item>
            </el-submenu>

            <el-submenu index="Links">
                <template slot="title">
                    <i class="el-icon-link"></i>
                    <span>友链管理</span>
                </template>
                <el-menu-item @click="handleClick" index="/admin/LinkAdd">添加友链</el-menu-item>
                <el-menu-item @click="handleClick" index="/admin/LinkDelete">删除友链</el-menu-item>
            </el-submenu>

            <el-submenu index="Music">
                <template slot="title">
                    <i class="el-icon-headset"></i>
                    <span>音乐管理</span>
                </template>
                <el-menu-item @click="handleClick" index="/admin/MusicAdd">添加音乐</el-menu-item>
                <el-menu-item @click="handleClick" index="/admin/MusicManage">删除音乐</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Menu",

        data(){
            return {
                defaultActive : ""
            }
        },

        watch:{
            $route(){
                this.defaultActive = this.$route.path;
            }
        },

        methods:{
            handleOpen(index){

            },

            handleClick(){
                this.$refs.menu.activeIndex = this.$route.path;
            }
        },

        mounted() {
            this.defaultActive = this.$route.path;
        }
    }
</script>

<style scoped lang="less">
    .el-menu{
        user-select: none;
        width: 100%;
    }

</style>