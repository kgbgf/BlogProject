<template>
    <div class="wrap">
        <div class="login">
            <p>Ene的后台管理系统</p>
            <br><br><br>
            <el-form
                        ref="form"
                        :model="form"
                        label-width="70px"
                        :rules="rules"
                >
                    <el-form-item label="用户名" prop="user">
                        <el-input v-model="form.user"></el-input>
                    </el-form-item>
                <br>
                    <el-form-item label="密码" prop="pwd">
                        <el-input v-model="form.pwd" show-password></el-input>
                    </el-form-item>
                </el-form>
                <br>
            <div class="btn">
                <el-button type="primary" @click="handleClick" :disabled="submitDisabled">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import request from "../../api/index";
    let login = request.login;
    let ifLogin = request.ifLogin;

    export default {
        name: "index",

        data(){
            return {
                //表单数据
                form :{
                    user : "",
                    pwd : ""
                },
                //表单验证
                rules:{
                    //用户名验证
                    user : [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        {
                            //数据类型
                            type:"string",
                            //正则规则
                            pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,
                            message: '请输入正确格式用户名',
                            trigger: ['blur','change']
                        }
                    ],

                    //密码验证
                    pwd : {
                        type:"string",
                        validator : (rule,value,cb)=>{
                            if (value){
                                //验证密码是否符合规则
                                if (/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)){
                                    cb();
                                }else{
                                    cb(new Error("请输入正确格式密码"));
                                }
                            }else{
                                cb(new Error("请输入密码"));
                            }

                            //在这里还需要触发确认密码的验证
                            this.form.checkPwd && this.$refs.form.validateField("checkPwd");
                        },
                        required: true,
                        trigger: ['blur','change']
                    }
                },

                //登录过程禁用
                submitDisabled : false
            }
        },

        methods:{
            handleClick(){
                this.submitDisabled = true;//禁用点击

                //验证数据
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        console.log(this.form.user);
                        console.log(this.form.pwd);
                        //验证都通过
                        login(this.form)
                            .then(res=>{
                                if (res.data.code) {
                                    //登陆失败
                                    this.submitDisabled = false;
                                    this.$message({
                                        message : res.data.msg,
                                        type : "error",
                                        duration : 2000
                                    });
                                }else{
                                    //登陆成功
                                    this.submitDisabled = false;
                                    this.$router.push("/admin");
                                }
                            })
                            .catch(()=>{
                                this.submitDisabled = false;
                                this.$message({
                                    message : "登陆失败，请稍后再试",
                                    type : "error",
                                    duration : 2000
                                });
                            });
                    } else {
                        //验证没通过
                        this.submitDisabled = false;
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">

    .wrap{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background: url("../../assets/img/bg.png");
        background-size: cover;

        .login{
            margin: 200px auto;
            padding: 30px;
            padding-right: 50px;
            width: 500px;
            height: 300px;
            background: rgba(255,255,255,.5);
            border-radius: 30px;
            border: 3px solid black;
            color: white;


            p{
                font-size: 30px;
                color: #675450;
                font-weight: bolder;
                text-align: center;
            }

            .btn{
                text-align: center;
            }
        }
    }
</style>