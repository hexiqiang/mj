<template>
    <div class="engin">
        <el-col :span="24">
            <el-col :span="4">
                <el-form ref="form" v-model="form">
                    <el-col :span="23">
                        <el-select  icon="el-icon-search" v-model="form.keyword" filterable @change="searchProject" placeholder="搜索">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.project_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form>
            </el-col>
            <el-col :span="20">
                <el-button type="primary" @click="dialogFormVisible = true; title = '添加工程管理信息';">添加</el-button>
                <el-button type="danger">删除</el-button>
                <el-button type="primary" @click="clickRefresh">刷新</el-button>
            </el-col>
            <el-col :span="24">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        border
                        @selection-change="handleSelectionChange"
                        @expand-change="showGateway"
                        :default-sort = "{order: 'descending'}"
                        tooltip-effect="dark">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="project_name" sortable label="工程名称"></el-table-column>
                    <el-table-column prop="contacts" sortable width="120" label="联系人"></el-table-column>
                    <el-table-column prop="phone" sortable width="120" label="联系电话"></el-table-column>
                    <el-table-column prop="address" sortable width="240" label="地址"></el-table-column>
                    <el-table-column prop="master_apikey" sortable width="240" label="Master-Apikey"></el-table-column>
                    <el-table-column prop="status" sortable  width="120"  label="是否启用">
                        <template slot-scope="scope">
                            <el-switch class="switchStyle"
                                       v-model="scope.row.status"
                                       active-color="#1899EE"
                                       active-text="开启"
                                       @change="statusChange(scope.$index, scope.row)"
                                       inactive-color="#DBE0E6"
                                       inactive-text="关闭">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="note" sortable label="备注"></el-table-column>
                    <el-table-column prop="edit_date" sortable label="修改时间"></el-table-column>
                    <el-table-column label="操作"  width="260">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    class="add-call"
                                    @click="FormVisible = true;gatewayTitle='添加网关';gatewayData.pid = scope.row.id;gatewayData.master_apikey = scope.row.master_apikey">添加网关</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table ref="gatewayTable" :data="gatewayTable"
                                      @selection-change="gatewaySelectionChange"
                                      @expand-change="showStream"
                                      border class="next-table">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="gateway_name" sortable label="网关名称"></el-table-column>
                                <el-table-column prop="gateway_id" sortable label="网关ID"></el-table-column>
                                <el-table-column prop="net_type" sortable width="" label="联网方式"></el-table-column>
                                <el-table-column prop="gateway_pwd" sortable width="" label="网关密钥"></el-table-column>
                                <el-table-column prop="card_member" sortable width="" label="卡号"></el-table-column>
                                <el-table-column prop="status" sortable  width="120"  label="是否在线">
                                    <template slot-scope="scope">
                                        <el-switch class="switchStyle" @change="gatewayStatus(scope.$index, scope.row)" v-model="scope.row.status" active-color="#43CF7C" active-text="在线"
                                                   inactive-color="#DBE0E6" inactive-text="离线">
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="note" sortable width="" label="备注"></el-table-column>
                                <el-table-column prop="edit_date" sortable width="" label="修改时间"></el-table-column>
                                <el-table-column label="操作"  width="260">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="primary"
                                                @click="gatewayHandleEdit(scope.$index, scope.row)">编辑</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="gatewayHandleDelete(scope.$index, scope.row)">删除</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                class="add-call"
                                                @click="showAddStreamBox(scope.row)">添加数据流</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-table :data="streamTable" border class="next-table next-table-next">
                                            <el-table-column type="selection" width="55"></el-table-column>
                                            <el-table-column prop="stream_name" sortable label="数据流名称"></el-table-column>
                                            <el-table-column prop="cloud_var" sortable label="云变量"></el-table-column>
                                            <el-table-column prop="comp" sortable width="" label="单位"></el-table-column>
                                            <el-table-column prop="edit_date" sortable width="" label="修改时间"></el-table-column>
                                            <el-table-column label="操作"  width="180">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            size="mini"
                                                            type="primary"
                                                            @click="streamHandleEdit(scope.$index, scope.row)">编辑</el-button>
                                                    <el-button
                                                            size="mini"
                                                            type="danger"
                                                            @click="streamHandleDelete(scope.$index, scope.row)">删除</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[10, 20, 30]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                </el-pagination>
            </el-col>
        </el-col>
        <el-dialog class="baojing" :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="formData"  ref="formData">
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="工程名称" :required="true" >
                            <el-input v-model="formData.project_name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Master-Apikey" :required="true" >
                            <el-input v-model="formData.master_apikey" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否启用">
                            <el-col :span="6">
                            <el-radio v-model="formData.status" label="1">启用</el-radio>
                            </el-col>
                            <el-col :span="6">
                            <el-radio v-model="formData.status" label="0">禁用</el-radio>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="地址">
                            <el-input v-model="formData.address" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系人">
                            <el-input v-model="formData.contacts" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话">
                            <el-input v-model="formData.phone" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" >
                        <el-input v-model="formData.note" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAdd">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog  class="baojing gateway" :title="gatewayTitle" :visible.sync="FormVisible" width="40%">
            <el-form :model="gatewayData" ref="formData">
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="网关名称" :required="true">
                            <el-input v-model="gatewayData.gateway_name" autocomplete="off" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="网关ID"  :required="true">
                            <el-input v-model="gatewayData.gateway_id" autocomplete="off" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联网方式">
                            <el-col :span="12">
                                <el-radio v-model="gatewayData.net_type" label="网关MQTT">网关MQTT</el-radio>
                            </el-col>
                            <el-col :span="12">
                                <el-radio v-model="gatewayData.net_type" label="中移动EDP">中移动EDP</el-radio>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="网关密钥">
                            <el-input v-model="gatewayData.gateway_pwd" autocomplete="off" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="卡号">
                            <el-input v-model="gatewayData.card_member" autocomplete="off" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否在线">
                            <el-col :span="6">
                                <el-radio v-model="gatewayData.status" label="1">在线</el-radio>
                            </el-col>
                            <el-col :span="6">
                                <el-radio v-model="gatewayData.status" label="0">离线</el-radio>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" class="fa">
                        <el-input v-model="gatewayData.note" autocomplete="off" placeholder="备注信息"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="FormVisible = false">取 消</el-button>
                <el-button type="primary" @click="gatewayAdd">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog  :title="streamTitle" :visible.sync="StreamFormVisible" width="40%" class="baojing">
            <el-form :model="streamData" ref="formData">
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="数据流名称" :required="true" class="fa">
                            <el-input v-model="streamData.stream_name" autocomplete="off" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="云变量"  :required="true">
                            <el-select v-model="streamData.cloud_var" placeholder="选择云变量">
                                <el-option
                                        v-for="(item, index) in cloudVal"
                                        :label="item.id"
                                        :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="单位">
                            <el-input v-model="streamData.comp" autocomplete="off" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="StreamFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="streamAdd">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {addProject
        , getProjects
        , editproject
        , delProject
        , changeprojectstatus
        , addGateway
        , getGateway
        , editGateway
        , delGateway
        , changeGatewaystatus
        , addStream
        , getStream
        , editStream
        , delStream
        , getProjectList
        , searchPro
        , getCloudVal
    } from "../api/apis";

    export default {
        name: "Engin",
        data(){
            return{
                form:{
                    keyword: ''
                },
                dialogFormVisible: false,
                FormVisible: false,
                StreamFormVisible: false,
                formData: {
                    project_name: '',
                    contacts: '',
                    phone: '',
                    address: '',
                    master_apikey: '',
                    status: '1',
                    note: '',
                },
                gatewayData:{
                    gateway_name: '',
                    gateway_id: '',
                    master_apikey: '',
                    net_type: '',
                    gateway_pwd: '',
                    card_member: '',
                    status: '1',
                    note: '',
                    pid: 0,
                },
                streamData:{
                    stream_name: '',
                    cloud_var: '',
                    comp: '',
                    gid: 0
                },
                totalCount: 0,
                currentPage4: 1,
                tableData: [],
                gatewayTable:[],
                streamTable:[],
                multipleSelection: [],
                gatewaySelection: [],
                streamSelection: [],
                options: [],
                title:'',
                gatewayTitle: '',
                streamTitle: '',
                steamTitle: '',
                detail: {},
                offset: 0,
                limit: 10,
                cloudVal: []
            }
        },
        methods:{
            // 打开添加数据流表单
            showAddStreamBox(row){
                console.log(row);
                this.StreamFormVisible=true;
                this.streamTitle='添加数据流';
                this.streamData.gid=row.id
                //获取数据云变量
                getCloudVal({gateway_id: row.gateway_id, master_apikey: row.master_apikey}).then(res => {
                    if (res.code == 0){
                        this.cloudVal = res.data
                    }
                })
            },
            // 搜索工程
            searchProject(val){
                console.log(val)
                searchPro({id: val}).then(res => {
                    this.tableData = res.data;
                })
            },
            clickRefresh(){
                this.$router.go(0)
            },
            gatewaySelectionChange(val){
                this.gatewaySelection = val;
            },
            streamSelectionChange(val) {
                this.streamSelection = val;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //编辑工程
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.title = '修改工程管理信息';
                this.formData = row;
                this.formData.status = row.status ? '1' : '0';
            },
            //删除工程
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该工程和工程下对应的网关和数据流, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delProject({id: row.id}).then(res => {
                        if (res.code == 0){
                            this.clickRefresh();
                            this.tableData.splice(index,1);
                            this.$message({
                                type: 'success',
                                message:  res.msg
                            });

                        } else{
                            this.$message({
                                type: 'warning',
                                message: res.msg
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            // 提交工程
            onAdd(){
                if (this.formData.id){
                    editproject(this.formData).then(res => {
                        if (res.code == 0){
                            this.dialogFormVisible = false;
                            this.$router.go(0);
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            })
                        }
                    });
                } else{
                    addProject(this.formData).then(res => {
                        if (res.code == 0){
                            this.dialogFormVisible = false;
                            // this.$router.go(0);
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            })
                        }
                    });
                }
            },
            // 修改工程状态
            statusChange(index, row){
                let status = {
                    id: row.id,
                    status: row.status == true ? 1 : 0
                };
                this.$confirm('确定修改工程状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    changeprojectstatus(status).then(res => {
                        if (res.code == 0){
                            this.$router.go(0);
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });

                        } else{
                            this.$message({
                                type: 'warning',
                                message:  res.msg
                            });
                        }
                    })

                }).catch(() => {
                    this.$router.go(0);
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //编辑网关开关状态
            gatewayStatus(index, row){
                let status = {
                    id: row.id,
                    status: row.status == true ? 1 : 0
                };
                this.$confirm('确定修改在线状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    changeGatewaystatus(status).then(res => {
                        if (res.code == 0){
                            this.$router.go(0);
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });

                        } else{
                            this.$message({
                                type: 'warning',
                                message:  res.msg
                            });
                        }
                    })

                }).catch(() => {
                    this.$router.go(0);
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //编辑网关
            gatewayHandleEdit(index, row) {
                this.FormVisible = true;
                this.gatewayTitle = '修改网关信息';
                this.gatewayData = row;
                this.gatewayData.status = row.status ? '1' : '0';
            },
            //删除网关
            gatewayHandleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该网关, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delGateway({id: row.id}).then(res => {
                        console.log(res);
                        if (res.code == 0){
                            this.gatewayTable.splice(index,1);
                            this.$message({
                                type: 'success',
                                message:  res.msg
                            });

                        } else{
                            this.$message({
                                type: 'warning',
                                message: res.msg
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            //添加网关
            gatewayAdd(){
                if (this.gatewayData.id){
                    editGateway(this.gatewayData).then(res => {
                        if (res.code == 0){
                            this.FormVisible = false;
                            this.$router.go(0);
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            })
                        }
                    });
                } else{
                    addGateway(this.gatewayData).then(res => {
                        if (res.code == 0){
                            this.FormVisible = false;
                            // this.$router.go(0);
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            })
                        }
                    });
                }


            },
            //编辑数据流
            streamHandleEdit(index, row) {
                this.StreamFormVisible = true;
                this.gatewayTitle = '修改数据流信息';
                this.gatewayData = row;
                this.gatewayData.status = row.status ? '1' : '0';
            },
            //删除数据流
            streamHandleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该网关, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delStream({id: row.id}).then(res => {
                        console.log(res);
                        if (res.code == 0){
                            this.streamTable.splice(index,1);
                            this.$message({
                                type: 'success',
                                message:  res.msg
                            });

                        } else{
                            this.$message({
                                type: 'warning',
                                message: res.msg
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            //添加数据流
            streamAdd(){
                if (this.streamData.id){
                    editStream(this.streamData).then(res => {
                        if (res.code == 0){
                            this.StreamFormVisible = false;
                            this.$router.go(0);
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            })
                        }
                    });
                } else{
                    addStream(this.streamData).then(res => {
                        if (res.code == 0){
                            this.dialogFormVisible = false;
                            this.$router.go(0);
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            })
                        }
                    });
                }


            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            showGateway(row,expandedRows){
                const $classTable = this.$refs.multipleTable;
                if (expandedRows.length > 1) {
                    expandedRows.forEach(expandRow => {
                        if (row.id !== expandRow.id) {
                            $classTable.toggleRowExpansion(expandRow, false);
                        }else{
                            console.log(row.id);
                            getGateway({pid: row.id}).then(res => {
                                if (res.code == 0){
                                    this.gatewayTable = res.data;
                                } else{
                                    this.$message('服务器忙，请稍后再试！');
                                }
                            });
                        }
                    })
                }else{
                    let pid = expandedRows[0].id ? expandedRows[0].id : row.id;
                    getGateway({pid: pid}).then(res => {
                        if (res.code == 0){
                            this.gatewayTable = res.data;
                        } else{
                            this.$message('服务器忙，请稍后再试！');
                        }
                    });
                }
            },
            showStream(row,expandedRows){
                const $classTable = this.$refs.gatewayTable;
                if (expandedRows.length > 1) {
                    this.streamTable = [];
                        expandedRows.forEach(expandRow => {
                        if (row.id !== expandRow.id) {
                            $classTable.toggleRowExpansion(expandRow, false)
                        }else{
                            getStream({gid: row.id}).then(res => {
                                if (res.code == 0){
                                    this.streamTable = res.data;
                                } else{
                                    this.$message('服务器忙，请稍后再试！');
                                }
                            });
                        }
                    })
                }else{
                    let gid = expandedRows[0].id ? expandedRows[0].id : row.id;
                    getStream({gid: gid}).then(res => {
                        if (res.code == 0){
                            this.streamTable = res.data;
                        } else{
                            this.$message('服务器忙，请稍后再试！');
                        }
                    });
                }


            },
        },
        mounted() {
            getProjects({offset: this.offset, limit: this.limit}).then(res => {
                if (res.code == 0){
                    this.totalCount = Number(res.data.totalCount);
                    this.currentPage4 = res.data.page;
                    this.tableData = res.data.data;
                } else{
                    this.$message('服务器忙，请稍后再试！');
                }
            });

            getProjectList().then(res => {
                if (res.code == 0){
                    this.options = res.data;
                } else{
                    this.$message('服务器忙，请稍后再试！');
                }
            });
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/Engin";
</style>