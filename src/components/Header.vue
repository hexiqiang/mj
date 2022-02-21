<template>
    <el-header style="text-align: right; font-size: 12px">
        <span class="ol-title"><i :class="isCollapse? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="openNav(isCollapse)"></i>欧龙物联网监控系统</span>
        <i class="iconfont icon-yonghuming-mianxing" style="margin-right: 15px"></i>
        <span>
        <el-dropdown  @command="loginOut">
          <span class="el-dropdown-link">
            王小虎<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item icon="el-icon-setting" command="seting">设置</el-dropdown-item>
            <el-dropdown-item icon="iconfont icon-weibiaoti--" command="out">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </span>
    </el-header>
</template>

<script>
    export default {
        name: "Header",
        props:['isCollapse'],
        methods:{
            openNav(isopen){
                this.$emit('openNav', isopen)
            },
            loginOut(command){
                this.$emit('loginOut', command)
            }
        }
    }
</script>

<style scoped>

</style>