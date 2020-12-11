import Vue from 'vue'
import VueRouter from 'vue-router'

import request from "../api/index";
const ifLogin = request.ifLogin;


Vue.use(VueRouter)

  const routes = [
  {
    path: '/Admin',
    name: 'Admin',
    component: ()=> import('../views/Admin'),
    meta : {cnName : "首页"},
    //路由守卫 今日后台系统前判断是否登录
    beforeEnter: (to, from, next) => {
      ifLogin().then(res=>{
        if (res.data.code) {
          //code不为0，未登录，跳登陆
          next("/");
        }else{
          //code为0，已登录，进入管理界面
          next();
        }
      }).catch(()=>{
        next("/");
      })
    },
    children:[
      {
        path: '/',
        name: 'AdminHome',
        component: () => import('../views/Admin/AdminHome'),
        meta : {cnName : "管理首页"}
      },
      {
        path: 'ArticleAdd',
        name: 'ArticleAdd',
        component: () => import('../views/Admin//Article/ArticleAdd'),
        meta : {cnName : "发表文章"}
      },
      {
        path: 'ArticleManage',
        name: 'ArticleManage',
        component: () => import('../views/Admin/Article/ArticleManage'),
        meta : {cnName : "修改/删除文章"}
      },
      {
        path: 'UserManage',
        name: 'UserManage',
        component: () => import('../views/Admin/User/UserManage'),
        meta : {cnName : "用户管理"}
      },
      {
        path: "MessageDelete",
        name:"MessageDelete",
        component : () => import('../views/Admin/Message/MessageDelete'),
        meta : {cnName : "留言删除"}
      },
      {
        path: "DiaryAdd",
        name:"DiaryAdd",
        component : () => import('../views/Admin/Diary/DiaryAdd'),
        meta : {cnName : "发表日记"}
      },
      {
        path: "DiaryManage",
        name:"DiaryManage",
        component : () => import('../views/Admin/Diary/DiaryManage'),
        meta : {cnName : "修改/删除日记"}
      },
      {
        path: "LinkAdd",
        name:"LinkAdd",
        component : () => import('../views/Admin/Links/LinkAdd'),
        meta : {cnName : "添加友链"}
      },
      {
        path: "LinkDelete",
        name:"LinkDelete",
        component : () => import('../views/Admin/Links/LinkDelete'),
        meta : {cnName : "删除友链"}
      },
      {
        path: "MusicAdd",
        name:"MusicAdd",
        component : () => import('../views/Admin/Music/MusicAdd'),
        meta : {cnName : "添加音乐"}
      },
      {
        path: "MusicManage",
        name:"MusicManage",
        component : () => import('../views/Admin/Music/MusicManage'),
        meta : {cnName : "删除音乐"}
      }
    ]
  },
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login')
    },

]

const router = new VueRouter({
  routes
})

export default router
