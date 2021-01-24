import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ToastPlugin } from 'bootstrap-vue'

export default () => {
  Vue.use(ToastPlugin)

  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#admin-home')
}
