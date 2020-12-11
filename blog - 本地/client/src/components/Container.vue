<template>
  <div id="Container">
    <el-container>
      <el-main>
        <ArticleShow></ArticleShow>
      </el-main>
      <el-aside>
        <div :class="['search',{'fixed':ifSearchFixed}]">
          <div class="search-main">
            <input type="text" @input="handleInput" v-model="searchInput" placeholder="请输入搜索内容">
            <i class="el-icon-search"></i>
            <ul v-if="!!searchList.length">
              <li v-for="item in searchList"><router-link :to="'/Article/'+item._id">{{item.title}}</router-link></li>
            </ul>
          </div>
          <div class="search-article">
            <ul @mouseleave="handleMouseleave">
              <li @mouseenter="handleMouseenter(index)" v-for="(item,index) in getArticleTags"><router-link :to="'/blog/'+index">{{item}}</router-link></li>
            </ul>
            <div class="cover" :style="{top:coverIndex*40+'px'}"></div>
          </div>
        </div>
        <div class="hot">
          <h3>热门文章</h3>
          <ul>
            <li v-for="(item,index) in articleHot">
              <i>{{index+1}}</i>
              <router-link :to="'/Article/'+item._id">{{item.title}}</router-link>
            </li>
          </ul>
        </div>
        <div class="recommend">
          <h3>置顶推荐</h3>
          <ul>
            <li v-if="!!getArticleRecommend.title">
              <i>{{1}}</i>
              <router-link :to="'/Article/'+getArticleRecommend._id">{{getArticleRecommend.title}}</router-link>
            </li>
          </ul>
        </div>
        <div class="visitor">
          <h3>最近访客</h3>
          <ul>
            <li v-for="item in visitor" :style="{backgroundImage:'url('+item.user.userPhoto+')'}">
              <p>{{item.user.username}}</p>
            </li>
          </ul>
        </div>
      </el-aside>
    </el-container>
  </div>

</template>

<script>
  import ArticleShow from "./ArticleShow";

  import request from '../api/index'
  let getArticleInfo = request.getArticleInfo;
  let getArticleHot = request.getArticleHot;
  let getArticleSearch = request.getArticleSearch;
  let getVisitor = request.getVisitor;

  export default {
    name: "Container",
    data(){
      return {
        /*搜索框 v-model*/
        searchInput : "",
        searchList : [],
        searchTimer : null,

        /*控制search的clss名字*/
        ifSearchFixed : false,

        /*文章分类（tags）*/
        articleTags : [],

        /*热门文章列表*/
        articleHot:[],

        /*cover条的top值*/
        coverIndex : this.$route.params.id*1,

        /*这是最近访客的数据*/
        visitor: []
      }
    },
    computed:{
      getArticleTags(){
        return ["全部文章",...this.articleTags];
      },
      getArticleRecommend(){
        return this.articleHot[0] || {};
      },

    },
    methods:{
      handleMouseenter(index){
        this.coverIndex = index;
      },
      handleMouseleave(){
        this.coverIndex = this.$route.params.id*1;
      },

      handleWindowScroll(){
        this.ifSearchFixed = document.documentElement.scrollTop>=900;
      },

      handleInput(){
        // console.log(this.searchInput);
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(()=>{
          let keywords = this.searchInput.trim();//去除首位空格
          if (keywords) {
            getArticleSearch(keywords)
              .then(res=>{
                this.searchList = res.data.data;
              })
              .catch(()=>{
                this.searchList = [];
              });
          }else{
            this.searchList = [];
          }
        },1000);
      }
    },
    components:{
      ArticleShow
    },


    created() {
      //请求分类
      getArticleInfo().then(res=>{
        this.articleTags = res.data.data.tags
      });
      //请求热门文章
      getArticleHot().then(res=>{
        this.articleHot = res.data.data;
      });
      //请求最近访问者信息
      getVisitor().then(res=>{
        this.visitor = res.data.data;
      });
    },
    mounted() {
      this.handleWindowScroll();
      /*监听一下window的滚动事件*/
      window.addEventListener("scroll", this.handleWindowScroll )
    },
    destroyed() {
      //离开当前路由之后，就不需要这个事件了
      window.removeEventListener("scroll", this.handleWindowScroll )
    }
  }
</script>

<style scoped lang="less">
  #Container{
    padding-top: 80px;
    width: 100%;
    user-select: none;
    >.el-container{
      box-sizing: border-box;
      width: 100%;
      max-width: 1360px;
      margin: 0 auto;
      padding: 0 50px;
      >.el-main{
        padding-top: 0;
        padding-left: 0;
      }
      >.el-aside{
        width: 300px;
        /*background-color: aqua;*/
        >.search{
          width: 100%;
          background-color: #fff;
          padding-bottom: 20px;
          &.fixed{
            position: fixed;
            z-index: 3;
            width: 300px;
            animation: searchMove .5s 1 ease-in-out;
            animation-fill-mode: forwards;
          }
          @keyframes searchMove{
            0%{top : -500px}
            40%{top: 81px}
            65%{top: 70px}
            100%{top: 81px}
          }
          .search-main{
            position: relative;
            z-index:2;
            box-sizing: border-box;
            width: 100%;
            height: 80px;
            padding: 20px;
            background-color: grey;
            input{
              position: relative;
              z-index: 3;
              width: 100%;
              height: 40px;
              border-radius: 20px;
              border: 0;
              outline: 0;
              text-indent: 2em;
            }
            i{
              position: absolute;
              z-index: 4;
              right: 35px;
              top: 29px;
              width: 22px;
              height: 22px;
              font-size: 18px;
              line-height: 22px;
              text-align: right;
              font-weight: bolder;
              color: rgb(120, 121, 119);
              cursor: pointer;
            }
            ul{
              position: absolute;
              width: 260px;
              background-color: #fff;
              top: 44px;
              padding-top: 23px;
              border-radius:0 0 10px 10px;
              box-shadow: 0 0 2px #999;
              li{
                overflow: hidden;
                box-sizing: border-box;
                width: 100%;
                height: 40px;
                line-height: 30px;
                padding: 5px;
                a{
                  display: block;
                  width: 100%;
                  height: 100%;
                  &:hover{
                    background-color: #ddd;
                  }
                }
              }
            }
          }
          .search-article{
            position: relative;
            width: 100%;
            margin-top: 20px;
            ul {
              width: 100%;
              li {
                position: relative;
                box-sizing: border-box;
                z-index: 1;
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding: 0 30px;
                a{
                  display: block;
                  width: 100%;
                  height: 100%;
                  color: #787977;
                  border-bottom: 1px dotted #eee;
                }
              }
            }
            .cover{
              box-sizing: border-box;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 40px;
              border-right: 5px solid #000;
              background-color: rgba(0,0,0,.05);
              transition: top .3s;
            }
          }
        }
        >.hot,.recommend{
          box-sizing: border-box;
          width: 100%;
          margin-top: 20px;
          background-color: #fff;
          padding: 15px 20px 20px;
          h3{
            padding: 0 5px 10px;
            line-height: 30px;
            font-weight: 400;
            border-bottom: 1px solid #e8e9e7;
            color: #383937;
            position: relative;
            font-size: 18px;
          }
          ul{
            margin-top: 15px;
            li{
              overflow: hidden;
              height: 30px;
              line-height: 30px;
              margin: 7px 0;
              a{
                color: #787977;
                font-size: 14px;
                text-decoration: none;
                &:hover{
                  color: #6bc30d;
                  text-decoration: underline;
                }
              }
              i{
                display: inline-block;
                width: 22px;
                height: 22px;
                margin-right: 10px;
                font-style: normal;
                font-size: 12px;
                color: #666;
                line-height: 22px;
                text-align: center;
                border-radius: 100%;
                background-color: #edefee;
                text-shadow: 0 1px 0 rgba(255,255,255,.5);
              }
              &:nth-child(1) i{
                background-color: #e24d46;
                color: #fff;
              }
              &:nth-child(2) i{
                background-color: #2ea7e0;
                color: #fff;
              }
              &:nth-child(3) i{
                background-color: #6bc30d;
                color: #fff;
              }
            }
          }
        }
        >.visitor{
          box-sizing: border-box;
          width: 100%;
          margin-top: 20px;
          background-color: #fff;
          padding: 15px 20px 20px;
          h3{
            padding: 0 5px 10px;
            line-height: 30px;
            font-weight: 400;
            border-bottom: 1px solid #e8e9e7;
            color: #383937;
            position: relative;
            font-size: 18px;
          }
          ul{
            margin-top: 10px;
            li{
              position: relative;
              float: left;
              width: 23%;
              height: 60px;
              margin: 1%;

              background-position: center top;
              background-size: cover;
              background-repeat: no-repeat;

              p{
                overflow: hidden;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 20px;
                line-height: 20px;
                text-align: center;
                background-color: rgba(0,0,0,.3);
                color: #fff;
                font-size: 12px;
              }
            }
            &::after{
              display: block;
              content: '';
              width: 0;
              height: 0;
              clear: both;
            }
          }
        }
      }
    }
  }
</style>




















