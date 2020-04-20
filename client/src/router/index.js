import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hypertube',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '',
      name: '',
      // component: 
    },
    {
      path: '',
      name: '',
      // component: '' 
    },
    {
      path: '',
      name: '',
      // component: '' 
    },
  ]
})
