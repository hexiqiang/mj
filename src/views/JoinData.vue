<template>
    <div class="called calldata controldata JoinData">
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
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="project_name" sortable label="工程"></el-table-column>
                    <el-table-column prop="join_name" sortable label="联控名称"></el-table-column>
                    <el-table-column prop="equipment_name" sortable  label="设备名称"></el-table-column>
                    <el-table-column prop="join_status" sortable width="120" label="联控状态"></el-table-column>
                    <el-table-column prop="join_date" sortable width="180" label="联控时间"></el-table-column>
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
            <el-dialog title="查询数据" :visible.sync="search" width="40%" class="call-form-data tishi">
                <el-form :model="formData" ref="formData">
                    <el-col :span="24">
                        <el-col :span="8">
                            <el-form-item label="工程"  :required="true">
                                <el-select v-model="formData.project_name" placeholder="请选择工程">
                                    <el-option label="怀集雅豪居供水旧改项目" value="怀集雅豪居供水旧改项目"></el-option>
                                    <el-option label="从化温泉" value="从化温泉"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联控名称" :required="true" >
                                <el-select v-model="formData.join_name" placeholder="请选择">
                                    <el-option label="A2栋液位联控" value="A2栋液位联控"></el-option>
                                    <el-option label="A1栋液位联控" value="A1栋液位联控"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="控制状态">
                                <el-select v-model="formData.join_status" placeholder="请选择">
                                    <el-option label="触发" value="触发"></el-option>
                                    <el-option label="恢复" value="恢复"></el-option>
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
    export default {
        name: "JoinData",
        data(){
            return{
                search: false,
                loading: true,
                daochu: false,
                options: [{
                    value: '从化温泉',
                    label: '从化温泉'
                }, {
                    value: '惠州温泉',
                    label: '惠州温泉'
                }],
                currentPage4: 1,
                tableData: [{
                    project_name: '怀集雅豪居供水旧改项目',
                    join_name: 'A2栋液位联控',
                    equipment_name: 'R1,',
                    join_status: '恢复控制',
                    join_date: '2021-12-11 16:17:00',
                },{
                    project_name: '怀集雅豪居供水旧改项目',
                    join_name: 'A1栋液位联控',
                    equipment_name: 'R1,',
                    join_status: '触发控制',
                    join_date: '2022-02-17 07:19:05',
                },],
                multipleSelection: [],
                formData:{
                    project_name:'',
                    join_name:'',
                    join_status:'',
                    date:'',
                }
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
            },
            onSearch(){
                console.log(this.formData)
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