<template>
    <div  id="mon" class="mon">
        <el-col :span="24" class="mov-view">
            <el-col :span="24" class="mov-right" style="overflow-y: unset !important;">
                <el-col :span="24" class="box-border" v-show="control[0].show">
                    <p><i class="iconfont icon-sanjiao3"></i>数据展示组件</p>
                    <el-col :span="24">
                        <template v-if="dataset['show_data'].length > 0" v-for="i in dataset['show_data']">
                            <div class="project-box">
                                <el-col :span="4">
                                    <i class="iconfont icon-yewei"></i>
                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="24">
                                        <el-col :span="12">{{i.stream_name}}</el-col>
                                        <el-col :span="12">{{i.add_date}}</el-col>
                                    </el-col>
                                    <el-col :sapn="24">
                                        <el-col :span="12">当前值：{{i.record + '' + i.comp}}</el-col>
                                        <el-col :span="12">
                                            <el-button size="mini" type="primary" @click="showView = true">趋势图</el-button>
                                        </el-col>
                                    </el-col>
                                </el-col>
                            </div>
                        </template>

                    </el-col>
                </el-col>
                <el-col :span="24" class="box-border" v-show="control[1].show">
                    <p><i class="iconfont icon-sanjiao3"></i>数据监控组件</p>
                    <el-col :span="24">
                        <template  v-if="dataset['show_data'].length > 0" v-for="d in dataset['doing_type']">
                            <div class="project-box data-mon" v-if="d.doing_type == 1">
                                <el-col :span="5">
                                    <i class="iconfont icon-yewei"></i>
                                </el-col>
                                <el-col :span="19">
                                    <el-col :span="12" class="left-24">
                                        <el-col :span="24">{{d.stream_name}}</el-col>
                                        <el-col :span="24">当前值：{{d.record + '' + d.comp}}</el-col>
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
                                        <el-col :span="24">{{d.add_date}}</el-col>
                                        <el-col :span="24">
                                            <el-button size="mini" type="primary" @click="showView = true">趋势图</el-button>
                                        </el-col>
                                    </el-col>
                                </el-col>
                            </div>
                            <div class="project-box data-mon"  v-if="d.doing_type == 2">
                                <el-col :span="5">
                                    <i class="iconfont icon-yewei"></i>
                                </el-col>
                                <el-col :span="19">
                                    <el-col :span="12" class="left-24">
                                        <el-col :span="24">{{d.stream_name}}</el-col>
                                        <el-col :span="24">当前值：{{d.record + '' + d.comp}}</el-col>
                                        <el-col :span="24">
                                            <el-form v-model="formOrder" :inline="true" class="order-post">
                                                <el-input size="mini" v-model="formOrder.order" placeholder="命令"></el-input>
                                                <el-button type="mini">发送</el-button>
                                            </el-form>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-col :span="24">{{d.add_date}}</el-col>
                                        <el-col :span="24">
                                            <el-button size="mini" type="primary" @click="showView = true">趋势图</el-button>
                                        </el-col>
                                    </el-col>
                                </el-col>
                            </div>
                        </template>
                    </el-col>
                </el-col>
                <el-col :span="24" class="box-border" v-show="control[2].show">
                    <p><i class="iconfont icon-sanjiao3"></i>报表控件组件</p>
                    <el-col :span="24" class="stream_count">
                        <el-col :span="24">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="按月统计" name="first">
                                    <template>
                                        <el-table
                                                class="join_table"
                                                ref="multipleTable"
                                                :data="streamData"
                                                border
                                                @selection-change="handleSelectionChange"
                                                :default-sort="{order: 'descending'}"
                                                tooltip-effect="dark"
                                                align="center"
                                                style="width: 100%">
                                            <el-table-column
                                                    prop="gateway_name"
                                                    sortable
                                                    label="网关">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="stream_name"
                                                    sortable
                                                    label="名称">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="comp"
                                                    sortable
                                                    label="单位">
                                            </el-table-column>
                                            <el-table-column  :label="streamData.length > 0 ? streamData[0].project_name : '' + '（月份）'" sortable>
                                                <el-table-column
                                                        prop="1"
                                                        label="1">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="2"
                                                        label="2">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="3"
                                                        label="3">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="4"
                                                        label="4">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="5"
                                                        label="5">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="6"
                                                        label="6">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="7"
                                                        label="7">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="8"
                                                        label="8">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="9"
                                                        label="9">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="10"
                                                        label="10">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="11"
                                                        label="11">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="12"
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
                                                :data="streamDataDay"
                                                border
                                                @selection-change="handleSelectionChange"
                                                :default-sort="{order: 'descending'}"
                                                tooltip-effect="dark"
                                                style="width: 100%">
                                            <el-table-column
                                                    prop="gateway_name"
                                                    sortable
                                                    label="网关">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="stream_name"
                                                    sortable
                                                    label="名称">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="comp"
                                                    sortable
                                                    label="单位">
                                            </el-table-column>
                                            <el-table-column :label="streamDataDay && streamDataDay.length > 0 ? streamDataDay[0].project_name : '' + '(号)'" sortable>
                                                <el-table-column
                                                        prop="1"
                                                        label="1">
                                                </el-table-column>

                                                <el-table-column
                                                        prop="2"
                                                        label="2">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="3"
                                                        label="3">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="4"
                                                        label="4">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="5"
                                                        label="5">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="6"
                                                        label="6">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="7"
                                                        label="7">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="8"
                                                        label="8">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="9"
                                                        label="9">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="10"
                                                        label="10">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="11"
                                                        label="11">
                                                </el-table-column>

                                                <el-table-column
                                                        prop="12"
                                                        label="12">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="13"
                                                        label="13">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="14"
                                                        label="14">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="15"
                                                        label="15">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="16"
                                                        label="16">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="17"
                                                        label="17">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="18"
                                                        label="18">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="19"
                                                        label="19">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="20"
                                                        label="20">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="21"
                                                        label="21">
                                                </el-table-column>

                                                <el-table-column
                                                        prop="22"
                                                        label="22">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="23"
                                                        label="23">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="24"
                                                        label="24">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="25"
                                                        label="25">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="26"
                                                        label="26">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="27"
                                                        label="27">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="28"
                                                        label="28">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="29"
                                                        label="29">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="30"
                                                        label="30">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="31"
                                                    label="31">
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
                    <p><i class="iconfont icon-sanjiao3"></i>文本组件</p>
                    <el-col :span="24">
                        <el-form :label-position="'top'" ref="form" :model="formtext" label-width="80px">
                            <el-form-item style="padding: 0 20px;">
                            <el-input type="textarea" v-model="formtext.note" placeholder="请输入备注信息" @blur="postFormText"
                                      height="200px"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="formtext.vid = vid; formtext.cid = 4; noteAdd();" style="float: right;margin-right: 20px">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-col>
                <el-col :span="24" class="box-border" v-show="control[5].show">
                    <p><i class="iconfont icon-sanjiao3"></i>监控视频组件</p>
                    <el-col :span="24" class="video-box">
                        <img src="../assets/images/video.png" alt="">
                    </el-col>
                </el-col>
                <el-col :span="24" class="box-border" v-show="control[6].show">
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
    import {Postnote} from "../api/apis";

    export default {
        name: "MomData",
        data(){
            return{
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
                value: '',
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
                    note: '',
                    cid: '',
                    vid: ''
                },
                formStatus: {
                    status: ''
                },
                formOrder:{order:''},
                formUrl: [{
                    pid: '',
                    gid: '',
                    title: '',
                    url: ''
                }],
                center: {lng: 0, lat: 0},
                zoom: 13,
            }
        },
        props:['setControl', 'dataset', 'streamData','streamDataDay','vid','note'],
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handler({BMap, map}) {
                // console.log(BMap, map);
                this.center.lng = 113.822348;
                this.center.lat = 22.635538;
                // this.zoom = this.zoom
            },
            postFormText() {
                console.log(this.formtext)
            },
            getClickInfo(e) {
                // console.log(e.point.lng);
                // console.log(e.point.lat);
                this.center.lng = e.point.lng;
                this.center.lat = e.point.lat;
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
            noteAdd(){
                Postnote(this.formtext).then(res => {
                    if (res.code == 0){
                        this.$message(res.msg)
                    }else{
                        this.$message(res.msg)
                    }
                })
            },
            onadd(){
                console.log(this.formUrl)
            },
            showViewControl(){
                // console.log(this.control);
                // console.log(this.setControl);
                this.control.forEach((result, index)=> {
                    this.setControl.forEach(cl => {
                        if (result.cid == cl.cid){
                            result.show = true;
                            result.vcid = cl.id
                        }
                    })
                })
                // console.log(this.control)
                this.$forceUpdate()
            }
        },
        mounted() {
            this.showViewControl();
            this.formtext.note = this.note;
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/monitoring";
    .mov-view{
        padding: 20px !important;
    }
    .hidden-scroll{
        right: 17px !important;
        top: 10px !important;
        bottom: 0px !important;
    }
    .mov-right{
        height: auto !important;
        overflow-y: unset !important;
        border-radius: 0px !important;
        #mon{
            overflow-y: auto;
            height: 73vh !important;
        }
    }
    .stream_count{
        .el-tabs__nav-scroll {
            padding-left: 0px !important;
        }
    }
    #mon .mov-view .mov-right{
        overflow-y: unset !important;
    }
</style>