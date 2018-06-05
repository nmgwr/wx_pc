import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login'
import Index from '../components/index/Index'
import Error400 from '../components/error/Error400'
import Error401 from '../components/error/Error401'
import Error404 from '../components/error/Error404'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/404',
      name: 'Error404',
      component: Error404
    },
    {
      path: '/401',
      name: 'Error401',
      component: Error401
    },
    {
      path: '/400',
      name: 'Error400',
      component: Error400
    }
  ]
})

// 判断权限，可以在路由上增加属性以此判断，但是我这块直接根据路由地址判断了，除了登陆以外其他所有的路由都校验
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    let token = localStorage.getItem('token')
    let userInfo = localStorage.getItem('userInfo')
    if (token && userInfo) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
