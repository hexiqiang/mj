import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: 'Bearer' + ' ' + sessionStorage.getItem('mtoken')
  },
  mutations: {
    increment (state, token) {
      // εζ΄ηΆζ
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
