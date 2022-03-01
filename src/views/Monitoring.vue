<template>
    <!--监控视图-->
    <div id="mon" class="mon">
        <div>
            <div class="right-nav-box" v-if="showNavBox">
                <template v-for="(item, index) in controls">
                    <div @click="selectControl(item.id, item.control_name)" :title="item.control_name"><i :class="item.icon"></i></div>
                </template>

                <div class="save-data"><span>保存</span></div>
                <div @click="goback"><i class="iconfont icon-fanhui fanhui"></i></div>
                <span class="cl-show-box" @click="showNav(showNavBox)"><i class="el-icon-arrow-right"></i></span>
            </div>
            <span class="cl-show-box-1" @click="showNav(!showNavBox)"><i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="hidden-scroll"></div>
        <el-col :span="24" class="mov-view">
            <el-col :span="24" class="mov-right">
                <el-col :span="24" class="box-border" v-show="control[0].show">
                    <i class="el-icon-close cl-close" @click="delControl(control[0].vcid, 0)"></i>
                    <p><i class="iconfont icon-sanjiao3"></i>数据展示组件</p>
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
                <el-col :span="24" class="box-border" v-show="control[1].show">
                    <i class="el-icon-close cl-close" @click="delControl(control[1].vcid, 1)"></i>
                    <p><i class="iconfont icon-sanjiao3"></i>数据监控组件</p>
                    <el-col :span="24">
                        <div class="project-box data-mon">
                            <el-col :span="5">
                                <i class="iconfont icon-yewei"></i>
                            </el-col>
                            <el-col :span="19">
                                <el-col :span="12" class="left-24">
                                    <el-col :span="24">1#水池液位</el-col>
                                    <el-col :span="24">当前值：0.04米</el-col>
                                    <el-col :span="24">
                                        <el-form v-model="formStatus">
                                            <el-switch class="switchStyle"
                                                       v-model="formStatus.status"
                                                       active-color="#1899EE"
                                                       active-text="开启"
                                                       @change="statusChange(scope.$index, scope.row)"
                                                       inactive-color="#DBE0E6"
                                                       inactive-text="关闭">
                                            </el-switch>
                                        </el-form>
                                    </el-col>
                                </el-col>
                                <el-col :span="12">
                                    <el-col :span="24">2022-02-11 15：25</el-col>
                                    <el-col :span="24">
                                        <el-button size="mini" type="primary" @click="showView = true">趋势图</el-button>
                                    </el-col>
                                </el-col>
                            </el-col>
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24" class="box-border" v-show="control[2].show">
                    <i class="el-icon-close cl-close" @click="delControl(control[2].vcid, 2)"></i>
                    <p><i class="iconfont icon-sanjiao3"></i>报表控件组件</p>
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
                                                :default-sort="{order: 'descending'}"
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
                                            <el-table-column label="操作" width="80">
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
                                                :default-sort="{order: 'descending'}"
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
                                            <el-table-column label="操作" width="80">
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
                <el-col :span="24" class="video-view box-border" v-show="control[3].show">
                    <i class="el-icon-close cl-close" @click="delControl(control[3].vcid, 3)"></i>
                    <p><i class="iconfont icon-sanjiao3"></i>地图设备定位显示组件</p>
                    <el-col :span="24">
                        <div class="mapbox">

                             
                            <baidu-map :center="center" :zoom="zoom" @ready="handler" style="height:500px"
                                       @click="getClickInfo"></baidu-map>

                               
                            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                               
                            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
                                         anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>

                               
                            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"
                                            :autoLocation="true"></bm-geolocation>

                               
                            <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24" class="box-border" v-show="control[4].show">
                    <i class="el-icon-close cl-close" @click="delControl(control[4].vcid, 4)"></i>
                    <p><i class="iconfont icon-sanjiao3"></i>文本组件</p>
                    <el-col :span="24">
                        <el-form ref="form" :model="formtext" label-width="80px">
                            <el-input type="textarea" v-model="formtext.note" placeholder="请输入备注信息" @blur="postFormText"
                                      height="200px"></el-input>
                        </el-form>
                    </el-col>
                </el-col>
                <el-col :span="24" class="box-border" v-show="control[5].show">
                    <i class="el-icon-close cl-close" @click="delControl(control[5].vcid, 5)"></i>
                    <p><i class="iconfont icon-sanjiao3"></i>监控视频组件</p>
                    <el-col :span="24" class="video-box">
                        <img src="../assets/images/video.png" alt="">
                    </el-col>
                </el-col>
                <el-col :span="24" class="box-border" v-show="control[6].show">
                    <i class="el-icon-close cl-close" @click="delControl(control[6].vcid, 6)"></i>
                    <p><i class="iconfont icon-sanjiao3"></i>自定义链接组件</p>
                    <el-col :span="24">
                        <el-form ref="formUrl" :inline="true"  label-width="80px">
                            <el-col :span="24" class="formUrl">
                                <el-col :span="5">工程</el-col>
                                <el-col :span="5">网关</el-col>
                                <el-col :span="5">链接名称</el-col>
                                <el-col :span="5">跳转地址</el-col>
                                <el-col :span="4">操作</el-col>
                            </el-col>
                            <el-col :span="24">
                                <template v-for="(item, index) in formUrl">
                                    <el-col :span="5">
                                        <el-form-item label="">
                                            <el-select v-model="formUrl[index].pid" placeholder="活动区域">
                                                <el-option label="区域一" value="shanghai"></el-option>
                                                <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item label="">
                                            <el-select v-model="formUrl[index].gid" placeholder="网关">
                                                <el-option label="区域一" value="shanghai"></el-option>
                                                <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item label="">
                                            <el-input v-model="formUrl[index].title" placeholder="链接标题"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item label="">
                                            <el-input v-model="formUrl[index].url" placeholder="链接地址"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3"><el-button class="form-do" @click="formDo('add')">+</el-button><el-button  class="form-do" @click="formDo('del', index)">-</el-button></el-col>
                                </template>
                                <el-button type="primary" @click="onadd" style="margin-top: 15px;">提交</el-button>
                            </el-col>
                        </el-form>
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
    import {
        getViewControl
        ,getViewJoinControlList
        ,addViewJoinControl
        ,delViewJoinControl
    } from "../api/apis";

    export default {
        name: "Monitoring",
        data() {
            return {
                control:[
                    {title: '数据展示组件', cid:'1', show:false, vcid:''},
                    {title: '数据监控组件',cid:'3',  show:false, vcid:''},
                    {title: '报表控件组件', cid:'2', show:false, vcid:''},
                    {title: '地图设备定位显示组件', cid:'5', show:false, vcid:''},
                    {title: '文本组件', cid:'6', show:false, vcid:''},
                    {title: '监控视频组件', cid:'4', show:false, vcid:''},
                    {title: '自定义链接组件', cid:'7', show:false, vcid:''},
                ],
                showView: false,
                activeName: 'first',
                showNavBox: true,
                controls: [],
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
                formtext: {
                    note: ''
                },
                formStatus: {
                    status: ''
                },
                formUrl: [{
                    pid: '',
                    gid: '',
                    title: '',
                    url: ''
                }],
                center: {lng: 0, lat: 0},
                zoom: 13,
                setControl: [],
                getControl: [],
                vid: this.$route.params.vid
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handler({BMap, map}) {
                console.log(BMap, map);
                this.center.lng = 113.822348;
                this.center.lat = 22.635538;
                // this.zoom = this.zoom
            },
            goback() {
                this.$router.go(-1)
            },
            getClickInfo(e) {
                console.log(e.point.lng);
                console.log(e.point.lat);
                this.center.lng = e.point.lng;
                this.center.lat = e.point.lat;
            },
            showNav() {
                this.showNavBox = !this.showNavBox
            },
            selectControl(id, title) {
                let params = {vid: this.vid, cid: id}
                addViewJoinControl(params).then(res => {
                   if (res.code == 0){
                       this.getControl = res.data;
                       this.control.forEach((result, index)=> {
                           this.getControl.forEach(cl => {
                               if (result.cid == cl.cid){
                                   result.show = true
                                   result.vcid = cl.id
                               }
                           })
                       })
                   }else{
                       this.$message(res.msg)
                   }
                });
                this.setControl.push({title: title})
            },
            postFormText() {
                console.log(this.formtext)
            },
            formDo(type, index){
                if (type == 'add'){
                    let url = {
                        pid: '',
                        gid: '',
                        title: '',
                        url: ''
                    }
                    this.formUrl.push(url)
                } else if (type == 'del') {
                    let len = this.formUrl.length;
                    if (len == 1){
                        return;
                    }
                    this.formUrl.splice(index,1)
                }
            },
            onadd(){
                console.log(this.formUrl)
            },
            delControl(id, index){
                delViewJoinControl({id:id, vid: this.vid}).then(res => {
                    if (res.code == 0){
                        this.control[index].show = false
                        this.$message(res.msg)
                    }else{
                        this.$message(res.msg)
                    }
                })
            }
        },
        mounted() {
            getViewControl().then(res => {
                if (res.code == 0) {
                    this.controls = res.data
                } else {
                    this.$message('暂无数据');
                }
            });

            if (!this.vid){
                this.$router.go(-1)
            }
            getViewJoinControlList({vid: this.vid}).then(res => {
                if (res.code == 0){
                    this.getControl = res.data;
                    this.control.forEach((result, index)=> {
                        this.getControl.forEach(cl => {
                            if (result.cid == cl.cid){
                                result.show = true;
                                result.vcid = cl.id;
                            }
                        })
                    })
                } else{
                    this.$message(res.msg)
                }
            });
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/monitoring";
    @import "../assets/css/mon";
</style>