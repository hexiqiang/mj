<template>
    <div class="joint">
        <el-col :span="24">
            <el-col :span="6">
                <el-form ref="form" v-model="form">
                    <el-col :span="18">
                        <el-input v-model="form.keyword" placeholder="请输入搜索内容"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button icon="el-icon-search"></el-button>
                    </el-col>
                </el-form>
            </el-col>
            <el-col :span="18">
                <el-button type="primary" @click="dialogFormVisible = true;title='新增联控管理信息'">添加</el-button>
                <el-button type="danger">删除</el-button>
                <el-button type="primary" @click="clickRefresh">刷新</el-button>
            </el-col>
            <el-col :span="24">
                <el-table
                        class="join_table"
                        ref="multipleTable"
                        :data="tableData"
                        border
                        @selection-change="handleSelectionChange"
                        :default-sort = "{order: 'descending'}"
                        tooltip-effect="dark">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="join_name" sortable label="联控名称" ></el-table-column>
                    <el-table-column sortable prop="trigger_condition"  label="触发条件" align="center">
                        <el-table-column  label="工程">
                            <template slot-scope="scope">
                                <div v-for="triggered in scope.row.trigger_condition">{{triggered.project_name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column  label="网关">
                            <template slot-scope="scope">
                                <div v-for="triggered in scope.row.trigger_condition">{{triggered.gateway_name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column  label="数据流">
                            <template slot-scope="scope">
                                <div v-for="triggered in scope.row.trigger_condition">{{triggered.stream_name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column  label="等式">
                            <template slot-scope="scope">
                                <div v-for="triggered in scope.row.trigger_condition">{{triggered.equation}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="阀值" width="60">
                            <template slot-scope="scope">
                                <div v-for="triggered in scope.row.trigger_condition">{{triggered.threshold}}</div>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column sortable prop="issue_orders" label="下发命令" align="center">
                        <el-table-column  label="工程">
                            <template slot-scope="scope">
                                <div v-for="issue in scope.row.issue_orders">{{issue.project_name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="网关">
                            <template slot-scope="scope">
                                <div v-for="issue in scope.row.issue_orders">{{issue.gateway_name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="数据流">
                            <template slot-scope="scope">
                                <div v-for="issue in scope.row.issue_orders">{{issue.stream_name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="触发值">
                            <template slot-scope="scope">
                                <div v-for="issue in scope.row.issue_orders">{{issue.trigger_value}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="恢复值">
                            <template slot-scope="scope">
                                <div v-for="issue in scope.row.issue_orders">{{issue.recovery_value}}</div>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="condition" width="60" label="条件">
                        <template slot-scope="scope">
                            <div v-for="(issue ,index) in scope.row.trigger_condition"  :class="index == 0  ?  'first' : ''">{{issue.condition == '&&' ? '且' : issue.condition == '||' ? '或' : ''}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="trigger_date" sortable  width="100"  label="触发时间"></el-table-column>
                    <el-table-column prop="recovery_date" sortable  width="100"  label="恢复时间"></el-table-column>
                    <el-table-column prop="edit_date" sortable  width="100"  label="修改时间"></el-table-column>
                    <el-table-column prop="note" sortable label="备注"></el-table-column>
                    <el-table-column label="操作"  width="180">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row);title='编辑联控管理信息';dialogFormVisible=true">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                </el-pagination>
            </el-col>
        </el-col>
        <el-dialog class="baojing" :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="formData" ref="formData">
                <el-col :span="24">
                    <p><strong>设置基本信息</strong></p>
                    <el-col :span="8">
                        <el-form-item label="联控名称"  :required="true">
                            <el-input v-model="formData.join_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注">
                            <el-input v-model="formData.note"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <p><strong>设置触发条件</strong></p>
                    <el-col :span="24">
                        <el-col :span="3">
                            <el-form-item label="条件"  :required="true">
                                <div style="height:56px"></div>
                                <el-select v-if="index > 0"  v-for="(item, index) in formData.trigger_condition" v-model="item.condition" placeholder="选择条件">
                                    <el-option label="或" value="||"></el-option>
                                    <el-option label="且" value="&&"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="工程" :required="true">
                                <el-select v-for="(item, index) in formData.trigger_condition" v-model="item.pid" @change="selectTriggerProject($event, index)" placeholder="选择工程">
                                    <el-option
                                            v-for="item in trigger_projects"
                                            :label="item.project_name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="网关" :required="true">
                                <el-select v-for="(item, index, key) in formData.trigger_condition" v-model="item.gid" @change="selectTriggerGateway($event, index)" placeholder="选择网关">
                                    <el-option v-for="item in trigger_gateways[index]"
                                               :label="item.gateway_name"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="数据流" :required="true">
                                <el-select v-for="(item, index) in formData.trigger_condition" v-model="item.sid" placeholder="选择数据流">
                                    <el-option v-for="item in trigger_streams[index]"
                                               :label="item.stream_name"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="等式" :required="true">
                                <el-select v-for="item in formData.trigger_condition" v-model="item.equation" placeholder="选择等式">
                                    <el-option label="大于" value=">"></el-option>
                                    <el-option label="小于" value="<"></el-option>
                                    <el-option label="等于" value="="></el-option>
                                    <el-option label="大于等于" value=">="></el-option>
                                    <el-option label="小于等于" value="<="></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="阀值" :required="true">
                                <el-input v-for="item in formData.trigger_condition" v-model.number="item.threshold" placeholder="请输入阀值"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="操作">
                                <el-col :span="23" v-for="item in formData.trigger_condition">
                                    <el-button  size="mini" type="default" @click="addCond('add','trig')">+</el-button>
                                    <el-button  size="mini" type="default" @click="addCond('del','trig')">-</el-button>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <p><strong>设置下发命令</strong></p>
                    <el-col :span="24">
                        <el-col :span="4">
                            <el-form-item label="工程" :required="true">
                                <el-select v-for="(item, index) in formData.issue_orders" v-model="item.pid" @change="selectOrderProject($event, index)" placeholder="选择工程">
                                    <el-option
                                            v-for="item in order_projects"
                                            :label="item.project_name"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="网关" :required="true">
                                <el-select v-for="(item, index) in formData.issue_orders" v-model="item.gid" @change="selectOrderGateway($event, index)" placeholder="选择网关">
                                    <el-option v-for="item in order_gateways[index]"
                                               :label="item.gateway_name"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="数据流" :required="true">
                                <el-select v-for="(item, index) in formData.issue_orders" v-model="item.sid" placeholder="选择数据流">
                                    <el-option v-for="item in order_streams[index]"
                                               :label="item.stream_name"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="触发控制值" :required="true">
                                <el-input v-for="item in formData.issue_orders" v-model.number="item.trigger_value"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="恢复控制值" :required="true">
                                <el-input v-for="item in formData.issue_orders" v-model.number="item.recovery_value"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="操作">
                                <el-col :span="23" v-for="item in formData.issue_orders">
                                    <el-button size="mini" type="default" @click="addCond('add','issue')">+</el-button>
                                    <el-button size="mini" type="default" @click="addCond('del','issue')">-</el-button>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-col>

                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAdd">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        addJoins
        , editJoins
        , delJoins
        , getJoins
        , getProjectList
        , getProjectGateway
        , getGatewayStream
    } from "../api/apis";

    export default {
        name: "Joint",
        data(){
            return{
                form:{
                    keyword: ''
                },
                dialogFormVisible: false,
                formData: {
                    join_name: '',
                    trigger_condition: [
                        {
                            pid: '',
                            gid: '',
                            sid: '',
                            equation: '',
                            threshold: '',
                            condition: '',
                        }
                    ],
                    issue_orders: [
                        {
                            pid: '',
                            gid: '',
                            sid: '',
                            trigger_value: '',
                            recovery_value: '',
                        }
                    ],
                    note:''
                },
                currentPage: 1,
                totalCount: 20,
                tableData: [],
                multipleSelection: [],
                title: '',
                trigger_projects: [],
                order_projects: [],
                trigger_gateways: [],
                order_gateways: [],
                trigger_streams: [],
                order_streams: [],
                offset: 0,
                limit: 10
            }
        },
        methods:{
            clickRefresh(){
                this.$router.go(0)
            },
            getRecord(offset, limit){
                getJoins({offset: offset, limit: limit}).then(res => {
                    if (res.code == 0){
                        this.totalCount = Number(res.data.totalCount);
                        this.tableData = res.data['data']
                    } else{
                        this.$message('暂无数据')
                    }

                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.formData = row
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该联控, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delJoins({id: row.id}).then(res => {
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
            handleAdd(index, row) {
                console.log(index, row);
            },
            handleDetail(index,row){
                console.log(index, row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                let offset = 0;
                let limit = val;
                this.offset = offset;
                this.limit = limit;
                this.getRecord(this.offset, this.limit)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                if (val == 1){
                    let offset = 0;
                    this.getRecord(offset, this.limit)
                } else{
                    this.offset = this.limit * (val - 1);
                    this.getRecord(this.offset, this.limit)
                }
            },
            onAdd(){
                if (this.formData.id) {

                }else{
                    addJoins(this.formData).then(res => {
                        if (res.code == 0){
                            this.dialogFormVisible = false;
                            this.$message({message: res.msg, type: 'success'});
                            this.clickRefresh()
                        } else{
                            this.$message({message: res.msg, type: 'warning'});
                        }
                    })
                }
            },
            pushData(len, field,data){
                if (len < 3){
                    this.formData[field].push(data)
                    console.log(this.formData[field])
                }else if(len == 3) {
                    this.$message({
                        message: '最多只能设置三条命令',
                        type: 'warning'
                    })
                }
            },
            popData(len, field){
                if (len == 1){
                    this.$message({
                        message: '最少要设置一个',
                        type: 'warning'
                    });
                    return;
                }
                this.formData[field].pop();
            },
            addCond(type, option){
            // @click="addCond('add','issue')"trig
                if (type == 'add'){
                    if (option == 'issue') {
                        let len1 = this.formData.issue_orders.length;
                        let sue = {  pid: '', gid: '', sid: '', trigger_value: '', recovery: ''};
                        this.pushData(len1, 'issue_orders', sue);
                    }else if (option == 'trig') {
                        let len = this.formData.trigger_condition.length;
                        let tir = {  pid: '', gid: '', sid: '', equation: '', threshold: ''};
                        this.pushData(len, 'trigger_condition', tir);
                    }
                } else if (type == 'del') {
                    if (option == 'issue') {
                        let len = this.formData.issue_orders.length;
                        this.popData(len,'issue_orders');
                        return
                    }
                    if (option == 'trig') {
                        let len = this.formData.trigger_condition.length;
                        this.popData(len,'trigger_condition');
                        return
                    }
                }
            },
            selectTriggerProject(val, index){
                this.trigger_gateways[index] = [];
                getProjectGateway({pid: val}).then(res => {
                    if (res.code == 0){
                        this.trigger_gateways[index] = res.data
                        this.$forceUpdate()
                    }
                })
            },
            selectTriggerGateway(val, index){
                this.trigger_streams[index] = [];
                getGatewayStream({gid: val}).then(res => {
                    if (res.code == 0){
                        this.trigger_streams[index] = res.data
                        this.$forceUpdate()
                    }
                })
            },
            selectOrderProject(val, index){
                this.order_gateways[index] = [];
                getProjectGateway({pid: val}).then(res => {
                    if (res.code == 0){
                        this.order_gateways[index] = res.data
                        this.$forceUpdate()
                    }
                })
            },
            selectOrderGateway(val, index){
                this.order_streams[index] = [];
                getGatewayStream({gid: val}).then(res => {
                    if (res.code == 0){
                        this.order_streams[index] = res.data
                        this.$forceUpdate()
                    }
                })
            }
        },
        mounted() {
            getProjectList().then(res => {
                if (res.code == 0){
                    this.trigger_projects = res.data;
                    this.order_projects = res.data;
                }
            })
            this.getRecord(this.offset, this.limit)
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/joint";
    .first{
        padding: 10px;
    }
</style>