<template>
    <div class="home">
        <!--头部部分-->
        <Header @openNav="openNav" @loginOut="loginOut" :isCollapse="isCollapse"/>
        <el-container style="height: 93.8vh;">
            <!--加载左侧菜单栏-->
            <Left :isCollapse="isCollapse" @openfn="openFn" @closefn="closeFn"/>
            <el-container>
                <el-main>
                    <el-row>
                        <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                                <el-tag v-for="(item, index) in navs" :key="index" closable size="mini" type="info">
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
    // @ is an alias to /src
    import Left from '@/components/Left'
    import Header from '@/components/Header'
    export default {
        name: 'Home',
        data() {
            return {
                isCollapse: false,
                navs: JSON.parse(sessionStorage.getItem('navs'))
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
        },
        mounted() {
            console.log(this.navs)
        },
        computed:{
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