<template>
  <div id="app" >
    <router-view  v-wechat-title="$route.meta.title" />
  </div>
</template>
<script>
  export default {
    created() {
      let mtoken = sessionStorage.getItem('mtoken');
      console.log(mtoken)
      if (mtoken == null){
        this.$router.push('/login')
      }
    }
  }
</script>
<style lang="scss">
  body{
    margin: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .el-table th.el-table__cell>.cell {
    text-align: center !important;
  }
  .el-table .el-table__cell{
    text-align: center !important;
  }
  .page-box{
    margin: 0px !important;
    margin-top: 10px !important;
    .el-pagination{
      margin-left:  0 !important;
      padding: 0 !important;
    }
  }
  .content-box{
    margin-bottom: 0 !important;
  }
  .mondata-top{
    padding-bottom: 0 !important;
  }
  .no-padding{
    width: 100% !important;
    .el-col-24:first-child{
      padding: 0;
      margin-top:0 !important;
      margin-bottom:0 !important;
      .el-col-24:first-child{
        margin: 0 !important;
      }
      .el-col-24:nth-child(2){
        margin-top: 10px !important;
      }
    }
    .page-box{
      margin: 0px !important;
      margin-top: 5px !important;
    }
  }
  .bt-button{
    float: left;
  }
</style>
