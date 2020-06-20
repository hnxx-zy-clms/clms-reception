import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
// import 'highlight.js/styles/monokai.css'
import './config/hljs.js'

import hljs from 'highlight.js'
hljs.highlightCode = function() {
  // 自定义highlightCode方法，将只执行一次的逻辑去掉
  const blocks = document.querySelectorAll('pre code');
  [].forEach.call(blocks, hljs.highlightBlock)
}
// 在组件中
export default {
  mounted() {
    hljs.highlightCode()
  }
}

import './permission' // 权限控制

Vue.use(VueResource)
Vue.use(Antd)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(require('vue-moment'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
