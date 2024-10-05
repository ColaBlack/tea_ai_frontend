import type { RouteRecordRaw } from 'vue-router'
import WelcomePage from '@/pages/common/welcomePage.vue'
import LoginPage from '@/pages/common/loginPage.vue'
import RegisterPage from '@/pages/common/registerPage.vue'
import roleEnums from '@/access/roleEnums'
import NoAuthPage from '@/pages/common/noAuthPage.vue'
import UserPage from '@/pages/admin/userPage.vue'
import userAnswerPage from '@/pages/admin/userAnswerPage.vue'
import bankPage from '@/pages/admin/bankPage.vue'
import questionPage from '@/pages/admin/questionPage.vue'
import scoringResultPage from '@/pages/admin/scoringResultPage.vue'
import NotFoundPage from '@/pages/common/notFoundPage.vue'
import bankDetailPage from '@/pages/bank/bankDetailPage.vue'
import BankAddPage from '@/pages/bank/bankAddPage.vue'
import BankUpdatePage from '@/pages/bank/bankUpdatePage.vue'
import questionEditPage from '@/pages/bank/questionUpdatePage.vue'
import scoringResultEditPage from '@/pages/bank/scoringResultUpdatePage.vue'
import answerResultPage from '@/pages/answer/answerResultPage.vue'
import answerPage from '@/pages/answer/answerPage.vue'
import myAnswerPage from '@/pages/answer/myAnswerPage.vue'

export const routerList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '主页',
    component: WelcomePage,
    meta: {
      access: roleEnums.PUBLIC,
      hideInMenu: false
    }
  },
  {
    path: '/user/login',
    name: '登录',
    component: LoginPage,
    meta: {
      access: roleEnums.PUBLIC,
      hideInMenu: true
    }
  },
  {
    path: '/user/register',
    name: '注册',
    component: RegisterPage,
    meta: {
      access: roleEnums.PUBLIC,
      hideInMenu: true
    }
  },
  {
    path: '/answer/do/:bankId',
    name: '答题页面',
    component: answerPage,
    props: true,
    meta: {
      access: roleEnums.USER,
      hideInMenu: true
    }
  },
  {
    path: '/answer/result/:id',
    name: '答题结果',
    component: answerResultPage,
    props: true,
    meta: {
      access: roleEnums.USER,
      hideInMenu: true
    }
  },
  {
    path: '/my/answer',
    name: '我的回答',
    component: myAnswerPage,
    meta: {
      access: roleEnums.USER,
      hideInMenu: false
    }
  },
  {
    path: '/bank/detail/:bankId',
    name: '题库详情',
    component: bankDetailPage,
    props: true,
    meta: {
      access: roleEnums.PUBLIC,
      hideInMenu: true
    }
  }, {
    path: '/bank/add',
    name: '创建题库',
    component: BankAddPage,
    meta: {
      access: roleEnums.USER,
      hideInMenu: false
    }
  },
  {
    path: '/bank/update/:bankId',
    name: '修改题库',
    component: BankUpdatePage,
    props: true,
    meta: {
      access: roleEnums.USER,
      hideInMenu: true
    }
  },
  {
    path: '/question/update/:bankId',
    name: '修改题目',
    component: questionEditPage,
    props: true,
    meta: {
      access: roleEnums.USER,
      hideInMenu: true
    }
  },
  {
    path: '/scoring_result/update/:bankId',
    name: '修改评分结果',
    component: scoringResultEditPage,
    props: true,
    meta: {
      access: roleEnums.USER,
      hideInMenu: true
    }
  },
  {
    path: '/403',
    name: '无权限',
    component: NoAuthPage,
    meta: {
      access: roleEnums.PUBLIC,
      hideInMenu: true
    }
  },
  {
    path: '/admin/user',
    name: '用户管理',
    component: UserPage,
    meta: {
      access: roleEnums.ADMIN,
      hideInMenu: false
    }
  },
  {
    path: '/admin/bank',
    name: '题库管理',
    component: bankPage,
    meta: {
      access: roleEnums.ADMIN,
      hideInMenu: false
    }
  },
  {
    path: '/admin/question',
    name: '题目管理',
    component: questionPage,
    meta: {
      access: roleEnums.ADMIN,
      hideInMenu: false
    }
  },
  {
    path: '/admin/scoring_result',
    name: '评分管理',
    component: scoringResultPage,
    meta: {
      access: roleEnums.ADMIN,
      hideInMenu: false
    }
  },
  {
    path: '/admin/user_answer',
    name: '回答管理',
    component: userAnswerPage,
    meta: {
      access: roleEnums.ADMIN,
      hideInMenu: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: {
      access: roleEnums.PUBLIC,
      hideInMenu: true
    }
  }
]
export default routerList
