import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // @:在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误
  state: {
    counter: 0,
    times: 1,
  },
  mutations: {
    add(state){
      state.counter++;
    },
    addTimes(state){
      state.times++;
    }
  },
  actions: {
    asyncAddTimes(ctx){
      setTimeout(()=>{
        ctx.commit('addTimes');
      },1000)
    }
  },
  getters: {
    total(state){
      return state.counter * state.times;
    }
  },
  modules: {
  }
})
