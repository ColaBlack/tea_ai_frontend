<template>
  <div id="bank-detail-page">
    <a-card style="padding: 20px;">
      <a-row :gutter="16">
        <a-col :span="18">
          <h2 style="margin-bottom: 16px; color: #333;">
            题库名称：{{ bank.bankName }}
          </h2>
          <div style="margin-bottom: 8px; color: #666;">
            题库描述：{{ bank.bankDesc }}
          </div>
          <div style="margin-bottom: 8px; color: #666;">
            题库类型：{{ BANK_TYPE[bank.bankType as 0 | 1] || '未知题库类型' }}
          </div>
          <div style="margin-bottom: 8px; color: #666;">
            评分策略：{{ SCORING_STRATEGY[bank.scoringStrategy as 0 | 1] || '未知评分策略' }}
          </div>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;">
          <div style="margin-bottom: 8px; color: #666;">
            创建人：{{ bank.user?.userName }}
          </div>
          <div style="margin-bottom: 8px; color: #666;">
            创建时间：{{ dayjs(bank.createTime).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
          <div style="color: #666;">
            更新时间：{{ dayjs(bank.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
          <a-space style="margin-top: 16px;">
            <a-button type="primary" @click="router.push('/bank/bank-detail/' + bank.id + '/question')">
              开始答题
            </a-button>
            <a-button type="outline" @click="router.push('/')">
              返回题库列表
            </a-button>
            <a-button v-if="canEdit" type="secondary" @click="router.push('/question/add/' + bank.id)">
              设置题目内容
            </a-button>
            <a-button v-if="canEdit" type="secondary" @click="router.push('/scoring_result/add/' + bank.id)">
              设置评分结果
            </a-button>
            <a-button v-if="canEdit" type="secondary" @click="router.push('/bank/add/' + bank.id)">
              修改题库信息
            </a-button>
          </a-space>
        </a-col>
        <a-col :span="6">
          <a-image :src="bank.bankIcon" class="bank-icon" width="100%" style="border-radius: 8px;" />
        </a-col>
      </a-row>
    </a-card>
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