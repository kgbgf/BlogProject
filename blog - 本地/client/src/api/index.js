
import axios from "axios";

//配置默认的参数
axios.defaults.baseURL = 'http://localhost:2333';//默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; //设置POST请求格式

export default {

  //获取音乐
  getMusic(){
    return axios.get("/music")
  },

  //获取文章信息
  getArticleInfo(){
    return axios.post("/article/getInfo")
  },
  getArticleHot(limit=8){
    return axios.post('/article/getHot',{limit});
  },
  //获取文章列表
  getArticleShow:(function(){
    let skip = 0;
    let limit = 5;

    return function(index=0,ifFresh = false){
      if(ifFresh){
        skip = 0;
        limit = 5;
      }

      let tag = ["","HTML&Css","JavaScript","Node","Vue&React","Anime&Game","Other"][index];

      let data = {skip,limit,tag};
      skip += limit;
      return axios.post('/article/getShow',data);
    }
  })(),
  //获取单篇文章信息
  getArticle(_id){
    return axios.post('/article', {_id});
  },
  //获取延伸阅读
  getArticleExtend(tag){
    return axios.post("/article/extend",{tag});
  },
  //搜索文章
  getArticleSearch(keywords){
    return axios.post("/article/search",{keywords});
  },






  //获取验证码图片
  getRegisterVCode(){
    return axios.post("/register/vcode");
  },
  //验证码的提交验证
  getRegisterCheckVcode(svgCode){
    return axios.post('/register/checkVcode',{svgCode})
  },
  /*
  * 注册接口
  * @parmas
  *   options ：Object，必须，需要 user、pwd、svgCode 三条属性
  * */
  postRegister(options){
    return axios.post("/register",options);
  },







  /*登录的接口*/
  postLogin(options){
    return axios.post('/login',options);
  },
  postIfLogin(){
    return axios.post("/login/ifLogin");
  },
  postLogout(){
    return axios.post("/login/logout");
  },






  /*留言的接口 options => {user:"id", content:""}*/
  commitMessage(options){
    return axios.post("/message/commit",options);
  },
  /*留言的留言接口 options => {parentId:"id",user:"id",content:"",$user:""}*/
  commitChildMessage(options){
    return axios.post('/message/childCommit',options)
  },
  /*获取留言列表 options => */
  getMessageList(skip=0,limit=5){
    return axios.post('/message/getList',{skip,limit});
  }





  /*最近访问接口*/
  ,getVisitor(){
    return axios.post("/visitor");
  }



  /*日记接口*/
  ,getDiary(){
    return axios.get("/diary");
  }

  /*友链接口*/
  ,getLinks(){
    return axios.get("/links");
  }


};
