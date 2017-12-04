<template>
  <div id="app">
    <!-- <img src="./images/logo.png"> -->
    <router-view v-wechat-title='$route.meta.title'/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style src="./css/base.css"></style>
<style src="./css/detail.css"></style>
<!-- <style src="./css/add.css"></style> -->
<script src="./js/rem.js"></script>
<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
