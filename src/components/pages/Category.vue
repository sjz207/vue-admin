<template>
  <el-row>
    <el-col :span="10">
      <el-form-item label="名称" prop="name">
        <el-input v-model="getNameCode" />
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-form-item label="编码" prop="code">
        <el-input v-model="param.code" />
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-button type="success" size="small" style="float: right" @click="pushData">推送数据到父组件</el-button>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Category",
    props: {
      param: Object,
      indexKey: Number
    },
    data() {
      return {
        category: {}
      }
    },
    methods: {
      getData() {
        return this.category
      },
      pushData() {
        console.info('pushdata')
        this.$emit('childData', this.param);
      }
    },
   
    beforeDestroy() {
      console.info('------beforeDestroy----------')
    },
    beforeUpdate() {
      console.info('beforeUpdate' + JSON.stringify(this.category))
    },
    updated() {
      console.info('update : ' + JSON.stringify(this.category))
    },
    computed: {
      getNameCode: function() {
        return this.param.name + "||" + this.param.code
      }
    }
  
  }
</script>