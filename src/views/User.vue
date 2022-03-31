<template>
    <div class="called user">
        <el-col :span="24"  class="content-box">
            <el-col :span="24" class="content-box" style="margin-top: 0px;">
                <div class="form-box">
                    <el-form ref="form" v-model="form">
                        <el-col :span="18">
                            <el-input v-model="form.keyword" placeholder="请输入搜索内容"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button icon="el-icon-search" @click="searchUser"></el-button>
                        </el-col>
                    </el-form>
                </div>

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
                        @expand-change="showPro"
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
                                    @click="userRule = true;setNavForm.mid=scope.row.id;navs();selectUserNavList(scope.row.id);nid=scope.row.id">栏目管理</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    class="add-call"
                                    @click="ruleProject = true;setRuleForm.mid=scope.row.id;proRule();selectRuleList(scope.row.id);rid=scope.row.id">控制权限设置</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    class="add-call"
                                    @click="userProject = true;setProForm.mid=scope.row.id;pros();selectUserProList(scope.row.id);pid=scope.row.id">工程管理</el-button>
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
                            <el-table ref="userPro" :data="userPro" border class="next-table">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="project_name" sortable label="工程名称"></el-table-column>
                                <el-table-column prop="note" sortable label="备注"></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="userProDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24"  class="page-box">
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
        <el-dialog  class="baojing" :title="title" :visible.sync="dialogFormVisible">
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
        <el-dialog v-if="setRuleForm.mid==rid" class="baojing" width="33%" title="权限管理" :visible.sync="ruleProject">
            <template>
                <el-transfer
                        :titles="['可选工程', '已选不可操作工程']"
                        filterable
                        filter-placeholder="请输入"
                        v-model="val"
                        @change="ruleChange"
                        :data="ruleLists">
                </el-transfer>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ruleProject = false">取 消</el-button>
                <el-button type="primary" @click="saveRule">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog v-if="setProForm.mid==pid" class="baojing" width="33%" title="工程管理" :visible.sync="userProject">
            <template>
                <el-transfer
                        :titles="['可选工程', '已选可看工程']"
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
        <el-dialog v-if="setNavForm.mid==nid" class="baojing" width="33%" title="栏目管理" :visible.sync="userRule">
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
        ,Searchprojectlist
        ,addUserProRule
        ,UserProRuleList
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
                ruleProject: false,
                formData: {
                    member: '',
                    phone: '',
                    is_admin: false,
                    email: '',
                    note: '',
                    password: '',
                    status: true,
                    pid: sessionStorage.getItem('mid')
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
                currentPage: 1,
                totalCount: 0,
                tableData: [],
                userPro:[],
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
                ruleLists: [],
                setRuleForm: [],
                val:[],
                offset: 0,
                limit: 10,
                nid: 0,
                pid: 0,
                rid: 0,
            }
        },
        methods:{
            showPro(row,expandedRows){
                // console.log(row.id);console.log(expandedRows);
                const $classTable = this.$refs.multipleTable;
                console.log(expandedRows)
                if (expandedRows.length == 0)return;
                if (expandedRows.length > 1) {
                    expandedRows.forEach(expandRow => {
                        if (row.id !== expandRow.id) {
                            $classTable.toggleRowExpansion(expandRow, false);
                        }else{
                            Searchprojectlist({mid: row.id}).then(res => {
                                if (res.code == 0){
                                    this.userPro = res.data;
                                } else{
                                    this.userPro = [];
                                    this.$message(res.msg);
                                }
                            });
                        }
                    })
                }else{
                    let id = expandedRows[0].id ? expandedRows[0].id : row.id;
                    console.log(id)
                    Searchprojectlist({mid: id}).then(res => {
                        if (res.code == 0){
                            this.userPro = res.data;
                        } else{
                            this.userPro = [];
                        }
                    });
                }

            },
            dialogForm(){
                this.dialogFormVisible = true;
                this.formData ={
                    member: '',
                    phone: '',
                    is_admin: false,
                    email: '',
                    note: '',
                    password: '',
                    status: true,
                    pid: sessionStorage.getItem('mid')
                    // _csrf: '',
                },
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
                this.formData.password = row.show_password;
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
            userProDelete(index, row){
                console.log(row)
                this.setProForm.id = row.upid;
                let pid = row.id;
                let pidList = row.pid;
                let mid = row.mid;
                pidList.forEach((i, j) => {
                    if (i == pid){
                        pidList.splice(j, 1)
                    }
                });
                this.setProForm.pid = pidList;
                this.setProForm.mid = mid;
                addUserPro(this.setProForm).then(res => {
                    if (res.code == 0){
                        this.$message({type:'success', message:res.msg});
                        this.clickRefresh()
                    } else{
                        this.$message({type:'waring',message:res.msg})
                    }
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                let offset = 0;
                let limit = val;
                this.offset = offset;
                this.limit = limit;
                this.getRecord(this.offset, this.limit, this.form)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                if (val == 1){
                    let offset = 0;
                    this.getRecord(offset, this.limit, this.form)
                } else{
                    this.offset = this.limit * (val - 1);
                    this.getRecord(this.offset, this.limit, this.form)
                }
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
                getProjectList().then(res => {
                    this.ruleLists = [];
                    if (res.code == 0){
                        var datas = this.projectData(res.data);
                        this.ruleLists = datas;
                        this.$forceUpdate
                    }
                })
            },
            pros(){
                getProjectList().then(res => {
                    this.proLists = [];
                    if (res.code == 0){
                        var datas = this.projectData(res.data);
                        this.proLists = datas;
                        this.$forceUpdate
                    }
                })
            },
            navs(){
                getNavsLists().then(res => {
                    this.navsList=[]
                    var datas = this.selectData(res.data);
                    this.navsList = datas;
                    this.$forceUpdate
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
            selectRuleData(arr){
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
                let _this = this;
                UserNavList({mid:id}).then(res => {
                    if (res.code == 0){
                        _this.selectNav= [];
                        let datas = this.selectData(res.data)
                        datas.forEach((i,j) => {
                            _this.navsList.forEach((n,m) => {
                                if (i.id == n.id){
                                    _this.selectNav.push(n.key)
                                }
                            })
                        })
                    }else{
                        _this.selectNav = [];
                    }
                })
            },
            selectUserProList(id){
                let _this = this;
                UserProList({mid:id}).then(res => {
                    if (res.code == 0){
                        _this.value = [];
                        let datas = _this.projectData(res.data);
                        datas.forEach((i,j) => {
                            this.proLists.forEach((n,m) => {
                                if (i.id == n.id){
                                    _this.value.push(n.key)
                                }
                            })
                        })
                    }else{
                        _this.value = [];
                    }
                })
            },
            selectRuleList(id){
                let _this = this;
                UserProRuleList({mid:id}).then(res => {
                    if (res.code == 0){
                        _this.val = [];
                        let datas = this.selectRuleData(res.data);
                        console.log(datas);
                        datas.forEach((i,j) => {
                            _this.ruleLists.forEach((n,m) => {
                                if (i.id == n.id){
                                    _this.val.push(n.key)
                                }
                            })
                        });
                    }else{
                        _this.val = [];
                    }
                })
            },
            saveRule(){
                addUserProRule(this.setRuleForm).then(res => {
                    if (res.code == 0){
                        this.$message({type:'success', message:res.msg})
                        this.clickRefresh()
                    } else{
                        this.$message({type:'waring',message:res.msg})
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
            getRecord(offset, limit, field){
                let where = {
                    offset: offset,
                    limit: limit,
                };
                if (field){
                    Object.assign(where,field)
                }
                console.log(field)
                getMembers(where).then(res => {
                    if (res.code == 0){
                        console.log(res.data);
                        this.totalCount = Number(res.data.totalCount);
                        this.tableData = res.data.data;
                    }else{
                        this.$message('请稍后，服务器忙！')
                    }
                })
            },
            searchUser(){
                this.getRecord(this.offset,this.limit, this.form)
            }
        },
        mounted() {
            this.getRecord(this.offset, this.limit)
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/called";
    .form-box{
        overflow: hidden;
        float: left;
        width: 240px;
        margin-right: 5px;
    }
</style>