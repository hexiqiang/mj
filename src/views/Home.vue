<template>
    <div class="home">
        <HomeHeader :indexTop="indexTop"  v-if="indexTop.length !== 0"/>
        <HomeMidden :indexData="indexData" v-if="indexData.length !== 0"/>
        <div class="chart">
            <el-col :span="24">
                <div class="chart-box">
                    <p><strong>报警记录</strong> <span @click="getTotalCall(6)"><small>最近7天</small></span>|<span @click="getTotalCall(29)"><small>最近30天</small></span>|<span><small>全部</small></span>
                        <el-button type="primary" icon="iconfont icon-tubiao-zhexiantu" size="mini"></el-button>
                        <el-button type="primary" size="mini" @click="">更多</el-button>
                    </p>
                    <ve-line height="300px" :data="chartData" :title="{text: '记录（条数）'}"
                             :legend="{left: '20%'}"></ve-line>
                </div>
                <div class="chart-box">
                    <p><strong>控制记录</strong> <span @click="getTotalControl(6)"><small>最近7天</small></span>|<span @click="getTotalControl(29)"><small>最近30天</small></span>|<span><small>全部</small></span>
                        <el-button type="primary" icon="iconfont icon-tubiao-zhexiantu" size="mini"></el-button>
                        <el-button type="primary" size="mini" @click="">更多</el-button></p>
                    <ve-line height="300px" :data="chartData1" :title="{text: '记录（条数）'}"
                             :legend="{left: '20%'}"></ve-line>
                </div>
                <div class="chart-box">
                    <p><strong>联控记录</strong> <span @click="getTotalJoin(6)"><small>最近7天</small></span>|<span @click="getTotalJoin(29)"><small>最近30天</small></span>|<span><small>全部</small></span>
                        <el-button type="primary" icon="iconfont icon-tubiao-zhexiantu" size="mini"></el-button>
                        <el-button type="primary" size="mini" @click="">更多</el-button></p>
                    <ve-line height="300px" :data="chartData2" :title="{text: '记录（条数）'}"
                             :legend="{left: '20%'}"></ve-line>
                </div>
                <div class="chart-box">
                    <p><strong>用户反馈</strong> <span><small>最近7天</small></span>|<span><small>最近30天</small></span>|<span><small>全部</small></span>
                        <el-button type="primary" icon="iconfont icon-tubiao-zhexiantu" size="mini"></el-button>
                        <el-button type="primary" size="mini" @click="">更多</el-button></p>
                    <ve-line height="300px" :data="chartData1" :title="{text: '记录（条数）'}"
                             :legend="{left: '20%'}"></ve-line>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import { index, totalcall , totalcontrol , totaljoin } from "../api/apis";
    import HomeHeader from "@/components/HomeHeader"
    import HomeMidden from "@/components/HomeMidden"
    import "echarts/lib/component/title";
    export default {
        name: 'Home',
        data() {
            return {
                indexData: {
                    message:[]
                },
                indexTop: {
                    porject: {},
                    gateway: {},
                    callrecord: {},
                    controlrecord: {},
                    joinrecord: {},
                },
                chartData: {
                    columns: ['日期', '条数'],
                    rows: []
                },
                chartData1: {
                    columns: ['日期', '条数'],
                    rows: []
                },
                chartData2: {
                    columns: ['日期', '条数'],
                    rows: []
                }
            }
        },
        components: {
            HomeHeader,
            HomeMidden
        },
        methods: {
            getIndex(){
                index().then(res => {
                    if (res.code == 0){
                        this.indexData.message = res.data.message;
                        this.indexTop.porject = res.data.project;
                        this.indexTop.gateway = res.data.gateway;
                        this.indexTop.callrecord = res.data.callrecord;
                        this.indexTop.controlrecord = res.data.controlrecord;
                        this.indexTop.joinrecord = res.data.joinrecord;
                    } else{
                        this.$message('服务器忙，请等待！');
                    }
                })
            },
            getTotalCall(date){
                totalcall({day: date}).then(res => {
                    if (res.code == 0){
                        this.chartData.rows = res.data
                    }
                })
            },
            getTotalJoin(date){
                totaljoin({day: date}).then(res => {
                    if (res.code == 0){
                        this.chartData2.rows = res.data
                    }
                })
            },
            getTotalControl(date){
                totalcontrol({day: date}).then(res => {
                    if (res.code == 0){
                        this.chartData1.rows = res.data
                    }
                })
            }
        },
        created(){
            this.getIndex();
        },
        mounted() {
            this.getTotalCall(6);
            this.getTotalJoin(6);
            this.getTotalControl(6);
            console.log(this.$store.state.token)
        }
    }
</script>
<style lang="scss">
    @import "../assets/css/home";

    .chart {
        width: 95%;
        overflow: hidden;
        margin: 10px auto;

        .el-col-24 {
            background: unset !important;
            padding: 0 !important;

            .chart-box {
                position: relative;
                background: white;
                float: left;
                width: 49.5%;
                margin-top: 15px;

                p {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    z-index: 100;
                    margin: 4px 10px;
                    float: right;

                    span {
                        display: inline-block;
                        margin: 0 10px;
                    }
                }
            }

            .chart-box:nth-child(2), .chart-box:nth-child(4) {
                margin-left: 1%;
            }
        }

        .el-button--mini {
            padding: 2px 15px;
            line-height: 16px;
            font-size: 14px;
        }
    }
</style>