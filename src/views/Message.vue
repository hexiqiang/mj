<template>
    <div class="called message">
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
                    <el-table-column prop="title" sortable label="标题"></el-table-column>
                    <el-table-column prop="content" sortable label="内容"></el-table-column>
                    <el-table-column prop="add_time" sortable  label="发布时间"></el-table-column>
                    <el-table-column prop="is_use" sortable  width="120"  label="状态">
                        <template slot-scope="scope">
                            <el-switch class="switchStyle" v-model="scope.row.status" active-color="#1899EE" active-text="开启"
                                       inactive-color="#DBE0E6" inactive-text="关闭">
                            </el-switch>
                        </template>
                    </el-table-column>
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
        <el-dialog class="baojing" title="发布消息" :visible.sync="dialogFormVisible">
            <el-form :model="formData" ref="formData">
                <el-col :span="24">
                    <el-col :span="24">
                        <el-form-item label="标题" class="call_phone" :required="true">
                                <el-input v-model="formData.title" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="内容" :required="true">
                            <el-input type="textarea" v-model="formData.content" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="状态">
                            <el-switch class="switchStyle" v-model="formData.status" active-color="#1899EE" active-text="发布"
                                       inactive-color="#DBE0E6" inactive-text="关闭">
                            </el-switch>
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
        name: "Message",
        data(){
            return{
                form:{
                    keyword: ''
                },
                dialogFormVisible: false,
                formData: {
                    title: '',
                    content: '',
                    status: true,
                },
                currentPage4: 1,
                tableData: [{
                    title: '新版本上线',
                    content: '全新2.0版本上线，免费使用1一个月',
                    status: true,
                    add_time: '2022-02-03 11:12:34'
                },{
                    title: '添加权限功能',
                    content: '设置用户查看栏目权限',
                    status: false,
                    add_time: '2022-02-13 18:22:34'
                }],
                multipleSelection: []
            }
        },
        methods: {
            clickRefresh() {
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
            handleDetail(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            onAdd() {
                this.dialogFormVisible = false;
                let date = new Date();
                let year = date.getFullYear();
                let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDate()< 10 ? '0' + (date.getDate()) : date.getMonth();
                let h = date.getHours();
                let m = date.getMinutes();
                let s = date.getSeconds();
                this.formData.add_time = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
                this.tableData.push(this.formData);
                console.log(this.formData)
            },
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/called";
    .message {
        .el-dialog__body{
            padding: 10px;
            .el-form{
                overflow: hidden;
                .el-col-24{
                    margin-top: 0;
                }
            }
        }
    }
</style>