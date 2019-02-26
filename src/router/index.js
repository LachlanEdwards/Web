import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import Building from '@/components/Building'
import Entity from '@/components/Entity'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn
    },
    {
      path: '/b/:id',
      name: 'Building',
      component: Building
    },
    {
      path: '/building/:id',
      name: 'Building',
      component: Entity
    }
  ]
})
