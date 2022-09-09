import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//  SPA  单页面应用
// 首屏加载速度很慢
// 路由懒加载
// - 等使用到了路由页面，再去请求

// 懒加载的chunk 默认的名字是模块的路径
// /* webpackChunkName: ' 新名字' */
const routes = [
  {
    path: '/ ',
    component: () => import('views/Layout'),
    // redirect: '',
    children: [
      {
        path: '',
        component: () => import('views/Home')
      },
      {
        path: 'video',
        component: () => import('views/Video')
      },
      {
        path: 'qa',
        component: () => import('views/Qa')
      },
      {
        path: 'profile',
        component: () => import('views/Profile')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
