<template>
  <el-container>
    <el-header>
      <el-row type="flex">
        <el-col :span=20>  vue-admin 后台管理系统 </el-col>
        <el-col :span=4 class="login-user">
            管理员
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="220px" v-bind:style="asideStyle">
        <LeftMenu/>
      </el-aside>
      <el-main>
        <transition name="move" mode="out-in"><router-view/></transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from "@/components/LeftMenu";

export default {
  name: "Home",
  components: {
    LeftMenu
  },
  data() {
    return {
      asideStyle: {
        minHeight: 1000 + "px"
      }
    };
  },
  created() {
    let height = document.body.offsetHeight - 60 + "px";
    this.asideStyle.minHeight = height;
    const that = this;
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.offsetHeight;
        that.asideStyle.minHeight = screenWidth - 60 + "px";
      })();
    };
  }
};
</script>
<style scoped>
.login-user{
  text-align:right; margin-right:20px
}
</style>
