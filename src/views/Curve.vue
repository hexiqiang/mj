<template>
    <div class="curve">
        <el-col :span="24"  class="content-box">

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="数据报表" name="first">
                    <DataTab v-if="activeName == 'first'"></DataTab>
                </el-tab-pane>
                <el-tab-pane label="报警报表" name="second">
                    <CallTab  v-if="activeName == 'second'"></CallTab>
                </el-tab-pane>
                <el-tab-pane label="控制报表" name="third">
                    <ControlTab v-if="activeName == 'third'"></ControlTab>
                </el-tab-pane>
                <el-tab-pane label="联控报表" name="fourth">
                    <JoinTab v-if="activeName == 'fourth'"></JoinTab>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </div>
</template>

<script>
    import DataTab from '@/components/DataTab';
    import CallTab from '@/components/CallTab';
    import ControlTab from '@/components/ControlTab';
    import JoinTab from '@/components/JoinTab';
    export default {
        name: "Curve",
        components:{
            DataTab,
            CallTab,
            ControlTab,
            JoinTab
        },
        data(){
            return{
                activeName: 'first'
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .curve{
        padding: 10px;
        overflow: hidden;
        height: 85vh;
        overflow-y: scroll;
    }
    .no-scroll{
        right: 0px !important;
        top: -10px !important;
        bottom: 0 !important;
        position: absolute;
        width: 17px;
        background: #fff;
        z-index: 1000;
    }
</style>