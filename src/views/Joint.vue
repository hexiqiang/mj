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
                <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
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
                                <div v-for="triggered in scope.row.trigger_condition">{{triggered.gateway}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column  label="数据流">
                            <template slot-scope="scope">
                                <div v-for="triggered in scope.row.trigger_condition">{{triggered.data_stream}}</div>
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
                                <div v-for="issue in scope.row.issue_orders">{{issue.gateway}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="数据流">
                            <template slot-scope="scope">
                                <div v-for="issue in scope.row.issue_orders">{{issue.data_stream}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="触发值">
                            <template slot-scope="scope">
                                <div v-for="issue in scope.row.issue_orders">{{issue.trigger_value}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="恢复值">
                            <template slot-scope="scope">
                                <div v-for="issue in scope.row.issue_orders">{{issue.recovery}}</div>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="condition" width="60" label="条件"></el-table-column>
                    <el-table-column prop="trigger_date" sortable  width="100"  label="触发时间"></el-table-column>
                    <el-table-column prop="recovery_date" sortable  width="100"  label="恢复时间"></el-table-column>
                    <el-table-column prop="recovery_date" sortable  width="100"  label="修改时间"></el-table-column>
                    <el-table-column prop="note" sortable label="备注"></el-table-column>
                    <el-table-column label="操作"  width="180">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
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
        <el-dialog class="baojing" title="新增联控管理信息" :visible.sync="dialogFormVisible">
            <el-form :model="formData" ref="formData">
                <el-col :span="24">
                    <p><strong>设置基本信息</strong></p>
                    <el-col :span="8">
                        <el-form-item label="联控名称"  :required="true">
                            <el-input v-model="formData.join_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报警名称">
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
                                <el-select v-if="index > 0"  v-for="(item, index) in formData.trigger_condition" v-model="formData.condition" placeholder="选择条件">
                                    <el-option label="或" value="或"></el-option>
                                    <el-option label="且" value="且"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="工程" :required="true">
                                <el-select v-for="item in formData.trigger_condition" v-model="item.project_name" placeholder="选择工程">
                                    <el-option label="祥源综合园区" value="祥源综合园区"></el-option>
                                    <el-option label="淮安温氏" value="淮安温氏"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="网关" :required="true">
                                <el-select v-for="item in formData.trigger_condition" v-model="item.gateway" placeholder="选择网关">
                                    <el-option label="钟总家热水控制" value="钟总家热水控制"></el-option>
                                    <el-option label="变频供水设备" value="变频供水设备"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="数据流" :required="true">
                                <el-select v-for="item in formData.trigger_condition" v-model="item.data_stream" placeholder="选择数据流">
                                    <el-option label="供水压力" value="供水压力"></el-option>
                                    <el-option label="水池水位" value="水池水位"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="等式" :required="true">
                                <el-select v-for="item in formData.trigger_condition" v-model="item.equation" placeholder="选择等式">
                                    <el-option label="大于" value="大于"></el-option>
                                    <el-option label="小于" value="小于"></el-option>
                                    <el-option label="等于" value="等于"></el-option>
                                    <el-option label="大于等于" value="大于等于"></el-option>
                                    <el-option label="小于等于" value="小于等于"></el-option>
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
                                <el-select v-for="item in formData.issue_orders" v-model="item.project_name" placeholder="选择工程">
                                    <el-option label="祥源综合园区" value="祥源综合园区"></el-option>
                                    <el-option label="淮安温氏" value="淮安温氏"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="网关" :required="true">
                                <el-select v-for="item in formData.issue_orders" v-model="item.gateway" placeholder="选择网关">
                                    <el-option label="钟总家热水控制" value="钟总家热水控制"></el-option>
                                    <el-option label="变频供水设备" value="变频供水设备"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="数据流" :required="true">
                                <el-select v-for="item in formData.issue_orders" v-model="item.data_stream" placeholder="选择数据流">
                                    <el-option label="供水压力" value="供水压力"></el-option>
                                    <el-option label="水池水位" value="水池水位"></el-option>
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
                                <el-input v-for="item in formData.issue_orders" v-model.number="item.recovery"></el-input>
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
                            project_name: '',
                            gateway: '',
                            data_stream: '',
                            equation: '',
                            threshold: '',
                        }
                    ],
                    issue_orders: [
                        {
                            project_name: '',
                            gateway: '',
                            data_stream: '',
                            trigger_value: '',
                            recovery: '',
                        }
                    ],
                    condition: '',
                    note:''
                },
                currentPage4: 1,
                tableData: [{
                    join_name: '从化温泉', // 联控名称
                    trigger_condition: [
                        {project_name: '祥顺园区',gateway:'水池基站',data_stream: '水位',equation: '大于等于',threshold: 1.2},
                        {project_name: '祥顺园区',gateway:'水池基站',data_stream: '水位',equation: '大于等于',threshold: 1.2}
                    ], //触发条件
                    issue_orders: [
                        {project_name: '祥顺园区',gateway:'水池基站',data_stream: '阀门',trigger_value: 256,recovery: 257},
                        {project_name: '祥顺园区',gateway:'水池基站',data_stream: '阀门',trigger_value: 256,recovery: 257}
                    ], //下发命令
                    condition: '且', //条件
                    trigger_date: '2022-02-01', // 触发时间
                    recovery_date: '2022-02-01', // 恢复时间
                    edit_date: '2022-02-03',// 修改时间
                    note: '备注信息' //备注
                }],
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
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleAdd(index, row) {
                console.log(index, row);
            },
            handleDetail(index,row){
                console.log(index, row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            onAdd(){
                this.dialogFormVisible = false;
                this.tableData.push(this.formData)
                console.log(this.formData)
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
                        let sue = {  project_name: '', gateway: '', data_stream: '', trigger_value: '', recovery: ''};
                        this.pushData(len1, 'issue_orders', sue);
                    }else if (option == 'trig') {
                        let len = this.formData.trigger_condition.length;
                        let tir = {  project_name: '', gateway: '', data_stream: '', equation: '', threshold: ''};
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
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/joint";
</style>