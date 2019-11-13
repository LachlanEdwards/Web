// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import { store } from './store/store'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/icon/css/ml_icon.css'
import All from 'vue-ionicons/dist/ionicons.js'
import Axios from 'axios'
import Toast from 'vue-toasted'
import VeeValidate from 'vee-validate'
const api = 'http://localhost:8081/'

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
  baseURL: api,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': Vue.prototype.$cookies.get('JWT')
  }
})

const request = Axios.create({
  baseURL: api,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': Vue.prototype.$cookies.get('JWT')
  }
})

request.interceptors.response.use(null, function (error) {
  if (error.response) {
    console.log(error.response)
    switch (error.response.status) {
      case 500:
        router.push({ path: `/500` })
        break
      case 404:
        router.push({ path: `/404` })
        break
      case 401:
        console.log('401 detected')
        router.push({ path: `/401` })
        break
      case 403:
        router.push({ path: `/403` })
        break
    }
  }
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  request,
  components: { App },
  template: '<App/>',
  async created () {
    await store.dispatch('init')
  }
})
