<template>
  <div id="question-update-page">
    <h1>修改题目</h1>
    <a-form :model="questionContent" class="question-form" auto-label-width>
      <a-space direction="vertical" fill>
        <div v-for="(question, index) in questionContent" :key="index">
          <h3>{{ `题目${index + 1}` }}</h3>
          <a-form-item field="title" :label="`标题`">
            <a-input v-model="question.title" placeholder="为题目起个标题吧..." />
          </a-form-item>
          <a-form-item field="content" :label="`题目${index + 1}选项`">
            <a-space direction="vertical" fill>
              <a-form-item
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                :label="`选项${optionIndex + 1}`"
              >
                <a-space direction="vertical" fill>
                  <a-form-item :label="`选项内容`">
                    <a-input v-model="option.key" placeholder="请输入选项内容" />
                  </a-form-item>
                  <a-form-item :label="`选项值`">
                    <a-input v-model="option.value" placeholder="请输入选项值" />
                  </a-form-item>
                  <a-form-item :label="`选项得分`">
                    <a-input-number v-model="option.score" placeholder="请输入选项得分" />
                  </a-form-item>
                  <a-form-item :label="`选项结果`">
                    <a-input v-model="option.result" placeholder="请输入选项结果" />
                  </a-form-item>
                  <a-space>
                    <a-button @click="addOption(question, optionIndex + 1)" type="primary"
                    >增加选项
                    </a-button>
                    <a-button
                      @click="deleteOption(question, optionIndex)"
                      status="danger"
                      :style="{ marginLeft: '10px' }"
                    >删除选项
                    </a-button>
                  </a-space>
                </a-space>
              </a-form-item>
            </a-space>
          </a-form-item>
          <a-space>
            <a-button @click="addOption(question, question.options?.length || 0)" type="primary"
            >底部增加选项
            </a-button>
            <a-button @click="addQuestion(index + 1)" type="primary">增加题目</a-button>
            <a-button @click="deleteQuestion(index)" status="danger" :style="{ marginLeft: '10px' }"
            >删除题目
            </a-button>
          </a-space>
        </div>
      </a-space>
      <a-form-item>
        <a-space :style="{ marginTop: '20px' }">
          <a-button @click="addQuestion(questionContent.length)" type="primary"
          >底部增加题目
          </a-button>
          <a-button class="submit-btn" type="primary" @click="handleSubmit">提交</a-button>
          <a-button type="outline" @click="handleAIClick">AI 生成题目</a-button>
          <a-drawer
            :width="340"
            :visible="visibleAI"
            @ok="handleAIOk"
            @cancel="handleAICancel"
            unmountOnClose
          >
            <template #title> AI 生成题目</template>
            <div>
              <a-form :model="AIForm" label-align="left" auto-label-width @submit="handleAIOk">
                <a-form-item field="questionNumber" label="题目数量">
                  <a-input-number
                    v-model="AIForm.questionNumber"
                    :min="0"
                    :max="20"
                    placeholder="请输入题目数量"
                  />
                </a-form-item>
                <a-form-item field="optionNumber" label="选项数量">
                  <a-input-number
                    v-model="AIForm.optionNumber"
                    :min="0"
                    :max="6"
                    placeholder="请输入选项数量"
                  />
                </a-form-item>
                <a-form-item></a-form-item>
              </a-form>
            </div>
          </a-drawer>
          <a-button class="cancel-btn" type="outline" @click="router.go(-1)">取消</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import roleEnums from '@/access/roleEnums'
import { computed, onMounted, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { addQuestionUsingPost, listQuestionVoByPageUsingPost } from '@/api/questionController'
import { getQuestionBankVoByIdUsingGet } from '@/api/questionBankController'
import { BASE_URL } from '@/config/request'

interface Props {
  bankId: number
}

const props = defineProps<Props>()

const questionContent = ref<API.QuestionContentDTO[]>([])

const form = ref<API.QuestionAddRequest>({
  questionBankId: props.bankId,
  questionContent: questionContent.value
})

const router = useRouter()

const handleSubmit = async () => {
  const res = await addQuestionUsingPost(form.value)
  if (res.data.code === 200) {
    Message.success('题目创建成功，即将跳转到题库详情页面')
    setTimeout(() => {
      // 1s后跳转到题库详情页面
      router.push('/bank/detail/' + props.bankId)
    }, 500)
  } else {
    Message.error('题目创建失败:' + res.data.message)
  }
}
const loadData = async () => {
  // 获取题库作者信息用于判断是否可以编辑题目信息
  // 获取题库信息
  const bank = await getQuestionBankVoByIdUsingGet({ id: props.bankId })
  if (bank.data.code === 200) {
    creator.value = bank.data.data?.userId || -1
    if (!canEdit.value) {
      Message.error('你没有权限编辑该题目信息')
      await router.push('/403')
    }
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
  //只要最新的一条题目信息
  if (res.data.code === 200 && res.data.data?.records) {
    form.value.questionBankId = props.bankId
    form.value.questionContent = res.data.data.records[0].questionContent
    questionContent.value = form.value.questionContent || []
  } else if (res.data.code === 40400) {
    Message.error('获取题目信息失败:' + res.data.message)
    // 访问的题库不存在则跳转到“404NotFound”页面
    await router.push('/404')
  } else {
    Message.error('获取题目信息失败:' + res.data.message)
  }
}

const userStore = useUserStore()

let creator = ref(-1)

const canEdit = computed(() => {
  // 只有题库创建者或者管理员可以编辑题目信息
  return (
    userStore.loginUser.id === creator.value || userStore.loginUser.userRole === roleEnums.ADMIN
  )
})

onMounted(() => {
  loadData()
})

const addQuestion = (index: number) => {
  questionContent.value.splice(index, 0, {
    title: '',
    options: []
  })
}

const deleteQuestion = (index: number) => {
  questionContent.value.splice(index, 1)
}

const addOption = (question: API.QuestionContentDTO, index: number) => {
  if (!question.options) {
    question.options = []
  }
  question.options.splice(index, 0, {
    key: '',
    value: ''
  })
}

const deleteOption = (question: API.QuestionContentDTO, index: number) => {
  if (!question.options) {
    question.options = []
  }
  question.options.splice(index, 1)
}

const visibleAI = ref(false)

const AIForm = ref<API.AiGenerateQuestionRequest>({
  optionNumber: 4,
  questionNumber: 5
})

const handleAIClick = () => {
  visibleAI.value = true
}

const handleAIOk = async () => {
  if (!props.bankId) {
    return
  }

  // 发送sse请求
  const eventSource = new EventSource(
    BASE_URL +
    `/api/ai/generate/question/sse?bankId=${props.bankId}&optionNumber=${AIForm.value.optionNumber}&questionNumber=${AIForm.value.questionNumber}`
  )

  visibleAI.value = false
  Message.success('生成中，请稍后')

  // 监听sse消息
  eventSource.onmessage = (event) => {
    const res = JSON.parse(event.data)
    form.value.questionContent = [...(form.value.questionContent || []), res]
    questionContent.value = form.value.questionContent
  }
  eventSource.onerror = (event) => {
    if (event.eventPhase === EventSource.CLOSED) {
      eventSource.close()
      Message.success('生成结束')
    } else {
      eventSource.close()
      Message.error('生成失败，')
    }
  }
}

const handleAICancel = () => {
  visibleAI.value = false
}
</script>

<style scoped>
#question-update-page {
  padding: 20px;
  margin: 0 auto;
  max-width: 600px;
}
</style>
