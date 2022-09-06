import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//  SPA  单页面应用
// 首屏加载速度很慢
// 路由懒加载
// - 等使用到了路由页面，再去请求

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: () => import('views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
