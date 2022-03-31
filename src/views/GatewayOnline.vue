<template>
    <div id="online">
        <el-col :span="24"  class="content-box">
            <el-col :span="24"style="padding: 0px">
                <el-form ref="form" v-model="form">
                    <el-col :span="24">
                        <el-select @change="selectProjects" v-model="form.peojects" placeholder="选择工程">
                            <el-option
                                    v-for="item in projects"
                                    :key="item.id"
                                    :label="item.project_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button class="re-button" icon="el-icon-refresh" type="primary" align="right" @click="refresh">刷新</el-button>
                    </el-col>
                </el-form>
            </el-col>
            <el-col :span="24" class="online-data-box">
                <el-col :span="4">
                    <el-col
                            :span="24"
                            v-if="gateways.length > 0"
                            v-for="(item, index) in gateways"
                            class="g-p"
                            :class="item.id == selected ? 'selected' : gateways.length == 1 ? 'selected' : ''"
                    >
                        <div @click="selectGateway(item.id)" :data-id="item.id"><i class="iconfont"></i>{{item.gateway_name}}</div>
                    </el-col>
                </el-col>
                <el-col :span="20">
                    <el-col :span="24">
                        <el-table
                                ref="multipleTable"
                                :data="tableData"
                                border
                                header-align="center"
                                @selection-change="handleSelectionChange"
                                :default-sort = "{order: 'descending'}"
                                tooltip-effect="dark">
                            <el-table-column prop="id" sortable label="序号">
                                <template slot-scope="scope">
                                    {{ scope.$index + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="offline_date" sortable label="离线时间"></el-table-column>
                            <el-table-column prop="online_date" sortable  label="在线时间"></el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="24"  class="page-box">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10,20,50,100]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalCount">
                        </el-pagination>
                    </el-col>
                </el-col>
            </el-col>
        </el-col>
    </div>
</template>

<script>
    import {
        getProjectList
        , getProjectGateway
        , getGatewayStauts
    } from "../api/apis";

    export default {
        name: "GatewayOnline",
        data(){
            return{
                projects: [],
                form:{
                    peojects: ''
                },
                totalCount: 0,
                currentPage: 1,
                tableData: [],
                gateways: [],
                selected: 0,
                offset: 0,
                limit: 10,
                gateway_id: 0
            }
        },
        methods:{
            refresh(){
                if (this.gateway_id){
                    this.offset= 0;
                    this.limit= 10;
                    this.getLists(this.gateway_id, this.offset, this.limit)
                }
            },
            getLists(gid, offset, limit){
                let params = {
                    gid: gid,
                    offset: offset,
                    limit: limit
                };
                getGatewayStauts(params).then(res => {
                    if(res.code == 0){
                        this.tableData = res.data['data'];
                        this.totalCount = Number(res.data['totalCount']);
                    }
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.tableData = [];
                let offset = 0;
                let limit = val;
                this.offset = offset;
                this.limit = limit;
                this.getLists(this.gateway_id, this.offset, this.limit)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                if (val == 1){
                    let offset = 0;
                    this.getLists(this.gateway_id, offset, this.limit)
                } else{
                    this.offset = this.limit * (val - 1);
                    this.getLists(this.gateway_id, this.offset, this.limit)
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            selectProjects(val){
                // console.log(this.form
                this.offset= 0;
                this.limit= 10;
                this.tableData = [];
                getProjectGateway({pid: val}).then(res => {
                    if(res.code == 0){
                        this.gateways = res.data;
                        if (this.gateways.length > 0){
                            this.gateway_id = this.gateways[0].id;
                            this.selected = this.gateways[0].id
                            this.getLists(this.gateway_id, this.offset, this.limit)
                        }
                    }
                })
            },
            selectGateway(id){
                this.offset= 0;
                this.limit= 10;
                this.selected = id;
                this.gateway_id = id;
                this.getLists(this.gateway_id, this.offset, this.limit)
            }
        },
        mounted() {
            getProjectList().then(res => {
                if (res.code == 0){
                    this.projects = res.data
                    if (this.projects.length > 0){
                        this.form.peojects = this.projects[0].id;
                        this.selectProjects(this.projects[0].id)
                    }
                }
            })
        }
    }
</script>

<style lang="scss">
#online{
    padding: 10px;
    .el-col-24{
        margin-bottom: 0px !important;
    }
    .online-data-box{
        height: 80vh;
        .el-col-4{
            border-top: 1px solid #eee;
            border-right: 1px solid #eee;
            height: inherit;
            .el-col-24{

            }
            .g-p{
                line-height: 30px;
                padding: 10px;
            }
            .selected{
                background: #3CB1FF;
                color: white;
            }
        }
        .el-col-20{
            border-top: 1px solid #eee;
            height: inherit;
            thead{
                .cell{
                    text-align: center;
                    color: #1899EE;
                }
            }
            tbody {
                .cell{
                    text-align: center;
                }
            }

        }
    }
    .re-button{
        margin-left: 10px;
    }
}
</style>