import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'
import ZkTable from 'vue-table-with-tree-grid'
import cookies from 'vue-cookies'
import Bus from '@/util/Bus'
import storage from '@/util/Storage'
import store from '@/util/vuex/store'
import http from '@/util/AxiosHttp'
import axios from 'axios'


Vue.use(cookies);
Vue.use(ZkTable);
Vue.use(ElementUI, {size: 'small', zIndex: 3000});
Vue.prototype.$storage = storage;
Vue.prototype.$http = http;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
const bus = Bus;

router.beforeEach((to, from, next) => {
  console.log('to:',to,'from : ', from);
  console.info('请求拦截');
  next()
});

/**
 * 放在最底部 实现router的刷新拦截
 */
new Vue({
  el: '#app',
  router,
  components: {App},
  store,
  data: {
    bus,
    storage
  },
  template: '<App/>'
});
