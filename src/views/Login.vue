<template>
    <div id="login">
        <div class="bg">
            <div class="logo">
                <img src="../assets/images/login/logo.png" alt="">
            </div>
            <div class="ol-form">
                <div class="ol-form-title">欧龙物联网监控平台</div>
                <el-form ref="form" v-model="form" label-width="80px">
                    <el-input prefix-icon="iconfont icon-jurassic_user" v-model="form.username" placeholder="输入登录账号"></el-input>
                    <el-input prefix-icon="iconfont icon-mima" v-model="form.password"  show-password  placeholder="输入登录密码"></el-input>
                    <el-checkbox label="记住登录信息" v-model="form.checked"></el-checkbox>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="company">广州欧龙自动化有限公司</div>
        </div>
    </div>
</template>

<script>
    import md5 from 'js-md5';
    import {login} from "../api/apis";
    export default {
        name: "Login",
        data(){
            return{
                form: {
                    username: '',
                    password: '',
                    checked: true
                }
            }
        },
        mounted(){
            // var bg = window.document.getElementsByClassName('bg')[0].style.backgroundImage = "url()";
            // console.log(bg)
        },
        methods:{
            onSubmit() {
                console.log(this.form);
                let field = {
                    username: this.form.username,
                    password: md5(this.form.password),
                }
                login(field).then(res => {
                    if (res.code == 0){
                        console.log(res.data);
                        this.$store.commit('increment', res.data.mtoken);
                        this.$message({type: 'waring',message: res.msg});
                        setTimeout(() => {
                            this.$router.push('/home')
                        },1000);
                    } else{
                        this.$message({type: 'waring',message: res.msg})
                    }
                })
            }
        }

    }
</script>

<style lang="scss">
    #login{
        .el-input__prefix i{
            color: #c0c4cc !important;
        }
        .bg{
            height: 100vh;
            background:  url("../assets/images/login/bg.png") left no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
        }
        .logo{
            position: fixed;
            top: 40px;
            left: 60px;
            z-index: 2;
            width: 200px;
            img{
                width: 100%;
            }
        }
        .company{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            line-height: 60px;
            font-weight: bold;
            color: #fff;
        }
        .ol-form{
            float: right;
            background: #fff;
            border: 1px solid #fff;
            border-radius: 6px;
            width: 200px;
            padding: 25px 40px;
            margin-top: 260px;
            margin-right: 120px;
            .ol-form-title{
                text-align: center;
                font-weight: bold;
                color: #1799EF;
                line-height: 80px;
            }
            .el-form-item__content{
                margin-left: 0 !important;
            }
            .el-input:first-child{
                margin-bottom: 20px;
            }
            .el-input__inner{
                border: none;
                border-radius: unset;
                border-bottom: 1px solid #ccc;
            }
            .el-button--primary{
                width: 100%;
                margin-top: 20px;
                background: #1799EF;
                padding: 8px 15px;
            }
            .el-checkbox__label{
                color: #666666;
                line-height: 30px;
                font-size: 12px;
            }
        }
    }


</style>