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
      <a-form-item field="userPassword" label="密码" :rules="[{ required: true, message: '密码是必填项' }]"
                   validate-trigger="blur">
        <a-input v-model="form.checkPassword" placeholder="请再次输入密码" type="password" />
        <template #extra>
          <div>两次输入密码必须一致</div>
        </template>
      </a-form-item>
      <a-form-item>
        <a-button class="login-btn" type="primary" @click="handleRegister">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from '@/store/user'
import { Message } from '@arco-design/web-vue'
import router from '@/router'
import { userRegisterUsingPost } from '@/api/userController'

const form = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
} as API.UserRegisterRequest)

const userStore = useUserStore()

const handleRegister = async () => {
  const res = await userRegisterUsingPost(form)
  if (res.data.code === 200) {
    await userStore.fetchLoginUser()
    Message.success('注册成功！即将跳转登录页面')
    setTimeout(() => {
      router.push({ path: '/user/login' })
    }, 1000)
  } else {
    Message.error('注册失败！' + res.data.message)
  }
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
