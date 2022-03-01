<template>
    <div class="joint mondata">
        <el-col :span="24" class="mondata-top">
            <el-form ref="form" v-model="searchForm">
                <template>
                    <el-select v-model="searchForm.pid" filterable placeholder="请选择工程" >
                        <el-option
                                v-for="item in projects"
                                :key="item.project_name"
                                :label="item.project_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </el-form>
            <el-button type="primary" @click="showDl = true;title='添加视图名称'">添加</el-button>
            <el-button type="danger">删除</el-button>
            <el-button type="primary" @click="clickRefresh">刷新</el-button>
        </el-col>
        <el-col :span="24">
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
                                        @click="handleEdit(scope.$index, scope.row, item.id);title='编辑视图名称'">编辑</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row, item.id)">删除</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="goNav(scope.$index, scope.row, item.view_id, '/monitoring')">视图管理</el-button>
                            </div>
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
                    note: ''
                },
                projects: [],
                tableData: [],
                multipleSelection: [],
                title: '',
                currentPage: 1,
                totalCount: 10,
                offset: 0,
                limit: 10
            }
        },
        methods:{
            goNav(index, row, vid){
              this.$router.push({ name: 'monitoring', query: { userId: 123 }})
            },
            getRecord(offset, limit){
                getView({offset: offset, limit: limit}).then(res => {
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
            handleEdit(index, row,id) {
                console.log(index, row,id);
            },
            handleDelete(index, row, vid) {
                console.log(index, row, vid);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.tableData[index]['views'].splice(0,1)
                    this.tableData[index]['views']
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

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
                let pid = this.form.pid;
                let view_title = this.form.view_title;
                if (pid && view_title){
                    addView(this.form).then(res => {
                        if (res.code == 0){
                            this.showDl = false;
                            this.$message({message: res.msg, type: 'success'})
                        } else{
                            this.$message({message: res.msg, type: 'warning'})
                        }
                    })
                } else{
                    this.$message('请填写完整星号项')
                }
            }
        },
        mounted() {
            getProjectList().then(res =>{
                if (res.code == 0){
                    this.projects = res.data
                }
            })
            this.getRecord(this.offset, this.limit)
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/joint";
    .mondata{
        .el-col-24{
            margin: 0 !important;
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
    }
</style>