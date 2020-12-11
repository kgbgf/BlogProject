<template>
  <div class="Home">
    <!--背景图-->
    <div class="bg" :style="{height:bgHeight+'px'}">
      <div class="bg-content loading">
        <div class="img"></div>
        <h2>不忘初心，方得始终</h2>
        <ul>
          <li>
            <a @mouseenter="handleEnter" @mouseleave="handleLeave">
              <img  class="pic" src="http://localhost:2333/img/QQ.png">
              <div class="qq" :style="{opacity:opacity,left:left+'px'}"></div>
            </a>
          </li>
          <li>
            <a href="https://space.bilibili.com/8070476">
              <img  class="pic" src="http://localhost:2333/img/bilibili.png">
            </a>
          </li>
          <li>
            <a href="https://music.163.com/#/user/home?id=325233178">
              <img  class="pic" src="http://localhost:2333/img/music.png">
            </a>
          </li>
        </ul>
        <router-link class="btn" to="/blog/0">Enter Blog</router-link>
      </div>
      <i class="bg-icon el-icon-arrow-down"></i>
    </div>

    <!--右上角菜单-->
    <div :class="['menu',{'click':ifClick}]">
      <div class="btn" @click="handleClick">
        <span></span><span></span><span></span>
      </div>
      <div class="cover">
        <div class="point">
          <router-link to="/">首页</router-link>
          <router-link to="/blog/0">博客</router-link>
          <router-link to="/message">留言</router-link>
        </div>
        <div class="cover-logo">Ene</div>
      </div>
    </div>

    <!--轮播图-->
    <div class="hot">
      <div class="hot-main">
        <div class="text loading">
          <h2>热门推荐</h2>
          <p>
            很想给你写封信,告诉你这里的天气.<br>
            昨夜的那场电影,还有我的心情.
          </p>
        </div>

        <div class="mid-main loading">
          <!--<el-carousel :interval="4000" type="card" height="400px" >
            <el-carousel-item v-for="item in picList" >
              <h3 class="medium">
                <p :style="{background:'url('+item.src+')'}">
                  <span class="word">{{item.content}}</span>
                  <router-link :to=item.link>
                    {{item.name}}&nbsp;<i class="el-icon-video-play"></i>
                  </router-link>
                </p>
              </h3>
            </el-carousel-item>
          </el-carousel>-->
          <ul>
            <li v-for="(item,index) in articleThree">
              <div>
                <div class="pic"
                     :style="{backgroundImage:'url('+item.surface+')'}"
                     @mouseenter="handleShowEnter(index)"
                     @mouseleave="handleHideEnter(index)"
                >
                  <router-link class="enter" :to="'/Article/'+item._id">Enter</router-link>
                </div>
              </div>
              <p class="p-title">{{item.title}}</p>
              <p class="p-content" v-html=item.content></p>
              <router-link :to="'/Article/'+item._id" class="read-more">阅读更多</router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!--关于&友链-->
    <div class="about">
      <div class="wrap">
        <ul class="loading">
          <li><router-link to="/about">关于</router-link></li>
          <li><router-link to="/links">+友情链接</router-link></li>
        </ul>
      </div>
    </div>

    <div class="footer-second">
      <div class="p-div">
        <p class="loading">疯狂摸鱼ing</p>
        <p class="loading">这么多年来什么都不会，就只会学习，学习使我快乐</p>
      </div>
    </div>

    <div class="footer-third">
      <ul>
        <li class="loading">
          <p>Ene</p>
          <p>当你翻过一座山，就会看到前面还有一堆山</p>
          <div class="btn">
            <el-button type="primary" size="small"><router-link to="/blog/0">BLOG</router-link></el-button>
          </div>
        </li>
        <li class="loading">
          <p><i class="el-icon-link"></i>  <a>推荐链接</a></p>
          <p><i class="el-icon-edit"></i>&nbsp;&nbsp;<a href="https://www.csdn.net">学习</a></p>
          <p><i class="el-icon-magic-stick"></i>&nbsp;&nbsp;<a href="https://www.bilibili.com">娱乐</a></p>
          <p><i class="el-icon-picture"></i>&nbsp;&nbsp;<a href="https://anime-pictures.net/pictures/view_posts/0?lang=en&tdsourcetag=s_pcqq_aiomsg">壁纸</a></p>
        </li>
        <li class="loading">
          <p><i class="el-icon-chat-dot-round"></i>  联系我</p>
          <p>QQ: 1210269344</p>
          <p>邮箱: 1210269344@qq.com</p>
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
  import request from '../../api/index'
  const getArticleHot = request.getArticleHot;

  //得到DOM距离页面顶部的距离
  function getTop(node){
    let top = 0;
    while(node !== document.body){
      top += node.offsetTop;
      node = node.offsetParent;
    }
    return top;
  }

  export default {
    name: "Home",


    data(){
      return {
        bgHeight : 0,
        ifClick : false,

        opacity:0,
        left:-200,

        //3篇热门文章
        articleThree:[],

      }
    },
    methods:{
      //设置bg高度与window高度一致
      getWindowHeight(){
        this.bgHeight = window.innerHeight;
      },

      //滚轮滚动事件
      handleScroll(){
        let loadingDom = document.querySelectorAll(".loading");
        let scrollTop = document.documentElement.scrollTop + window.innerHeight;
        loadingDom.forEach(node=>{
          if (scrollTop > getTop(node) + 100){
            node.classList.remove("loading");
          }
        });
      },

      //点击右侧菜单
      handleClick(){
        this.ifClick = !this.ifClick;
      },

      handleEnter(){
        this.opacity = 1
        this.left = -150
      },
      handleLeave(){
        this.opacity = 0
        this.left = -200
      },

      handleShowEnter(index){
        let enter = document.querySelectorAll("div.pic a");
        enter[index].style.display = "block"
      },

      handleHideEnter(index){
        let enter = document.querySelectorAll("div.pic a");
        enter[index].style.display = "none"
      }


    },
    filters : {
      date(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
      },
      month(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];
      },
      year(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];
      }
    },
    created() {
      this.getWindowHeight();

    },
    mounted() {


      getArticleHot(3).then(res=>{
        this.articleThree = res.data.data;
        console.log( this.articleThree);
      }),

      //resize

      window.addEventListener("resize",this.getWindowHeight);

      //scroll
      this.handleScroll();
      window.addEventListener("scroll",this.handleScroll);

    },
    destroyed() {
      window.removeEventListener("resize",this.getWindowHeight);
    }
  }
</script>

<style lang="less" scoped>
  .Home{
    user-select: none;
    .bg{
      position: relative;
      z-index:9;
      width: 100%;
      box-shadow:0 0 100px 100px white inset;

      &::before{
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background: url("../../assets/img/bg.png") center center/cover;
        filter: blur(5px);
      }
      .bg-content{
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 1;
        width: 100%;
        height: 154px;
        /*background-color: pink;*/
        text-align: center;
        font-size: 14px;
        line-height: 24px;
        color: white;
        transform: scale(1);
        transition: transform 1s;
        &.loading{
          transform: scale(0.5);
        }
        .img{
          width: 110px;
          height: 110px;
          margin: auto;
          border-radius: 50%;
          border: 5px solid #322824;
          background: url("http://localhost:2333/img/myAvatar.png");
          background-size: cover;
          box-shadow:0 0 3px 3px #8efaff;
          transition: .5s;

          &:hover{
            transform: rotate(360deg);
          }
        }

        h2{
          width: 400px;
          height: 50px;
          background: rgba(25,25,25,.5);
          border-radius: 50px;
          margin: 30px auto;
          line-height: 50px;
          color: white;
        }

        ul{
          width: 150px;
          height: 60px;
          margin: 30px auto;
          display: flex;
          justify-content: space-between;

          li{

            a{
              display: block;
              width: 40px;
              height: 40px;
              background: rgba(25,25,25,.5);
              border-radius: 100%;
              position: relative;
              cursor: pointer;
              user-select: none;

              .pic{
                width: 30px;
                height: 30px;
                margin-top: 5px;
              }

              .qq{
                width: 120px;
                height: 210px;
                background: url("http://localhost:2333/img/myQQ.png");
                background-size: cover;
                position: absolute;
                top: -10px;
                transition: all 1s;
              }
            }
          }
        }

        .btn{
          display: inline-block;
          height: 38px;
          line-height: 38px;
          padding: 0 18px;
          background-color: #1E9FFF;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          font-size: 14px;
          font-weight: bolder;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 20px;
          transition: .5s;
          &:hover{
            background: #67c23a;
            font-size: 17px;
          }
        }
      }
      .bg-icon{
        position: absolute;
        z-index: 11;
        bottom: 30px;
        left: 50%;
        margin-left: -25px;
        width: 50px;
        height: 50px;
        color: #fff;
        font-weight: 700;
        font-size: 36px;
        border-radius: 50%;
        transition: background-color .7s;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        &:hover{
          background-color: #6bc30d;
        }
      }
    }

    .menu{
      .btn{
        box-sizing: border-box;
        position: fixed;
        z-index: 999;
        right: 55px;
        top: 40px;
        padding-top: 12px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
        background-color: transparent;
        transition: background-color .3s;
        &:hover{
          background-color: #6bc30d;
        }
        span{
          position: relative;
          top: 0;
          display: block;
          width: 26px;
          height: 2px;
          margin: 0 auto 5px;
          background-color: #fff;
          transition: all .32s;
          transform: rotate(0deg);
        }

      }
      .cover {
        opacity: 0;
        z-index: 8;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        transition: opacity .3s;
        &::before{
          position: absolute;
          left: 100%;
          top: 0;
          content: "";
          width: 4999px;
          height: 100%;
          background: url("../../assets/img/meauBG.png");
          transform: skew(-12deg);
          transition: left .3s;
        }
        .point{
          position: absolute;
          right: 0;
          top: 200px;
          z-index: 101;
          font-size: 20px;
          a{
            position: relative;
            display: block;
            text-align: right;
            font-weight: bolder;
            color: #1d55b9;
            line-height: 46px;
            padding: 10px 30px;
            margin-right: 20px;
            font-size: 20px;
            text-decoration: none;
            -webkit-transition: color .6s linear;
            transition: color .6s linear;
            &::before{
              position: absolute;
              top: 50%;
              left: 0;
              width: 0;
              opacity: 0;
              height: 1px;
              background-color: #6bc30d;
              content: "";
              transition: all .3s;
            }
            &:hover{
              color: #6bc30d;
            }
            &:hover::before{
              width: 100%;
              opacity: 1;
            }
          }
        }
        .cover-logo{
          font-size: 50px;
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 101;
          padding: 10px 50px;
          font-family: BarbaraHand;
          color: #03a3b2;
          cursor: pointer;
        }
      }

      &.click{
        .btn{
          background-color: rgba(0, 0, 0, 0.1);
          span:nth-child(1){
            top: 8px;
            transform: rotate(45deg);
          }
          span:nth-child(2){
            top: 1px;
            transform: rotate(-45deg);
          }
          span:nth-child(3){
            display: none;
          }
        }
        .cover{
          opacity: 1;
          z-index: 10;
          &::before{
            left: 65%;
          }
        }
      }
    }

    .hot{
      overflow: hidden;
      width: 100%;
      position: relative;
      z-index: 9;
      padding: 100px 0;
      background-color: #fff;
      .hot-main{
        max-width: 1170px;
        width: 100%;
        margin: 0 auto;
        text-align: center;

        .text{
          padding-bottom: 20px;
          position: relative;
          top: 0;
          opacity: 1;
          transition: opacity .3s,top .5s;
          &.loading{
            top: -100px;
            opacity: 0;
          }
          >h2{
            position: relative;
            font-size: 32px;
            padding-bottom: 30px;
            font-weight: 500;
            &::before{
              position: absolute;
              width: 50px;
              height: 2px;
              content: "";
              left: 50%;
              margin-left: -25px;
              bottom: -1px;
              background: #00c2ff;
            }
          }
          >p{
            margin-top: 20px;
            line-height: 22px;
            color: #888;
          }
        }

        .mid-main{
          width: 100%;
          transition: 1s;
          position: relative;

          ul{
            width: 100%;
            display: flex;
            justify-content: space-between;

            li{
              position: relative;
              width: 350px;
              height: 420px;
              background: #f3f3f3;

              div{
                height: 70%;
                overflow: hidden;

                div.pic{
                  height: 100%;
                  background-size: cover;
                  transition: .5s;

                  &:hover{
                    transform: scale(1.2);
                    height: 100%;
                  }

                  &:after{
                    display: block;
                    color: white;
                    text-align: center;
                    line-height: 280px;
                    font-size: 30px;
                    content: "";
                    background: rgba(25,25,25,.5);
                    width: 100%;
                    height: 0;
                    transition: .3s;

                  }

                  &:hover::after{
                    height: 100%;
                  }

                  a.enter{
                    display: none;
                    position: absolute;
                    left: 140px;
                    top: 130px;
                    height: 30px;
                    width: 70px;
                    font-size: 20px;
                    color: white;
                    line-height: 30px;
                    text-align: center;
                    border: 2px solid white;
                    border-radius: 20px;
                    background: black;
                    z-index: 5;

                  }

                }
              }

              .p-title{
                font-size: 18px;
                padding: 5px;
                height: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .p-content{
                height: 50px;
                font-size: 14px;
                padding-left: 20px;
                padding-top: 5px;
                padding-bottom: 5px;
                text-align: left;
                color: #999;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
              a.read-more{
                position: absolute;
                display: inline-block;
                color: deepskyblue;
                font-size: 14px;
                left: 20px;
                bottom: 10px;
              }
            }
          }

          &.loading{
            top: 100px;
            opacity: 0;
          }
        }

      }
    }

    .about{
      position: relative;
      z-index:9;
      width: 100%;
      height: 48px;
      padding: 111px 0;
      margin: 0 auto;
      background: url("../../assets/img/bg.jpg") center center/cover fixed;
      &::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
      }
      ul {
        position: relative;
        z-index: 9;
        width: 425px;
        margin: 0 auto;
        opacity: 1;
        transition: .6s;
        &.loading {
          width: 1000px;
          opacity: 0;
        }
        li {
          position: relative;
          width: 198px;
          height: 46px;
          border: 1px solid #fff;
          &:nth-child(1){
            float: left;
          }
          &:nth-child(2){
            float: right;
          }
          &::after{
            position: absolute;
            left: 0;
            top: 0;
            content: "";
            width: 0;
            height: 46px;
            background-color: #6bc30d;
            transition: width .5s;
          }
          &:hover::after{
            width: 100%;
          }
          a{
            position: relative;
            z-index: 1;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 46px;
            text-align: center;
            color: #fff;
          }
        }
      }
    }

    .footer-second{
      box-sizing: border-box;
      padding: 20px;
      width: 100%;
      height: 200px;
      background: white;


      .p-div{
        width: 500px;
        height: 100%;
        margin: auto;
        position: relative;

        p:nth-child(1){
          color: black;
          text-align: center;
          font-size: 35px;
          padding: 30px 0 10px 0;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          transition: 1s;


          &.loading{
            transform: scale(0.3);
            opacity: .5;
          }
        }

        p:nth-child(2){
          color: black;
          text-align: center;
          font-size: 14px;
          padding: 10px 0;
          font-family: "Microsoft YaHei";
          font-width: bold;
          transition: 1s;

          &.loading{
            transform: scale(0.3);
            opacity: .5;
          }
        }
      }

    }

    .footer-third{
      width: 100%;
      background: rgb(33,34,32);
      position: relative;
      z-index: 10;

      ul{
        width: 80%;
        margin: auto;
        padding: 80px 20px 20px 20px;
        display: flex;
        color: white;
        justify-content: space-between;

        li{
          font-size: 13px;
          font-weight: bold;
          width: 300px;
          opacity: 1;
          transition: 1s;

          &.loading{
            opacity: 0;
          }

          p{
            padding: 10px;

            a{
              color: white;
            }
          }
          p:nth-child(1){
            font-size: 20px;
          }


          .btn{
            position: relative;
            top: 10px;
            left: 10px;

            a{
              color: white;
            }
          }
        }
      }
    }

  }
</style>










