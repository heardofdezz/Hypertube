import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Movies from '@/components/Movies'
import Settings from '@/components/Settings'
import Profile from '@/components/Profile'
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
      path: '/Settings',
      name: 'Settings',
      component: Settings  
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile 
    },
  ]
})
