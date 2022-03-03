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
                            <el-switch class="switchStyle" v-model="scope.row.status" @change="statusChange(scope.$index, scope.row)" active-color="#1899EE" active-text="开启"
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
                                    @click="userRule = true;setNavForm.mid=scope.row.id;navs();selectUserNavList(scope.row.id)">栏目管理</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    class="add-call"
                                    @click="userProject = true;setRuleForm.mid=scope.row.id;proRule();selectRuleNavList(scope.row.id)">控制权限设置</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    class="add-call"
                                    @click="userProject = true;setProForm.mid=scope.row.id;pros();selectUserProList(scope.row.id)">工程管理</el-button>
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
        <el-dialog class="baojing" :title="title" :visible.sync="dialogFormVisible">
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
        <el-dialog class="baojing" width="33%" title="权限管理" :visible.sync="userProject">
            <template>
                <el-transfer
                        :titles="['可选工程', '已选工程']"
                        filterable
                        filter-placeholder="请输入"
                        v-model="val"
                        @change="ruleChange"
                        :data="proLists">
                </el-transfer>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userProject = false">取 消</el-button>
                <el-button type="primary" @click="addPro">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog class="baojing" width="33%" title="工程管理" :visible.sync="userProject">
            <template>
                <el-transfer
                        :titles="['可选工程', '已选工程']"
                        filterable
                        filter-placeholder="请输入"
                        v-model="value"
                        @change="proChange"
                        :data="proLists">
                </el-transfer>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userProject = false">取 消</el-button>
                <el-button type="primary" @click="addPro">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog class="baojing" width="33%" title="栏目管理" :visible.sync="userRule">
            <template>
                <el-transfer
                        :titles="['可选栏目', '已选栏目']"
                        filterable
                        filter-placeholder="请输入"
                        v-model="selectNav"
                        :data="navsList"
                        @change="handleChange"
                >
                </el-transfer>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userRule = false">取 消</el-button>
                <el-button type="primary" @click="saveNav">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        postUser,
        getMembers,
        editUser,
        delmember,
        changestatus,
        getNavsLists,
        addUserNav,
        UserNavList,
        getProjectList,
        addUserPro
        ,UserProList
    } from "../api/apis";

    export default {
        name: "User",
        data(){
            return{
                title: '用户',
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
                tableData: [],
                userPro:[
                    {
                        project: '温氏集团',
                        note: '这是温氏集团的备注',
                    }
                ],
                multipleSelection: [],
                //栏目
                selectNav: [],
                navsList: [],
                setNavForm: [],
                //工程
                proLists: [],
                setProForm: [],
                value: [],
                //工程开关
                setRuleForm: [],
                ruleLists: [],
                val:[],
            }
        },
        methods:{
            dialogForm(){
                this.dialogFormVisible = true;
                this.title = '添加用户';
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
                this.title = '编辑用户';
                this.formData = row;
                this.formData.id = row.id;
                this.formData.is_admin = row.is_admin == '是' ? true : false;
                console.log(this.formData);
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delmember({id: row.id}).then(res => {
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
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 修改用户状态
            statusChange(index, row){
                console.log(index, row);
                let status = {
                    id: row.id,
                    status: row.status == true ? 1 : 0
                }
                this.$confirm('确定修改用户状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    changestatus(status).then(res => {
                        console.log(res);
                        if (res.code == 0){
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
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 编辑与添加账号
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
            proRule(){

            },
            pros(){
                getProjectList().then(res => {
                    if (res.code == 0){
                        var datas = this.projectData(res.data);
                        this.proLists = datas
                    }
                })

            },
            navs(){
                getNavsLists().then(res => {
                    var datas = this.selectData(res.data);
                    this.navsList = datas
                });
            },
            projectData(arr){
                let datas = [];
                arr.forEach((a, i) => {
                    datas.push({
                        id: a.id,
                        key: a.id,
                        label: a.project_name
                    });
                });
                return datas;
            },
            selectData(arr){
                let datas = [];
                arr.forEach((a, i) => {
                    datas.push({
                        id: a.id,
                        key: a.id,
                        label: a.name
                    });
                });
                return datas;
            },
            handleChange(value, direction, movedKeys) {
                this.setNavForm.nid = this.selectNav;
            },
            proChange(value, direction, movedKeys) {
                this.setProForm.pid = this.value;
            },
            ruleChange(value, direction, movedKeys) {
                this.setRuleForm.pid = this.val
            },
            selectUserNavList(id){
                UserNavList({mid:id}).then(res => {
                    if (res.code == 0){
                        let datas = this.selectData(res.data)
                        datas.forEach((i,j) => {
                            this.navsList.forEach((n,m) => {
                                if (i.id == n.id){
                                    this.selectNav.push(n.key)
                                }
                            })
                        })
                    }else{
                        this.selectNav = [];
                    }
                })
            },
            selectUserProList(id){
                let _this = this;
                UserProList({mid:id}).then(res => {
                    if (res.code == 0){
                        let datas = _this.projectData(res.data);
                        datas.forEach((i,j) => {
                            this.proLists.forEach((n,m) => {
                                if (i.id == n.id){
                                    _this.value.push(n.key)
                                }
                            })
                        })
                    }else{
                        this.value = [];
                    }
                })
            },
            selectRuleNavList(id){
                UserNavList({mid:id}).then(res => {
                    if (res.code == 0){
                        let datas = this.selectData(res.data)
                        datas.forEach((i,j) => {
                            this.navsList.forEach((n,m) => {
                                if (i.id == n.id){
                                    this.selectNav.push(n.key)
                                }
                            })
                        })
                    }else{
                        this.selectNav = [];
                    }
                })
            },
            saveNav(){
                addUserNav(this.setNavForm).then(res => {
                    if (res.code == 0){
                        this.$message({type:'success', message:res.msg})
                        this.clickRefresh()
                    } else{
                        this.$message({type:'waring',message:res.msg})
                    }
                })
            },
            addPro(){
                addUserPro(this.setProForm).then(res => {
                    if (res.code == 0){
                        this.$message({type:'success', message:res.msg});
                        this.clickRefresh()
                    } else{
                        this.$message({type:'waring',message:res.msg})
                    }
                })
            },
        },
        mounted() {
            getMembers().then(res => {
                if (res.code == 0){
                    this.tableData = res.data.data;
                } else{
                    this.$message(res.msg)
                }
            });
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/called";
</style>