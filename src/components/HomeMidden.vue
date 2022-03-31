<template >
    <div class="home-midden">
        <el-row>
            <el-col :span="16">
                <div class="grid-content bg-purple-dark show-status">
                    <el-col :sapn="24">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-col :span="6">
                                <el-input v-model="form.keyword" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="16">
                                <el-button type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
                                <el-select v-model="form.online" placeholder="请选择">
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
                            <el-col :span="6" v-for="(item, index) in datas" :key="item.id">
                                <div class="show-status-box">
                                    <el-col :span="8"><i class="iconfont icon-dingwei"></i></el-col>
                                    <el-col :span="16">
                                        <div>{{item.project_name}}</div>
                                        <div :class="{red: item.status == 1, green: item.status == 0}">{{item.status == 1 ? '在线' : '离线'}}</div>
                                    </el-col>
                                </div>
                            </el-col>
                        </div>
                    </el-col>
                    <el-col :span="24" class="page-box">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[8]"
                                :page-size="8"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalCount">
                        </el-pagination>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-dark">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>系统消息</span>
                            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                        </div>
                        <div v-for="(item, index) in indexData.message" :key="item.id" class="text item">
                            <el-col :span="19">
                                <el-col :span="3" class="number-center">{{(index+1) + '.'}}</el-col>
                                <el-col :span="18">{{ item.title }}</el-col>
                            </el-col>
                            <el-col :span="4" class="number-center">{{ item.add_date.substr(5,5) }}</el-col>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import {getIndexProject} from "../api/apis";

    export default {
        name: "HomeMidden",
        data() {
            return {
                form:{
                    keyword: '',
                    online: ''
                },
                options: [{
                    value: '2',
                    label: '全部',
                },{
                    value: '1',
                    label: '在线',
                }, {
                    value: '0',
                    label: '离线',
                }],
                online: true,
                datas:[],
                currentPage: 1,
                totalCount: 0,
                offset: 0,
                limit: 10

            }
        },
        props:['indexData'],
        methods:{
            getRecord(offset, limit,form){
                let field = {
                    offset: offset,
                    limit: limit,
                };
                if (form){
                    Object.assign(field,form);
                }
                getIndexProject(field).then(res => {
                    if (res.code == 0){
                        this.datas = res.data.data;
                        this.totalCount = Number(res.data.totalCount);
                    }
                })
            },
            onSearch(){
                this.getRecord(this.offset,this.limit,this.form)
                console.log(this.form)
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
            }
        },
        created(){
        },
        mounted() {
            this.getRecord(this.offset,this.limit,this.form)
        }
    }
</script>

<style lang="scss" >
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
            position: relative;
            .el-col-24{
                margin-bottom: 0;
            }
            .page-box{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
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
        .number-center{
            text-align: center;
        }
    }
</style>