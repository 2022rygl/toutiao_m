import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// const TOKEN_HMTT = 'TOKEN_HMTT'
export default new Vuex.Store({
  state: {
    token: {}
  },
  getters: {},
  mutations: {
    SetToken(state, data) {
      state.token = data
    }
  },
  actions: {},
  modules: {}
})
