// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
Vue.use(VueCookies)
VueCookies.config('7d')

let userService = Vue.mixin({
  computed: {
    $ubool: {
      get: function () {
        return global.$data.$ubool
      },
      set: function (bool) {
        global.$data.$ubool = bool
      }
    },
    $user: {
      get: function () {
        return global.$data.$user
      },
      set: function (user) {
        global.$data.$user = user
      }
    }
  },
  methods: {
    killSession: function () {
      console.log('.kill() was called')
      var vm = this
      var bearer = vm.$cookies.get('JWT')
      if (bearer) {
        vm.$cookies.remove('JWT')
        global.$ubool = false
        global.$user = null
      }
    }
  },
  created: function () {
    const axios = require('axios')
    const api = 'http://localhost:8081/'
    var vm = this
    var bearer = vm.$cookies.get('JWT')
    console.log(bearer)
    if (bearer != null) {
      axios({
        method: 'GET',
        url: api + 'user/self',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': bearer
        }
      }).then(function (response) {
        if (response.data !== 'false') {
          global.$user = response.data
          global.$ubool = true
        }
      })
    }
  }
})

/* eslint-disable no-new */
let global = new Vue({

  data: {
    $ubool: false,
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
