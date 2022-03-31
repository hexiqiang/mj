import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: 'Bearer' + ' ' + sessionStorage.getItem('mtoken')
  },
  mutations: {
    increment (state, token) {
      // 变更状态
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
