<template>
    <div class="called">
        <el-col :span="24" class="content-box">
            <el-col :span="24">
                <el-form ref="form" v-model="form">
                    <div class="top-form">
                        <el-col :span="18">
                            <el-input v-model="form.keyword" placeholder="请输入搜索内容"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button icon="el-icon-search" @click="search"></el-button>
                        </el-col>
                    </div>
                </el-form>
                <el-button type="primary" @click="formData.pid='';dialogFormVisible = true">添加</el-button>
                <el-button type="danger" @click="allDel">删除</el-button>
                <el-button type="primary" @click="clickRefresh">刷新</el-button>
            </el-col>
            <el-col :span="24">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        border
                        @selection-change="handleSelectionChange"
                        @expand-change="showTriggerTable"
                        :default-sort = "{order: 'descending'}"
                        tooltip-effect="dark">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="project_name" sortable label="工程名称"></el-table-column>
                    <el-table-column prop="call_name" sortable label="报警名称"></el-table-column>
                    <el-table-column prop="call_type" sortable width="120" label="报警方式">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.call_type">{{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="call_phone" sortable width="120" label="报警电话">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.call_phone">{{item.tel}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_use" sortable  width="120"  label="是否启用">
                        <template slot-scope="scope">
                            <el-switch class="switchStyle" v-model="scope.row.status" active-color="#1899EE" active-text="开启"
                                       inactive-color="#DBE0E6" inactive-text="关闭">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="call_time_interval" sortable  width="120"  label="报警间隔"></el-table-column>
                    <el-table-column prop="call_note" sortable label="自定义信息"></el-table-column>
                    <el-table-column prop="edit_date" sortable label="修改时间"></el-table-column>
                    <el-table-column label="操作"  width="260">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="formData.id = scope.row.id; handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    class="add-call"
                                    @click="triggerForm.gid='';triggerForm.sid='';showTriggerForm(scope.row.id, scope.row.pid);">添加触发器</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="triggerData" border class="next-table">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="gateway_name" sortable label="网关"></el-table-column>
                                <el-table-column prop="stream_name" sortable label="数据流"></el-table-column>
                                <el-table-column prop="equation" sortable width="120" label="等式">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.equation == '>'">大于</div>
                                        <div v-else-if="scope.row.equation == '>='">大于等于</div>
                                        <div v-if="scope.row.equation == '<'">小于</div>
                                        <div v-if="scope.row.equation == '<='">小于等于</div>
                                        <div v-if="scope.row.equation == '=='">等于</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="threshold" sortable width="120" label="阀值"></el-table-column>
                                <el-table-column prop="edit_date" sortable width="120" label="修改时间"></el-table-column>
                                <el-table-column label="操作"  width="260">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="primary"
                                                @click="triggerHandleEdit(scope.$index, scope.row)">编辑</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="triggerHandleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="page-box">
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
        </el-col>
        <el-dialog class="baojing" title="新增报警设备信息" :visible.sync="dialogFormVisible">
            <el-form :model="formData" ref="formData">
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="工程"  :required="true">
                            <el-select v-model="formData.pid"  placeholder="选择工程">
                                <el-option
                                        v-for="(item, index) in options"
                                        :label="item.project_name"
                                        :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报警名称" :required="true" >
                            <el-input v-model="formData.call_name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报警方式">
                            <el-checkbox-group v-model="formData.call_type">
                                <el-checkbox label="app" name="type"></el-checkbox>
                                <el-checkbox label="短信" name="type"></el-checkbox>
                                <el-checkbox label="电话" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="报警电话" class="call_phone">
                            <el-col v-for="item in formData.call_phone">
                                <el-col :span="14"><el-input v-model="item.tel" autocomplete="off" type="number"></el-input></el-col>
                                <el-col :span="8">
                                    <el-button size="mini" type="default" @click="Ephone('del')">-</el-button>
                                    <el-button size="mini" type="default" @click="Ephone('add')">+</el-button>
                                </el-col>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报警间隔">
                            <el-input v-model="formData.call_time_interval" autocomplete="off" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="自定义消息">
                            <el-input v-model="formData.call_note" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="callAdd">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加触发器" :visible.sync="FormVisible" width="40%" class="call-form-data">
            <el-form :model="triggerForm" ref="triggerForm">
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="网关"  :required="true">
                            <el-select v-model="triggerForm.gid" @change="getTriggerVal" placeholder="选择网关">
                                <el-option
                                        v-for="item in gateways"
                                        :label="item.gateway_name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数据流"  :required="true">
                            <el-select v-model="triggerForm.sid" placeholder="选择数据流">
                                <el-option
                                        v-for="item in streams"
                                        :label="item.stream_name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="等式"  :required="true">
                            <el-select v-model="triggerForm.equation" placeholder="选择等式">
                                <el-option label="大于等于" value=">="></el-option>
                                <el-option label="小于等于" value="<="></el-option>
                                <el-option label="等于" value="=="></el-option>
                                <el-option label="大于" value=">"></el-option>
                                <el-option label="小于" value="<"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="阀值" class="fa">
                            <el-input v-model="triggerForm.threshold" autocomplete="off" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="FormVisible = false">取 消</el-button>
                <el-button type="primary" @click="triggerAdd">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getProjectList
        , getCall
        , addCall
        , editCall
        , delCall
        , getProjectGateway
        , getGatewayStream
        , addTrigger
        , editTrigger
        , delTrigger
        , getTrigger
    } from "../api/apis";

    export default {
        name: "Called",
        data(){
            return{
                form:{
                    keyword: ''
                },
                dialogFormVisible: false,
                FormVisible: false,
                formData: {
                    pid: '',
                    call_name: '',
                    call_type: [],
                    call_phone: [
                        {tel: ''},
                    ],
                    call_time_interval: '',
                    call_note: '',
                    status: 1
                },
                triggerForm:{
                    gid: '',
                    sid: '',
                    equation: '',
                    threshold: '',
                },
                currentPage: 1,
                totalCount: 0,
                tableData: [],
                triggerData:[],
                options: [],
                multipleSelection: [],
                offset: 0,
                limit:10,
                gateways: [],
                streams: [],
            }
        },
        methods:{
            getTriggerVal(val){
                getGatewayStream({gid: val}).then(res => {
                    if (res.code == 0){
                        this.streams = res.data
                    }
                })
            },
            /**
             * @param id 当前的报警ID
             * @param pid 当前报警器上级工程ID
             */
            showTriggerForm(id, pid){
                this.triggerForm.cid = id;
                this.FormVisible = true;
                this.streams = [];
                this.gateways = [];
                getProjectGateway({pid: pid}).then(res => {
                    if (res.code == 0){
                        this.gateways = res.data
                    }
                })
            },
            clickRefresh(){
                this.$router.go(0)
            },
            getRecord(offset, limit, field){
                let where = {
                    offset: offset,
                    limit: limit,
                };
                if (field){
                    Object.assign(where,field)
                }
                getCall(where).then(res => {
                    if (res.code == 0){
                        this.totalCount = Number(res.data.totalCount);
                        this.currentPage4 = res.data.page;
                        this.tableData = res.data.data;
                    } else{
                        this.$message('服务器忙，请稍后再试！');
                    }
                });
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.formData = row;
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该报警器以及下级触发器, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delCall({id: row.id}).then(res => {
                        if (res.code == 0){

                            this.triggerData.splice(index,1);
                            this.$message({
                                type: 'success',
                                message:  res.msg
                            });
                            this.clickRefresh();
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
            triggerHandleEdit(index, row) {
                this.FormVisible = true;
                this.triggerForm= row;
                console.log(this.triggerForm);
            },
            triggerHandleDelete(index, row) {
                // console.log(index, row);return;
                this.$confirm('此操作将永久删除该触发器, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delTrigger({id: row.id}).then(res => {
                        if (res.code == 0){
                            this.clickRefresh();
                            this.triggerData.splice(index,1);
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
            handleAdd(index, row) {
                console.log(index, row);
            },
            handleDetail(index,row){
                console.log(index, row);
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                let offset = 0;
                let limit = val;
                this.offset = offset;
                this.limit = limit;
                this.getRecord(this.offset, this.limit, this.form)
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                if (val == 1){
                    let offset = 0;
                    this.getRecord(offset, this.limit, this.form)
                } else{
                    this.offset = this.limit * (val - 1);
                    this.getRecord(this.offset, this.limit, this.form)
                }
            },
            //删除数据流
            streamHandleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该报警通知以及下级触发器, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delCall({id: row.id}).then(res => {
                        console.log(res);
                        if (res.code == 0){
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
            callAdd(){
                if (this.formData.id){
                    editCall(this.formData).then(res => {
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
                    addCall(this.formData).then(res => {
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
            triggerAdd(){
                this.FormVisible = false;
                if (this.triggerForm.id){
                    editTrigger(this.triggerForm).then(res => {
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
                    addTrigger(this.triggerForm).then(res => {
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
                }
            },
            Ephone(type){
                if (type == 'add'){
                    let len = this.formData.call_phone.length;
                    if (len == 1){
                        this.formData.call_phone.push({tel: ''})
                    } else if (len == 2) {
                        this.formData.call_phone.push({tel: ''})
                    }else if(len == 3) {
                        this.$message({
                            message: '最多只能设置三个号码',
                            type: 'warning'
                        })
                    }
                } else if (type == 'del') {
                    let len = this.formData.call_phone.length;
                    if (len == 1){
                        this.$message({
                            message: '最少要设置一个通知电话',
                            type: 'warning'
                        });
                        return;
                    }
                    this.formData.call_phone.pop()
                }
            },
            showTriggerTable(row,expandedRows) {
                const $classTable = this.$refs.multipleTable;
                if (expandedRows.length == 0)return;
                if (expandedRows.length > 1) {
                    expandedRows.forEach(expandRow => {
                        if (row.id !== expandRow.id) {
                            $classTable.toggleRowExpansion(expandRow, false);
                        } else {
                            console.log(row.id);
                            getTrigger({cid: row.id}).then(res => {
                                if (res.code == 0) {
                                    this.triggerData = res.data;
                                } else {
                                    this.$message('服务器忙，请稍后再试！');
                                }
                            });
                        }
                    })
                } else {
                    let id = expandedRows[0].id ? expandedRows[0].id : row.id;
                    getTrigger({cid: id}).then(res => {
                        if (res.code == 0) {
                            this.triggerData = res.data;
                        } else {
                            this.$message('服务器忙，请稍后再试！');
                        }
                    });
                }
            },
            //保存选中结果
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            allDel(){
                console.info(this.multipleSelection);
                // console.info(this.$refs.multipleTable.tableData);
                // console.info(this.$refs.multipleTable);
            },
            search(){
                this.getRecord(this.offset,this.limit,this.form);
            }
        },
        mounted() {
            this.getRecord(this.offset,this.limit,this.form);

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

<style lang="scss" scoped>
@import "../assets/css/called";
.top-form{
    width: 240px;
    margin-right: 5px !important;
    overflow: hidden;
    float: left;
}
.called .el-col-24 .el-col-24{
    margin: 0 !important;
    margin-bottom: 16px !important;
}
</style>