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
import Update from '@/components/Update'
import feather from 'vue-icon'
import ResetPassword from '../components/ResetPassword'
import ResetConfirmation from '../components/ResetConfirmation'
import Search from '../components/Search'

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
      path: '/update/building/:id',
      name: 'Update',
      component: Update
    },
    {
      path: '/signup',
      name: 'Register',
      component: Register,
      beforeEnter: (to, from, next) => {
        Vue.prototype.$http.get('user/self').then(response => {
          // next(from)
        }).catch(error => {
          if (error.response.status === 401 || error.response.status === 400) {
            next()
          }
        })
      }
    },
    {
      path: '/reset',
      name: 'Reset',
      component: ResetPassword
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/reset/confirm',
      name: 'ResetConfirmation',
      component: ResetConfirmation
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        Vue.prototype.$http.get('user/self').then(response => {
          // next(from)
        }).catch(error => {
          if (error.response.status === 401 || error.response.status === 400) {
            next()
          }
        })
      }
    },
    {
      path: '/stage/building/:id',
      name: 'Stage',
      component: Entity
    },
    {
      path: '/building/:id',
      name: 'Building',
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
      name: 'Unauthorized',
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
