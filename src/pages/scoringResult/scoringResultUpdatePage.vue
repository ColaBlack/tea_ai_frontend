<template>
  <div id="question-update-page">
    <h1>修改题目</h1>
    <a-form :model="questionContent" class="question-form" auto-label-width>
      <a-form-item label="题目列表" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" fill>
          <div v-for="(question, index) in questionContent" :key="index">)">
            <h3>{{ `题目${index + 1}` }}</h3>
            <a-form-item field="title" :label="`标题`">
              <a-input v-model="question.title" placeholder="为题目起个标题吧..." />
            </a-form-item>
            <a-form-item field="content" label="选项">
<!--              <a-input v-model="question.options" placeholder="请输入选项" />-->
            </a-form-item>
            <a-button @click="deleteQuestion(index)" status="danger" :style="{marginLeft:'10px'}">删除题目
            </a-button>
          </div>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-button @click="addQuestion(questionContent.length)" :style="{marginLeft:'10px'}">增加题目</a-button>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button class="submit-btn" type="primary" @click="handleSubmit">提交</a-button>
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
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { addQuestionUsingPost, getQuestionVoByIdUsingGet } from '@/api/questionController'

interface Props {
  bankId: number
}

const props = defineProps<Props>()


const form = ref<API.QuestionAddRequest>({ questionBankId: props.bankId })

const questionContent = ref<API.QuestionContentDTO[]>([])

const router = useRouter()

const handleSubmit = async () => {
  const res = await addQuestionUsingPost(form.value)
  if (res.data.code === 200) {
    Message.success('题目创建成功，即将跳转到题库详情页面')
    setTimeout(() => {
      // 1s后跳转到题库详情页面
      router.push('/bank/detail/' + res.data.data)
    }, 500)
  } else {
    Message.error('题目创建失败:' + res.data.message)
  }
}
useRoute()
const fetchBank = async () => {
  // 获取题库信息
  const res = await getQuestionVoByIdUsingGet({ id: props.bankId })
  if (res.data.code === 200) {
    form.value.questionBankId = res.data.data?.id
    form.value.questionContent = res.data.data?.questionContent
    creator.value = res.data.data?.userId || -1
  } else if (res.data.code === 40400) {
    Message.error('获取题库信息失败:' + res.data.message)
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
  return userStore.loginUser.id === creator.value || userStore.loginUser.userRole === roleEnums.ADMIN
})

onMounted(() => {
  fetchBank()
  if (!canEdit.value) {
    Message.error('你没有权限编辑该题目信息')
    router.push('/403')
  }
})

const addQuestion = (index: number) => {
  questionContent.value.splice(index, 0, {
      title: '',
      options: []
    }
  )
}


const deleteQuestion = (index: number) => {
  questionContent.value.splice(index, 1)
}
</script>

<style scoped>

</style>