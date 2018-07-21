<template>
  <el-table :data="tableData3" style="width: 100%" size="small">
    <el-table-column align="center" prop="date" label="日期"/>
    <el-table-column align="center" label="配送信息">
      <el-table-column align="center" prop="name" label="姓名"/>
      <el-table-column align="center" label="地址">
        <el-table-column align="center" prop="province" label="省份"/>
        <el-table-column align="center" prop="city" label="市区"/>
        <el-table-column align="center" prop="address" label="地址" width="300"/>
        <el-table-column align="center" prop="zip" label="邮编"/>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>


<script>
  export default {
    name: "ProductList",
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>

<style scoped>

</style>
