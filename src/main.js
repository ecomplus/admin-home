import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ToastPlugin, VBTogglePlugin, ModalPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(ToastPlugin)
Vue.use(VBTogglePlugin)
Vue.use(ModalPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#admin-home')
