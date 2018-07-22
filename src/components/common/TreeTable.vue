<template>
  <el-table :data="data" border style="width: 100%" :row-style="showRow">
    <el-table-column v-for="(column, index) in columns" :key="index" :align="column.align" :label="column.text">
      <template slot-scope="scope">
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level"
              :key="levelIndex"  class="ms-tree-space"></span>
        <a v-if="toggleIconShow(index,scope.row)" class="button is-outlined is-primary is-small"
           @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-arrow-right" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-arrow-down" aria-hidden="true"></i>
        </a>
        <a v-else-if="index===0" class="ms-tree-space"></a>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
    <slot/>
  </el-table>
</template>
<script>
  import Vue from 'vue'

  export default {

    name: "tree-grid",
    props: {
      // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default: false
      },
      // 这是相应的字段展示
      columns: {
        type: Array,
        default: []
      },
      // 这是数据源
      dataSource: {
        type: Array,
        default() {
          return [];
        }
      },
      // 这个是是否展示操作列
      treeType: {
        type: String,
        default: function () {
          return "normal";
        }
      },
      // 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    computed: {
      // 格式化数据源
      data: function () {
        if (this.treeStructure) {
          return this.treeToArray( this.dataSource,  null, null, this.defaultExpandAll);
        }
        return this.dataSource;
      }
    },
    methods: {
      // 显示行
      showRow (row) {
        row = row.row
        let show = row['_parent'] ? row['_parent']._expanded && row['_parent']._show : true;
        row._show = show;
        return show ? "" : "display:none;";
      },
      // 展开下级
      toggle (trIndex) {
        let record = this.data[trIndex];
        record._expanded = !record._expanded;
      },
      // 显示层级关系的空格和图标
      spaceIconShow(index) {
        return this.treeStructure && index === 0;
      },
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow(index, record) {
        return this.treeStructure && index === 0 && record.children && record.children.length > 0
      },

      treeToArray(data, parent, level, expandedAll) {
        let _this = this;
        let tmp = [];
        Array.from(data).forEach(function (record) {
          if (record._expanded === undefined) {
            Vue.set(record, "_expanded", expandedAll);
          }
          if (parent) {
            Vue.set(record, "_parent", parent);
          }
          let _level = 0;
          if (level !== undefined && level !== null) {
            _level = level + 1;
          }
          Vue.set(record, "_level", _level);
          tmp.push(record);
          if (record.children && record.children.length > 0) {
            let children = _this.treeToArray(record.children, record, _level, expandedAll);
            tmp = tmp.concat(children);
          }
        });
        return tmp;
      }
    }
  };
</script>
<style scoped>
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: "Glyphicons Halflings";
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }

  .ms-tree-space::before {
    content: "";
  }

  table td {
    line-height: 26px;
  }
</style>
