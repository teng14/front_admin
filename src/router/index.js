import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home/index',
    name: '首页',
    hidden: true,
    children: [{ path: 'home', component: _import('home/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'Example',
  //   icon: 'zujian',
  //   children: [
  //     { path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') }
  //   ]
  // },

  {
    path: '/home',
    component: Layout,
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'index', name: '首页', component: _import('home/index'), meta: { role: ['admin'] }}]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/index',
    noDropdown: true,
    name: '终端列表',
    children: [
      { path: 'index', component: _import('page/customer/index') },
      { path: 'detail', name: '终端详情', component: _import('page/customer/detail') },
      { path: 'keqingList', name: '客情历史记录', component: _import('page/customer/keqingList') },
      { path: 'cartGoods', name: '购物车商品', component: _import('page/customer/cartGoods') }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/home',
    noDropdown: true,
    name: '订单',
    children: [
      { path: 'index', component: _import('page/order/index') },
      { path: 'detail', name: '订单详情', component: _import('page/order/detail') }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
