import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import './axios.js' // 请求拦截

Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$axios = axios //

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
