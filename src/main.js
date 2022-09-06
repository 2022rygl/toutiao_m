import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

// vant组件库样式
import 'vant/lib/index.css'
// 字体图标样式
import '@/assets/font/iconfont.css'
// 加载动态设置Rem值
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
