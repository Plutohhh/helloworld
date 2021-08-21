import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    regional:[],
    tableData:[],
    recordData:[]
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})