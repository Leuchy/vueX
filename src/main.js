import Vue from 'vue'
import App from './App.vue'
import store from './mystore'

// 1. Vue.use(VueX)
// 2. new store = new VueX.Store({...})
// 3. new Vue({store})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
