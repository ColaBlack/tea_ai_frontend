<template>
  <div id="bank-detail-page">

  </div>
</template>

<script setup lang="ts">

import { computed, onMounted, ref } from 'vue'
import { getQuestionBankVoByIdUsingGet } from '@/api/questionBankController'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { BANK_TYPE, SCORING_STRATEGY } from '@/enums/bankEnums'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'
import { useUserStore } from '@/store/user'
import roleEnums from '@/access/roleEnums'

interface Props {
  bankId: number
}

const props: Props = withDefaults(defineProps<Props>(), {
  bankId: () => {
    return -1
  }
})

const router = useRouter()

const params = ref<API.getQuestionBankVOByIdUsingGETParams>({ id: props.bankId })

const bank = ref<API.QuestionBankVO>({})

const getData = async () => {
  const res = await getQuestionBankVoByIdUsingGet(params.value)
  if (res.data.code === 200) {
    bank.value = res.data.data || {}
  } else if (res.data.code === 40400) {
    // 访问的题库不存在则跳转到“404NotFound”页面
    await router.push('/404')
  } else {
    Message.error('获取题库详情失败：' + res.data.message)
  }
}
onMounted(() => {
  getData()
})

const userStore = useUserStore()

const canEdit = computed(() => {
  // 只有题库创建者或者管理员可以编辑题库信息
  return userStore.loginUser.id === bank.value.userId || userStore.loginUser.userRole === roleEnums.ADMIN
})
</script>

<style scoped>
#bank-detail-page {
  max-width: 1200px;
  margin: 0 auto;
}

</style>