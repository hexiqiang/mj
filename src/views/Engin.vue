<template>
    <div class="engin">
        <el-col :span="24">
            <el-col :span="4">
                <el-form ref="form" v-model="form">
                    <el-col :span="23">
                        <el-select  icon="el-icon-search" v-model="form.keyword" filterable placeholder="搜索">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form>
            </el-col>
            <el-col :span="20">
                <el-button type="primary" @click="formData={};dialogFormVisible = true;title = '添加工程管理信息'">添加</el-button>
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
                    <el-table-column prop="contacts" sortable width="120" label="联系人"></el-table-column>
                    <el-table-column prop="phone" sortable width="120" label="联系电话"></el-table-column>
                    <el-table-column prop="address" sortable width="240" label="地址"></el-table-column>
                    <el-table-column prop="passwd" sortable width="120" label="工程密码"></el-table-column>
                    <el-table-column prop="is_use" sortable  width="120"  label="是否启用">
                        <template slot-scope="scope">
                            <el-switch class="switchStyle" v-model="scope.row.is_use" active-color="#1899EE" active-text="开启"
                                       inactive-color="#DBE0E6" inactive-text="关闭">
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
                                    @click="FormVisible = true">添加网关</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="calleds" border class="next-table">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="gateway" sortable label="网关名称"></el-table-column>
                                <el-table-column prop="data_stream" sortable label="网关ID"></el-table-column>
                                <el-table-column prop="equation" sortable width="" label="应用场景"></el-table-column>
                                <el-table-column prop="threshold" sortable width="" label="联网方式"></el-table-column>
                                <el-table-column prop="edit_date" sortable width="" label="网关密钥"></el-table-column>
                                <el-table-column prop="edit_date" sortable width="" label="卡号"></el-table-column>
                                <el-table-column prop="is_use" sortable  width="120"  label="是否在线">
                                    <template slot-scope="scope">
                                        <el-switch class="switchStyle" v-model="scope.row.is_use" active-color="#43CF7C" active-text="在线"
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
                                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                class="add-call"
                                                @click="FormVisible = true">添加数据流</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-table :data="calleds" border class="next-table next-table-next">
                                            <el-table-column type="selection" width="55"></el-table-column>
                                            <el-table-column prop="gateway" sortable label="数据流名称"></el-table-column>
                                            <el-table-column prop="data_stream" sortable label="云变量"></el-table-column>
                                            <el-table-column prop="equation" sortable width="" label="单位"></el-table-column>
                                            <el-table-column prop="edit_date" sortable width="" label="修改时间"></el-table-column>
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
        <el-dialog class="baojing" :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="formData" ref="formData">
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="网关名称" :required="true" >
                            <el-input v-model="formData.project_name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="网关ID" :required="true" >
                            <el-input v-model="formData.call_name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否启用">
                            <el-col :span="6">
                            <el-radio v-model="formData.is_use" label="1">启用</el-radio>
                            </el-col>
                            <el-col :span="6">
                            <el-radio v-model="formData.is_use" label="0">禁用</el-radio>
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
        name: "Engin",
        data(){
            return{
                form:{
                    keyword: ''
                },
                dialogFormVisible: false,
                FormVisible: false,
                formData: {
                    project_name: '',
                    contacts: '',
                    phone: '',
                    address: '',
                    passwd: '',
                    is_use: '1',
                    note: '',
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
                    contacts: '张三',
                    phone: '13800138000',
                    address: '广州市从化区温泉镇',
                    passwd: '*********',
                    is_use: true,
                    note: '我是备注',
                    edit_date: '2022-01-02'
                }],
                calleds:[
                    {
                        gateway: '温水口',
                        data_stream: '200',
                        equation: '',
                        threshold: '1.2',
                        edit_date: '2022-01-25'
                    }
                ],
                multipleSelection: [],
                options: [{
                    value: '惠州温泉',
                    label: '惠州温泉'
                }, {
                    value: '从化温泉',
                    label: '从化温泉'
                }],
                title:'',
                detail: {}
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
                this.dialogFormVisible = true;
                this.title = '修改工程管理信息';
                this.formData = row;
                this.formData.is_use = this.formData.is_use ? '1' : '0';
                console.log(this.formData);
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
    @import "../assets/css/Engin";
</style>