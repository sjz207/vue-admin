import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Bus from '@/util/Bus'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.css'
import storage from '@/util/store'
import http from '@/util/AxiosHttp'
import ZkTable from 'vue-table-with-tree-grid'
import cookies from 'vue-cookies'

Vue.use(cookies)
Vue.use(ZkTable)
Vue.use(ElementUI, {size: 'small', zIndex: 3000});
Vue.prototype.$storage = storage
Vue.prototype.$http = http
Vue.config.productionTip = false
const bus = Bus

new Vue({
  el: '#app',
  router,
  components: {App},
  data: {
    bus,
    storage
  },
  template: '<App/>'
})
