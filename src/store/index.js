import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showNav:[]
  },
  mutations: {
    increment (state) {
      this.showNav
    }
  },
  actions: {
  },
  modules: {
  }
})
