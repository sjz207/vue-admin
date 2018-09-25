<template>
  <el-menu :default-active="$route.path" @open="handleOpen" @close="handleClose" background-color="#001529"
           text-color="#fff" active-text-color="#ffd04b" :router=true>
    <el-menu-item index="/home/product" route="/home/product">产品</el-menu-item>
    <el-menu-item index="/home/product/list" route="/home/product/list">产品列表</el-menu-item>
    <el-menu-item index="/home/tabs" route="/home/tabs">tab列表</el-menu-item>
    <el-menu-item index="/home/treePage" route="/home/treePage">treePage</el-menu-item>
    <el-menu-item index="/home/treeGrid" route="/home/treeGrid">treeGrid</el-menu-item>
    <el-menu-item index="/home/vuex" route="/home/vuex">vuex</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'LeftMenu',
    data() {
      return {}
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
