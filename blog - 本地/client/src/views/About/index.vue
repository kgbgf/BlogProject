<template>
  <div class="About">
    <Nav></Nav>
    <div class="canvas" ref="can">
      <div class="txt">
        <h2>关于</h2>
        <p>什么都能崩 心态不能崩</p>
      </div>
      <Yinshi></Yinshi>
    </div>
    <div class="about-main">
      <div class="a-m-content">
        <article>
          <section>
            <h1>关于我</h1>
            <p>
              一个爱好动漫和游戏的肥宅，一个前端领域的小白~~
            </p>
            <span>
                    可以通过以下方式联系到我：
                </span>
            <ul>

              <li>邮 箱 ：<a>1210269344@qq.com</a></li>

            </ul>

          </section>
          <section>
            <h1>关于本站</h1>
            <p>
              本站建于2020年5月 主要用作于个人的博客网站
            </p>
            <span>
                    本站结构：
                </span>
            <ul>
              <li>前 端 ： Vue</li>
              <li>后 端 ： Node</li>
            </ul>
            <p>
              本站采用阿里云提供的服务器ESC
            </p>
          </section>
          <section>
            <h1>关于版权</h1>
            <p>
              只要在使用时注明出处，那么您可以可以对本站所有原创内容进行转载、节选、二次创作，但是您不得对其用于商业目的。
            </p>
          </section>
          <section>
            <h1>特别说明</h1>
            <ul>
              <li>本站文章仅代表个人观点，和任何组织或个人无关。</li>
              <li>本站前端开发代码没有考虑对IE浏览器的兼容。</li>
              <li>用户邮箱仅作回复消息用，不对外使用。</li>
            </ul>
            <br><br>
            <div>
              <img src="../../assets/img/aboutPic.jpg" style="width:100%;">
            </div>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from "../../components/Nav";  import Yinshi from "../../components/Yinshi";

  export default {
    name: "About",
    components:{
      Nav,Yinshi
    }
  }
</script>

<style scoped lang="less">
  .About {
    width: 100%;
    padding-top: 61px;
    .canvas {
      position: relative;
      width: 100%;
      height: 260px;

      .txt {
        position: absolute;
        left: 50%;
        top: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
        color: #fff;

        h2 {
          font-size: 25px;
          font-weight: normal;
        }
      }
    }
    .about-main {
      box-sizing: border-box;
      width: 100%;
      max-width: 1360px;
      padding: 30px 50px;
      margin: 0 auto;
      .a-m-content{
        width: 100%;
        background-color: #fff;
        article{
          padding: 10px;
          section{
            padding: 20px;
            background: #fff;
            font-size: 1rem;
            code{
              background: rgba(27,31,35,.05);
              padding: .2rem .4rem;
              color: #bd4147;
              border-radius: 4px;
              font-family: Menlo,Monaco,Consolas,Courier New,monospace;
            }
            h1{
              margin-bottom: 1rem;
              padding-left: 1rem;
              border-left: .25rem solid #6bc30d;
              font-weight: 700;
              font-size: 1.5rem;
              line-height: 1.5rem;
            }
            p{
              margin: 1.5rem 0;
              padding-left: 18px;
              line-height: 1.75rem;
            }
            span{
              padding-left: 18px;
            }
            ul{
              padding-left: 18px;
              li{
                line-height: 2rem;
                a{
                  color: #0366d6;
                }
              }
            }
          }
        }
      }
    }
  }
</style>