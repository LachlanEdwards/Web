import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    api: 'http://localhost:8081'
  },
  mutations: {
    user (state, user) {
      state.user = user
    }
  },
  getters: {
    user: state => state.user,
    api: state => state.api
  },
  actions: {
    init ({ commit }) {
      Vue.prototype.$http('user/self').then(response => {
        console.log('fired')
        commit('user', response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
})
