<template>
  <div class="Message">
    <Nav></Nav>
    <div class="main">
      <div class="content">
        <article>
          <section>
            <h2>留言板</h2>
            <p>沟通交流，拉近你我！</p>
            <RichText @Sub="handleSubmit"></RichText>
          </section>
          <section>
            <ul>
              <li v-for="(item,index) in commentList" :key="item._id">
                <div class="comment-parent">
                  <div class="p-img" :style="{backgroundImage:'url('+item.user.userPhoto+')'}"></div>
                  <div class="p-info">
                    <div class="p-name">{{item.user.username}}</div>
                    <div class="p-content" v-html="item.content"></div>
                    <div class="p-time">
                      <span>{{item.date | getTime}}</span>
                      <a @click="replyClick(index)">
                        {{(item.reply.lastIndexArr[0]===index && item.reply.lastIndexArr[1]===undefined)?"收起":"回复"}}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="comment-child" v-for="(childItem,childIndex) in item.children"  :key="childItem.date + Math.random()">
                  <div class="c-img"  :style="{backgroundImage:'url('+childItem.user.userPhoto+')'}"></div>
                  <div class="c-info">
                    <div class="c-name">
                      <span class="name">{{childItem.user.username}}</span>回复<span class="name">{{childItem.reUser}}</span>
                      <span>{{childItem.content}}</span>
                    </div>
                    <div class="c-time">
                      <span>{{childItem.date | getTime}}</span>
                      <a @click="replyClick(index,childIndex)">
                        {{(item.reply.lastIndexArr[0]===index && item.reply.lastIndexArr[1]===childIndex)?"收起":"回复"}}
                      </a>
                    </div>
                  </div>
                </div>
                <div :class="['comment-reply',{'show':item.reply.ifShow}]">
                  <textarea v-model="item.reply.content" :placeholder="'回复【'+item.reply.reUser+'】：'"></textarea>
                  <button @click="childCommit(index)" type="button" class="layui-btn layui-btn-xs">提交</button>
                </div>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from "../../components/Nav";
  import RichText from "../../components/RichText";
  import request from "../../api"

  const postIfLogin = request.postIfLogin;
  const commitMessage = request.commitMessage;
  const getMessageList = request.getMessageList;
  const commitChildMessage = request.commitChildMessage;

  function toTwo(num){
    return (num<10?"0":"") + num;
  }

  export default {
    name: "Message",
    data(){
      return {
        commentList : [],

        skip : 0,
        limit : 0,
        ifLoding : false
      }
    },
    filters:{
      getTime(val){
        let date = new Date(val);

        let YY = toTwo(date.getFullYear()),
          MM = toTwo(date.getMonth()+1),
          DD = toTwo(date.getDate()),
          h = toTwo(date.getHours()),
          m = toTwo(date.getMinutes()),
          s = toTwo(date.getSeconds());

        return `${YY}年${MM}月${DD}日 ${h}:${m}:${s}`;
      }
    },

    methods : {
      handleSubmit(val){

        postIfLogin()
          .then(res=>{
            if (res.data.userInfo) {
              //判断用户是否处于禁用状态
              if(res.data.userInfo.disabled){
                layer.msg('操作失败，您处于禁言状态！', {icon: 2});
                return;
              }

              //登陆了，就发送数据到数据库 -- 执行留言提交的ajax
              commitMessage({
                user : res.data.userInfo._id,
                content : val
              }).then(res=>{
                if (res.data.code === 0) {
                  layer.msg('留言成功', {icon: 1});
                  setTimeout(()=>{
                    window.location.reload();
                  },1000);
                }else{
                  layer.msg(res.data.msg, {icon: 2});
                }

              }).catch(()=>{
                layer.msg('服务器错误~请稍后再试', {icon: 2});
              });

            }else{
              //未登录
              layer.msg('请先登录', {icon: 2});
            }
          })
          .catch(()=>{
            //服务出错
            layer.msg('服务器错误~请稍后再试', {icon: 2});
          });

      },
      replyClick(pIndex,cIndex){

        if (pIndex === undefined)return;

        let parentData = this.commentList[pIndex];


        //改变placeholder的内容
        if (cIndex !== undefined) {
          //回复的子评论
          this.commentList[pIndex].reply.reUser = this.commentList[pIndex].children[cIndex].user.username;
        }else{
          //回复的父评论
          this.commentList[pIndex].reply.reUser = this.commentList[pIndex].user.username;
        }


        //两次点的同一个
        //不是同一个
        if ((pIndex === parentData.reply.lastIndexArr[0] && cIndex === parentData.reply.lastIndexArr[1])) {
          parentData.reply.ifShow = false;
          parentData.reply.lastIndexArr=[];
        }else{
          parentData.reply.ifShow = true;
          parentData.reply.lastIndexArr=[pIndex,cIndex];
        }
      },

      childCommit(pIndex){
        //判断登录
        postIfLogin()
          .then(res=>{
            if (res.data.userInfo) {
              //判断用户是否处于禁用状态
              if(res.data.userInfo.disabled){
                layer.msg('操作失败，您处于禁言状态！', {icon: 2});
                return;
              }

              //登陆了，就发送数据到数据库 -- 执行留言提交的ajax
              commitChildMessage({
                parentId : this.commentList[pIndex]._id,
                user:res.data.userInfo._id,
                content: this.commentList[pIndex].reply.content,
                reUser : this.commentList[pIndex].reply.reUser
              })
                .then(res=>{
                  if (res.data.code) {
                    //code不为0，评论失败
                    layer.msg(res.data.msg, {icon: 2});
                  }else{
                    //code为0，评论成功
                    layer.msg('评论成功', {icon: 1});
                    setTimeout(()=>{
                      window.location.reload();
                    },1000);
                  }
                })
            }else{
              //未登录
              layer.msg('请先登录', {icon: 2});
            }
          })
          .catch(()=>{
            //服务出错
            layer.msg('服务器错误~请稍后再试', {icon: 2});
          });
      },

      handleScroll(){
        if (this.ifLoding)return;

        //文档高
        let c = document.documentElement.offsetHeight;
        //滚动高
        let a = document.documentElement.scrollTop;
        //可视区高
        let b = document.documentElement.clientHeight;

        if (a + b >= c - 200) {
          this.ifLoding = true;
          this.getMessageList(()=>{
            this.ifLoding = false;
          });
        }
      },
      getMessageList(cb){
        this.limit += 5;
        getMessageList(this.skip,this.limit)
          .then(res=>{
            if (res.data.code === 0) {
              let data = res.data.data;
              data.forEach(item=>{
                item.reply={
                  user : "",//id
                  content : "",//回复内容
                  reUser : "",//字符串
                  date : "",//日期
                  ifShow : false,
                  lastIndexArr : []
                }
              });
              this.commentList = data;
            }
            cb && cb();
          })
          .catch(()=>{
            cb && cb();
          })
      }
    },
    components:{
      Nav,RichText
    }

    ,created() {
      this.getMessageList();
    }

    ,mounted() {
      //发送第一次请求


      //监听滚动事件
      window.addEventListener("scroll",this.handleScroll);
    }
    ,destroyed() {
      //移除监听滚动事件
      window.removeEventListener("scroll",this.handleScroll);
    }
  }

</script>

<style scoped lang="less">
  .Message{
    >.main{
      box-sizing: border-box;
      max-width: 1360px;
      padding: 70px 50px;
      margin: 0 auto;
      >.content{
        width: 100%;
        background-color: #fff;
        >article{
          section:nth-child(1){
            box-sizing: border-box;
            width: 100%;
            padding: 20px 15px;
            >h2{
              font-weight: 700;
              font-size: 2rem;
              text-align: center;
            }
            >p{
              font-size: 1.25rem;
              margin: 1rem 0;
              text-align: center;
            }
          }
          section:nth-child(2){
            box-sizing: border-box;
            padding: 20px 15px;
            width: 100%;
            >ul{
              width: 100%;
              >li{
                padding: 20px 0;
                border-bottom: 1px dotted #333;
                .comment-parent{
                  display: flex;
                  .p-img{
                    width: 45px;
                    height: 45px;
                    border-radius: 100%;
                    margin-right: 5px;
                    background-position: center center;
                    background-size: cover;
                  }
                  .p-info{
                    flex: 1;
                    padding-bottom: 20px;
                    border-bottom: 1px dotted #aaa;
                    .p-name{
                      overflow: hidden;
                      color: #01aaed;
                    }
                    .p-content{
                      padding: 2px 0 5px 0;
                      min-height: 30px;
                      font-size: 12px;
                      word-break: break-all;
                    }
                    .p-time{
                      font-size: 12px;
                      color: #999;
                      span{
                        padding-left: 15px;
                        padding-right: 15px;
                      }
                      a{
                        color: blue;
                        cursor: pointer;
                      }
                    }
                  }
                }
                .comment-child{
                  display: flex;
                  box-sizing: border-box;
                  width: 100%;
                  padding-left: 50px;
                  padding-top: 20px;
                  .c-img{
                    width: 45px;
                    height: 45px;
                    border-radius: 100%;
                    background-position: center center;
                    background-size: cover;
                  }
                  .c-info{
                    flex: 1;
                    font-size: 12px;
                    .c-name{
                      .name{
                        color: #01aaed;
                        margin: 0 5px;
                      }
                    }
                    .c-time{
                      padding-left: 20px;
                      padding-top: 5px;
                      span{
                        margin-right: 10px;
                      }
                      a{
                        cursor: pointer;
                        color: blue;
                      }
                    }
                  }
                }
                .comment-reply{
                  overflow: hidden;
                  box-sizing: border-box;
                  width: 100%;
                  height: 0;
                  padding-left: 50px;
                  padding-top: 10px;
                  transition: height .3s;
                  &.show{
                    height: 100px;
                  }
                  textarea{
                    display: block;
                    width: 100%;
                    height: 60px;
                    border-color: #aaa;
                    padding: 10px;
                    box-sizing: border-box;
                    resize: none;
                  }
                  button{
                    margin-top: 8px;
                    display: block;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
