import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Movies from '@/components/Movies'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hypertube',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Movies',
      name: 'Movies',
      component: Movies
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
