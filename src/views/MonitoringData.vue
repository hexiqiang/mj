<template>
    <div class="joint mondata">
        <el-col :span="24" class="content-box">
            <el-col :span="24" class="mondata-top">
                <el-form ref="form" v-model="searchForm">
                    <template>
                        <el-select v-model="searchForm.pid" filterable @change="searchProject"  placeholder="请选择工程" >
                            <el-option
                                    v-for="item in projects"
                                    :key="item.project_name"
                                    :label="item.project_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form>
                <el-button type="primary" @click="handleAdd">添加</el-button>
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
                    <el-table-column prop="project_name" sortable label="工程名称" ></el-table-column>
                    <el-table-column sortable prop="views"  label="视图名称" align="center">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.views">{{item.view_title}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="views" width="60" label="修改人">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.views">{{item.editer}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="views" sortable  width="160"  label="修改时间">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.views">{{item.edit_date}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="views" sortable label="备注">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.views">{{item.note}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="views" label="操作"  width="260">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.views">
                                <el-button
                                        size="mini"
                                        type="primary"
                                        @click="handleEdit(scope.$index, scope.row, item);title='编辑视图名称'">编辑</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row, item.id)">删除</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="goNav(scope.$index, scope.row, item.id)">视图管理</el-button>
                            </div>
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
                        :page-size="6"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                </el-pagination>
            </el-col>
        </el-col>
        <el-dialog class="form-dialog-box" :title="title" :visible.sync="showDl">
            <el-form label-position="left" label-width="80px" :model="form">
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="工程名称"  :required="true" >
                            <template>
                                <el-select v-model="form.pid" filterable placeholder="请选择工程" >
                                    <el-option
                                            v-for="item in projects"
                                            :key="item.project_name"
                                            :label="item.project_name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="视图名称"  :required="true" >
                            <el-input v-model="form.view_title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="form.note"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDl = false">取 消</el-button>
                <el-button type="primary" @click="onAdd">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getProjectList
        ,addView
        ,getView
        ,editView
        ,delView
    } from "../api/apis";

    export default {
        name: "MonitroingData",
        data(){
            return{
                showDl: false,
                searchForm:{
                  pid: ''
                },
                form:{
                    pid: '',
                    view_title: '',
                    note: '',
                    editer: sessionStorage.getItem('username')
                },
                projects: [],
                tableData: [],
                multipleSelection: [],
                title: '',
                currentPage: 1,
                totalCount: 10,
                offset: 0,
                limit: 10,

            }
        },
        methods:{
            goNav(index, row, vid){
              this.$router.push({ name: 'monitoring', params: { vid: vid }})
            },
            getRecord(offset, limit, field){
                let where = {
                    offset: offset,
                    limit: limit,
                };
                if (field){
                    Object.assign(where,field)
                }
                getView(where).then(res => {
                    if (res.code == 0){
                        this.totalCount = Number(res.data.totalCount);
                        this.tableData = res.data['data']
                    } else{
                        this.$message('暂无数据')
                    }

                })
            },
            clickRefresh(){
                this.$router.go(0)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // form:{
            //     pid: '',
            //     view_title: '',
            //     note: '',
            //     editer: sessionStorage.getItem('username')
            // },
            handleEdit(index, row, views) {
                this.form = {
                    pid: row.pid,
                    view_title: views.view_title,
                    note:  views.note,
                    vid: row.id,
                    id:  views.id,
                    editer: sessionStorage.getItem('username')
                };
                this.showDl = true;
                console.log(index, row, views);
            },
            handleDelete(index, row, vid) {
                console.log(index, row, vid);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delView({id: vid}).then(res => {
                        if (res.code == 0){
                            this.clickRefresh();
                            this.tableData[index]['views'].splice(0,1)
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
            handleAdd() {
                this.showDl = true;
                this.title='添加视图名称';
                this.form = {
                    pid: '',
                    view_title: '',
                    note: '',
                    editer: sessionStorage.getItem('username')
                };
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
                this.getRecord(this.offset, this.limit, this.searchForm)
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                if (val == 1){
                    let offset = 0;
                    this.getRecord(offset, this.limit, this.searchForm)
                } else{
                    this.offset = this.limit * (val - 1);
                    this.getRecord(this.offset, this.limit, this.searchForm)
                }
            },
            onAdd(){
                let pid = this.form.pid;
                let view_title = this.form.view_title;
                if (pid && view_title){
                    if (this.form.vid){
                        console.log(this.form)
                        editView(this.form).then(res => {
                            if (res.code == 0){
                                this.showDl = false;
                                this.$message({message: res.msg, type: 'success'})
                                window.history.href=window.history.href
                            } else{
                                this.$message({message: res.msg, type: 'warning'})
                            }
                        })
                    } else{
                        addView(this.form).then(res => {
                            if (res.code == 0){
                                this.showDl = false;
                                this.$message({message: res.msg, type: 'success'})
                                window.history.href=window.history.href
                            } else{
                                this.$message({message: res.msg, type: 'warning'})
                            }
                        })
                    }
                } else{
                    this.$message('请填写完整星号项')
                }
            },
            // 搜索工程
            searchProject(val){
                this.getRecord(this.offset, this.limit, this.searchForm)
            },
        },
        mounted() {
            getProjectList().then(res =>{
                if (res.code == 0){
                    this.projects = res.data
                }
            });
            this.getRecord(this.offset, this.limit, this.searchForm)
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/joint";
    .mondata{
        .el-col-24{
            margin: 10px 0 !important;
        }
        .mondata-top{
            form{
                float: left;
                margin-right: 10px;
            }
        }
        .el-table__row .cell div{
            border-bottom: 1px solid #EBEEF5 !important;
            line-height: 40px;
        }
        .el-table__row .cell div:last-child{
            border-bottom: none !important;
        }
        .form-dialog-box{
            form{
                overflow: hidden;
            }
        }
        .content-box{
            padding: 0 20px !important;
        }
    }
    .joint .el-form .el-input .el-input__inner{
        border-radius: 4px;
    }
</style>