<template>
  <div>
    <div id="nav">
      <div class="nav-main">
        <div class="n-m-logo">Ene</div>
        <div class="n-m-login">
          <el-popover
              v-if="ifLogin"
              placement="top-start"
              width="100"
              trigger="hover">
            <p>欢迎登陆：{{login.user}}</p>
            <el-button type="danger" @click="handleLogout" plain size="mini">退出登录</el-button>
            <br>
            <el-button
                type="primary"
                @click="ifShowAvatar = true"
                plain
                size="mini"
            >
              修改头像
            </el-button>
            <a href="" slot="reference" class="img"
                  :style="{
                    backgroundImage : 'url('+login.photo+')',
                    position: 'absolute',
                    top: '10px',
                    left: '41px',
                    width: '40px',
                    height: '40px',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    borderRadius: '50%',
                    cursor:'pointer'
                  }"
            ></a>
          </el-popover>
          <div class="login" v-else>
            <el-button @click="ifShowLogin = true" type="primary">登录</el-button>
            <el-button @click="ifShowRegister = true" type="success">注册</el-button>
          </div>
        </div>
        <div class="n-m-nav">
          <ul :class="'list'+whichActive">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/blog/0">博客</router-link></li>
            <li><router-link to="/message">留言</router-link></li>
            <li><router-link to="/diary">日记</router-link></li>
            <li><router-link to="/links">友链</router-link></li>
            <li><router-link to="/about">关于</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <Login :dialogVisible="ifShowLogin" @handleClose="closeLogin"></Login>
    <Register :dialogVisible="ifShowRegister" @handleClose="closeRegister"></Register>
    <Avatar :dialogVisible="ifShowAvatar" @handleClose="closeAvatar"></Avatar>
  </div>
</template>

<script>

  import Register from "./Register";
  import Login from "./Login";
  import Avatar from "./Avatar";
  import request from "../api";


  const postIfLogin = request.postIfLogin;
  const postLogout = request.postLogout;

  export default {
    name: "Nav",
    components:{
      Register,Login,Avatar
    },
    data(){
      return{
        /*路由列表*/
        routerList : ["Home","Blog","Message","Diary","Links","About"],

        /*弹窗key值*/
        // alertKey : 0,

        /*是否登录*/
        ifLogin : false,
        /*用户信息*/
        login : {
          user : "",
          photo : ""
        }

        /*登录弹窗和注册弹窗*/
        ,ifShowLogin : false
        ,ifShowRegister : false
        ,ifShowAvatar : false
      }
    },
    computed:{
      whichActive(){
        let index = this.routerList.indexOf(this.$route.name);
        if (this.$route.name === "Article")index = 1;

        return index + 1;
      }
    },
    methods:{
      closeRegister(bool){
        this.ifShowRegister = false;
        this.ifShowLogin = bool;
      },
      closeLogin(){
        this.ifShowLogin = false;
      },
      closeAvatar(){
        this.ifShowAvatar = false;
      },

      handleLogout(){
        postLogout()
          .then(()=>{
            this.$message({
              message: "退出登录成功",
              type: 'success',
              duration : 2000
            });
            setTimeout(()=>{
              window.location.reload();
            },1700)
          })
          .catch(()=>{
            this.$message({
              message: "退出失败…",
              type: 'error',
              duration : 2000
            });
          });
      },
      handleAvatar(){

      }
    },

    mounted() {
      postIfLogin().then(res=>{
        if (res.data.userInfo) {
          this.ifLogin = true;
          this.login.user = res.data.userInfo.username;
          this.login.photo = res.data.userInfo.photo || res.data.userInfo.userPhoto;
        }else{
          this.ifLogin = false;
        }
      });
    }
  }
</script>

<style lang="less" scoped>
  #nav{
    overflow: hidden;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #e8e9e7;
    background: white;
    >.nav-main{
      box-sizing: border-box;
      width: 100%;
      max-width: 1360px;
      height: 60px;
      margin: 0 auto;
      padding: 0 50px;
      .n-m-logo{
        float: left;
        width: 100px;
        height: 60px;
        line-height: 60px;
        text-align: left;
        color: #777;
        font-size: 40px;
        font-family: BarbaraHand;
      }
      .n-m-login{
        position: relative;
        float: right;
        width: 122px;
        height: 60px;
        line-height: 60px;
        .el-button{
          padding: 9px 13px;
        }
        >div.userInfo{
          width: 100%;
          height: 100%;
        }
      }
      .n-m-nav{
        float: right;
        width: 576px;
        height: 60px;
        margin-right: 8%;
        ul{
          display: flex;
          width: 100%;
          height: 100%;
          li{
            flex: 1;
            a{
              position: relative;
              display: block;
              width: 100%;
              height: 100%;
              text-align: center;
              line-height: 60px;
              color: #212220;
              font-weight: 400;
              font-size: 15px;
              transition: color .5s;
              &::after{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0 auto;
                content: "";
                width: 0;
                height: 2px;
                background-color: #6bc30d;
                transition: width .5s;
              }
              &:hover{
                color: #6bc30d;
                &::after{
                  width: 100%;
                }
              }
            }
          }
          &.list1 li:nth-child(1),
          &.list2 li:nth-child(2),
          &.list3 li:nth-child(3),
          &.list4 li:nth-child(4),
          &.list5 li:nth-child(5),
          &.list6 li:nth-child(6){
            a{
              color: #6bc30d;
              &::after{
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>



















