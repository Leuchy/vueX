import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // @:在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误
  state: {
    counter: 0,
  },
  mutations: {
    add(state){
      state.counter++;
    }
  },
  actions: {
    asyncAdd(ctx){
      setTimeout(()=>{
        ctx.commit('add');
      },1000)
    }
  },
  modules: {
  }
})
