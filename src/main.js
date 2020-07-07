import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import VueResource from 'vue-resource'
import './config/hljs.js'
import hljs from 'highlight.js'
hljs.highlightCode = function() {
  // 自定义highlightCode方法，将只执行一次的逻辑去掉
  const blocks = document.querySelectorAll('pre code');
  [].forEach.call(blocks, hljs.highlightBlock)
}
import './config/element.js'
import './config/ant.js'

import './permission' // 权限控制

Vue.use(VueResource)
Vue.use(require('vue-moment'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
