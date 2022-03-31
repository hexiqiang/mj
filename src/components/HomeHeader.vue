<template>
    <div class="home-header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple-dark green">
                    <el-col :span="8">
                        <div class="my-icon"><i class="iconfont icon-gongcheng-"></i></div>
                        <div class="my-title">工程概览</div>
                    </el-col>
                    <el-col :span="16">
                        <div class="mj-top"><strong>{{indexTop.porject.online}}</strong>
                            <small>在线</small>
                        </div>
                        <div class="mj-top"><strong>{{indexTop.porject.count}}</strong>
                            <small>总工程</small>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-dark blue">
                    <el-col :span="8">
                        <div class="my-icon"><i class="iconfont icon-wangguan"></i></div>
                        <div class="my-title">网关概览</div>
                    </el-col>
                    <el-col :span="16">
                        <div class="mj-top"><strong>{{indexTop.gateway.online}}</strong>
                            <small>在线</small>
                        </div>
                        <div class="mj-top"><strong>{{indexTop.gateway.count}}</strong>
                            <small>总网关</small>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-dark red">
                    <el-col :span="8">
                        <div class="my-icon"><i class="iconfont icon-alarm-full"></i></div>
                        <div class="my-title">报警记录</div>
                    </el-col>
                    <el-col :span="16">
                        <div class="mj-top"><strong>{{indexTop.callrecord.day3}}</strong>
                            <small>最近3天(条)</small>
                        </div>
                        <div class="mj-top"><strong>{{indexTop.callrecord.day30}}</strong>
                            <small>最近30天(条)</small>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-dark purple">
                    <el-col :span="8">
                        <div class="my-icon"><i class="iconfont icon-kongzhi"></i></div>
                        <div class="my-title">控制记录</div>
                    </el-col>
                    <el-col :span="16">
                        <div class="mj-top"><strong>{{indexTop.controlrecord.day3}}</strong>
                            <small>最近3天(条)</small>
                        </div>
                        <div class="mj-top"><strong>{{indexTop.controlrecord.day30}}</strong>
                            <small>最近30天(条)</small>
                        </div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-dark orange">
                    <el-col :span="8">
                        <div class="my-icon"><i class="iconfont icon-guanlian"></i></div>
                        <div class="my-title">联控记录</div>
                    </el-col>
                    <el-col :span="16">
                        <div class="mj-top"><strong>{{indexTop.joinrecord.day3}}</strong>
                            <small>最近3天(条)</small>
                        </div>
                        <div class="mj-top"><strong>{{indexTop.joinrecord.day30}}</strong>
                            <small>最近30天(条)</small>
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "HomeHeader",
        props:['indexTop'],
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .mj-top{
        margin: 0 !important;
        line-height: 40px;
    }
    .mj-top strong{
        margin-top: 5px !important;
        font-size: 30px !important;
        width: 40% !important;
        text-align: center !important;
        text-indent: 0 !important;
    }
    .mj-top small{
        width: 50% !important   ;
        margin-top: 5px !important;
        font-size: 16px !important;
    }
</style>