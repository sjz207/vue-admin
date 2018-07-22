<template>
  <tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource">
    <el-table-column label="操作" v-if="treeType === 'normal'" width="260"  align="center">
      <template slot-scope="scope">
        <button type="button" class="el-button el-button--default el-button--small">
          <router-link :to="{ path: requestUrl + 'edit', query: {id: scope.row.Oid} }" tag="span">
            编辑
          </router-link>
        </button>
        <el-button size="small" type="danger" @click="handleDelete()"> 删除 </el-button>
        <el-button type="button" class="el-button el-button--success el-button--small" @click="add(scope.row)">
          <router-link :to="{ path: requestUrl, query: {parentId: scope.row.parentOId} }" tag="span">
            添加
          </router-link>
        </el-button>
      </template>
    </el-table-column>
  </tree-grid>
</template>

<script>
  import  TreeGrid  from "@/components/common/TreeTable";
  export default {
    name: "hello",
    components: {
      TreeGrid
    },
    data() {
      return {
        treeType: "normal",
        requestUrl: "",
        columns: [
          {
            text: "姓名",
            align: "center",
            dataIndex: "name"
          },
          {
            text: "年龄",
            align: "center",
            dataIndex: "age"
          },
          {
            text: "性别",
            align: "center",
            dataIndex: "sex"
          }
        ],
        dataSource: [
          {
            id: 1,
            parentId: 0,
            name: "测试1",
            age: 18,
            sex: "男",
            children: [
              {
                id: 2,
                parentId: 1,
                name: "测试2",
                age: 22,
                sex: "男"
              }
            ]
          },
          {
            id: 3,
            parentId: 0,
            name: "测试3",
            age: 23,
            sex: "女",
            children: [
              {
                id: 4,
                parentId: 3,
                name: "测试4",
                age: 22,
                sex: "男"
              },
              {
                id: 5,
                parentId: 3,
                name: "测试5",
                age: 25,
                sex: "男"
              },
              {
                id: 6,
                parentId: 3,
                name: "测试6",
                age: 26,
                sex: "女",
                children: [
                  {
                    id: 7,
                    parentId: 6,
                    name: "测试7",
                    age: 27,
                    sex: "男"
                  }
                ]
              }
            ]
          },
          {
            id: 18,
            parentId: 0,
            name: "测试8",
            age: 18,
            sex: "男"
          }
        ]
      };
    },
    methods: {
      add(row) {
        console.log(row);
      },
      handleDelete() {
        this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  };
</script>
