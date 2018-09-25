<template>
  <el-form :model="user" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :span="8">
        <el-form-item label="账户" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年龄" prop="name">
          <el-input v-model="user.age"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-button :style="{marginLeft:'5px'}" type="primary" @click="addUser">添加</el-button>
        <el-button :style="{marginLeft:'5px'}" type="primary" @click="addUserCommit({payLoad:user})">addUserCommit
        </el-button>
        <el-button :style="{marginLeft:'5px'}" type="primary" @click="addAction">addAction</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "User",
    data() {
      return {
        user: {name: Date.now(), age: Math.floor(Math.random() * (20 + 1) + 10)}
      }
    },
    methods: {
      addUser() {
        // this.$store.dispatch({type: 'addUser', payLoad: this.user});
        this.$store.dispatch({type: 'addUserCommit', payLoad: this.user});
        console.info('addUserList:', this.$store.getters.addUserList);
        console.info('mapGetters addUserList:', this.addUserList)
        this.resetData()
      },
      ...mapActions([
        // 将 `this.addUserCommit()` 映射为 `this.$store.addUserCommit({type: 'addUserCommit',payLoad: this.user})`
        'addUserCommit'
      ]),
      addAction({commit}, action) {
        this.addUserCommit({type: 'addUserCommit', payLoad: this.user}, action);
        this.resetData()
      },
      resetData() {
        this.user = {name: Date.now(), age: Math.floor(Math.random() * (20 + 1) + 10)};
      }
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters(['addUserList']
      )
    }
  }
</script>
