<template>
    <!--监控视图-->
    <div id="mon" class="mv">
        <el-col :span="24" class="mov-view">
            <el-col :span="24" class="mov-right">
                <template>
                    <el-select v-model="value" filterable placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <div>
                    <template>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="1#水池" name="first">
                                <MonData />
                            </el-tab-pane>
                            <el-tab-pane label="2#水池" name="two">
                                <MonData />
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
            </el-col>
        </el-col>

    </div>
</template>

<script>
    import MonData from '@/components/MomData';
    export default {
        name: "MonitoringView",
        components:{
          MonData
        },
        data(){
            return{
                showView: false,
                activeName: 'first',
                options: [{
                    value: '怀集水利工程',
                    label: '怀集水利工程'
                }, {
                    value: '温氏集团',
                    label: '温氏集团'
                }],
                value: '',
                tableData: [{
                    gateway: '怀集水机',
                    name: '1#水池',
                    company: 'm³',
                    jan: 123,
                    feb: 123,
                    mar: 123,
                    apr: 123,
                    may: 123,
                    jun: 123,
                    jul: 123,
                    aug: 123,
                    sept: 123,
                    oct: 123,
                    nov: 123,
                    dec: 123,
                }],
                tableDay: [{
                    gateway: '怀集水机',
                    name: '1#水池',
                    company: 'm³',
                    jan: 123,
                    feb: 123,
                    mar: 123,
                    apr: 123,
                    may: 123,
                    jun: 123,
                    jul: 123,
                    aug: 123,
                    sept: 123,
                    oct: 123,
                    nov: 123,
                    dec: 123,
                }],
                chartData: {
                    columns: ['日期', '条数'],
                    rows: [
                        {'日期': '2022-02-01', '条数': 123},
                        {'日期': '2022-02-02', '条数': 152},
                        {'日期': '2022-02-03', '条数': 167},
                        {'日期': '2022-02-04', '条数': 254},
                        {'日期': '2022-02-05', '条数': 289},
                        {'日期': '2022-02-06', '条数': 167},
                        {'日期': '2022-02-07', '条数': 95},
                        {'日期': '2022-02-08', '条数': 267},
                        {'日期': '2022-02-09', '条数': 54},
                        {'日期': '2022-02-10', '条数': 23},
                        {'日期': '2022-02-11', '条数': 78},
                        {'日期': '2022-02-12', '条数': 12},
                        {'日期': '2022-02-13', '条数': 99},
                        {'日期': '2022-02-14', '条数': 107},
                        {'日期': '2022-02-15', '条数': 107},
                        {'日期': '2022-02-16', '条数': 107},
                        {'日期': '2022-02-17', '条数': 107}
                    ]
                },
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/monitoring";
.mv{
    position: relative;
    .el-tabs__nav-scroll{
        padding-left: 280px;
    }
    .el-select{
        position: absolute;
        z-index: 100;
    }
}
</style>