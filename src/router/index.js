import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Product from '@/components/pages/Product'
import NotFound from '@/components/common/404'
import ProductList from '@/components/pages/ProductList'
import TabList from '@/components/pages/TabList'
import TreePage from '@/components/pages/TreePage'
import TreeGrid from '@/components/pages/TreeGrid'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: NotFound
    }, {
      path: '/',
      component: Home,
      name: 'home',
      redirect: '/home/product/list'

    }, {
      path: '/home',
      component: Home,
      name: 'home',
      redirect: '/home/product/list',
      children: [
        {
          path: '/404',
          component: NotFound,
          name: '404'
        }, {
          path: 'product',
          component: Product,
          name: 'Product'
        },{
          path: 'treePage',
          component: TreePage,
          name: 'TreePage'
        },{
          path: 'treeGrid',
          component: TreeGrid,
          name: 'TreeGrid'
        },{
          path: 'tabs',
          component: TabList,
          name: 'TabList'
        }, {
          path: 'product/list',
          component: ProductList,
          name: 'productList'
        }
      ]
    }
  ]
})
