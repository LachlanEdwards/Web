// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/icon/css/ml_icon.css'
import All from 'vue-ionicons/dist/ionicons.js'
import Axios from 'axios'
import Toast from 'vue-toasted'
import VeeValidate from 'vee-validate'

Vue.use(All)
Vue.use(Toast, {
  position: 'bottom-right',
  duration: 5000,
  keepOnHover: true,
  iconPack: 'fontawesome',
  icon: 'info-circle',
  containerClass: 'nf',
  className: 'nf-in'
})
Vue.use(VueCookies)
Vue.use(VeeValidate)
Vue.config.productionTip = false
VueCookies.config('7d')

Vue.prototype.$http = Axios.create({
  baseURL: 'http://localhost:8081/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': window.$cookies.get('JWT')
  }
})

Vue.prototype.$http.interceptors.response.use(null, function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 500:
        router.push({ path: `/500` })
        break
      case 404:
        router.push({ path: `/404` })
        break
      case 401:
        router.push({ path: `/401` })
        break
      case 403:
        router.push({ path: `/403` })
        break
    }
  }
  return Promise.reject(error)
})

let userService = Vue.mixin({
  computed: {
    $user: {
      get: function () {
        return global.$data.$user
      },
      set: function (user) {
        global.$data.$user = user
      }
    }
  },
  methods: {},
  created: function () {
    const api = 'http://localhost:8081/'
    var vm = this
    var bearer = vm.$cookies.get('JWT')
    if (bearer != null) {
      this.$http({
        method: 'GET',
        url: api + 'user/self',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': bearer
        }
      }).then(function (response) {
        if (!response.error) {
          global.$user = response.data
        } else {
          router.push(response.url)
        }
      })
    } else if (router.path !== '/signin') {
      router.push({ path: `/signin` })
    }
  }
})

/* eslint-disable no-new */
let global = new Vue({
  data: {
    $user: null
  }
})

new Vue({
  el: '#app',
  router,
  mixins: [userService],
  components: { App },
  template: '<App/>'
})
