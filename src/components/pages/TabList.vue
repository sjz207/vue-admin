<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" v-if="fourth" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-row>
      <el-button @click="toggleFourth">按钮</el-button>
    </el-row>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second',
        fourth: false
      };
    },
    methods: {
      handleClick(tab, event) {
        this.$root.bus.$emit('name', tab.name)
        this.$root.storage.setItem('name', tab.name)
      },
      toggleFourth() {
        this.fourth = !this.fourth
      }
    },
    created() {
      console.info(this.$storage.getItem('name'))
      this.activeName = this.$root.storage.getItem('name') ? this.$root.storage.getItem('name') : this.activeName
      this.$root.bus.$on('name', content => console.info(content))
    }
  };
</script>
`
