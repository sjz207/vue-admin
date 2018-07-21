<template>
  <table
    class="el-table el-table--fit el-table--border el-table--group el-table--enable-row-hover el-table--enable-row-transition el-table--small">
    <tbody class="el-table__body-wrapper is-scrolling-none">
    <tr v-for="(item, index) in currentItems" v-show="show(item)" :key="index" class="el-table__row"
        @contextmenu="showMenu">
      <td style="padding-left: 20px">
        <a v-bind:style="{position:'relative', left: item.grade*20 +'px'}">
          <i v-if="item.children && item.children.length>0" class="indented el-icon-arrow-up"
             :class="{'el-icon-plus':!item.expanded,'el-icon-minus':item.expanded }" @click="toggle(index,item)"></i>{{item.text}}</a>
      </td>
      <td class="el-table_1_column_1 is-center ">{{item.name}}</td>
      <vue-context-menu :contextMenuData="contextMenuData" @saveData="saveData(item)" @newData="newData"/>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import Vue from 'vue';

  export default {

    props: ['items'],
    data() {
      return {

        // (菜单数据)
        contextMenuData: {
          menuName: 'demo',
          axios: {x: 0, y: 0},
          // 菜单选项
          menulists: [
            {
              fnHandler: 'saveData', // 绑定事件
              icoName: 'fa fa-home fa-fw', // icon图标
              btnName: '保存' // 菜单名称
            }, {
              fnHandler: 'newData',
              icoName: 'fa fa-home fa-fw',
              btnName: '新增'
            }
          ]
        },
        initialized: false,
        currentItems: []
      }
    },
    watch: {
      "items": {
        handler(newVal, oldVal) {
          if (!this.initialized) {
            this.initialized = true;
            this.currentItems = []
            this.initItems(newVal);
          } else {
            this.updateItems(newVal);
          }
        },
        deep: true
      },
      "currentItems": {
        handler(newVal, oldVal) {
        },
        deep: true
      }
    },
    methods: {

      showMenu() {
        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        this.contextMenuData.axios = {x, y}
      },
      saveData(item) {
        console.log(item)
      },
      newData() {
        console.log('newData!')
      },
      initItems(items) {

        let _this = this;
        if (items) {
          initData(items, 1, null);
        }

        function initData(items, level, parent) {
          let spaceHtml = "";
          for (var i = 1; i < level; i++) {
            spaceHtml += "";
          }
          [].forEach.call(items, function (item, index) {
            item = Object.assign({}, item, {"parent": parent, "level": level, "spaceHtml": spaceHtml});
            if ((typeof item.expanded) == "undefined") {
              item = Object.assign({}, item, {"expanded": false});
            }
            if ((typeof item.show) == "undefined") {
              item = Object.assign({}, item, {"isShow": false});
            }
            item = Object.assign({}, item, {"load": (item.expanded ? true : false)});

            _this.currentItems[index] = JSON.parse(JSON.stringify(item));
          });
        }
      },

      updateItems(items) {

        let _this = this, temp = [], sortedOriginItems = [], sortedItems = [], sortedItemsIds = [];
        sortOriginItems(items);
        //treeGrid数组同步children
        _this.currentItems.map(function (item) {
          if (item.grade === 0) {
            temp.push(item);
          }
        });

        //同步最外层目录
        items.map(function (el) {
          var ids = [];
          _this.currentItems.map(function (item) {
            ids.push(item.id)
          });

          if ((ids.toString()).indexOf(el.id) === -1) {
            _this.currentItems.push(_initData(el, 1, null));
          }
        });
        sortCurrentItems(temp);
        //同步数组children
        let childIndex = 0;
        _this.currentItems.map(function (item, index) {
          childIndex = 0;
          if (item.children) {
            sortedOriginItems.map(function (el) {
              if (el.id === item.id) {
                item.children = el.children;
              }
            })
          }
          if (item.load) {
            sortedOriginItems.map(function (el) {
              if (el.parentId === item.id) {
                childIndex++;
                var isExitItem = getLoadedItem(el.id);
                if (!isExitItem) {
                  _this.currentItems.splice((index + childIndex), 0, el);
                  Vue.set(_this.currentItems[index + childIndex], 'isShow', true);
                  Vue.set(_this.currentItems[index + childIndex], 'expanded', false);
                  Vue.set(_this.currentItems[index + childIndex], 'parent', item);
                  Vue.set(_this.currentItems[index + childIndex], 'spaceHtml', "");
                }
              }
            })
          }

          _this.currentItems.map(function (item1, index1) {
            if (item1.parentId === item.id) {
              if ((sortedItemsIds.toString()).indexOf(item1.id) == -1) {
                _this.currentItems.splice((index1), 1);
              }
            }
          })
        });

        //给原数组排序,添加到新数组中
        function sortCurrentItems(items) {
          items.map(function (item) {
            sortedItems.push(item);
            sortedItemsIds.push(item.id)
            if (item.children)
              sortCurrentItems(item.children);
          })
        }

        //获取已加载项
        function getLoadedItem(id) {
          var item = null;
          _this.currentItems.map(function (el) {
            if (el.id === id) {
              item = el;
            }
          })
          return item;
        }

        //获取列表数据
        function sortOriginItems(items) {
          items.map(function (item) {
            sortedOriginItems.push(item);
            if (item.children)
              sortOriginItems(item.children);
          })
        }

        //初始化数据
        function _initData(item, level, parent) {
          item = Object.assign({}, item, {"parent": parent, "level": level, "spaceHtml": ""});
          if ((typeof item.expanded) == "undefined") {
            item = Object.assign({}, item, {"expanded": false});
          }
          if ((typeof item.show) == "undefined") {
            item = Object.assign({}, item, {"isShow": true});
          }
          item = Object.assign({}, item, {"load": (item.expanded ? true : false)});
          return item;
        }

      },

      show(item) {
        return ((item.level == 1) || (item.parent && item.parent.expanded && item.isShow));
      },

      toggle(index, item) {

        let me = this;
        let level = item.level + 1;
        let spaceHtml = "";
        for (var i = 1; i < level; i++) {
          spaceHtml += "<i class='fa fa-files-o'></i>";
        }
        if (item.children) {
          if (item.expanded) {
            me.close(item);
          } else {
            item.expanded = !item.expanded;
            if (item.load) {
              me.open(index, item);
            } else {
              item.load = true;
              [].forEach.call(item.children, function (child, childIndex) {
                me.currentItems.splice((index + childIndex + 1), 0, child);
                Vue.set(me.currentItems[index + childIndex + 1], 'parent', item);
                Vue.set(me.currentItems[index + childIndex + 1], 'spaceHtml', spaceHtml);
                Vue.set(me.currentItems[index + childIndex + 1], 'isShow', true);
                Vue.set(me.currentItems[index + childIndex + 1], 'expanded', false);

              });
            }
          }
        }
      },

      open(index, item) {

        let me = this;
        if (item.children) {
          open(index, item.children);
        }

        function open(index, items) {
          [].forEach.call(items, function (child, childIndex) {
            me.currentItems[index + childIndex + 1].isShow = true;
          });
        }
      },

      close(item) {
        let _this = this
        item.expanded = false;
        if (item.children) {
          item.children.forEach(child => {
            child.isShow = false;
            child.expanded = false
            _this.close(child);
          });
        }
      }
    }
  }
</script>
<style scoped>
  .indented {
    margin-right: 5px;
  }

</style>
