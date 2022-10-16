import Vue from 'vue'
import App from './App.vue'
// vue-router
import router from './router'
// vuex
import store from './store'
// 样式文件 ====================== 我不会写-_-||
import './assets/css/style.less'
import './assets/font/iconfont.css'
// mock模拟数据
// require('./Mock')
import { parseTime } from './utils'
// 代码高亮插件
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'	//样式
// 引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI)
// 自定义指令
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.config.productionTip = false
// 过滤器 格式化时间
Vue.filter('parseTime', (v) => parseTime(v, '{y}-{m}-{d}'))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
