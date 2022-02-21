<template>
    <el-aside height="100%"  style="background-color: rgb(238, 241, 246)">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <router-link to="/home">
                <el-menu-item index="1">
                    <i class="iconfont icon-shouye"></i>
                    <span slot="title">系统首页</span>
                </el-menu-item>
            </router-link>
            <el-submenu index="2">
                <template slot="title"><i class="iconfont icon-a-gongchengmaogongchengshianquanmaoanquantoukui"></i><span slot="title">工程管理</span></template>
                <router-link to="/engin"><el-menu-item index="2-1"><i class="iconfont icon-guanli"></i>工程管理</el-menu-item></router-link>
                <router-link to="/monitoringdata"><el-menu-item index="2-2"><i class="iconfont icon-frequency"></i>监控视图管理</el-menu-item></router-link>
                <router-link to="/called"><el-menu-item index="2-3"><i class="iconfont icon-gbaojings"></i>报警管理</el-menu-item></router-link>
                <router-link to="/joint"><el-menu-item index="2-4"><i class="iconfont icon-guanlian"></i>联控管理</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="iconfont icon-shipinjiankong"></i><span slot="title">监控工作台</span></template>
                <router-link to="/monitoringview"><el-menu-item index="3-1"><i class="iconfont icon-guanli"></i>监控视图</el-menu-item></router-link>
                <router-link to="/curve"><el-menu-item index="3-2"><i class="iconfont icon-frequency"></i>曲线报表</el-menu-item></router-link>
                <router-link to="/historys"><el-menu-item index="3-2"><i class="el-icon-time"></i>历史记录</el-menu-item></router-link>
                <!--<router-link to="/calldata"><el-menu-item index="3-3"><i class="iconfont icon-baojingjilu"></i>报警记录</el-menu-item></router-link>-->
                <!--<router-link to="/controldata"><el-menu-item index="3-4"><i class="iconfont icon-kongzhi"></i>控制记录</el-menu-item></router-link>-->
                <!--<router-link to="/joindata"><el-menu-item index="3-5"><i class="iconfont icon-guanlian"></i>联控记录</el-menu-item></router-link>-->
                <router-link to="/gatewayonline"><el-menu-item index="3-6"><i class="iconfont icon-wangguan"></i>网关在线状态</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-setting"></i><span slot="title">设置</span></template>
                <router-link to="/user"><el-menu-item index="4-1"><i class="iconfont icon-xitongguanli_yonghuguanli"></i>用户管理</el-menu-item></router-link>
                <router-link to="/message"><el-menu-item index="4-2"><i class="iconfont icon-xinxi"></i>消息管理</el-menu-item></router-link>
                <router-link to="/apiset"><el-menu-item index="4-3"><i class="iconfont icon-APIjieru"></i>API接口设置</el-menu-item></router-link>
                <router-link to="/system"><el-menu-item index="4-4"><i class="iconfont icon-xitongshezhi"></i>系统设置</el-menu-item></router-link>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        data(){
            return{
                disable: true
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

        }
    }
</script>
<style>

</style>