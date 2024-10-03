<template>
  <div id="bank-add-page">
    <h1>创建题库</h1>
    <a-form :model="form" class="login-form" auto-label-width>
      <a-form-item field="bankName" label="题库名称" :rules="[{ required: true, message: '题目名称是必填项' }]"
                   validate-trigger="blur">
        <a-input allow-clear v-model="form.bankName" placeholder="请输入题库名称" @press-enter="handleSubmit" />
      </a-form-item>
      <a-form-item field="bankType" label="题库类型" :rules="[{ required: true, message: '题库类型是必填项' }]"
                   validate-trigger="blur">
        <a-select v-model="form.bankType" placeholder="请选择题库类型" allow-clear>
          <a-option v-for="(value, key) of BANK_TYPE" :value="Number(key)" :key="key" :label="value"></a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="scoringStrategy" label="题库评分策略"
                   :rules="[{ required: true, message: '题库评分策略是必填项' }]"
                   validate-trigger="blur">
        <a-select v-model="form.scoringStrategy" placeholder="请选择题库评分策略" allow-clear>
          <a-option v-for="(value, key) of SCORING_STRATEGY" :value="Number(key)" :key="key" :label="value"></a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="bankDesc" label="题库描述" :rules="[{ required: true, message: '题库描述是必填项' }]"
                   validate-trigger="blur">
        <a-input allow-clear v-model="form.bankDesc" placeholder="简单描述一下题库" @press-enter="handleSubmit" />
      </a-form-item>
      <a-form-item field="bankIcon" label="题库图标"
                   validate-trigger="blur">
        <a-input allow-clear v-model="form.bankIcon" placeholder="输入题库图标的url" @press-enter="handleSubmit" />
      </a-form-item>
      <a-form-item>
        <a-button class="register-btn" type="primary" @click="handleSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { addQuestionBankUsingPost } from '@/api/questionBankController'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { BANK_TYPE, SCORING_STRATEGY } from '@/enums/bankEnums'


const form = ref<API.QuestionBankAddRequest>({})

const router = useRouter()

const handleSubmit = async () => {
  const res = await addQuestionBankUsingPost(form.value)
  if (res.data.code === 200) {
    Message.success('题库创建成功，即将跳转到题库详情页面')
    setTimeout(() => {
      // 1s后跳转到题库详情页面
      router.push('/bank/detail/' + res.data.data)
    }, 500)
  } else {
    Message.error('题库创建失败:' + res.data.message)
  }
}
</script>

<style scoped>
#bank-add-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 400px;
}
</style>