import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' // 样式文件
// import 'highlight.js/styles/monnokai-sublime.css'
Vue.directive('highlight', function(el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
