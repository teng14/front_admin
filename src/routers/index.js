import Vue from 'vue'
import VueRouter from 'vue-router'

//  路由规则
import Home from '../components/common/Home'
import Test from '../views/test/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]

const router = new VueRouter({
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from, next) => {

})

export default router
