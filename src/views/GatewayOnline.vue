<template>
    <div id="online">
        <el-col :span="24">
            <el-col :span="24">
                <el-form ref="form" v-model="form">
                    <el-col :span="4">
                        <el-select @change="selectProjects" v-model="form.peojects" placeholder="选择工程">
                            <el-option
                                    v-for="item in projects"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-button icon="el-icon-refresh" type="primary" align="right">刷新</el-button>
                    </el-col>
                </el-form>
            </el-col>
            <el-col :span="24" class="online-data-box">
                <el-col :span="4">
                    <el-col :span="24" v-if="form.peojects">
                        <i class="iconfont"></i>{{form.peojects}}
                    </el-col>
                </el-col>
                <el-col :span="20">
                    <el-col :span="24">
                        <el-table
                                ref="multipleTable"
                                :data="tableData"
                                border
                                header-align="center"
                                @selection-change="handleSelectionChange"
                                :default-sort = "{order: 'descending'}"
                                tooltip-effect="dark">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="number" sortable label="序号"></el-table-column>
                            <el-table-column prop="off_line" sortable label="离线时间"></el-table-column>
                            <el-table-column prop="on_line" sortable  label="在线时间"></el-table-column>
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
            </el-col>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "GatewayOnline",
        data(){
            return{
                projects: [{
                    value: '怀集水利工程',
                    label: '怀集水利工程'
                }, {
                    value: '温氏集团',
                    label: '温氏集团'
                }],
                form:{
                    peojects: ''
                },
                currentPage4: 1,
                tableData: [],
            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            selectProjects(){
                console.log(this.form)
                if (this.form.peojects){
                    console.log(this.form.projects)
                    let data = {
                        number: '1223',
                        off_line: '2018-06-04 10:40:00',
                        on_line: '2018-06-04 11:14:00',
                    };
                    this.tableData.push(data)
                }
            }
        }
    }
</script>

<style lang="scss">
#online{
    padding: 10px;
    .el-col-24{
        margin-bottom: 0px !important;
    }
    .online-data-box{
        height: 80vh;
        .el-col-4{
            border-top: 1px solid #eee;
            border-right: 1px solid #eee;
            height: inherit;
            .el-col-24{
                line-height: 30px;
                padding: 10px;
                background: #3CB1FF;
                color: white;
            }
        }
        .el-col-20{
            border-top: 1px solid #eee;
            height: inherit;
            thead{
                .cell{
                    text-align: center;
                    color: #1899EE;
                }
            }
            tbody {
                .cell{
                    text-align: center;
                }
            }

        }
    }
}
</style>