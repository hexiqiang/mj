<template>
    <!--监控视图-->
    <div id="mon" class="mv">
        <el-col :span="24" class="mov-view">
            <el-col :span="24" class="mov-right">
                <template>
                    <el-select v-model="value" @change="selectProject" :before-leave='selectProject' filterable placeholder="请选择工程">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.project_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </template>
                <div>
                    <template>
                        <el-tabs ref="tabs" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane
                                    v-for="(item, index) in views"
                                    :label="item.view_title"
                                    :name="'first_'+index"
                                    :key="'first_'+index"
                            >
                                <MonData v-if="activeName == 'first_'+index" :setControl="setControl"/>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
            </el-col>
        </el-col>

    </div>
</template>

<script>
    import {
        getProjectList
        ,actionSearchView
    } from "../api/apis";
    import MonData from '@/components/MomData';
    export default {
        name: "MonitoringView",
        components:{
          MonData
        },
        data(){
            return{
                showView: false,
                activeName: 'first_0',
                options: [],
                value: '',
                views: [],
                setControl:[],
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(tab, event) {
                this.setControl = this.views[tab.index].views;
            },
            selectProject(val){
                this.views = [];
                this.setControl = [];
                actionSearchView({pid: val}).then(res => {
                    if (res.code == 0){
                        this.views = res.data;
                        this.setControl = res.data[0].views
                    }else{
                        this.$message(res.msg);
                    }
                })
            }

        },
        mounted() {
            getProjectList().then(res => {
                if (res.code == 0){
                    this.options = res.data
                }
            })
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
    .mov-right{
        position: relative;
    }
}
</style>