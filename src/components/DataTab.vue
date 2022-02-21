<template>
    <!--数据报表-->
    <div class="datatab">
        <el-col :span="24">
            <el-form ref="form" :model="form">
                <el-col :span="3">
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
                </el-col>
                <el-col :span="3">
                <template>
                    <el-select v-model="form.gateway" filterable placeholder="请选择网关">
                        <el-option
                                v-for="item in gateway"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                </el-col>
                <el-col :span="3">
                <template>
                    <el-select v-model="form.stream" filterable placeholder="请选择数据流">
                        <el-option
                                v-for="item in streams"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                </el-col>
                <el-col :span="3">
                <template>
                    <el-select v-model="form.date" filterable placeholder="请选择周期">
                        <el-option
                                v-for="item in dates"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                </el-col>
                <el-col :span="6">
                <template>
                    <el-date-picker
                            v-model="form.dates"
                            type="daterange"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            range-separator="到"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </template>
                </el-col>
                <el-col :span="5">
                <template>
                    时间间隔
                    <el-select v-model="form.times" filterable placeholder="请选择时间间隔">
                        <el-option
                                v-for="item in times"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" >查询</el-button>
                </el-col>
            </el-form>
        </el-col>
        <el-col :span="24" class="data-show-box">
            <el-col :span="12" class="tab-left">
                <el-col :span="24">
                    <el-col :span="12" class="bg-blue">
                        最小值
                    </el-col>
                    <el-col :span="12" class="cl-black">
                        0.55米
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12"  class="bg-blue">
                        平均值
                    </el-col>
                    <el-col :span="12" class="cl-black">
                        0.55米
                    </el-col>
                </el-col>
            </el-col>
            <el-col :span="12" class="tab-right">
                <el-col :span="24">
                    <el-col :span="12" class="bg-blue">
                        最大值
                    </el-col>
                    <el-col :span="12" class="cl-black">
                        2800米
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="12" class="bg-blue">
                        区间值
                    </el-col>
                    <el-col :span="12" class="cl-black">
                        0.55米
                    </el-col>
                </el-col>
            </el-col>
        </el-col>
        <el-col :span="24">
            <ve-line
                    height="500px"
                    :title="{text: '数据报表流量'}"
                    :set-option-opts="false"
                    :data="getLineData()"
                    :data-zoom="{ type: 'slider' }">
            </ve-line>
        </el-col>
        <el-col :span="24">
            <el-table :data="tableData" highlight-current-row border>
                <el-table-column prop="gateway" label="网关" align="center" class="compileNameFather" width="230">
                </el-table-column>
                <el-table-column prop="stream" label="数据流"  align="center">
                </el-table-column>
                <el-table-column  prop="date" label="时间" align="center">
                </el-table-column>
                <el-table-column label="历史数值" prop="historical_value" align="center">
                    <template slot-scope="scope">
                        <div class='headerFirst'>
                            {{scope.row.historical_value}}<i class="el-icon-edit-outline eidtIcon" @click="tableDbEdit(scope.$index)"></i>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center"></el-table-column>
            </el-table>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "DataTab",
        data() {
            return {
                projects: [{
                    value: '祥顺综合园',
                    label: '祥顺综合园'
                }, {
                    value: '怀化水利',
                    label: '怀化水利'
                }],
                gateway: [
                    {
                        value: '1#水池',
                        label: '1#水池'
                    }, {
                        value: '2#水池',
                        label: '2#水池'
                    }
                ],
                streams: [
                    {
                        value: '1#水池',
                        label: '1#水池'
                    }, {
                        value: '2#水池',
                        label: '2#水池'
                    }
                ],
                dates: [
                    {
                        value: '7天',
                        label: '30天'
                    }, {
                        value: '2#水池',
                        label: '2#水池'
                    }
                ],
                times: [
                    {
                        value: '10分钟',
                        label: '10分钟'
                    }, {
                        value: '20分钟',
                        label: '20分钟'
                    }
                ],
                form: {
                    project_name: '',
                    dates: '',
                    date: '',
                    gateway: '',
                    stream: '',
                    times: ''
                },
                tableData: [
                    {
                        gateway: '怀化水利',
                        stream: '怀化水利',
                        date: '2021-12-12',
                        historical_value: '0.55',
                        status: '正常',
                    },{
                        gateway: '怀化水利',
                        stream: '怀化水利',
                        date: '2021-12-13',
                        historical_value: '0.55',
                        status: '正常',
                    }
                ]
            }
        },
        methods: {
            tableDbEdit(index) {  //index为索引号
                var cellabc = document.getElementsByClassName('headerFirst')[index];
                cellabc.innerHTML = "";
                let cellInput = document.createElement("el-input");
                let cellInputSon = document.createElement("input");
                let cellBut = document.createElement("button");
                let ibtu = document.createElement("i");
                cellInputSon.value = this.tableData[index].historical_value;
                cellabc.setAttribute("class", "cellBoxdev");
                ibtu.setAttribute("class", "el-icon-check");
                cellInputSon.setAttribute("class", "el-input__inner compileName");
                cellBut.setAttribute("class", "el-button el-button--warning el-button--mini");
                cellBut.innerText = '确定';
                cellInput.style.width = "100%";
                ibtu.style.marginLeft = "3px";
                cellInputSon.style.width = "60%";
                cellInputSon.style.padding = "0 5px 0 0";
                cellInputSon.style.border = "1px solid transparent";
                this.clickButSty = true;
                cellInput.appendChild(cellInputSon);
                cellabc.appendChild(cellInput);
                cellInput.appendChild(cellBut);
                cellBut.appendChild(ibtu);
                cellBut.onclick = () => { //成功按钮事件
                    cellabc.removeChild(cellInput);
                    this.tableData[index].historical_value = cellInputSon.value;
                    cellabc.innerHTML = this.tableData[index].historical_value;
                    let ibtuIcon = document.createElement("i");
                    ibtuIcon.setAttribute("class", "el-icon-edit-outline eidtIcon");
                    cellabc.appendChild(ibtuIcon);
                    cellabc.setAttribute("class", "headerFirst");
                    ibtuIcon.onclick = () => {
                        this.tableDbEdit(index);
                    }
                    console.log(this.tableData[index].historical_value)
                }
            },
            getLineData() {
                let lineData = {
                    columns: ["日期", "流量"],
                    rows: [
                        {日期: "2022-01-12", 流量: 1391},
                        {日期: "2022-01-13", 流量: 1324},
                        {日期: "2022-01-14", 流量: 1221},
                        {日期: "2022-01-15", 流量: 1234},
                        {日期: "2022-01-16", 流量: 8871},
                        {日期: "2022-01-17", 流量: 2341},
                        {日期: "2022-01-18", 流量: 1451},
                        {日期: "2022-01-19", 流量: 3421},
                        {日期: "2022-01-20", 流量: 4231},
                        {日期: "2022-01-21", 流量: 1241},
                        {日期: "2022-01-22", 流量: 1391}
                    ]
                };
                return lineData;
            }
        }
    }
</script>

<style lang="scss">
    .datatab{
        .el-select{
            margin-right: 10px;
        }
        .data-show-box{
            .tab-left{
                .el-col-24{
                    padding: 0 !important;
                    margin: 0 !important;
                    text-align: center;
                    color: white;
                    .el-col-12{
                        border: 1px solid #F3F3F3;
                        line-height: 40px;
                    }
                }
                padding-right: 10px;
            }
            .tab-right{
                .el-col-24{
                    text-align: center;
                    padding: 0 !important;
                    margin: 0 !important;
                    color: white;
                    .el-col-12{
                        border: 1px solid #F3F3F3;
                        line-height: 40px;
                    }
                }
                padding-left: 10px;
            }
            .bg-blue{

                background: #1899EE;
            }
            .cl-black{
                color: #808080;
            }
        }

    }
</style>