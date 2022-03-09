<template>
    <!--数据报表-->
    <div class="calltab"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="数据加载中">
        <el-col :span="24">
            <el-form ref="form" :model="form">
                <el-col :span="3">
                    <template>
                        <el-select v-model="form.pid" filterable placeholder="请选择工程">
                            <el-option
                                    v-for="item in projects"
                                    :key="item.id"
                                    :label="item.project_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-col>
                <el-col :span="3">
                    <template>
                        <el-select v-model="form.days" filterable placeholder="请选择周期">
                            <el-option
                                    v-for="item in dates"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-col>
                <el-col :span="6">
                    <template>
                        <el-date-picker
                                v-model="form.dates"
                                type="daterange"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                range-separator="到"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </template>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" @click="search">查询</el-button>
                </el-col>
            </el-form>
        </el-col>
        <el-col :span="24" class="data-show-box">
            <el-col :span="12" class="tab-left">
                <el-col :span="24">
                    <el-col :span="12" class="bg-blue">
                        最小值
                    </el-col>
                    <el-col :span="12" class="cl-black">
                        {{min}}
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12"  class="bg-blue">
                        平均值
                    </el-col>
                    <el-col :span="12" class="cl-black">
                        {{agv}}
                    </el-col>
                </el-col>
            </el-col>
            <el-col :span="12" class="tab-right">
                <el-col :span="24">
                    <el-col :span="12" class="bg-blue">
                        最大值
                    </el-col>
                    <el-col :span="12" class="cl-black">
                        {{max}}
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12" class="bg-blue">
                        区间值
                    </el-col>
                    <el-col :span="12" class="cl-black">
                        {{section}}
                    </el-col>
                </el-col>
            </el-col>
        </el-col>
        <el-col :span="24">
            <el-col :span="24" style="position: relative;">
                <div class="doing-do">
                    <i class="iconfont icon-a-quxiantushuju" @click="showLine=true; showZhu=false;showZhuLine=false"></i>
                    <i class="iconfont icon-tubiao-zhuzhuangtu" @click="showLine=false; showZhu=true;showZhuLine=false"></i>
                    <i class="iconfont icon-tubiao" @click="showLine=false; showZhu=false; showZhuLine=true;"></i>
                    <i class="iconfont icon-refresh"></i>
                    <i class="iconfont icon-xiazaidaoru" @click="exportChart"></i>
                </div>
            </el-col>
            <ve-line
                    ref="chart"
                    v-if="showLine"
                    height="500px"
                    :title="{text: '联控报表'}"
                    :set-option-opts="false"
                    :data="lineData"
                    :data-zoom="{ type: 'slider' }">
            </ve-line>
            <ve-histogram
                    v-if="showZhu"
                    height="500px"
                    :title="{text: '联控报表'}"
                    :set-option-opts="false"
                    :data="lineData"
                    :data-zoom="{ type: 'slider' }"
            ></ve-histogram>
            <ve-histogram
                    v-if="showZhuLine"
                    height="500px"
                    :title="{text: '联控报表'}"
                    :set-option-opts="false"
                    :settings="{ showLine: ['比率']}"
                    :data="lineData"
                    :data-zoom="{ type: 'slider' }"
            ></ve-histogram>
        </el-col>
        <el-col :span="24">
            <div style="float: right;">
                <el-button type="primary" @click="exportPathMethod">导出</el-button>
                <el-button type="default" v-print="'#print_demo'">打印</el-button>
            </div>
        </el-col>
        <el-col :span="24">
            <el-table id="print_demo" :data="tableData" highlight-current-row border>
                <el-table-column prop="gateway_name" label="网关" align="center" class="compileNameFather" width="230">
                </el-table-column>
                <el-table-column prop="stream_name" label="数据流"  align="center">
                </el-table-column>
                <el-table-column  prop="add_date" label="时间" align="center">
                </el-table-column>
                <el-table-column label="历史数值" prop="count" align="center">
                </el-table-column>
                <!--<el-table-column prop="status" label="状态" align="center"></el-table-column>-->
            </el-table>
        </el-col>
    </div>
</template>

<script>
    import FileSaver from "file-saver";
    import {
        getProjectList
        ,Getcallrecords
        ,Getcalldata
    } from "../api/apis";
    export default {
        name: "CallTab",
        data(){
            return{
                showLine: true,
                showZhu: false,
                showZhuLine: false,
                fullscreenLoading: false,
                offset: 0,
                limit: 10,
                currentPage: 1,
                totalCount: 0,
                projects: [],
                dates:[ {  value: '15', label: '近15天' },{  value: '7', label: '近7天' }, { value: '5', label: '近5天' }, { value: '3', label: '近3天' }, { value: '1', label: '近1天' }],
                form: {  pid: '', dates:'', days: '7' },
                tableData: [],
                lineData:{
                    columns: ["日期", "条数"],
                    rows: []
                },
                min:0,
                max: 0,
                agv: 0,
                section: 0
            }
        },
        methods: {
            getProject(){
                getProjectList().then(res =>{
                    if (res.code == 0){
                        this.$forceUpdate();
                        this.projects = res.data
                        console.log(this.projects);
                    }
                })
            },
            search(){
                this.lineData.rows = [];
                this.min = 0;
                this.max = 0;
                this.agv = 0;
                this.section = 0;
                this.fullscreenLoading = true;
                this.form.start = Array.isArray(this.form.dates) ? this.form.dates[0] : '';
                this.form.end = Array.isArray(this.form.dates) ? this.form.dates[1] : '';
                if (Array.isArray(this.form.dates)) {
                    delete this.form.days;
                }else{
                    this.form.days = this.form.days
                }
                delete this.form.dates;
                this.getRecord(this.offset, this.limit,this.form);
            },
            getRecord(offset, limit, field){
                let where = {
                    offset: offset,
                    limit: limit,
                    type: 'join',
                    sid: this.form.sid
                };
                if (field){
                    Object.assign(where,field)
                }
                Getcalldata(where).then(res => {
                    if (res.code == 0){
                        this.fullscreenLoading = false;
                        console.log(res.data);
                        this.tableData = res.data.data;
                        this.min = res.data.min;
                        this.max = res.data.max;
                        this.agv = res.data.agv;
                        this.section = res.data.section;
                        this.lineData.rows = res.data.rows;
                        console.log(this.lineData)
                    }else{
                        this.$message('请稍后，服务器忙！')
                    }
                })
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                let offset = 0;
                let limit = val;
                this.offset = offset;
                this.limit = limit;
                this.getRecord(this.offset, this.limit, this.searchFiled)
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                if (val == 1){
                    let offset = 0;
                    this.getRecord(offset, this.limit, this.searchFiled)
                } else{
                    this.offset = this.limit * (val - 1);
                    this.getRecord(this.offset, this.limit, this.searchFiled)
                }
            },
            exportChart () {
                if (typeof Blob !== 'function') {
                    this.$alert('您的浏览器不支持！请使用最新版本chrome/firefox浏览器!')
                    return
                }
                const canvas = this.$refs.chart.$el.getElementsByTagName('canvas')[0]
                try {
                    canvas.toBlob((blob) => {
                        FileSaver.saveAs(
                            blob,
                            'chart.png'
                        )
                    })
                } catch (e) {
                    console.error(e)
                    this.$alert('导出失败！')
                }
            },
            printdata(){
                print(11)
            },
            exportPathMethod() {
                // 要导出的json数据
                var jsonData = this.tableData
                let str1 = ''
                for (const i in jsonData[0]) {
                    str1 += ',' + i
                }
                str1 = str1.substring(1)
                str1 = str1 + '\n'
                let str = `${str1}`
                // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
                // let str = `用户名称,会员等级,最近购买时间,消费次数,消费金额,用户账号,订单均价\n`
                // 增加\t为了不让表格显示科学计数法或者其他格式
                for (let i = 0; i < jsonData.length; i++) {
                    for (const item in jsonData[i]) {
                        str += `${jsonData[i][item] + '\t'},`
                    }
                    str += '\n'
                }

                // encodeURIComponent解决中文乱码
                const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
                // 通过创建a标签实现
                var link = document.createElement('a')
                link.href = uri
                // 对下载的文件命名
                link.download = '客户管理列表.xls'
                document.body.appendChild(link)
                link.click()
            },
        },
        mounted() {
            this.getProject();
        }
    }
</script>

<style lang="scss">
    .calltab{
        .el-select{
            margin-right: 10px;
        }
        .data-show-box{
            .tab-left{
                .el-col-24{
                    padding: 0 !important;
                    margin: 0 !important;
                    text-align: center;
                    color: white;
                    .el-col-12{
                        border: 1px solid #F3F3F3;
                        line-height: 40px;
                    }
                }
                padding-right: 10px;
            }
            .tab-right{
                .el-col-24{
                    text-align: center;
                    padding: 0 !important;
                    margin: 0 !important;
                    color: white;
                    .el-col-12{
                        border: 1px solid #F3F3F3;
                        line-height: 40px;
                    }
                }
                padding-left: 10px;
            }
            .bg-blue{

                background: #1899EE;
            }
            .cl-black{
                color: #808080;
            }
        }
        .doing-do{
            float: right;
            i{
                font-size: 20px;
                margin-right: 20px;
            }
            position: absolute;
            right: 0;
            top: 4px;
            z-index: 10000;
        }
    }
</style>