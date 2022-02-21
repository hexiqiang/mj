<template>
    <div class="api_column">
        <el-col :span="24">
            <el-descriptions class="margin-top" title="api文档相关信息" :column="1" :size="size" border>
                <el-descriptions-item>
                    <template slot="label">
                        接口调用密钥
                    </template>
                    213nudh923rh932u89f12fwe23
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        接口调用网址
                    </template>
                        http://127.0.0.1:8080
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        接口相关文档地址
                    </template>
                    <router-link to="https://www.showdoc.com.cn/mingjikj/8341627835268174">点击查看</router-link>
                </el-descriptions-item>
            </el-descriptions>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "Api"
    }
</script>

<style lang="scss">
.api_column{
    padding: 10px;
    .el-col-24{
        padding: 20px;
    }
}
</style>