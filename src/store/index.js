import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const TOKEN_HMTT = 'TOKEN_HMTT'

// 配置项
// key:默认值vuex
// storage:存储方式，默认本地存储
// reducer：指定持久化哪些数据，，函数return一个对象，对象作为存储的value

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: TOKEN_HMTT,
      // storeage:window.sessionStorage
      reducer({ tokenObj, myChannels }) {
        return { tokenObj, myChannels }
      }
    })
  ],

  state: {
    tokenObj: {},
    myChannels: []
  },
  getters: {
    isLogin(state) {
      // return Boolean(state.tokenObj.token)
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SetToken(state, data) {
      state.tokenObj = data
    },
    /**
     *设置 channels
     * @param {Array} channels  删除或者添加之后最新的频道
     */
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    }
  },
  actions: {},
  modules: {}
})
