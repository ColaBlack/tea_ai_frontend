<template>
  <div id="answerPage">
    <a-card>
      <a-space direction="vertical">
        <h1>{{ questionBank.bankName }}</h1>
        <p>{{ questionBank.bankDesc }}</p>
        <h3 v-if="currentQuestion && currentQuestion.title">第{{ current }}题：{{ currentQuestion.title }}</h3>
        <a-radio-group direction="vertical" v-model="currentAnswer" :options="currentOption" @change="doChange" />
        <a-space size="large" style="margin-top: 24px">
          <a-button
            type="primary"
            circle
            v-if="current < questionContent.length"
            :disabled="!currentAnswer"
            @click="current += 1"
          >
            下一题
          </a-button>
          <a-button
            type="primary"
            v-if="current === questionContent.length"
            circle
            :disabled="!currentAnswer"
            @click="doSubmit"
          >
            查看结果
          </a-button>
          <a-button v-if="current > 1" circle @click="current -= 1">
            上一题
          </a-button>
        </a-space>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import { Message } from '@arco-design/web-vue'
import { listQuestionVoByPageUsingPost } from '@/api/questionController'
import router from '@/router'
import { getQuestionBankVoByIdUsingGet } from '@/api/questionBankController'
import { addUserAnswerUsingPost } from '@/api/userAnswerController'

interface Props {
  bankId: number
}

const props = defineProps<Props>()

const questionBank = ref<API.QuestionBankVO>({})

const questionContent = ref<API.QuestionContentDTO[]>([])

const current = ref(1)

const currentQuestion = ref<API.QuestionContentDTO>({})

const currentOption = computed(() => {
  if (!currentQuestion.value) return []
  return currentQuestion.value.options ? currentQuestion.value?.options.map((item) => {
    return { label: `选项${item.key}:${item.value}`, value: item.key }
  }) : []
})

const currentAnswer = ref<string>('')

const answerList = ref<string[]>([])

watchEffect(() => {
  currentQuestion.value = questionContent.value[current.value - 1]
  currentAnswer.value = answerList.value[current.value - 1] || ''
})

const loadData = async () => {
  const bank = await getQuestionBankVoByIdUsingGet({ id: props.bankId })
  if (bank.data.code === 200) {
    questionBank.value = bank.data.data as API.QuestionBankVO
  } else if (bank.data.code === 40400) {
    Message.error('获取题库信息失败:' + bank.data.message)
    // 访问的题库不存在则跳转到“404NotFound”页面
    await router.push('/404')
  } else {
    Message.error('获取题库信息失败:' + bank.data.message)
  }
  // 获取题目信息
  const res = await listQuestionVoByPageUsingPost({
    questionBankId: props.bankId,
    current: 1,
    pageSize: 1,
    sortField: 'create_time',
    sortOrder: 'descend'
  })
  if (res.data.code === 200 && res.data.data?.records) {
    questionContent.value = res.data.data.records[0].questionContent as API.QuestionContentDTO[]
  } else if (res.data.code === 40400) {
    Message.error('获取题目信息失败:' + res.data.message)
    // 访问的题库不存在则跳转到“404NotFound”页面
    await router.push('/404')
  } else {
    Message.error('获取题目信息失败:' + res.data.message)
  }
}

onMounted(async () => {
  await loadData()
})

const doChange = (value: string) => {
  answerList.value[current.value - 1] = value
}

const doSubmit = async () => {
  const res = await addUserAnswerUsingPost({
    bankid: props.bankId,
    choices: answerList.value
  })
  if (res.data.code === 200) {
    Message.success('提交成功')
    // 跳转到“result”页面
    setTimeout(() => {
      router.push(`/answer/result/${res.data.data}`)
    }, 500)
  } else {
    Message.error('提交失败:' + res.data.message)
  }
}
</script>

<style scoped>

</style>