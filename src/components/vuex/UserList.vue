<template>
  <div>
    <el-row>
      <User/>
    </el-row>
    <el-row>
      <el-table border :data="productList" style="width: 100%">
        <el-table-column align="center" prop="name" label="姓名"/>
        <el-table-column align="center" prop="age" label="年龄"/>
      </el-table>
    </el-row>
    <el-row class="el-header" :style="{height:'40px',lineHeight:'40px'}">
      <span :style="">mapState</span>
      <el-button small :style="{marginLeft:'5px'}" type="primary" @click="addUser">添加</el-button>
    </el-row>
    <el-row>
      <el-table border stripe :data="userList" style="width: 100%">
        <el-table-column align="center" prop="name" label="姓名"/>
        <el-table-column align="center" prop="age" label="年龄"/>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import User from './User'
  import {mapGetters, mapState} from 'vuex'

  export default {
    name: "UserList",
    components: {User},
    data() {
      return {
        dataSource: []
      }
    },
    methods: {
      addUser() {
        console.log('userList:', this.userList)
      }
    },
    created() {
      for (let a = 0; a < 5; a++) {
        this.dataSource.push({
          name: Date.now(),
          age: 20 + a
        })
      }

    },
    computed: {
      ...mapState({
        //userList 可以当做data中的属性使用 与dataSource使用方法相同
        userList: state => state.addUser
      }),
      productList() {
        // this.dataSource = [...this.dataSource,...this.$store.state.addUser];
        // this.dataSource.push(...this.$store.state.addUser);
        return [...this.dataSource, ...this.$store.state.addUser]
      }
    }
  }
</script>
