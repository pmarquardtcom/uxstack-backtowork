import Vue from 'vue'
import VueRouter from 'vue-router'
import QuickCheck from '../views/QuickCheck.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'QuickCheck',
    component: QuickCheck,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
