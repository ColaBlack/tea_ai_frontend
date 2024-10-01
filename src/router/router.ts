import type { RouteRecordRaw } from 'vue-router'
import WelcomePage from '@/pages/welcomePage.vue'
import LoginPage from '@/pages/loginPage.vue'
import RegisterPage from '@/pages/registerPage.vue'


const routerList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '欢迎',
    component: WelcomePage,
    meta: {
      hideInMenu: false,
    }
  },
  {
    path: '/user/login',
    name: '登录',
    component: LoginPage,
    meta: {
      hideInMenu: true,
    }
  }, {
    path: '/user/register',
    name: '注册',
    component: RegisterPage,
    meta: {
      hideInMenu: true,
    }
  }
]
export default routerList