// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import router from './router'
import animate from 'animate.css'
// import vueAntd from 'vue-antd'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, { size: 'small' })
Vue.use(animate)
/* eslint-disable */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
