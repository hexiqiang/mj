<template>
    <el-aside height="100%"  style="background-color: rgb(238, 241, 246)">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <router-link to="/home">
                <el-menu-item index="0">
                    <i class="iconfont icon-shouye"></i>
                    <span slot="title">系统首页</span>
                </el-menu-item>
            </router-link>
            <el-submenu v-for="(item, index, key) in columns" :index="item.id">

                <template slot="title"><i :class="item.icon"></i><span slot="title">{{item.name}}</span></template>
                <el-menu-item v-for="(l, i) in item.level" :index="item.id + '-' + l.id"  @click="goNavs(l.nav_url, l.name)"><i :class="l.icon"></i>{{l.name}}</el-menu-item>
                <!--<el-menu-item :index="2-2" @click="goNavs('/monitoringdata', '监控视图管理')"><i class="iconfont icon-frequency"></i>监控视图管理</el-menu-item>-->
                <!--<el-menu-item :index="2-3" @click="goNavs('/called', '报警管理')"><i class="iconfont icon-gbaojings"></i>报警管理</el-menu-item>-->
                <!--<el-menu-item :index="2-4" @click="goNavs('/joint', '联控管理')"><i class="iconfont icon-guanlian"></i>联控管理</el-menu-item>-->
            </el-submenu>
            <!--<el-submenu index="3">-->
                <!--<template slot="title"><i class="iconfont icon-shipinjiankong"></i><span slot="title">监控工作台</span></template>-->
                <!--<el-menu-item index="3-1"  @click="goNavs('/monitoringview', '监控视图')"><i class="iconfont icon-guanli"></i>监控视图</el-menu-item>-->
                <!--<el-menu-item index="3-2" @click="goNavs('/curve', '曲线报表')"><i class="iconfont icon-frequency"></i>曲线报表</el-menu-item>-->
                <!--<el-menu-item index="3-3" @click="goNavs('/historys', '历史记录')"><i class="el-icon-time"></i>历史记录</el-menu-item>-->
                <!--<el-menu-item index="3-4" @click="goNavs('/gatewayonline', '网关在线状态')"><i class="iconfont icon-wangguan"></i>网关在线状态</el-menu-item>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="4">-->
                <!--<template slot="title"><i class="el-icon-setting"></i><span slot="title">设置</span></template>-->
                <!--<el-menu-item index="4-1" @click="goNavs('/user', '用户管理')"><i class="iconfont icon-xitongguanli_yonghuguanli"></i>用户管理</el-menu-item>-->
                <!--<el-menu-item index="4-2" @click="goNavs('/message', '消息管理')"><i class="iconfont icon-xinxi"></i>消息管理</el-menu-item>-->
                <!--<el-menu-item index="4-3" @click="goNavs('/apiset', 'API接口设置')"><i class="iconfont icon-APIjieru"></i>API接口设置</el-menu-item>-->
                <!--<el-menu-item index="4-4" @click="goNavs('/system', '系统设置')"><i class="iconfont icon-xitongshezhi"></i>系统设置</el-menu-item>-->
            <!--</el-submenu>-->
        </el-menu>
    </el-aside>
</template>

<script>
    import {getNavs} from '../api/apis';
    export default {
        data(){
            return{
                disable: true,
                tabNav: [],
                navs: JSON.parse(sessionStorage.getItem('navs')) ? JSON.parse(sessionStorage.getItem('navs')) : [{path: '/home', name: '首页'}],
                columns: []
            }
        },
        props:['isCollapse'],
        methods:{
            handleOpen(key, keyPath) {
                this.$emit('openfn',key, keyPath);
            },
            handleClose(key, keyPath) {
                this.$emit('closefn',key, keyPath);
            },
            goNavs(path,name){
                this.$emit('fun',this.navs)
                this.$router.push(path)
                let showNavs = this.navs;
                let _nav = {path: path, name: name};
                var res = showNavs.some(item=>{
                    if(item.name==_nav.name){
                        return true
                    }
                });
                console.log(res) // 如果arr数组对象中含有name:'张三',就会返回true，否则返回false
                if(!res){ // 如果存在
                         // do something
                    this.navs.push(_nav);
                    sessionStorage.setItem('navs',JSON.stringify(this.navs));
                }

            },
        },
        mounted(){
            getNavs().then(data => {
                if (data.code == 0){
                    this.columns = data.data
                }
            });
        },
    }
</script>
<style>

</style>