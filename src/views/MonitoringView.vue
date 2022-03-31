<template>
    <!--监控视图-->
    <div id="mon" class="mv">
        <el-col :span="24" class="mov-view content-box">
            <el-col :span="24" class="mov-right">
                <template>
                    <el-select class="select-project" v-model="value" @change="selectProject" :before-leave='selectProject' filterable placeholder="请选择工程">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.project_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </template>
                <div style="position: relative">
                    <div class="hidden-scroll" style="right: 0px !important; top: 0px !important;bottom: 0px !important;"></div>
                    <template>
                        <el-tabs ref="tabs" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane
                                    v-for="(item, index) in views"
                                    :label="item.view_title"
                                    :name="'first_'+index"
                                    :key="'first_'+index"
                            >
                                <MonData v-if="activeName == 'first_'+index"
                                         :setControl="setControl"
                                         :dataset="dataset"
                                         :streamData="streamData"
                                         :streamDataDay="streamDataDay"
                                         :vid="vid"
                                         :note="note"
                                         :url="url"
                                         :video="video"
                                         :mapPosition="mapPosition"
                                         :mid="mid"
                                         :rules="rules"
                                />
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
                dataset: [],
                streamData: [],
                streamDataDay:[],
                mapPosition: [],
                url: [{
                    pid: '',
                    gid: '',
                    title: '',
                    url: ''
                }],
                vid: '',
                note: '',
                mid: '',
                video:[],
                rules: []
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(tab, event) {
                this.setControl = this.views[tab.index].views;
                this.dataset = this.views[tab.index].data
                this.streamData =  this.views[tab.index].stream
                this.streamDataDay =  this.views[tab.index].streamDataDay;
                this.mapPosition = this.views[tab.index].map_position ?  this.views[tab.index].map_position.map_position : [];
                this.mid = this.views[tab.index].map_position.id ?  this.views[tab.index].map_position.id : '';
                this.vid =  this.views[tab.index].id;
                this.note =  this.views[tab.index].note;
                this.url =  this.views[tab.index].url;
                this.video = this.views[tab.index].video;
                this.rules = this.views[tab.index].rule;
            },
            selectProject(val){
                this.views = [];
                this.setControl = [];
                actionSearchView({pid: val}).then(res => {
                    if (res.code == 0){
                        this.views = res.data;
                        this.vid = res.data[0].id;
                        this.setControl = res.data[0].views;
                        this.dataset = res.data[0].data;
                        this.streamData = res.data[0].stream;
                        this.streamDataDay = res.data[0].daystream;
                        this.note = res.data[0].note;
                        this.url = res.data[0].url ? res.data[0].url : [{ pid: '', gid: '', title: '', url: ''  }];
                        this.video = res.data[0].video;
                        this.mapPosition = res.data[0].map_position.map_position;
                        this.mid = res.data[0].map_position.id;
                        this.rules = res.data[0].rule
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
                    if (res.data){
                        this.value = res.data[0].id
                        this.selectProject(res.data[0].id)
                    }

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
    .select-project{
        position: absolute;
        z-index: 100;
    }
    .mov-right{
        position: relative;
    }
    .project-box{
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
    #mon .mov-view .mov-right{
        overflow-y: unset !important;
    }
    .no-mon{
        padding: 0 !important;
    }

    .hidden-scroll{
        right: 0px !important;
        top: -10px !important;
        bottom: 0 !important;
        position: absolute;
        width: 17px;
        background: #fff;
        z-index: 1000;
    }
</style>