<template>
    <div class="called">
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
                        ref="multipleTable"
                        :data="tableData"
                        border
                        @selection-change="handleSelectionChange"
                        :default-sort = "{order: 'descending'}"
                        tooltip-effect="dark">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="project_name" sortable label="工程名称"></el-table-column>
                    <el-table-column prop="call_name" sortable label="报警名称"></el-table-column>
                    <el-table-column prop="call_type" sortable width="120" label="报警方式"></el-table-column>
                    <el-table-column prop="call_tel" sortable width="120" label="报警电话"></el-table-column>
                    <el-table-column prop="is_use" sortable  width="120"  label="是否启用">
                        <template slot-scope="scope">
                            <el-switch class="switchStyle" v-model="scope.row.is_use" active-color="#1899EE" active-text="开启"
                                       inactive-color="#DBE0E6" inactive-text="关闭">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="call_int" sortable  width="120"  label="报警间隔"></el-table-column>
                    <el-table-column prop="message" sortable label="自定义信息"></el-table-column>
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
                                    @click="FormVisible = true">添加触发器</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="calleds" border class="next-table">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="gateway" sortable label="网关"></el-table-column>
                                <el-table-column prop="data_stream" sortable label="数据流"></el-table-column>
                                <el-table-column prop="equation" sortable width="120" label="等式"></el-table-column>
                                <el-table-column prop="threshold" sortable width="120" label="阀值"></el-table-column>
                                <el-table-column prop="edit_date" sortable width="120" label="修改时间"></el-table-column>
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
                                    </template>
                                </el-table-column>
                            </el-table>
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
        <el-dialog class="baojing" title="新增报警设备信息" :visible.sync="dialogFormVisible">
            <el-form :model="formData" ref="formData">
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="工程"  :required="true">
                            <el-select v-model="formData.project_name" placeholder="选择工程">
                                <el-option label="工程一" value="工程一"></el-option>
                                <el-option label="工程二" value="工程二"></el-option>
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
                            <el-checkbox-group v-model="formData.type">
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
                            <el-col v-for="item in formData.phone">
                                <el-col :span="14"><el-input v-model="item.tel" autocomplete="off"></el-input></el-col>
                                <el-col :span="8">
                                    <el-button size="mini" type="default" @click="Ephone('del')">-</el-button>
                                    <el-button size="mini" type="default" @click="Ephone('add')">+</el-button>
                                </el-col>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报警间隔">
                            <el-input v-model="formData.call_int" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="自定义消息">
                            <el-input v-model="formData.message" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAdd">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加触发器" :visible.sync="FormVisible" width="40%" class="call-form-data">
            <el-form :model="callData" ref="formData">
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="工程"  :required="true">
                            <el-select v-model="callData.gateway" placeholder="选择工程">
                                <el-option label="工程一" value="工程一"></el-option>
                                <el-option label="工程二" value="工程二"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数据流"  :required="true">
                            <el-select v-model="callData.data_stream" placeholder="选择数据流">
                                <el-option label="数据流一" value="数据流一"></el-option>
                                <el-option label="数据流二" value="数据流二"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="等式"  :required="true">
                            <el-select v-model="callData.equation" placeholder="选择等式">
                                <el-option label="大于等于" value="大于等于"></el-option>
                                <el-option label="小于等于" value="小于等于"></el-option>
                                <el-option label="等于" value="等于"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="阀值" class="fa">
                            <el-input v-model="formData.threshold" autocomplete="off" placeholder=""></el-input>
                        </el-form-item>
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
        name: "Called",
        data(){
            return{
                form:{
                    keyword: ''
                },
                dialogFormVisible: false,
                FormVisible: false,
                formData: {
                    project_name: '',
                    call_name: '',
                    type: [],
                    phone: [
                        {tel: ''},
                    ],
                    call_int: '',
                    message: '',
                },
                callData:{
                    gateway: '',
                    data_stream: '',
                    equation: '',
                    threshold: '',
                },
                currentPage4: 1,
                tableData: [{
                    project_name: '从化温泉',
                    call_name: '温水口',
                    call_type: '短信通知',
                    call_tel: '13800138000',
                    is_use: true,
                    call_int: '30分钟',
                    message: '自定义信息',
                    edit_date: '2022-02-03'
                },{
                    project_name: '惠州温泉',
                    call_name: '温水口',
                    call_type: 'app通知',
                    call_tel: '13800138000',
                    is_use: false,
                    cal_int: '30分钟',
                    message: '自定义信息',
                    edit_date: '2022-01-03'
                },],
                calleds:[
                    {
                        gateway: '温水口',
                        data_stream: '200',
                        equation: '',
                        threshold: '1.2',
                        edit_date: '2022-01-25'
                    }
                ],
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
                console.log(this.formData)
            },
            Ephone(type){
                if (type == 'add'){
                    let len = this.formData.phone.length;
                    if (len == 1){
                        this.formData.phone.push({tel: ''})
                    } else if (len == 2) {
                        this.formData.phone.push({tel: ''})
                    }else if(len == 3) {
                        this.$message({
                            message: '最多只能设置三个号码',
                            type: 'warning'
                        })
                    }
                } else if (type == 'del') {
                    let len = this.formData.phone.length;
                    if (len == 1){
                        this.$message({
                            message: '最少要设置一个通知电话',
                            type: 'warning'
                        });
                        return;
                    }
                    this.formData.phone.pop()
                }
            }
        }
    }
</script>

<style lang="scss">
@import "../assets/css/called";
</style>