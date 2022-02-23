<template>
    <div class="called user">
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
                <el-button type="primary" @click="dialogForm">添加</el-button>
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
                    <el-table-column prop="member" sortable label="用户账号"></el-table-column>
                    <el-table-column prop="phone" sortable label="电话"></el-table-column>
                    <el-table-column prop="is_admin" sortable width="120" label="管理员"></el-table-column>
                    <el-table-column prop="mail" sortable width="120" label="邮箱"></el-table-column>
                    <el-table-column prop="note" sortable label="备注"></el-table-column>
                    <el-table-column prop="status" sortable  width="100"  label="状态">
                        <template slot-scope="scope">
                            <el-switch class="switchStyle" v-model="scope.row.status" active-color="#1899EE" active-text="开启"
                                       inactive-color="#DBE0E6" inactive-text="停用">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="560">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    class="add-call"
                                    @click="userRule = true">栏目管理</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    class="add-call"
                                    @click="userProject = true">控制权限设置</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    class="add-call"
                                    @click="userProject = true">工程管理</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    class="add-call"
                                    @click="">切换用户</el-button>
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
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="userPro" border class="next-table">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="project" sortable label="工程名称"></el-table-column>
                                <el-table-column prop="note" sortable label="备注"></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
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

        </el-col>
        <el-dialog class="baojing" title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="formData" ref="formData" :rules="rules">
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="用户账号"  :required="true" prop="member">
                            <el-input v-model="formData.member"  placeholder="输入账号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="密码" :required="true"  prop="password">
                            <el-input v-model="formData.password"  show-password  placeholder="输入登录密码" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话" :required="true" prop="phone">
                            <el-input v-model="formData.phone" placeholder="请输入电话号码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="8">
                        <el-form-item label="邮箱">
                            <el-input v-model="formData.email" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注">
                            <el-input v-model="formData.note" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-col :span="12">
                            <el-form-item label="是否管理员" class="call_phone">
                                <el-switch class="switchStyle" v-model="formData.is_admin" active-color="#1899EE" active-text="是"
                                           inactive-color="#DBE0E6" inactive-text="否">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="状态"  class="call_phone">
                                <el-switch class="switchStyle" v-model="formData.status" active-color="#1899EE" active-text="正常"
                                           inactive-color="#DBE0E6" inactive-text="停用">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAdd('formData')">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog class="baojing" width="33%" title="工程管理" :visible.sync="userProject">
            <template>
                <el-transfer
                        :titles="['可选工程', '已选工程']"
                        filterable
                        filter-placeholder="请输入"
                        v-model="value"
                        :data="pros()">
                </el-transfer>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userProject = false">取 消</el-button>
                <el-button type="primary" @click="addPro">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog class="baojing" width="33%" title="权限管理" :visible.sync="userRule">
            <template>
                <el-transfer
                        :titles="['可选栏目', '已选栏目']"
                        filterable
                        filter-placeholder="请输入"
                        v-model="selectNav"
                        :data="navs()">
                </el-transfer>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userRule = false">取 消</el-button>
                <el-button type="primary" @click="addRule">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { postUser, getMembers, editUser} from "../api/apis";

    export default {
        name: "User",
        data(){
            return{
                form:{
                    keyword: ''
                },
                dialogFormVisible: false,
                userRule: false,
                userProject: false,
                formData: {
                    member: '',
                    phone: '',
                    is_admin: false,
                    email: '',
                    note: '',
                    password: '',
                    status: true,
                    // _csrf: '',
                },
                rules: {
                    member: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { min: 6, max: 12, message: '请输入电话号码', trigger: 'blur' }
                    ],
                },
                currentPage4: 1,
                tableData: [{
                    member: 'admin',
                    phone: '13800138000',
                    is_admin: '是',
                    mail: '',
                    note: '',
                    status: true,
                },{
                    member: 'test',
                    phone: '13800138001',
                    is_admin: '否',
                    mail: '',
                    note: '',
                    status: true,
                }],
                userPro:[
                    {
                        project: '温氏集团',
                        note: '这是温氏集团的备注',
                    }
                ],
                multipleSelection: [],
                value: [],
                selectNav: [],
            }
        },
        methods:{
            dialogForm(){
                this.dialogFormVisible = true;
                // getCsrf().then(data => {
                //     if (data.code == 0){
                //         this.formData._csrf = data.data._csrf;
                //         console.log(data.data)
                //     }
                // });
            },
            clickRefresh(){
                this.$router.go(0)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.formData = row;
                this.formData.id = row.id
                console.log(this.formData);
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
            onAdd(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.formData.is_admin = this.formData.is_admin ? 1 : 0;
                        this.formData.status = this.formData.status ? 1 : 0;
                        if (this.formData.id){
                            editUser(this.formData).then(data => {
                                // console.log(data)
                                if (data.code == 0){
                                    this.dialogFormVisible = false;
                                    this.$router.go(0)
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    })
                                } else{
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'warning'
                                    })
                                }
                            });
                        } else{
                            postUser(this.formData).then(data => {
                                // console.log(data)
                                if (data.code == 0){
                                    this.dialogFormVisible = false;
                                    this.$router.go(0)
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    })
                                } else{
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'warning'
                                    })
                                }
                            });
                        }

                    } else {
                        this.$message('请完善*号项填写');
                        return false;
                    }
                });

            },
            addPro(){

            },
            addRule(){

            },
            pros(){
                var city = ['温氏集团', '从化温泉', '中山温泉', '惠州温泉', '恒大猪场', '长隆集团', '隆基广场'];
                var datas = this.selectData(city);
                return datas
            },
            navs(){
                var navs = ['工程管理', '监控视图管理', '报警管理', '惠州温泉', '联控管理', '监控视图', '曲线报表', '报警记录', '控制记录', '联控记录', '网关在线记录', '用户管理', '消息管理', 'API接口设置', '系统设置'];
                var datas = this.selectData(navs);
                return datas
            },
            selectData(arr){
                const datas = [];
                arr.forEach((a, i) => {
                    datas.push({
                        label: a,
                        key: i
                    });
                });
                return datas;
            }
        },
        mounted() {
            getMembers().then(res => {
                if (res.code == 0){
                    this.tableData = res.data.data;
                } else{
                    this.$message(res.msg)
                }

            })
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/called";
</style>