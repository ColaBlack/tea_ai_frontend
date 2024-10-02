import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { getLoginUserUsingGet } from '@/api/userController'
import type { AxiosResponse } from 'axios'

export const userStore = defineStore('USER_LOGIN_STATE', () => {
  const loginUser: Ref<API.LoginUserVO> = ref({ userName: '未登录' })

  async function fetchLoginUser() {
    const res: AxiosResponse<API.BaseResponseLoginUserVO_> = await getLoginUserUsingGet()
    if (res.data.code === 200 && res.data.data) {
      loginUser.value = res.data.data
    }
  }

  function setLoginUser(newUser: API.LoginUserVO) {
    loginUser.value = newUser
  }

  return {
    loginUser,
    fetchLoginUser,
    setLoginUser
  }

})