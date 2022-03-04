<template>
    <div class="called message">
        <el-col :span="24">
            <el-col :span="6">
                <el-form ref="form" v-model="searchFiled">
                    <el-col :span="18">
                        <el-input v-model="searchFiled.keyword" placeholder="请输入搜索内容" @blur="search"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button icon="el-icon-search" @click="search"></el-button>
                    </el-col>
                </el-form>
            </el-col>
            <el-col :span="18">
                <el-button type="primary" @click="dialogFormVisible = true;title='发布消息'">发布</el-button>
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
                    <el-table-column prop="add_date" sortable  label="发布时间"></el-table-column>
                    <el-table-column prop="is_use" sortable  width="120"  label="状态">
                        <template slot-scope="scope">
                            <el-switch class="switchStyle"
                                       @change="changeStatus(scope.$index,scope.row)"
                                       v-model="scope.row.status"
                                       active-color="#1899EE"
                                       active-text="开启"
                                       inactive-color="#DBE0E6"
                                       inactive-text="关闭">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  width="180">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true;title='编辑消息'">编辑</el-button>
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
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </el-col>
        <el-dialog class="baojing" :title="title" width="30%" :label-position="'top'" :visible.sync="dialogFormVisible">
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
    import {
        addMessage
        ,editMessage
        ,delMessage
        ,getMessage
    } from "../api/apis";

    export default {
        name: "Message",
        data(){
            return{
                searchFiled:{
                    keyword: ''
                },
                dialogFormVisible: false,
                formData: {
                    title: '',
                    content: '',
                    status: true,
                    mid: sessionStorage.getItem('mid')
                },
                currentPage: 1,
                tableData: [],
                multipleSelection: [],
                totalCount: 0,
                offset: 0,
                limit: 10,
                title: '',
                mid: sessionStorage.getItem('mid')
            }
        },
        methods: {
            clickRefresh() {
                this.$router.go(0)
            },
            getRecord(offset, limit, field){
                this.tableData = [];
                let where = {
                    offset: offset,
                    limit: limit,
                    mid: this.mid
                };
                if (field){
                    Object.assign(where,field)
                }
                getMessage(where).then(res => {
                    if (res.code == 0){
                        this.totalCount = Number(res.data.totalCount);
                        this.tableData = res.data.data;
                    }else{
                        this.$message(res.msg)
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            changeStatus(index, row){
                console.log(index, row);
                this.formData = row;
                this.postFrom(row,editMessage)
            },
            handleEdit(index, row) {
                this.formData = row;

            },
            handleDelete(index, row) {
                console.log(index, row);
                delMessage({id: row.id}).then(res => {
                    if (res.code == 0){
                        this.$message({type: 'success', message: res.msg})
                        this.tableData.splice(index, 1)
                    }else{
                        this.$message({type: 'waring', message: res.msg})
                    }
                })
            },
            search(){
                this.getRecord(this.offset, this.limit, this.searchFiled);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                let offset = 0;
                let limit = val;
                this.offset = offset;
                this.limit = limit;
                this.getRecord(this.offset, this.limit, this.searchFiled)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                if (val == 1){
                    let offset = 0;
                    this.getRecord(offset, this.limit, this.searchFiled)
                } else{
                    this.offset = this.limit * (val - 1);
                    this.getRecord(this.offset, this.limit, this.searchFiled)
                }
            },
            onAdd() {
                if(this.formData.id){
                    this.postFrom(this.formData, editMessage)
                }else{
                    this.postFrom(this.formData, addMessage)
                }

            },
            postFrom(data, fn){
                let _this = this;
                data.status = data.status == true ? 1 : 0;
                if (data.title && data.content){
                    fn(data).then(res => {
                        if (res.code == 0){
                            _this.dialogFormVisible = false;
                            _this.$message({message: res.msg, type: 'success'});
                            _this.clickRefresh()
                        }else{
                            _this.$message({message: res.msg, type: 'waring'})
                        }
                    })
                } else{
                    _this.$message('请填写星号行');
                }
            }
        },
        mounted() {
            this.getRecord(this.offset, this.limit)
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
        .el-form-item__content{
            width: 100% !important;
        }
    }
</style>