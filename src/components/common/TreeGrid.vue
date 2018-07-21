<template>
  <table class="el-table el-table--fit el-table--border el-table--enable-row-transition ">
    <thead>
    <tr>
      <td v-for="(header,index) in tableHeader" class="el-table_5_column_32 is-center is-leaf" :key="index">
        {{header.title}}
      </td>
    </tr>
    </thead>
    <tbody class="el-table__body-wrapper ">
    <tr v-for="(item, index) in currentItems" v-show="show(item)" :key="index" class="el-table__row"  @contextmenu="contextMenu($event)">
      <td style="padding-left: 20px">
        <a v-bind:style="{position:'relative', left: item.grade*20 +'px'}">
          <i v-if="item.children && item.children.length > 0" class="indented el-icon-arrow-up"
             :class="{'el-icon-plus':!item.expanded,'el-icon-minus':item.expanded }" @click="toggle(index,item)"></i>{{item[parentNode]}}</a>
      </td>
      <td class="el-table_1_column_1 is-center" v-for="node in detailNode" :key="node">{{item[node]}}</td>

      <span v-if="showContext" class="vue-contextMenu-listWrapper" :class="'vue-contextMenuName-' + contextMenuData.menuName">
          <li v-for="menu in contextMenuData.menuList" class="context-menu-list">
            <button @click.stop="contextEventHandler(item,menu)">
              <i :class="menu.icoName" class="menu-button"></i>
              <span class="menu-button">{{menu.btnName}}</span>
            </button>
          </li>
        </span>

    </tr>
    </tbody>
  </table>
</template>

<script>
  import Vue from 'vue';

  export default {

    props: {
      tableData: {
        required: true,
        type: Array
      },
      tableHeader: {
        required: true,
        type: Array
      },
      contextMenuData: {
        type: Object,
        required: false,
        default() {
          return {
            menuName: 'defaultName',//菜单名称
            location: {x: 0, y: 0},//菜单位置
            menuList: [{
              fnHandler: 'newData',// 绑定事件
              icoName: 'el-icon-circle-plus',// icon图标
              btnName: '新增'// 菜单名称
            }]//菜单列表

          }
        }
      },
      transferIndex: {
        type: Number,
        default: 0
      },
      showContext: {//是否显示右键菜单
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        initialized: false,
        currentItems: [],
        parentNode: '',
        detailNode: []
      }
    },

    watch: {
      "tableData": {
        handler(newVal) {
          if (!this.initialized) {
            this.initialized = true;
            this.currentItems = [];
            this.initItems(newVal);
          } else {
            this.updateItems(newVal);
          }
        },
        deep: true
      },

      'tableHeader': {
        handler(items) {
          let _this = this;
          items.forEach((item, index) => {
            if (index === 0) {
              _this.parentNode = item.name
            } else {
              _this.detailNode.push(item.name)
            }
          })
        }
      },

      "currentItems": {
        handler(newVal, oldVal) {
        },
        deep: true
      },
      'contextMenuData.location'(val) {
        if (this.showContext) {
          let _this = this;
          let index = _this.transferIndex;
          let menuName = 'vue-contextMenuName-' + _this.contextMenuData.menuName;
          let menu = document.getElementsByClassName(menuName)[index];
          menu.style.display = 'block';
          menu.style.left = val.x + 'px';
          menu.style.top = val.y+ 'px';
          document.addEventListener('mouseup', function () {
            menu.style.display = 'none'
          }, false)
        }
      }
    },
    methods: {

      contextMenu(event) {
        event.preventDefault();
        this.contextMenuData.location = {x: event.clientX, y: event.clientY}
      },

      contextEventHandler(item, menu) {
        this.$emit(menu.fnHandler, item)
      },
      initItems(items) {

        let _this = this;
        if (items) {
          initData(items, 1, null);
        }

        function initData(items, level, parent) {
          let spaceHtml = "";
          for (let i = 1; i < level; i++) {
            spaceHtml += "";
          }
          [].forEach.call(items, function (item, index) {
            item = Object.assign({}, item, {"parent": parent, "level": level, "spaceHtml": spaceHtml});
            if ((typeof item.expanded) === "undefined") {
              item = Object.assign({}, item, {"expanded": false});
            }
            if ((typeof item.show) === "undefined") {
              item = Object.assign({}, item, {"isShow": false});
            }
            item = Object.assign({}, item, {"load": !!item.expanded });
            _this.currentItems[index] = JSON.parse(JSON.stringify(item));
          });
        }
      },

      updateItems(items) {

        let _this = this, temp = [], sortedOriginItems = [], sortedItems = [], sortedItemsIds = [];
        sortOriginItems(items);
        //treeGrid数组同步children
        _this.currentItems.map(item=> {
          if (item.grade === 0) {
            temp.push(item);
          }
        });

        //同步最外层目录
        items.map(function (el) {
          let ids = [];
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
        _this.currentItems.map((item, index) =>{
          childIndex = 0;
          if (item.children) {
            sortedOriginItems.map(entity =>{
              if (entity.id === item.id) {
                item['children'] = entity.children;
              }
            })
          }
          if (item.load) {
            sortedOriginItems.map(entity=> {
              if (entity.parentId === item.id) {
                childIndex++;
                let isExitItem = getLoadedItem(entity.id);
                if (!isExitItem) {
                  _this.currentItems.splice((index + childIndex), 0, entity);
                  Vue.set(_this.currentItems[index + childIndex], 'isShow', true);
                  Vue.set(_this.currentItems[index + childIndex], 'expanded', false);
                  Vue.set(_this.currentItems[index + childIndex], 'parent', item);
                  Vue.set(_this.currentItems[index + childIndex], 'spaceHtml', "");
                }
              }
            })
          }

          _this.currentItems.map(function (entity, index1) {
            if (entity.parentId === item.id) {
              if ((sortedItemsIds.toString()).indexOf(entity.id) === -1) {
                _this.currentItems.splice((index1), 1);
              }
            }
          })
        });

        //给原数组排序,添加到新数组中
        function sortCurrentItems(items) {
          items.map(function (item) {
            sortedItems.push(item);
            sortedItemsIds.push(item.id);
            if (item.children){
              sortCurrentItems(item.children);
            }
          })
        }

        //获取已加载项
        function getLoadedItem(id) {
          let item = null;
          _this.currentItems.map(entity => {
            if (entity.id === id) {
              item = entity;
            }
          });
          return item;
        }

        //获取列表数据
        function sortOriginItems(items) {
          items.map(item =>{
            sortedOriginItems.push(item);
            if (item.children){
              sortOriginItems(item.children);
            }
          })
        }

        //初始化数据
        function _initData(item, level, parent) {
          item = Object.assign({}, item, {"parent": parent, "level": level, "spaceHtml": ""});
          if ((typeof item.expanded) === "undefined") {
            item = Object.assign({}, item, {"expanded": false});
          }
          if ((typeof item.show) === "undefined") {
            item = Object.assign({}, item, {"isShow": true});
          }
          item = Object.assign({}, item, {"load": !!item.expanded });
          return item;
        }

      },

      show(item) {
        return ((item.level === 1) || (item.parent && item.parent.expanded && item.isShow));
      },

      toggle(index, item) {

        let _this = this;
        let level = item.level + 1;
        let spaceHtml = "";
        for (let i = 1; i < level; i++) {
          spaceHtml += "<i class='fa fa-files-o'></i>";
        }
        if (item.children) {
          if (item.expanded) {
            _this.close(item);
          } else {
            item.expanded = !item.expanded;
            if (item.load) {
              _this.open(index, item);
            } else {
              item.load = true;
              [].forEach.call(item.children, function (child, childIndex) {
                _this.currentItems.splice((index + childIndex + 1), 0, child);
                Vue.set(_this.currentItems[index + childIndex + 1], 'parent', item);
                Vue.set(_this.currentItems[index + childIndex + 1], 'spaceHtml', spaceHtml);
                Vue.set(_this.currentItems[index + childIndex + 1], 'isShow', true);
                Vue.set(_this.currentItems[index + childIndex + 1], 'expanded', false);
              });
            }
          }
        }
      },

      open(index, item) {

        let _this = this;
        if (item.children) {
          open(index, item.children);
        }

        function open(index, items) {
          [].forEach.call(items, function (child, childIndex) {
            _this.currentItems[index + childIndex + 1].isShow = true;
          });
        }
      },

      close(item) {
        let _this = this;
        item.expanded = false;
        if (item.children) {
          item.children.forEach(child => {
            child.isShow = false;
            child.expanded = false;
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

  .menu-button {
    float: left;
    padding-left: 10px;
  }

  .vue-contextMenu-listWrapper {
    box-shadow: 2px 2px 2px #cccccc;
    display: none;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
  }

  .vue-contextMenu-listWrapper .context-menu-list {
    width: 150px;
    height: 32px;
    border-radius: 4px;
    background: #F3F3F3;
    text-decoration: none;
    list-style: none;
  }

  .vue-contextMenu-listWrapper .context-menu-list button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: block;
    outline: 0;
    border: 0;
  }

  .vue-contextMenu-listWrapper .context-menu-list button:hover {
    box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);
    color: #ffffff;
    border-radius: 4px;
    background: -webkit-linear-gradient(bottom, #5a6a76, #2e3940); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom, #5a6a76, #2e3940); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom, #5a6a76, #2e3940); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom, #5a6a76, #2e3940);
  }
</style>
