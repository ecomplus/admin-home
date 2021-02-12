import Vue from 'vue'
import App from './App.vue'
import { VBTooltip, ToastPlugin } from 'bootstrap-vue'

export default () => {
  Vue.directive('b-tooltip', VBTooltip)
  Vue.use(ToastPlugin)

  Vue.config.productionTip = false

  new Vue({
    render: h => h(App)
  }).$mount('#admin-home')
}
