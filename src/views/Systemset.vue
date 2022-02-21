<template>
    <div class="systemset">
        <el-col :span="24">
            <p><strong>系统设置</strong></p>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="系统名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item class="logo" label="logo">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="logo" :src="logo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item class="logo" label="登录背景">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleBgSuccess"
                            :before-upload="beforeBgUpload">
                        <img v-if="background" :src="background" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "Systemset",
        data(){
            return{
                form: {
                    name: '',
                    logo: '',
                    background: ''
                },
                logo: '',
                background: ''
            }
        },
        methods:{
            onSubmit() {
                console.log('submit!');
            },
            handleAvatarSuccess(res, file) {
                this.logo = URL.createObjectURL(file.raw);
            },
            handleBgSuccess(res, file) {
                this.background = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传logo图片大小不能超过 2MB!');
                }
                return  isLt2M;
            },
            beforeBgUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传背景图片大小不能超过 2MB!');
                }
                return  isLt2M;
            }
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
            width: 100%;
            display: block;
        }
    }
}
</style>