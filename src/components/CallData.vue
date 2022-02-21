<template>
    <div class="called calldata">
        <el-col :span="24">
            <el-col :span="24">

                <el-form ref="form" v-model="form">
                    <el-col :span="4">
                        <el-select v-model="form.value" filterable  placeholder="请选择项目">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
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
                    </el-col>

                    <el-col :span="4">
                        <el-button icon="el-icon-search"></el-button>
                        <el-button class="refresh" type="danger" icon="el-icon-refresh" @click="clickRefresh">刷新</el-button>
                    </el-col>
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
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="project_name" sortable label="工程"></el-table-column>
                    <el-table-column prop="call_name" sortable label="报警设备"></el-table-column>
                    <el-table-column prop="call_msg" sortable  label="报警信息"></el-table-column>
                    <el-table-column prop="call_type" sortable width="120" label="报警方式"></el-table-column>
                    <el-table-column prop="call_date" sortable width="180" label="报警时间"></el-table-column>
                    <el-table-column prop="call_status" sortable width="120" label="报警状态"></el-table-column>
                    <el-table-column prop="call_note" sortable width="120" label="备注"></el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[6, 6, 6, 2]"
                        :page-size="6"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="20">
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
    </div>
</template>

<script>
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
                currentPage4: 1,
                tableData: [{
                    project_name: '从化温泉',
                    call_name: '1#温水水池',
                    call_msg: '1#温水水池液位低限请开泵；1#水池液位：1.71米',
                    call_type: '短信发送',
                    call_date: '2022-02-17 07:19:05',
                    call_status: '报警恢复',
                    call_note: '备注信息',
                },{
                    project_name: '从化温泉',
                    call_name: '2#温水水池',
                    call_msg: '2#温水水池液位低限请开泵；2#水池液位：1.51米',
                    call_type: '短信发送',
                    call_date: '2022-01-17 07:19:05',
                    call_status: '报警恢复',
                    call_note: '备注信息',
                },],
                multipleSelection: []
            }
        },
        methods:{
            clickRefresh(){
                this.$router.go(0)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
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
</style>