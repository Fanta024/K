import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCk:[],
    remarks:''
  },
  getters: {
  },
  mutations: {
    setUserInfo(state,val){
      state.userCk=val
      
    },
    setUserRemark(state,val){
      state.remarks=val;
    }
  },
  actions: {
  },
  modules: {
  }
})
