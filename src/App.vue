<template>
  <div id="app" >
    <router-view  v-wechat-title="$route.meta.title" />
  </div>
</template>
<script>

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

</style>
