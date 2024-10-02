<template>
  <div id="loginPage">
    <a-form :model="form" class="login-form" auto-label-width>
      <a-form-item field="userAccount" label="账号" :rules="[{ required: true, message: '账号是必填项' }]"
                   validate-trigger="blur">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
        <template #extra>
          <div>账号由字母、数字，长度在4-20位之间</div>
        </template>
      </a-form-item>
      <a-form-item field="userPassword" label="密码" :rules="[{ required: true, message: '密码是必填项' }]"
                   validate-trigger="blur">
        <a-input v-model="form.userPassword" placeholder="请输入密码" type="password" />
        <template #extra>
          <div>密码由字母、数字组成，长度在6-20位之间，但不能是纯数字或纯字母</div>
        </template>
      </a-form-item>
      <a-form-item>
        <a-button class="login-btn" type="primary" @click="handleLogin">登录</a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="login-btn" type="secondary" @click="handleRegister">去注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { userLoginUsingPost } from '@/api/userController'
import { useUserStore } from '@/store/user'
import { Message } from '@arco-design/web-vue'
import router from '@/router'

const form = reactive({
  userAccount: '',
  userPassword: ''
} as API.UserLoginRequest)

const userStore = useUserStore()

const handleLogin = async () => {
  const res = await userLoginUsingPost(form)
  if (res.data.code === 200) {
    await userStore.fetchLoginUser()
    Message.success('登录成功！')
    await router.push({
      path: '/',
      replace: true
    })
  } else {
    Message.error('登录失败！' + res.data.message)
  }
}

const handleRegister = () => {
  router.push({
    path: '/user/register',
    replace: true
  })
}
</script>

<style scoped>
#loginPage .login-form {
  max-width: 400px;
  margin: 100px auto auto auto;
}

#loginPage .login-btn {
  margin: 0 auto;
  width: 100%;
  text-align: center;
}
</style>
