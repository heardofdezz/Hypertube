import Vue from 'vue'
import Router from 'vue-router'
import Hypertube from '@/components/Login'
import Signup from '@/components/Signup'
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
      name: 'Sign Up',
      component: Signup
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
