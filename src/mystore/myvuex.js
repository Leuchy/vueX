/*
 * 1. 是一个插件, 所以需要实现 install 方法
 * 2. 使用时是 new Vuex.Store({...}), 所以需要实现一个 Store 类
 */

// import Vue from 'vue';
let Vue; // @: 保存创建vuex实例时传入的vue, 这样无需在组件中引入vue

class Store {
  constructor(options){
    // @:保存选项
    this.$options = options;
    this._mutations = options.mutations;
    this._actions = options.actions;

    // @:绑定上下文, 确保在外部调用使用箭头函数时, this不会发生变化
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    // @:利用Vue的computed属性实现getters中的计算
    // Vue 的 computed 是不带参数的，因此需要对传入的getters做处理
    this.getters = {};  // @:声明getters
    const computed = {};  // @:声明要传入vue(this._vm)中的computed
    const store = this; // @:暂存this
    this._wrappedGetters = options.getters;
    Object.keys(this._wrappedGetters).forEach(key=>{
      const fn = store._wrappedGetters[key];
      computed[key] = ()=>{
        return fn(store.state);
      }

      // @:为getters添加对应的key
      Object.defineProperty(store.getters, key, {
        get(){
          return store._vm[key] // @:computed中的key会被代理到store._vm上，所以直接返回即可
        }
      })
    })

    // 1.暴露state属性, 对传入的state选项做响应式处理
    // Vue.util.defineReactive(this, 'state', this.$options.state);

    // 2.希望用户以期望的方式commit/dispatch修改state的值
    // this._vm = new Vue({
    //   data(){
    //     return options.state
    //   }
    // })

    // 3.希望用户知道, 不要直接修改state对象
    this._vm = new Vue({
      data(){
        return {
          // @:以$开头的key值, 做响应式时不会向vue实例上做代理(https://cn.vuejs.org/v2/api/#data)
          $$state: options.state,  
        }
      },
      computed
    });
  }

  // 2
  // get state() {
  //   return this._vm
  // }

  // 3
  get state() {
    return this._vm._data.$$state
  }

  set state(v){
    console.error('please use replaceState to reset state')
  }

  commit(type, payload) {
    const entry = this._mutations[type];
    if (!entry) {
      console.error('unknown mutation');
      return;
    }

    entry(this.state, payload);
  }

  dispatch(type, payload) {
    const entry = this._actions[type];
    if (!entry) {
      console.error('unknown action');
      return;
    }

    entry(this, payload);
  }
}

function install(_Vue) {
  // @:传入构造函数, 对其进行扩展
  Vue = _Vue;

  
  // @: 注册$store, 让所有组件都可以访问

  // 1.此时store实例还未创建, 因此需要延迟到vue实例和store实例已经创建完毕
  // Vue.prototype.$store = store;

  // 2.混入, 通过this访问vue实例
  Vue.mixin({
    beforeCreate(){
      // @:获取store
      if (this.$options.store){ // 如果存在, 说明是根实例
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  install,
  Store
}