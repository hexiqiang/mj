<template>
    <!--监控视图-->
    <div id="mon" class="mon">
        <div>
            <div class="right-nav-box" v-if="showNavBox">
                <div><i class="iconfont icon-zhichiduozhongshujuleixing"></i></div>
                <div><i class="iconfont icon-shujubiaozhunhua"></i></div>
                <div><i class="iconfont icon-a-quxiantushuju"></i></div>
                <div><i class="iconfont icon-wenjian"></i></div>
                <div><i class="iconfont icon-jiankong"></i></div>
                <div><i class="iconfont icon-duliang"></i></div>
                <div><i class="iconfont icon-ditu"></i></div>
                <div><i class="iconfont icon-beizhu"></i></div>
                <div class="save-data"><span>保存</span></div>
                <div @click="goback"><i class="iconfont icon-fanhui fanhui"></i></div>
                <span class="cl-show-box" @click="showNav(showNavBox)"><i class="el-icon-arrow-right"></i></span>
            </div>
            <span class="cl-show-box-1" @click="showNav(!showNavBox)"><i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="hidden-scroll"></div>
        <el-col :span="24" class="mov-view">
            <el-col :span="24" class="mov-right">
                <el-col :span="24" class="box-border">
                    <p><i class="iconfont icon-sanjiao3"></i>工程名称</p>
                    <el-col :span="24">
                        <div class="project-box">
                            <el-col :span="4">
                                <i class="iconfont icon-yewei"></i>
                            </el-col>
                            <el-col :span="20">
                                <el-col :span="24">
                                    <el-col :span="12">1#水池液位</el-col>
                                    <el-col :span="12">2022-02-11 15：25</el-col>
                                </el-col>
                                <el-col :sapn="24">
                                    <el-col :span="12">当前值：0.04米</el-col>
                                    <el-col :span="12">
                                        <el-button size="mini" type="primary" @click="showView = true">趋势图</el-button>
                                    </el-col>
                                </el-col>
                            </el-col>
                        </div>
                        <div class="project-box">
                            <el-col :span="4">
                                <i class="iconfont icon-yewei"></i>
                            </el-col>
                            <el-col :span="20">
                                <el-col :span="24">
                                    <el-col :span="12">1#水池液位</el-col>
                                    <el-col :span="12">2022-02-11 15：25</el-col>
                                </el-col>
                                <el-col :sapn="24">
                                    <el-col :span="12">当前值：0.04米</el-col>
                                    <el-col :span="12">
                                        <el-button size="mini" type="primary">趋势图</el-button>
                                    </el-col>
                                </el-col>
                            </el-col>
                        </div>
                        <div class="project-box">
                            <el-col :span="4">
                                <i class="iconfont icon-yewei"></i>
                            </el-col>
                            <el-col :span="20">
                                <el-col :span="24">
                                    <el-col :span="12">1#水池液位</el-col>
                                    <el-col :span="12">2022-02-11 15：25</el-col>
                                </el-col>
                                <el-col :sapn="24">
                                    <el-col :span="12">当前值：0.04米</el-col>
                                    <el-col :span="12">
                                        <el-button size="mini" type="primary">趋势图</el-button>
                                    </el-col>
                                </el-col>
                            </el-col>
                        </div>
                        <div class="project-box">
                            <el-col :span="4">
                                <i class="iconfont icon-yewei"></i>
                            </el-col>
                            <el-col :span="20">
                                <el-col :span="24">
                                    <el-col :span="12">1#水池液位</el-col>
                                    <el-col :span="12">2022-02-11 15：25</el-col>
                                </el-col>
                                <el-col :sapn="24">
                                    <el-col :span="12">当前值：0.04米</el-col>
                                    <el-col :span="12">
                                        <el-button size="mini" type="primary">趋势图</el-button>
                                    </el-col>
                                </el-col>
                            </el-col>
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24"  class="box-border">
                    <p><i class="iconfont icon-sanjiao3"></i>表单组件</p>
                    <el-col :span="24" class="stream_count">
                        <el-col :span="24">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="按月统计" name="first">
                                    <template>
                                        <el-table
                                                class="join_table"
                                                ref="multipleTable"
                                                :data="tableData"
                                                border
                                                @selection-change="handleSelectionChange"
                                                :default-sort = "{order: 'descending'}"
                                                tooltip-effect="dark"
                                                align="center"
                                                style="width: 100%">
                                            <el-table-column
                                                    prop="gateway"
                                                    sortable
                                                    label="网关">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="name"
                                                    sortable
                                                    label="名称">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="company"
                                                    sortable
                                                    label="单位">
                                            </el-table-column>
                                            <el-table-column label="工程标题（月份）" sortable>
                                                <el-table-column
                                                        prop="jan"
                                                        label="1">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="feb"
                                                        label="2">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="mar"
                                                        label="3">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="apr"
                                                        label="4">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="may"
                                                        label="5">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="jun"
                                                        label="6">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="jul"
                                                        label="7">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="aug"
                                                        label="8">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="sept"
                                                        label="9">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="oct"
                                                        label="10">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="nov"
                                                        label="11">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="dec"
                                                        label="12">
                                                </el-table-column>
                                            </el-table-column>
                                            <el-table-column label="操作"  width="80">
                                                <template slot-scope="scope">
                                                    <span>柱状图</span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </el-tab-pane>
                                <el-tab-pane label="按日统计" name="second">
                                    <template>
                                        <el-table
                                                class="join_table"
                                                ref="multipleTable"
                                                :data="tableDay"
                                                border
                                                @selection-change="handleSelectionChange"
                                                :default-sort = "{order: 'descending'}"
                                                tooltip-effect="dark"
                                                style="width: 100%">
                                            <el-table-column
                                                    prop="gateway"
                                                    sortable
                                                    label="网关">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="name"
                                                    sortable
                                                    label="名称">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="company"
                                                    sortable
                                                    label="单位">
                                            </el-table-column>
                                            <el-table-column label="工程标题（号）" sortable>
                                                <el-table-column
                                                        prop="jan"
                                                        label="1">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="feb"
                                                        label="2">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="mar"
                                                        label="3">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="apr"
                                                        label="4">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="may"
                                                        label="5">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="jun"
                                                        label="6">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="jul"
                                                        label="7">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="aug"
                                                        label="8">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="sept"
                                                        label="9">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="oct"
                                                        label="10">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="nov"
                                                        label="11">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="dec"
                                                        label="12">
                                                </el-table-column>
                                            </el-table-column>
                                            <el-table-column label="操作"  width="80">
                                                <template slot-scope="scope">
                                                    <span>柱状图</span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-col>
                </el-col>
                <el-col :span="24" class="video-view box-border">
                    <p><i class="iconfont icon-sanjiao3"></i>地图插件</p>
                    <el-col :span="24">
                        <div class="mapbox">

                              <baidu-map :center="center" :zoom="zoom" @ready="handler" style="height:500px" @click="getClickInfo"></baidu-map>

                                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                                <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>

                                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

                                <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"> </bm-city-list>
                        </div>
                    </el-col>
                </el-col>
            </el-col>
        </el-col>
        <el-dialog class="chart" title="趋势图" :visible.sync="showView">
            <div class="chart-box">
                <p><strong>报警记录</strong> <span><small>最近7天</small></span>|<span><small>最近30天</small></span>|<span><small>全部</small></span>
                    <el-button type="primary" icon="iconfont icon-tubiao-zhexiantu" size="mini"></el-button>
                    <el-button type="primary" size="mini" @click="">更多</el-button>
                </p>
                <ve-line height="300px" :data="chartData" :title="{text: '记录（条数）'}" :legend="{left: '20%'}"></ve-line>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Monitoring",
        data(){
            return{
                showView: false,
                activeName: 'first',
                showNavBox: true,
                options: [
                    {
                        value: '怀集水利工程',
                        label: '怀集水利工程'
                    }, {
                        value: '温氏集团',
                        label: '温氏集团'
                    }
                ],
                value: '',
                tableData: [{
                    gateway: '怀集水机',
                    name: '1#水池',
                    company: 'm³',
                    jan: 123,
                    feb: 123,
                    mar: 123,
                    apr: 123,
                    may: 123,
                    jun: 123,
                    jul: 123,
                    aug: 123,
                    sept: 123,
                    oct: 123,
                    nov: 123,
                    dec: 123,
                }],
                tableDay: [{
                    gateway: '怀集水机',
                    name: '1#水池',
                    company: 'm³',
                    jan: 123,
                    feb: 123,
                    mar: 123,
                    apr: 123,
                    may: 123,
                    jun: 123,
                    jul: 123,
                    aug: 123,
                    sept: 123,
                    oct: 123,
                    nov: 123,
                    dec: 123,
                }],
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
                center: {lng:0, lat:0},
                zoom:13,
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handler ({BMap, map}) {
                console.log(BMap, map);
                this.center.lng =113.822348;
                this.center.lat =22.635538;
                this.zoom =this.zoom
            },
            goback(){
              this.$router.go(-1)
            },
            getClickInfo (e) {
                console.log(e.point.lng);
                console.log(e.point.lat);
                this.center.lng = e.point.lng;
                this.center.lat = e.point.lat;
            },
            showNav(){
                this.showNavBox = !this.showNavBox
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/monitoring";
    .mon{
        position: relative;
        .box-border{
            border:1px solid #eee;
        }
        .bm-view {
            width:100%;
            height:300px;
        }
        .cl-show-box-1{
            position: absolute;
            left: -14px;
            top: 40vh;
            background: #242F42;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: right;
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
            i{
                color: #fff;
            }
        }
        .right-nav-box{
            position: absolute;
            width: 40px;
            background: #242F42;
            left: 0;
            top: 20vh;
            z-index: 10000;
            div{
                text-align: center;
                padding: 2px;
                i{
                    width: 36px;
                    font-size: 20px;
                    height: 36px;
                    line-height: 36px;
                    color: white;
                }
                span{
                    display: block;
                    background: #324157;
                    color: #fff;
                    border: 1px solid #fff;
                    height: 36px;
                    line-height: 36px;
                    border-radius: 4px;
                    font-size: 12px;
                }
                .fanhui{
                    display: block;
                    background: #324157;
                    color: #fff;
                    border: 1px solid #fff;
                    height: 36px;
                    box-sizing: border-box;
                    border-radius: 4px;
                }
            }
            div:last-child{
                i{
                    display: block;
                    background: #324157;
                    color: #fff;
                    border: 1px solid #fff;
                    height: 36px;
                    box-sizing: border-box;
                    border-radius: 4px;
                }
            }
            .cl-show-box{
                position: absolute;
                left: 24px;
                top: 20vh;
                background: #242F42;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: right;
                border-top-right-radius: 50%;
                border-bottom-right-radius: 50%;
                z-index: -1;
                i{
                    color: #fff;
                }
            }
        }
        .goback{
            margin-bottom: 10px;
        }
        .mov-view{
            padding: 10px 40px;
        }
        .hidden-scroll{
            position: absolute;
            right: 40px;
            top: 10px;
            bottom: 10px;
            width: 30px;
            background: white;
        }
    }
</style>