import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: localStorage.getItem('user'),
    isUserLoggedIn: localStorage.getItem('isUserLoggedIn'),
    count: 8
  },
  plugin: [createPersistedState()],
  mutations: {
    setToken (state, token) {
      state.token = token
      state.count = 8
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('isUserLoggedIn', JSON.stringify(state.isUserLoggedIn))
    },
    setUser (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})
