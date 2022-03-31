<template>
    <div class="called calldata controldata JoinData  no-padding selected-r">
        <el-col :span="24">
            <el-col :span="24">
                <el-col :span="4">
                    <el-button icon="el-icon-search"  @click="search = true">查询数据</el-button>
                    <el-button class="refresh" type="danger" icon="el-icon-refresh" @click="clickRefresh">刷新</el-button>
                </el-col>
                <el-button class="daochu" style="float: right;" type="primary" @click="daochu = true">导出</el-button>
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
                    <el-table-column prop="join_name" sortable label="联控名称"></el-table-column>
                    <el-table-column prop="gateway_name" sortable  label="设备名称"></el-table-column>
                    <el-table-column prop="join_status" sortable width="120" label="联控状态"></el-table-column>
                    <el-table-column prop="join_date" sortable width="180" label="联控时间"></el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24"  class="page-box">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10,20,50,100]"
                        :page-size="6"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                </el-pagination>
            </el-col>
            <el-dialog title="查询数据" :visible.sync="search" width="40%" class="call-form-data tishi">
                <el-form :model="formData" ref="formData">
                    <el-col :span="24">
                        <el-col :span="8">
                            <el-form-item label="工程"  :required="true">
                                <el-select
                                        v-model="formData.pid"
                                        @change="changeJoin"
                                        placeholder="请选择工程">
                                    <el-option
                                            v-for="item in options"
                                            :label="item.project_name"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联控名称" :required="true" >
                                <el-select v-model="formData.jid" placeholder="请选择">
                                    <el-option
                                            v-for="item in joins"
                                            :label="item.join_name"
                                            :value="item.jid"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="控制状态">
                                <el-select v-model="formData.join_status" placeholder="请选择">
                                    <el-option label="触发控制" value="触发控制"></el-option>
                                    <el-option label="恢复控制" value="恢复控制"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="16">
                            <el-form-item label="选择控制时间">
                                <el-date-picker
                                        v-model="formData.date"
                                        type="daterange"
                                        range-separator="至"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="search = false">取 消</el-button>
                    <el-button type="primary" @click="onSearch">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="导出数据" :visible.sync="daochu" width="30%" height="30%" class="call-form-data tishi">
                <el-col :span="24"
                        style="height: 30vh"
                        v-loading="loading"
                        element-loading-text="数据正在整理，请稍后"
                        element-loading-spinner="el-icon-loading">

                </el-col>
            </el-dialog>
        </el-col>
    </div>
</template>

<script>
    import {
        getJoinRecord
        , getProjectList
        , getProjectJoin
    } from "../api/apis";

    export default {
        name: "JoinData",
        data(){
            return{
                search: false,
                loading: true,
                daochu: false,
                options: [],
                joins:[],
                tableData: [],
                multipleSelection: [],
                formData:{
                    pid:'',
                    jid:'',
                    join_status:'',
                    date:'',
                },
                offset: 0,
                limit: 10,
                currentPage: 1,
                totalCount: 10,
                page: 10,
                searchFiled: {}
            }
        },
        methods:{
            changeJoin(val){
                console.log(val)
                getProjectJoin({pid: val}).then(res => {
                    if (res.code == 0){
                        this.joins = res.data
                    }
                })
            },
            clickRefresh(){
                this.$router.go(0)
            },
            getRecord(offset, limit, field){
                let where = {
                    offset: this.offset,
                    limit: this.limit,
                };
                if (field){
                    Object.assign(where,field)
                }
                getJoinRecord(where).then(res => {
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                let offset = 0;
                let limit = val;
                this.offset = offset;
                this.limit = limit;
                this.getRecord(this.offset, this.limit, this.searchFiled)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                if (val == 1){
                    let offset = 0;
                    this.getRecord(offset, this.limit, this.searchFiled)
                } else{
                    this.offset = this.limit * (val - 1);
                    this.getRecord(this.offset, this.limit, this.searchFiled)
                }
            },
            onSearch(){
                if (this.formData.date.length < 2){
                    this.$message('请选择查询日期');
                    return;
                }
                console.log(this.formData);
                let start = this.formData.date[0];
                let end = this.formData.date[1];
                this.searchFiled = {
                    pid: this.formData.pid,
                    jid: this.formData.jid,
                    joinstatus: this.formData.join_status,
                    start:start,
                    end:end
                };
                this.search = false;
                this.getRecord(this.offset, this.limit, this.searchFiled)
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
        }
    }
</script>

<style lang="scss">
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
    .controldata{
        .el-col-16{
            label{
                display: block;
                width: 100%;
                text-align: left;
            }
        }
    }
</style>