import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/homePage.vue'

const routerList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  }
]
export default routerList