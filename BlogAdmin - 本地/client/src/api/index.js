import axios from 'axios'

//配置默认的参数
axios.defaults.baseURL = 'http://localhost:3001';//默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; //设置POST请求格式


export default {
  //发表文章
  postArticle({type,title,content,tag,surface,pic}){
    return axios.post("/article/add",{type,title,content,tag,surface,pic});
  },

  //请求文章
  getArticle(skip=0,limit=5){
    return axios.get("/article/get"+`?skip=${skip}&limit=${limit}`);
  },

  //请求文章信息
  getArticleInfo(){
    return axios.get("/article/getInfo");
  },

  //删除文章
  deleteArticle(id){
    if(!id){
      return Promise.reject();
    }
    return axios.post("/article/delete",{id});
  },

  //更新文章
  updateArticle(id,options){
    return axios.post("/article/update",{id,options});
  },


  //获取用户列表
  getUserList(){
    return axios.get("/user/get");
  },

  //删除用户
  deleteUser(_id){
    return axios.post("/user/delete",{_id});
  },

  //用户权限更新
  updateUser(_id,disabled,admin){
    return axios.post("/user/update",{_id,disabled,admin});
  },

  //获取留言
  getMessage(){
    return axios.get("/message/get");
  },

  //删除留言
  deleteMessage(_id){
    return axios.post("/message/delete",{_id});
  },


  //发表日记
  postDiary(txt,img){
    return axios.post("/diary/submit",{txt,img});
  },

  //获取日记
  getDiary(){
    return axios.get("/diary/get");
  },

  //删除日记
  deleteDiary(_id){
    return axios.post("/diary/delete",{_id});
  },


  //获取友链
  getLinks(){
    return axios.get("/links/get");
  },

  //添加友链
  postLinks(options){
    return axios.post("/links/add",options);
  },

  //删除友链
  deleteLinks(_id){
    return axios.post("/links/delete",{_id});
  },

  //登录接口
  login(options){
    return axios.post("/login",options);
  },

  //登录验证
  ifLogin(){
    return axios.post("/login/ifLogin");
  },


  //获取音乐
  getMusic(){
    return axios.get("/music/get")
  },

  //添加音乐
  addMusic(songId){
    return axios.post("/music/add",{songId})
  },

  //删除音乐
  deleteMusic(_id){
    return axios.post("/music/delete",{_id})
  }


}