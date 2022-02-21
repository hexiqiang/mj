<template>
    <div class="curve">
        <el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="数据报表" name="first">
                    <DataTab></DataTab>
                </el-tab-pane>
                <el-tab-pane label="报警报表" name="second">
                    <CallTab></CallTab>
                </el-tab-pane>
                <el-tab-pane label="控制报表" name="third">
                    <ControlTab></ControlTab>
                </el-tab-pane>
                <el-tab-pane label="联控报表" name="fourth">
                    <JoinTab></JoinTab>
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

<style lang="scss">
    .curve{
        padding: 10px;
    }
</style>