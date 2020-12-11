<template>
  <div class="articleShow">
    <section v-for="item in articleList">
      <h5>
        <span>【{{item.type}}】</span>
        <router-link :to="'/Article/'+item._id">{{item.title}}</router-link>
      </h5>
      <div class="time">
        <p class="date">{{item.date | date}}</p>
        <p class="month">{{item.date | month}}<span>月</span></p>
        <p class="year">{{item.date | year}}</p>
      </div>
      <div class="content">
        <router-link :to="'/Article/'+item._id" :style="{backgroundImage:'url('+item.surface+')'}">
          <i></i>
        </router-link>
        {{item.content | contentToText}}
      </div>
      <div class="read-more">
        <router-link :to="'/Article/'+item._id">继续阅读</router-link>
      </div>
      <div class="footer">
        <div class="fl">
          <i class="el-icon-s-promotion"></i>
          <span>{{item.tag}}</span>
        </div>
        <div class="fr">
          <span class="pv">
            <i class="el-icon-view"></i>
            <i>{{item.pv}}</i>
          </span>
          <span class="comment">
            <i class="el-icon-chat-dot-round"></i>
            <i>{{item.comment.length}}</i>
          </span>
        </div>
      </div>
    </section>
    <div v-if="ifLoding" class="loading">
      <span>加载中</span>
      <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
    </div>
    <p v-if="ifNoMore" class="no-more">哼╭(╯^╰)╮我也是有底线的！！</p>
  </div>
</template>

<script>

  import request from '../api'

  const getArticleShow = request.getArticleShow;

  export default {
    name: "ArticleShow",
    data(){
      return {
        //文章数据
        articleList : [],

        //no-more的显示与否
        ifNoMore : false,

        //是否在加载
        ifLoding : false
      }
    },

    filters : {
      date(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
      },
      month(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];
      },
      year(value) {
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];
      },

      contentToText(value){
        var div = document.createElement("div");
        div.innerHTML = value;
        return div.innerText;
      }
    },

    computed:{
      id(){
       return this.$route.params.id;
      }
    },

    watch:{
      id(){
        //当id发生变化时
        this.getArticleShowFresh();
        document.documentElement.scrollTop = 0;
      }
    },

    methods:{
      getArticleShowFresh(){
        this.ifNoMore = this.ifLoding = false;
        getArticleShow(this.id,true).then(res=>{
          this.articleList = res.data.data;
        });
      },

      handleScroll(){

        if (this.ifNoMore || this.ifLoding)return;


        //文档高
        let c = document.documentElement.offsetHeight;
        //滚动高
        let a = document.documentElement.scrollTop;
        //可视区高
        let b = document.documentElement.clientHeight;

        if (a + b >= c - 200) {
          this.ifLoding = true;
          getArticleShow(this.id,false).then(res=>{
            this.ifLoding = false;
            let data = res.data.data;
            if (data.length){
              this.articleList.push(...res.data.data);
            }else{
              this.ifNoMore = true;
            }
          });
        }
      }
    },

    mounted() {
      //发送第一次请求
      this.getArticleShowFresh();

      //监听滚动事件
      window.addEventListener("scroll",this.handleScroll);
    }
  }
</script>

<style scoped lang="less">
  .articleShow{
    >section{
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 20px 30px 25px;
      margin-bottom: 20px;
      background-color: #fff;
      animation: show .5s 1;
      animation-fill-mode: forwards;
      @keyframes show{
        from{opacity: .5;transform: scale(.5)}
        to{opacity: 1;transform: scale(1)}
      }
      &:nth-child(1)::before{
        content: "置顶";
        position: absolute;
        height: 20px;
        line-height: 20px;
        text-align: center;
        width: 74px;
        background-color: #ff5722;
        color: #fff;
        transform: rotate(-45deg);
        left: -18px;
        top: 9px;
      }
      >h5{
        line-height: 30px;
        padding: 5px 130px 5px 0;
        border-bottom: 1px solid #e8e9e7;
        font-size: 18px;
        font-weight: 400;
        span{
          font-size: 16px;
          font-weight: 400;
          display: inline-block;
          vertical-align: bottom;
          color: #2ea7e0;
        }
        a{
          color: #000;
          text-decoration: none;
          &:hover{
            color: #6bc30d;
            text-decoration: underline;
          }
        }
      }
      .time{
        width: 90px;
        height: 70px;
        font-family: SourceCodeProRegular,Menlo,Monaco,Consolas,"Courier New",monospace,'Helvetica Neue',Arial,sans-serif;
        position: absolute;
        right: 10px;
        top: 10px;
        background-color: #fff;
        padding: 0 20px 5px 20px;
        line-height: 32px;
        .date{
          display: block;
          text-align: center;
          font-weight: 700;
          font-size: 40px;
          color: #6bc30d;
          position: relative;
          top: 2px;
        }
        .month{
          display: inline-block;
          color: #989997;
          font-size: 18px;
          span{
            font-size: 14px;
          }
        }
        .year{
          display: inline-block;
          color: #989997;
          margin-left: 10px;
          font-size: 18px;
        }
      }
      .content{
        margin-top: 20px;
        line-height: 28px;
        position: relative;
        min-height: 200px;
        a{
          position: relative;
          display: block;
          overflow: hidden;
          float: left;
          width: 300px;
          height: 180px;
          border: 1px solid #e8e9e7;
          margin-right: 20px;
          background-position: center top;
          background-size: cover;

          i{
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 0;
            height: 100%;
            /*background-color: #fff;*/
            transform: translateX(-40px) skew(-15deg);
            box-shadow: 0 0 30px 20px rgba(255,255,255,.2);
          }
          &:hover i{
            transition: transform .5s .5s;
            transform: translateX(350px) skew(-15deg);
          }
        }
      }
      .read-more{
        position: relative;
        &::before{
          content: " ";
          display: inline-block;
          height: 1px;
          top: 20px;
          left: 100px;
          right: 0;
          position: absolute;
          background-color: #d0d0d0;
        }
        a{
          font-weight: bold;
          color: #383937;
          text-decoration: none;
          border: none;
          line-height: 40px;
          &:hover{
            color: #6bc30d;
            text-decoration: underline;
          }
        }
      }
      .footer{
        .fl{
          float: left;
          i{
            font-size: 18px;
            margin-right: 5px;
            color: #666;
          }
          span{
            display: inline-block;
            font-size: 12px;
            padding: 2px 5px;
            background-color: #f1f2f0;
            color: #787977;
            margin: 2px;
            text-decoration: none;
            -webkit-transition: all .2s;
            transition: all .2s;
            &:hover{
              color: #fff;
              background: #6bc30d;
            }
          }
        }
        .fr{
          float: right;
          color: #666;
          i{
            font-style: normal;
            margin-right: 12px;
          }
          .comment{
            margin-left: 20px;
          }
        }
      }
    }
    >.loading{
      position: relative;
      height: 42px;
      background-color: #fff;
      text-align: center;
      span{
        display: inline-block;
        height: 42px;
        line-height: 42px;
        vertical-align: middle;
      }
      svg{
        vertical-align: middle;
        height: 42px;
        width: 42px;
        animation: loading-rotate 2s linear infinite;
        circle{
          animation: loading-dash 1.5s ease-in-out infinite;
          stroke-dasharray: 90,150;
          stroke-dashoffset: 0;
          stroke-width: 2;
          stroke: #409eff;
          stroke-linecap: round;
          color: black;
        }
      }
      @keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}
      @keyframes loading-rotate{to{transform:rotate(1turn)}}
    }
    >.no-more{
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #fff;
      font-size: 12px;
    }
  }
</style>
