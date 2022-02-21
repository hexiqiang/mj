<template>
    <div class="home">
        <HomeHeader/>
        <HomeMidden/>
        <div class="chart">
            <el-col :span="24">
                <div class="chart-box">
                    <p><strong>报警记录</strong> <span><small>最近7天</small></span>|<span><small>最近30天</small></span>|<span><small>全部</small></span>
                        <el-button type="primary" icon="iconfont icon-tubiao-zhexiantu" size="mini"></el-button>
                        <el-button type="primary" size="mini" @click="">更多</el-button>
                    </p>
                    <ve-line height="300px" :data="chartData" :title="{text: '记录（条数）'}"
                             :legend="{left: '20%'}"></ve-line>
                </div>
                <div class="chart-box">
                    <p><strong>控制记录</strong> <span><small>最近7天</small></span>|<span><small>最近30天</small></span>|<span><small>全部</small></span>
                        <el-button type="primary" icon="iconfont icon-tubiao-zhexiantu" size="mini"></el-button>
                        <el-button type="primary" size="mini" @click="">更多</el-button></p>
                    <ve-line height="300px" :data="chartData1" :title="{text: '记录（条数）'}"
                             :legend="{left: '20%'}"></ve-line>
                </div>
                <div class="chart-box">
                    <p><strong>联控记录</strong> <span><small>最近7天</small></span>|<span><small>最近30天</small></span>|<span><small>全部</small></span>
                        <el-button type="primary" icon="iconfont icon-tubiao-zhexiantu" size="mini"></el-button>
                        <el-button type="primary" size="mini" @click="">更多</el-button></p>
                    <ve-line height="300px" :data="chartData1" :title="{text: '记录（条数）'}"
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
    import HomeHeader from "@/components/HomeHeader"
    import HomeMidden from "@/components/HomeMidden"
    import "echarts/lib/component/title";

    export default {
        name: 'Home',
        data() {
            return {
                chartData: {
                    columns: ['日期', '条数'],
                    rows: [
                        {'日期': '2022-02-01', '条数': 123},
                        {'日期': '2022-02-02', '条数': 152},
                        {'日期': '2022-02-03', '条数': 167},
                        {'日期': '2022-02-04', '条数': 254},
                        {'日期': '2022-02-05', '条数': 289},
                        {'日期': '2022-02-06', '条数': 167},
                        {'日期': '2022-02-07', '条数': 95},
                        {'日期': '2022-02-08', '条数': 267},
                        {'日期': '2022-02-09', '条数': 54},
                        {'日期': '2022-02-10', '条数': 23},
                        {'日期': '2022-02-11', '条数': 78},
                        {'日期': '2022-02-12', '条数': 12},
                        {'日期': '2022-02-13', '条数': 99},
                        {'日期': '2022-02-14', '条数': 107},
                        {'日期': '2022-02-15', '条数': 107},
                        {'日期': '2022-02-16', '条数': 107},
                        {'日期': '2022-02-17', '条数': 107}
                    ]
                },
                chartData1: {
                    columns: ['日期', '条数'],
                    rows: [
                        {'日期': '2022-02-01', '条数': 123},
                        {'日期': '2022-02-02', '条数': 152},
                        {'日期': '2022-02-03', '条数': 167},
                        {'日期': '2022-02-04', '条数': 254},
                        {'日期': '2022-02-05', '条数': 289},
                        {'日期': '2022-02-06', '条数': 167},
                        {'日期': '2022-02-07', '条数': 95},
                        {'日期': '2022-02-08', '条数': 267},
                        {'日期': '2022-02-09', '条数': 54},
                        {'日期': '2022-02-10', '条数': 23},
                        {'日期': '2022-02-11', '条数': 78},
                        {'日期': '2022-02-12', '条数': 12},
                        {'日期': '2022-02-13', '条数': 99},
                        {'日期': '2022-02-14', '条数': 107}
                    ]
                }
            }
        },
        components: {
            HomeHeader,
            HomeMidden
        },
        methods: {}
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