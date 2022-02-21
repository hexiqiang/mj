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
                        <div class="mj-top"><strong>17</strong>
                            <small>在线</small>
                        </div>
                        <div class="mj-top"><strong>17</strong>
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
                        <div class="mj-top"><strong>86</strong>
                            <small>在线</small>
                        </div>
                        <div class="mj-top"><strong>147</strong>
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
                        <div class="mj-top"><strong>17</strong>
                            <small>最近3天（条）</small>
                        </div>
                        <div class="mj-top"><strong>17</strong>
                            <small>最近30天（条）</small>
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
                        <div class="mj-top"><strong>218</strong>
                            <small>最近3天（条）</small>
                        </div>
                        <div class="mj-top"><strong>1239</strong>
                            <small>最近30天（条）</small>
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
                        <div class="mj-top"><strong>71</strong>
                            <small>最近3天（条）</small>
                        </div>
                        <div class="mj-top"><strong>171</strong>
                            <small>最近30天（条）</small>
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "HomeHeader"
    }
</script>

<style scoped>

</style>