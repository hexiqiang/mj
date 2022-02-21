<template>
    <div class="home-midden">
        <el-row>
            <el-col :span="16">
                <div class="grid-content bg-purple-dark show-status">
                    <el-col :sapn="24">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-col :span="6">
                                <el-input v-model="form.input" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="16">
                                <el-button type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
                                <el-select v-model="form.value" placeholder="请选择">
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
                    <el-col :span="24">
                        <div class="list-box">
                            <el-col :span="6" v-for="o in 8" :key="o">
                                <div class="show-status-box">
                                    <el-col :span="8"><i class="iconfont icon-dingwei"></i></el-col>
                                    <el-col :span="16">
                                        <div>文田猪场</div>
                                        <div :class="{red: online}">在线</div>
                                    </el-col>
                                </div>
                            </el-col>
                        </div>
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
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-dark">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>系统消息</span>
                            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            <el-col :span="19">
                                <el-col :span="3">{{o+ '.'}}</el-col>
                                <el-col :span="18">{{ ' 列表内容列表内容列表内容列表内容列表内容 ' + o }}</el-col>
                            </el-col>
                            <el-col :span="4">02-25</el-col>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "HomeMidden",
        data() {
            return {
                form:{
                    input: '',
                    value: ''
                },
                currentPage4: 1,
                options: [{
                    value: '1',
                    label: '全部',
                    selected: true
                },{
                    value: '2',
                    label: '在线',
                    selected: true
                }, {
                    value: '3',
                    label: '离线',
                    selected: true
                }],
                online: true,
                datas:[

                ]
            }
        },
        methods:{
            onSearch(){
                console.log(this.form)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style lang="scss">
    .home-midden {
        .el-pagination{
            overflow: hidden;
            margin-left: 20px;
        }
        .el-col-16 {
            margin: 20px 0 0 2.66%;
        }
        .show-status {
            overflow: hidden;
            .el-col-24{
                margin-bottom: 0;
            }
        }
        form{
            .el-col-6{
                margin: 20px 1% 0 1.66%;
            }
            .el-col-16{
                margin: 20px 1% 0 10px;
            }
            .el-button--primary{
                margin-left: 0px;
            }
            .el-select {
                width: 150px;
                margin-left: 20px;
            }
        }

        .list-box{
            overflow: hidden;
            .el-col-6{
                height: 120px;
                overflow: hidden;
                box-sizing: border-box;
                padding: 0 0 0 16px;
                margin: 0;
                .show-status-box{
                    width: 96%;
                    height: 100px;
                    border-radius: 6px;
                    overflow: hidden;
                    .el-col-8{
                        margin: 0;
                        height: inherit;
                        background: #3CB1FF;
                        color: white;
                        text-align: center;
                        line-height: 100px;
                        i{
                            font-size: 40px !important;
                        }
                    }
                    .el-col-16{
                        margin: 0;
                        height: inherit;
                        border-radius: unset;
                        border-top-right-radius: 6px;
                        border-bottom-right-radius: 6px;
                        border: 1px solid #F3F3F3;
                        text-align: center;
                        div{
                            margin-top: 20px;
                        }
                        div.red{
                            color: red;
                        }
                        div.green{
                            color: green;
                        }
                    }
                }
            }
        }

        .el-col-6 {
            margin: 20px 1% 0 2.66%;
            .text {
                font-size: 14px;
            }

            .el-card__header, .el-card__body {
                padding: 10px;
                line-height: 22px;
            }

            .item {
                margin-bottom: 4px;
                overflow: hidden;

                .el-col-4 {
                    margin: 0;
                }

                .el-col-19 {
                    overflow: hidden;

                    .el-col-18 {
                        border-bottom: 1px solid #F3F3F3;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin: 0;
                    }
                }
            }

            .is-always-shadow {
                box-shadow: unset;
                height: inherit;
                border: unset;
            }

            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }

            .clearfix:after {
                clear: both
            }

        }

        .el-col-16, .el-col-6 {
            .grid-content {
                height: 380px;
                background: #fff;
            }
            border-radius: 6px;
            overflow: hidden;
        }
    }
</style>