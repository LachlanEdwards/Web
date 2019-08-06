import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import Entity from '@/components/Entity'
import NotFound from '@/components/NotFound'
import ServerError from '@/components/ServerError'
import Forbidden from '@/components/Forbidden'
import Building from '@/components/Building'
import Unauthorized from '@/components/Unauthorized'
import User from '@/components/User'
import Create from '@/components/Create'
import Redirect from '@/components/Redirect'
import Register from '@/components/Register'
import feather from 'vue-icon'

Vue.use(Router)
Vue.use(feather, 'v-icon')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/new/building',
      name: 'Create',
      component: Create
    },
    {
      path: '/signup',
      name: 'Register',
      component: Register
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn
    },
    {
      path: '/stage/building/:id',
      name: 'Building',
      component: Entity
    },
    {
      path: '/building/:id',
      name: 'Stage',
      component: Building
    },
    {
      path: '/redirect',
      name: 'Redirect',
      component: Redirect,
      props: true
    },
    {
      path: '/user/me',
      name: 'Account Settings',
      component: User
    },
    {
      path: '/500',
      component: ServerError
    },
    {
      path: '/403',
      component: Forbidden
    },
    {
      path: '/401',
      component: Unauthorized
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
