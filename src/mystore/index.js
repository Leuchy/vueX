import Vue from 'vue'
import Vuex from './myvuex'

// @:Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象(https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // @:在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误(https://vuex.vuejs.org/zh/guide/strict.html)
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
