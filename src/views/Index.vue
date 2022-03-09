<template>
    <div class="home">
        <!--头部部分-->
        <Header @openNav="openNav" @loginOut="loginOut" :isCollapse="isCollapse"/>
        <el-container style="height: 93.8vh;">
            <!--加载左侧菜单栏-->
            <Left :isCollapse="isCollapse" @openfn="openFn" @closefn="closeFn" @fun="getNavs"/>
            <el-container>
                <el-main>
                    <el-row>
                        <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                                <el-tag size="mini">
                                    <router-link to="/home">首页</router-link>
                                </el-tag>
                                <el-tag v-for="(item, index) in navs"
                                        :key="index"
                                        size="mini"
                                        :type="index == navsIndex ? '' : 'info'"
                                        @click="selectTag(index)"
                                        :closable="disable"
                                        @close="cl(index)">
                                    <router-link :to="item.path">{{item.name}}</router-link>
                                </el-tag>
                            </div>
                        </el-col>
                    </el-row>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {checklogin} from "../api/apis";
    // @ is an alias to /src
    import Left from '@/components/Left'
    import Header from '@/components/Header'
    export default {
        name: 'Home',
        data() {
            const navsIndex = sessionStorage.getItem('navs') ? JSON.parse(sessionStorage.getItem('navs')).length - 1 : 0;
            return {
                isCollapse: false,
                disable: true,
                type: 'info',
                navs: JSON.parse(sessionStorage.getItem('navs')) ? JSON.parse(sessionStorage.getItem('navs')) : [],
                navsIndex: navsIndex
            }
        },
        components:{
            Left,
            Header
        },
        methods: {
            loginOut(command){
                console.log(command)
                switch (command) {
                    case 'setting':
                        break;
                    case 'out':
                        sessionStorage.setItem('mtoken',null);
                        this.$router.push({path: '/login'})
                }
            },
            openFn(key, keyPath) {
                console.log(key, keyPath);
            },
            closeFn(key, keyPath) {
                console.log(key, keyPath);
            },
            openNav(isopen){
                if (isopen){
                    this.isCollapse = false
                }else{
                    this.isCollapse = true
                }
            },
            getNavs(data){
                // console.log(data)
                this.navs = data;
            },
            selectTag(index){
                console.log(index)
            },
            cl(index){
                this.navs.splice(index, 1);
                if (index - 1 >= 0){
                    // console.log(index,222222)
                    this.navsIndex = index-1
                    var url = this.navs[index - 1].path;
                    this.$router.push(url)
                }else{
                    // console.log(index, 111111)
                    this.navsIndex = 1;
                    var url = this.navs[0].path;
                    this.$router.push(url)
                }
            },
            // checkLogin(){
            //     let _this = this;
            //     checklogin({token:sessionStorage.getItem('mtoken'),mid:sessionStorage.getItem('mid')}).then(res => {
            //         if (res.code == 0) {
            //             this.$router.push('/login')
            //         }
            //     })
            // },
        },
        mounted() {

        }
    }
</script>
<style lang="scss">
@import "../assets/css/index";
.home{
    .el-main{
        position: relative;
        a{
            text-decoration: none;
            color: #3CB1FF;
        }
    }
}

</style>