<template>
  <div id="answerResultPage">
    <a-card hoverable :style="{ marginBottom: '20px' }">
      <a-row>
        <a-col flex="auto" class="contentWrapper">
          <h2>{{ data.resultName }}</h2>
          <p>结果描述：{{ data.resultDesc }}</p>
          <p v-if="data.resultScore">结果得分：{{ data.resultScore }}</p>
          <p>我的答案：{{ data.choices }}</p>
          <p>题库类型：{{ BANK_TYPE[data.bankType as 0 | 1] || '未知题库类型' }}</p>
          <p>评分策略：{{ SCORING_STRATEGY[data.scoringStrategy as 0 | 1] || '未知评分策略' }}</p>
          <div :style="{ display: 'flex', alignItems: 'center' }">
            <span>答题人：</span>
            <a-avatar
              :size="24"
              :style="{ marginRight: '8px' }"
              :image-url="data.user?.userAvatar"
            />
            <a-typography-text>{{ data.user?.userName }}</a-typography-text>
          </div>
          <p>答题时间：{{ dayjs(data.createTime).format('YYYY-MM-DD HH:mm:ss') }}</p>
          <a-space size="medium">
            <a-button type="primary" @click="router.push(`/answer/do/${data.bankId}`)">
              去答题
            </a-button>
            <a-button type="secondary" status="danger" @click="router.push('/')">返回首页</a-button>
          </a-space>
        </a-col>
        <a-col flex="320px">
          <a-image v-if="data?.resultPicture" width="100%" :src="data?.resultPicture" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { getUserAnswerVoByIdUsingGet } from '@/api/userAnswerController'
import message from '@arco-design/web-vue/es/message'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'
import { BANK_TYPE, SCORING_STRATEGY } from '@/enums/bankEnums'
import router from '@/router'

interface Props {
  id: number
}

const props = defineProps<Props>()

const data = ref<API.UserAnswerVO>({})

const loadData = async () => {
  const res = await getUserAnswerVoByIdUsingGet({
    id: props.id
  })
  if (res.data.code === 200 && res.data.data) {
    data.value = res.data.data
  } else if (res.data.code === 40400) {
    message.error('获取结果失败，结果不存在')
    await router.push('/404')
  } else {
    message.error('获取结果失败，' + res.data.message)
  }
}

watchEffect(() => {
  loadData()
})
</script>

<style scoped>
#answerResultPage .contentWrapper > * {
  margin-bottom: 24px;
}
</style>
