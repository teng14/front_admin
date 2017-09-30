import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import * as fundebug from 'fundebug-javascript'
Vue.use(ElementUI)

Vue.config.productionTip = false

fundebug.apikey = '77f968977f8a58fa28028221697d3ad89dc7a4a3f8c8e1c3e26a127b54ae2709'

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root'
  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
}

Vue.config.errorHandler = function(err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData
  fundebug.notifyError(err, {
    metaData:
    {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
