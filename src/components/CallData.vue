<template>
    <el-col class="called calldata  no-padding selected-r" style="padding: 0 !important;">
        <el-col :span="24">
            <el-col :span="24">
                <el-form ref="form" v-model="form">
                    <div class="left-box">
                        <el-select v-model="form.value" filterable  placeholder="请选择项目">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.project_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="left-box">
                        <div class="block">
                            <el-date-picker
                                    v-model="form.date"
                                    type="daterange"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </div>

                    <div class="left-box">
                        <el-button icon="el-icon-search" @click="sreachRecord"></el-button>
                        <el-button class="refresh" type="danger" icon="el-icon-refresh" @click="clickRefresh">刷新</el-button>
                    </div>
                    <el-button class="daochu" style="float: right;" type="primary" @click="daochu = true">导出</el-button>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        border
                        @selection-change="handleSelectionChange"
                        :default-sort = "{order: 'descending'}"
                        tooltip-effect="dark">
                    <el-table-column prop="project_name" sortable label="工程"></el-table-column>
                    <el-table-column prop="call_name" sortable label="报警设备"></el-table-column>
                    <el-table-column prop="call_message" sortable  label="报警信息"></el-table-column>
                    <el-table-column prop="call_type" sortable width="120" label="报警方式"></el-table-column>
                    <el-table-column prop="call_date" sortable width="180" label="报警时间"></el-table-column>
                    <el-table-column prop="call_status" sortable width="120" label="报警状态"></el-table-column>
                    <el-table-column prop="call_note" sortable width="120" label="备注"></el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24"  class="page-box">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                </el-pagination>
            </el-col>
            <el-dialog title="导出数据" :visible.sync="daochu" width="30%" height="30%" class="call-form-data tishi">
                <el-col :span="24"
                        style="height: 30vh"
                        v-loading="loading"
                        element-loading-text="数据正在整理，请稍后"
                        element-loading-spinner="el-icon-loading">

                </el-col>
            </el-dialog>
        </el-col>
    </el-col>
</template>

<script>
    import {
        getCallRecord
        , getProjectList
    } from "../api/apis";

    export default {
        name: "CallData",
        data(){
            return{
                loading: true,
                daochu: false,
                form:{
                    value: '',
                    date: ''
                },
                options: [{
                    value: '从化温泉',
                    label: '从化温泉'
                }, {
                    value: '惠州温泉',
                    label: '惠州温泉'
                }],

                tableData: [],
                multipleSelection: [],
                offset: 0,
                limit: 10,
                currentPage: 1,
                totalCount: 10,
                page: 10,
                searchFiled: {}
            }
        },
        methods:{
            sreachRecord(){
                if (this.form.date.length < 2){
                    this.$message('请选择查询日期');
                    return;
                }
                let key = this.form.value;
                let start = this.form.date[0];
                let end = this.form.date[1];
                this.searchFiled = {key: key, start:start,end:end};
                this.getRecord(this.offset, this.limit, this.searchFiled)
            },
            getRecord(offset, limit, field){
                let where = {
                    offset: this.offset,
                    limit: this.limit,
                };
                if (field){
                    Object.assign(where,field)
                }
                console.log(field)
                getCallRecord(where).then(res => {
                    if (res.code == 0){
                        console.log(res.data);
                        this.totalCount = Number(res.data.totalCount);
                        this.page = res.data.page;
                        this.tableData = res.data.data;
                    }else{
                        this.$message('请稍后，服务器忙！')
                    }
                })
            },
            clickRefresh(){
                this.$router.go(0)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
            }
        },
        mounted() {
            this.getRecord(this.offset, this.limit);
            getProjectList().then(res => {
                if (res.code == 0) {
                    this.options = res.data
                }else{
                    this.$message(res.msg)
                }
            })
            this.form = {}
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/called";
    .calldata {
         .el-button{
            border-radius: 4px !important;
        }
        .daochu{
            background: #1899EE !important;
            color: white !important;
        }
        .refresh{
            background: #f78989 !important;
            color: white !important;
        }
        .tishi{
            .el-dialog__body{
                overflow: hidden;
            }
        }
    }
    .called .el-col-24{
        padding: 0 !important;
    }
    .left-box{
        float: left;
        margin-right: 10px;
    }
    .called .el-col-24{
        padding: 0!important;
    }


</style>