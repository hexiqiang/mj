<template>
    <div class="history">
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"> 报警记录</span>
                <CallData></CallData>
            </el-tab-pane>
            <el-tab-pane label="控制记录">
                <JoinData></JoinData>
            </el-tab-pane>
            <el-tab-pane label="联控记录">
                <ControlData></ControlData>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import CallData from '@/components/CallData';
    import ControlData from '@/components/ControlData';
    import JoinData from '@/components/JoinData';
    export default {
        name: "Historys",
        components: {
            CallData,
            JoinData,
            ControlData
        }
    }
</script>

<style lang="scss">
 .history{
     padding: 10px;
 }
</style>