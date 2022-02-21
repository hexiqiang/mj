<template>
    <div >
        <el-col :span="24">
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
        <el-col :span="24">
            <p><i class="iconfont icon-sanjiao3"></i>流量统计</p>
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
        <el-col :span="24" class="video-view">
            <p><i class="iconfont icon-sanjiao3"></i>项目实时视频</p>
            <el-col :span="24">
                <el-col :span="7">
                    <img src="../assets/images/video.png" alt="">
                </el-col>
                <el-col :span="7">
                    <img src="../assets/images/video.png" alt="">
                </el-col>
                <el-col :span="7">
                    <img src="../assets/images/video.png" alt="">
                </el-col>
            </el-col>
        </el-col>
        <el-dialog class="chart" title="趋势图" :visible.sync="showView">
            <div class="chart-box">
                <p><strong>报警记录</strong> <span><small>最近7天</small></span>|<span><small>最近30天</small></span>|<span><small>全部</small></span>
                    <el-button type="primary" icon="iconfont icon-tubiao-zhexiantu" size="mini"></el-button>
                    <el-button type="primary" size="mini" @click="">更多</el-button>
                </p>
                <ve-line height="300px" :data="chartData" :title="{text: '记录（条数）'}"
                         :legend="{left: '20%'}"></ve-line>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "MomData",
        data(){
            return{
                showView: false,
                activeName: 'first',
                options: [{
                    value: '怀集水利工程',
                    label: '怀集水利工程'
                }, {
                    value: '温氏集团',
                    label: '温氏集团'
                }],
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
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/monitoring";
</style>