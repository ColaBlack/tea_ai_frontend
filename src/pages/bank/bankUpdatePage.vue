<template>
  <div id="bank-update-page">
    <h1>修改题库</h1>
    <a-form :model="form" class="bank-form" auto-label-width>
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
import { addQuestionBankUsingPost, getQuestionBankVoByIdUsingGet } from '@/api/questionBankController'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { BANK_TYPE, SCORING_STRATEGY } from '@/enums/bankEnums'
import { useUserStore } from '@/store/user'

interface Props {
  bankId: number
}

const props = defineProps<Props>()


const form = ref<API.QuestionBankAddRequest>({ id: props.bankId })

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

const fetchBank = async () => {
  // 获取题库信息
  const res = await getQuestionBankVoByIdUsingGet(form.value)
  if (res.data.code === 200) {
    form.value.id = res.data.data?.id
    form.value.bankName = res.data.data?.bankName
    form.value.bankType = res.data.data?.bankType
    form.value.scoringStrategy = res.data.data?.scoringStrategy
    form.value.bankDesc = res.data.data?.bankDesc
    form.value.bankIcon = res.data.data?.bankIcon
    creator.value = res.data.data?.userId || -1
  } else if (res.data.code === 40400) {
    Message.error('获取题库信息失败:' + res.data.message)
    // 访问的题库不存在则跳转到“404NotFound”页面
    await router.push('/404')
  } else {
    Message.error('获取题库信息失败:' + res.data.message)
  }
}

const userStore = useUserStore()

let creator = ref(-1)

const canEdit = computed(() => {
  // 只有题库创建者或者管理员可以编辑题库信息
  return userStore.loginUser.id === creator.value || userStore.loginUser.userRole === roleEnums.ADMIN
})

onMounted(() => {
  fetchBank()
  if (!canEdit.value) {
    Message.error('你没有权限编辑该题库信息')
    router.push('/403')
  }
})
</script>

<style scoped>
#bank-update-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 400px;
}

#bank-update-page .cancel-btn {
  margin-left: 10px;
}
</style>