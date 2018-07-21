<template>
  <div>
    <TreeGrid :items="data" v-on:data-change="listenToMessage"></TreeGrid>
    <el-button @click="add">添加</el-button>
  </div>
</template>

<script>
  import TreeGrid from '@/components/common/TreeGrid';

  export default {
    name: 'treePage',
    props: ['items'],
    components: {
      TreeGrid
    },
    data() {
      return {
        total: 0,
        data: null
      }
    },
    methods: {
      listenToMessage: function (data) {
        this.data = data;
      },
      add() {
        var depart = {"id": 132, "parentId": 13, "text": "商品列表14", "name": "name4", "grade": 2, children: []};
        this.data[0].children[2].children.push(depart);
      },
      appendToNoChildren() {
        var depart = {"id": 111, "parentId": 11, "text": "商品列表5", "name": "name5", "grade": 2, children: []};
        this.data[0].children[0].children.push(depart);
      },
      minus() {
        this.data[0].children.splice(1, 1);
      }
    },
    mounted() {
      var self = this;
      var list = [
        {
          "id": 1, "text": "商品管理", "name": "name1", "grade": 0,
          "children": [
            {"id": 11, "parentId": 1, "text": "商品列表", "name": "name2", "grade": 1, children: []},
            {"id": 12, "parentId": 1, "text": "添加新商品", "name": "name3", "grade": 1, children: []},
            {
              "id": 13, "parentId": 1, "text": "商品分类", "name": "name4", "grade": 1,
              "children": [
                {
                  "id": 131, "parentId": 13, "text": "商品列表1", "name": "name11", "grade": 2,
                  "children": [
                    {"id": 1311, "parentId": 131, "text": "商品列表13", "name": "name1311", "grade": 3}
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": 2, "text": "2", "name": "name5", "grade": 0,
          "children": [
            {"id": 21, "parentId": 2, "text": "商品列表2", "name": "name5", "grade": 1, children: []}
          ]
        }
      ]
      list.push({
        "id": 3, "text": "3", "name": "name3", "grade": 0,
        "children": [
          {"id": 31, "parentId": 3, "text": "商品列表3", "name": "name5", "grade": 1, children: []}
        ]
      })
      self.data = list;
    },

  }
</script>

<style>
  .vue-contextmenu-listWrapper .context-menu-list button i, .vue-contextmenu-listWrapper .context-menu-list button span {
    float: left;
    margin-left: 10px !important;
  }
</style>
