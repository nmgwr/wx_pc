import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login'
import Error400 from '../components/error/Error400'
import Error401 from '../components/error/Error401'
import Error404 from '../components/error/Error404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
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
