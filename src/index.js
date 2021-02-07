import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { VBTooltip, ToastPlugin } from 'bootstrap-vue'

export default () => {
  Vue.directive('b-tooltip', VBTooltip)
  Vue.use(ToastPlugin)

  Vue.config.productionTip = false

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#admin-home')
}
