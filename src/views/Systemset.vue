<template>
    <div class="systemset">
        <el-col :span="24"  class="content-box">
            <p><strong>系统设置</strong></p>
            <template v-if="member == 'admin'">
                <el-form id="form1" ref="form" :model="form" label-width="80px">
                    <el-form-item label="系统名称">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="mqIP">
                        <el-input v-model="form.mqhost"></el-input>
                    </el-form-item>
                    <el-form-item label="mq端口">
                        <el-input v-model="form.mqport"></el-input>
                    </el-form-item>
                    <el-form-item class="logo" label="logo">
                        <input id="logo" type="file" name="logo" style="display: none">
                        <img v-if="form.logo" :src="form.logo" @click="saveFile('logo')" class="avatar">
                        <i v-else @click="saveFile('logo')" class="el-icon-plus avatar-uploader-icon"></i>
                    </el-form-item>
                    <el-form-item class="logo" label="登录背景">
                        <input id="bg" type="file" name="bg"  style="display: none">
                        <img v-if="form.background" :src="form.background" @click="saveFile('bg')" class="avatar">
                        <i v-else @click="saveFile('bg')" class="el-icon-plus avatar-uploader-icon"></i>
                    </el-form-item>
                    <el-form-item  label="顶部颜色">
                        <el-color-picker v-model="form.topcolor" @change="colorChange('top',$event)"></el-color-picker>
                    </el-form-item>
                    <el-form-item  label="左侧颜色">
                        <el-color-picker v-model="form.leftcolor" @change="colorChange('left',$event)"></el-color-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <el-button type="primary" @click="onMonitor">启动消息监听</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-col>
    </div>
</template>

<script>
    import {
        addSetting
        , upFile
        , settingsys
        ,editSetting
        ,Monitor
        ,MonitorReadRedis
    } from "../api/apis";
    import qs from 'qs'
    export default {
        name: "Systemset",
        data(){
            return{
                form: {
                    title: '',
                    mqhost: '',
                    mqport: '',
                    logo: '',
                    background: '',
                    topcolor: '#242F42',
                    leftcolor: '#324157'
                },
                logo: '',
                background: '',
                color1: '#242F42',
                color2: '#324157',
                member: sessionStorage.getItem('username')
            }
        },
        methods:{
            onSubmit() {
                if (this.form.id){
                    editSetting(this.form).then(res => {
                        console.log(res.data);
                        if (res.code == 0){
                            this.$message(res.msg)
                        } else{
                            this.$message(res.msg)
                        }
                    })
                } else{
                    addSetting(this.form).then(res => {
                        console.log(res.data);
                        if (res.code == 0){
                            this.$message(res.msg)
                        } else{
                            this.$message(res.msg)
                        }
                    })
                }
            },
            saveFile(id){
                let _this = this
                let files = window.document.getElementById(id);
                files.click()
                files.addEventListener('change', function(event) {
                    let forms = window.document.getElementById('form1');
                    let formData = new FormData(forms);
                    let file1 = document.querySelector('[id='+ id + ']');
                    upFile(formData).then(res => {
                        if (res.code == 0){
                            if (id == 'logo'){
                                _this.form.logo = res.data;
                                _this.$forceUpdate();
                            }
                            if (id == 'bg'){
                                _this.form.background = res.data;
                                _this.$forceUpdate();
                            }
                        }
                    })
                });
            },
            colorChange(type, val){
                if (type == 'top'){
                    this.color1 = val;
                    this.changeBg(type, this.color1)
                }
                if (type == 'left') {
                    this.color2 = val;
                    this.changeBg(type,this.color2)
                }

            },
            changeBg(type, val){
                if (type == 'top'){
                    var bg = window.document.getElementsByClassName('el-header')[0].style.background = val;
                }
                if (type == 'left') {
                    var menu = window.document.getElementsByClassName('el-menu-vertical-demo el-menu')[0].style.background = val;
                    var menus = window.document.getElementsByClassName('el-menu');
                    var len = menus.length;
                    for (let i = 0; i < len; i++){
                        window.document.getElementsByClassName('el-menu')[i].style.background = val
                    }
                }
            },
            onMonitor(){
                fetch("http://yii.cc/mq/subscribe/index");
                fetch("http://yii.cc/mq/subscribe/readredis");
            }
        },
        mounted() {
            settingsys().then(res => {
                if (res.code == 0){
                    this.form = res.data;
                    if (this.form.topcolor){
                        window.document.getElementsByClassName('el-header')[0].style.background = this.form.topcolor
                    }
                    if (this.form.leftcolor){
                        window.document.getElementsByClassName('el-menu-vertical-demo el-menu')[0].style.background = this.form.leftcolor;
                        let menus = window.document.getElementsByClassName('el-menu');
                        let len = menus.length;
                        for (let i = 0; i < len; i++){
                            window.document.getElementsByClassName('el-menu')[i].style.background = this.form.leftcolor
                        }
                    }

                }
            });
        }
    }
</script>

<style lang="scss">
.systemset{
    overflow: hidden;
    padding: 10px;
    .logo{
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
        }
        .avatar {
            height: 80px;
            width: 200px;
            display: block;
        }
    }
}
</style>