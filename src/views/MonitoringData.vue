<template>
    <div class="joint mondata">
        <el-col :span="24" class="mondata-top">
            <el-form ref="form" v-model="form">
                <template>
                    <el-select v-model="form.project_name" filterable placeholder="请选择工程">
                        <el-option
                                v-for="item in projects"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-form>
            <el-button type="primary" @click="showDl = true">添加</el-button>
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
                    <el-table-column prop="join_name" sortable label="工程名称" ></el-table-column>
                    <el-table-column sortable prop="views"  label="视图名称" align="center">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.views">{{item.name}}</div>
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
                                        @click="handleEdit(scope.$index, scope.row, item.view_id)">编辑</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row, item.view_id)">删除</el-button>
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
                        :current-page="currentPage4"
                        :page-sizes="[6, 6, 6, 2]"
                        :page-size="6"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="20">
                </el-pagination>
            </el-col>
            <el-dialog class="form-dialog-box" title="添加视图名称" :visible.sync="showDl">
                <el-form label-position="left" label-width="80px" :model="form">
                    <el-col :span="24">
                        <el-col :span="12">
                            <el-form-item label="工程名称">
                                <template>
                                    <el-select v-model="form.project_title" filterable placeholder="请选择工程">
                                        <el-option
                                                v-for="item in projects"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="视图名称">
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
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "MonitroingData",
        data(){
            return{
                showDl: false,
                form:{
                    project_name: '',
                    view_title: '',
                    note: ''
                },
                projects: [{
                    value: '全部',
                    label: '全部'
                },{
                    value: '祥顺综合园',
                    label: '祥顺综合园'
                }, {
                    value: '怀化水利',
                    label: '怀化水利'
                }],
                currentPage4: 1,
                tableData: [{
                    join_name: '从化温泉', // 工程名称
                    views:[
                        {name: '实时数据', editer: '张三', 'edit_date': '2022-02-01 11:12:12', 'note': '备注内容', view_id: 1},
                        {name: '地图', editer: '李四', 'edit_date': '2022-02-01 15:12:12', 'note': '备注内容', view_id: 2},
                        {name: '监控', editer: '高挑', 'edit_date': '2022-02-01 16:12:12', 'note': '备注内容', view_id: 3},
                        {name: '水位检测', editer: '飞扬', 'edit_date': '2022-02-01 18:12:12', 'note': '备注内容', view_id: 4},
                    ]
                },{
                    join_name: '怀集温泉', // 工程名称
                    views:[
                        {name: '实时数据', editer: '张三', 'edit_date': '2022-02-01 11:12:12', 'note': '备注内容', view_id: 1},
                        {name: '监控', editer: '李四', 'edit_date': '2022-02-01 15:12:12', 'note': '备注内容', view_id: 2},
                        {name: '地图', editer: '高挑', 'edit_date': '2022-02-01 16:12:12', 'note': '备注内容', view_id: 3},
                        {name: '水位检测', editer: '飞扬', 'edit_date': '2022-02-01 18:12:12', 'note': '备注内容', view_id: 4},
                    ]
                }],
                multipleSelection: []
            }
        },
        methods:{
            goNav(index, row, vid){
              this.$router.push('/monitoring')
            },
            clickRefresh(){
                this.$router.go(0)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(index, row) {
                console.log(index, row);
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

            }
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