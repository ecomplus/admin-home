import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Graphs from '../views/Graphs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/graphs',
    name: 'graphs',
    component: Graphs
  }
]

const router = new VueRouter({
  routes
})

router.afterEach(() => {
  window.dispatchEvent(new window.HashChangeEvent('hashchange'))
})

export default router
