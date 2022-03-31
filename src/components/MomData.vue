<template>
    <div  id="mon" class="mon no-mon" style="position: relative">
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
                                            <el-button size="mini" type="primary"
                                                       @click="showView = true;showFieldBox.pid = i.pid;showFieldBox.gid = i.gid;showFieldBox.sid = i.sid; showFieldBox.day = ''; showFieldBox.type= 1;getBoxDatas()">
                                                趋势图
                                            </el-button>
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
                        <template  v-if="dataset['show_data'].length > 0" v-for="(d, index) in dataset['doing_type']">
                            <div class="project-box data-mon" v-if="d.doing_type == 1">
                                <el-col :span="4">
                                    <i class="iconfont icon-yewei"></i>
                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="12" class="left-24">
                                        <el-col :span="24">{{d.stream_name}}</el-col>
                                        <el-col :span="24">当前值：{{d.record + '' + d.comp}}</el-col>
                                        <el-col :span="24">
                                            <el-form v-model="formStatus">
                                                <el-switch class="switchStyle"
                                                           v-model="formStatus[d.gid]"
                                                           active-color="#1899EE"
                                                           active-text="开启"
                                                           @change="statusChange(d.gid)"
                                                           @input="$forceUpdate()"
                                                           inactive-color="#DBE0E6"
                                                           inactive-text="关闭">
                                                </el-switch>
                                            </el-form>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="12" class="date-show">
                                        <el-col :span="24">{{d.add_date.split(' ')[0]}}</el-col>
                                        <el-col :span="24">{{d.add_date.split(' ')[1]}}</el-col>
                                        <el-col :span="24">
                                            <el-button size="mini" type="primary"
                                                       @click="showView = true; showFieldBox.pid = d.pid; showFieldBox.gid = d.gid; showFieldBox.sid = d.sid; showFieldBox.day = ''; showFieldBox.type= 2; getBoxDatas();">
                                                趋势图
                                            </el-button>
                                        </el-col>
                                    </el-col>
                                </el-col>
                            </div>
                            <div class="project-box data-mon"  v-if="d.doing_type == 2">
                                <el-col :span="4">
                                    <i class="iconfont icon-yewei"></i>
                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="12" class="left-24">
                                        <el-col :span="24">{{d.stream_name}}</el-col>
                                        <el-col :span="24">当前值：{{d.record + '' + d.comp}}</el-col>
                                        <el-col :span="24">
                                            <el-form v-model="formOrder" :inline="true" class="order-post">
                                                <el-input @input="checkInput($event)" v-model="formOrder[d.gid]" size="mini" :id="'order_'+d.gid" type="text" value="" placeholder="命令"></el-input>
                                                <el-button type="mini" @click="sendOrderMsg(d.gid, d.pid, d.sid)">发送</el-button>
                                            </el-form>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="12"  class="date-show">
                                        <el-col :span="24">{{d.add_date.split(' ')[0]}}</el-col>
                                        <el-col :span="24">{{d.add_date.split(' ')[1]}}</el-col>
                                        <el-col :span="24">
                                            <el-button size="mini" type="primary"
                                                       @click="showView = true;showFieldBox.pid = d.pid;showFieldBox.gid = d.gid;showFieldBox.sid = d.sid; showFieldBox.day = ''; showFieldBox.type= 2;getBoxDatas();">
                                                趋势图
                                            </el-button>
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
                                                    <span @click="showTableBox('month', scope.row)">柱状图</span>
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
                                                    <span @click="showTableBox('day', scope.row)">柱状图</span>
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
                        <div class="mapbox" id="allmap">
                            <baidu-map :center="center" :zoom="zoom" @ready="handler" style="height:500px" @click="getClickInfo" :scroll-wheel-zoom="true">
                                <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="true" @lineupdate="updatePolylinePath"></bm-polyline>
                            </baidu-map>
                            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

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
                        <el-col :span="8" v-for="(item, idx) in video">
                            <video controls :src="item.url"  poster="/src/assets/images/video.png">
                                <source :src="item.url">
                                <source :src="item.url" type="application/x-mpegURL">
                            </video>
                        </el-col>
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
                                            <el-select class="el-col-lg-push-1" v-model="formUrl[index].pid" @change="changeProject($event, index)" placeholder="选择工程" :popper-append-to-body="false">
                                                <el-option v-for="(item, key) in pro" :label="item.project_name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item label="">
                                            <el-select v-model="formUrl[index].gid" placeholder="网关">
                                                <el-option  v-for="(item, key) in prostream[index]" :label="item.gateway_name" :value="item.id"></el-option>
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
                <p class="box-data">
                    <strong>趋势图</strong>
                    <span><small @click="showFieldBox.day = 6;getBoxDatas();">最近7天</small> </span>|
                    <span><small @click="showFieldBox.day = 29;getBoxDatas();">最近30天</small></span>|
                    <span><small @click="showFieldBox.day = '';getBoxDatas();">全部</small></span>
                    <el-button type="primary" icon="iconfont icon-tubiao-zhexiantu" size="mini"></el-button>
                    <el-button type="primary" size="mini" @click="">更多</el-button>
                </p>
                <ve-line height="300px" :data="chartData" :title="{text: '记录（条数）'}" :legend="{left: '20%'}"></ve-line>
            </div>
        </el-dialog>
        <el-dialog class="chart" title="柱状图" :visible.sync="showTable">
            <div class="chart-box">
                <p class="box-data">
                    <strong>柱状图</strong>
                </p>
                <ve-histogram
                        height="500px"
                        :title="{text: '记录（条数）'}"
                        :set-option-opts="false"
                        :data="lineData"
                        :data-zoom="{ type: 'slider' }"
                ></ve-histogram>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        Postnote
        ,getProjectList
        ,getProjectGateway
        ,postUrl
        ,getBoxData
        ,sendOrder
        ,Addmap
        ,Updatemap
        ,gatewayChangeStatus
    } from "../api/apis";

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
                    rows: []
                },
                formtext: {
                    note: '',
                    cid: '',
                    vid: ''
                },
                formStatus: {},
                formUrl: [{
                    pid: '',
                    gid: '',
                    title: '',
                    url: ''
                }],
                center: {lng: 0, lat: 0},
                polylinePath: [],
                formMap:{
                    vid: '',
                    map_position: [],
                },
                zoom: 13,
                pro: [],
                prostream: [],
                showFieldBox: {
                  pid: '',
                  gid: '',
                  sid: '',
                  day: ''
                },
                formOrder:{},
                showTable: false,
                showTableBoxes:{
                    pid: '',
                    gid: '',
                    sid: '',
                },
                lineData:{
                    columns: ['日期', '条数'],
                    rows: []
                },
            }
        },
        props:['setControl', 'dataset', 'streamData','streamDataDay','vid','note','url','video','mapPosition','mid','rules'],
        methods:{
            showTableBox(type, row){
                this.lineData.rows = [];
                if (type == 'month'){
                    var num = 12;
                    for (let n = 1; n <= num; n++){
                        console.log(row[n])
                        this.lineData.rows.push({'日期':n + '月', '条数': row[n]})
                    }
                } else if(type == 'day'){
                    var num1 = 31;
                    for (let n = 1; n <= num1; n++){
                        console.log(row[n])
                        this.lineData.rows.push({'日期':n + '日', '条数': row[n]})
                    }
                }
                this.showTable = true;
                console.log(type)
                console.log(row)
            },
            updatePolylinePath (e) {
                this.polylinePath = e.target.getPath()
                console.log(this.polylinePath)
                if (this.mid){
                    this.formMap.vid = this.vid;
                    this.formMap.id = this.mid;
                    this.formMap.map_position = this.polylinePath;
                    this.editMap(this.formMap)
                }
            },
            addPolylinePoint (lng, lat) {
                this.polylinePath.push({lng: lng, lat: lat});
                if (this.mid){
                    this.formMap.vid = this.vid;
                    this.formMap.id = this.mid;
                    this.formMap.map_position = this.polylinePath;
                    this.editMap(this.formMap)
                } else{
                    this.formMap = {
                        vid: this.vid,
                        map_position: this.polylinePath,
                    }
                    this.addMap(this.formMap)
                }

            },
            addMap(data){
                Addmap(data).then(res => {
                    if (res.code == 0){
                        this.mid = res.data.id;
                        this.mapPosition = res.data.map_position;
                    }
                })
            },
            editMap(data){
                Updatemap(data).then(res => {
                    if (res.code == 0){
                        this.mid = res.data.id;
                        this.mapPosition = res.data.map_position;
                    }
                })
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handler({BMap, map}) {
                this.center.lng = 113.822348;
                this.center.lat = 22.635538;
                // this.zoom = this.zoom
            },
            postFormText() {
            },
            getClickInfo(e) {
                this.addPolylinePoint(e.point.lng, e.point.lat);
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
                // console.log(this.formUrl)
                let len = this.formUrl.length;
                for(let i = 0; i < len; i++) {
                    if (this.formUrl[i].pid == '' || this.formUrl[i].gid == '' || this.formUrl[i].title =='' ||this.formUrl[i].url == '') {
                        this.$message('请认真填写对应项');
                        return;
                    }
                }
                postUrl({data:this.formUrl, vid:this.vid, cid:6}).then(res => {
                    if (res.code == 0){
                        this.formUrl = res.data
                        this.$message(res.msg);
                    } else{
                        this.$message(res.msg);
                    }
                })
            },
            showViewControl(){
                this.control.forEach((result, index)=> {
                    this.setControl.forEach(cl => {
                        if (result.cid == cl.cid){
                            result.show = true;
                            result.vcid = cl.id
                        }
                    })
                })
                this.$forceUpdate()
            },
            changeProject(val, index){
                this.formUrl[index].gid = '';
                getProjectGateway({pid: val}).then(res => {
                    if (res.code == 0){
                        this.prostream[index] = res.data;
                        this.$forceUpdate();
                    }
                })
            },
            getProject(){
                getProjectList().then(res => {
                    if (res.code == 0){
                        this.pro = res.data
                    }
                })
            },
            setFormUrl(formurl){
                let len = formurl.length;
                for(let i = 0; i < len; i++) {
                    if (this.formUrl[i].pid || this.formUrl[i].gid) {
                        let gid = this.formUrl[i].gid
                        this.changeProject(this.formUrl[i].pid, i);
                        this.formUrl[i].gid = gid
                    }
                }
            },
            getBoxDatas(){
                let params = this.showFieldBox;
                getBoxData(params).then(res => {
                    if (res.code == 0){
                        this.chartData.rows = res.data
                    }
                })
            },
            sendOrderMsg(gid, pid, sid){
                if(pid in this.rules){
                    alert(pid)
                }else{
                    alert(pid)
                }return
                let mid = sessionStorage.getItem('mid');
                if (mid != 19){
                    this.rules
                }

                if (this.formOrder[gid]){
                    var msg = this.formOrder[gid]
                }
                sendOrder({gid:gid,msg:msg,sid:sid}).then(res => {
                    if (res.code == 0) {
                        this.$message(res.msg)
                    }
                })
            },
            statusChange(gid){
                console.log(gid)
                console.log(this.formStatus)
                let status = this.formStatus[gid] ? 1: 0;
                var order = 257;
                if(status == 0){
                    order = 256;
                }
                let formData = {
                    id: gid,
                    status: status,
                    order: order
                };
                gatewayChangeStatus(formData).then(res => {
                    if (res == 0){
                        this.$message(res.message);
                    }
                })
            },
            checkInput(e){
                this.$forceUpdate()
            },
            dataSetting(data){
                console.log(data)
                let len = data.length;
                for (let i = 0; i < len; i++){
                    this.formStatus[data[i].gid] = data[i].status ? true : false;
                }
                this.$forceUpdate()
            }
        },
        mounted() {
            this.$forceUpdate()
            this.showViewControl();
            this.formtext.note = this.note;
            this.formUrl = this.url;
            this.setFormUrl(this.formUrl);
            this.getProject();
            this.polylinePath = this.mapPosition ? this.mapPosition : [];
            this.dataSetting(this.dataset['doing_type'])
            console.log(this.rules)
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/monitoring";
    .mov-view{
        padding: 20px !important;
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
    p.box-data{
        small{
            display: inline-block;
            padding: 0 20px;
        }

    }
    ::v-deep .BMap_vectex_nodeT{
        background: unset !important;
    }
    ::v-deep .BMap_vectex_node{
        background: url("../assets/images/position.png");
        background-size: 100%;
    }
</style>