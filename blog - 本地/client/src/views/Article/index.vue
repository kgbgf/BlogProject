<template>
  <div>
    <Nav></Nav>
    <div class="Message">
      <div class="main">
        <div v-if="articleInfo">
          <section class="title">
            <h4>{{articleInfo.title}}</h4>
            <p>
              <small>
                作者：<a href="javascript:void(0)">Ene</a>
              </small>
              <small class="ml10">围观群众：<i class="readcount">{{articleInfo.pv}}</i></small>
            </p>
          </section>
          <section class="time">
            <p class="date">{{articleInfo.date | date}}</p>
            <p class="month">{{articleInfo.date | month}}<span>月</span></p>
            <p class="year">{{articleInfo.date | year}}</p>
          </section>
          <section class="content" >
            <p v-html="articleInfo.content"></p>
            <p v-for="item in articleInfo.pic">
              <img :src="item"/>
            </p>
          </section>
          <section class="copyright">
            <p class="f-toe fc-black">
              非特殊说明，本文版权归 Ene 所有，转载请注明出处.
            </p>
          </section>
          <section class="extend">
            <h6>延伸阅读</h6>
            <ol>
              <li class="f-toe" v-for="item in extendList">
                <router-link :to="'/Article/'+item._id">{{item.title}}</router-link>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from "../../components/Nav";

  import request from '../../api'

  const getArticle = request.getArticle;;
  const getArticleExtend = request.getArticleExtend;

  function toTwo(num){
    return (num<10?"0":"") + num;
  }
  export default {
    name: "Article",
    components: {Nav},
    data(){
      return {
        articleInfo : null,
        extendList : []
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

        return `${YY}/${MM}/${DD} ${h}:${m}:${s}`;
      },
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
      //文章信息
      getArticle(this.$route.params.id)
        .then(res=>{
          if (res.data.code === 0) {
            this.articleInfo = res.data.data;
            console.log( this.articleInfo);
            //延伸阅读
            getArticleExtend(res.data.data.tag)
              .then(res=>{
                this.extendList = res.data.data;
              })
          }else{
            this.$router.push('/404')
          }
        })
        .catch(e=>{
          this.$router.push('/404')
        });


    }
  }
</script>

<style scoped lang="less">
  .f-toe {
    overflow: hidden;
    word-wrap: normal !important;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .Message {
    box-sizing: border-box;
    max-width: 1360px;
    height: 100%;
    padding: 70px 50px;
    margin: 0 auto;
    color: #515250;

    .main {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 30px 20px;
      color: #515250;
      background-color: #fff;

      section.title {
        padding: 5px 130px 5px 0;
        border-bottom: 1px solid #e8e9e7;
        font-weight: 400;

        h4 {
          margin-top: 5px;
          font-size: 20px;
          font-weight: normal;
          color: #515250;
        }

        p {
          color: #787977;

          a {
            color: #3e8bc7 !important;
          }

          .ml10 {
            margin-left: 10px;
          }
        }
      }

      section.time {
        width: 90px;
        height: 70px;
        font-family: SourceCodeProRegular, Menlo, Monaco, Consolas, "Courier New", monospace, 'Helvetica Neue', Arial, sans-serif;
        position: absolute;
        right: 10px;
        top: 15px;
        background-color: #fff;
        padding: 0 20px 5px 20px;
        line-height: 32px;

        .date {
          display: block;
          text-align: center;
          font-weight: 700;
          font-size: 40px;
          color: #6bc30d;
          position: relative;
          top: 2px;
        }

        .month {
          display: inline-block;
          color: #989997;
          font-size: 18px;

          span {
            font-size: 14px;
          }
        }

        .year {
          display: inline-block;
          color: #989997;
          margin-left: 10px;
          font-size: 18px;
        }
      }

      section.content {
        border-bottom: 1px solid #e1e2e0;
        padding-bottom: 20px;
        font: 14px/1.5 "Helvetica neue", Helvetica, Tahoma, "lantinghei sc", "Microsoft Yahei", sans-serif;
        margin: 20px 0 0 0;
        line-height: 28px;
        position: relative;
        min-height: 200px;
      }

      section.copyright {
        clear: both;
        background-color: #f8f9f7;
        padding: 15px 20px;
        line-height: 22px;
        text-shadow: 0 1px 0 rgba(255, 255, 255, .8);
        font-size: 12px;
        color: #787977;



        a {
          color: #3e8bc7;
          text-decoration: none;

          &:hover {
            color: #6bc30d;
          }
        }
      }

      section.extend {
        h6 {
          margin: 20px 0;
          border-left: 3px solid #6bc30d;
          min-height: 26px;
          line-height: 26px;
          padding: 5px 20px;
          background-color: #f8f9f7;
          font-size: 16px;
          font-weight: 400;
          color: #585957;
          text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
          clear: both;
        }
        ol{
          li::before{
            content: "◈";
            margin-right: 5px;
            color: #787977;
          }
          a{
            color: #3e8bc7;
            &:hover{
              color: #6bc30d;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

</style>
