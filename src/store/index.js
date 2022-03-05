import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: 'Bearer' + ' ' + sessionStorage.getItem('mtoken'),
    csrf: sessionStorage.getItem('csrf')
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
