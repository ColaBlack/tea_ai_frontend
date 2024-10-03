<!--suppress VueUnrecognizedSlot -->
<template>
  <div id="home-page">
    <a-input-search class="search-input" placeholder="按名称搜索题库" search-button @search="handleSearch" allow-clear size="large">
      <template #button-icon>
        <icon-search />
      </template>
      <template #button-default>
        搜索
      </template>
    </a-input-search>
    <a-list
      class="card-layout"
      :bordered="false"
      :data="data"
      :pagination-props="{ pageSize: searchParams.pageSize, current: searchParams.current, total: total }"
      @page-change="handlePageChange"
      :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
    >
      <template #item="{ item }">
        <BankCard :bank="item" />
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import BankCard from '@/components/BankCard.vue'
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController'
import { Message } from '@arco-design/web-vue'
import { ref, watchEffect } from 'vue'

const searchParams = ref<API.QuestionBankQueryRequest>({
  current: 1,
  pageSize: 8
})

const handleSearch = (value: string) => {
  searchParams.value = { ...searchParams.value, bankName: value }
}

const handlePageChange = (page: number) => {
  searchParams.value = { ...searchParams.value, current: page }
}

const data = ref<API.QuestionBank []>([])
const total = ref<number>(0)

const loadData = async () => {
  const res = await listQuestionBankVoByPageUsingPost(searchParams.value)
  if (res.data.code === 200) {
    data.value = res.data.data?.records || []
    total.value = res.data.data?.total || 0
  } else {
    Message.error(res.data.message || '数据加载失败')
  }
}

watchEffect(() => {
  loadData()
})
</script>

<style scoped>
#home-page .search-input {
  margin: 0 auto;
  display: flex;
  align-items: center;
  max-width: 500px;
}

#home-page{
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

#home-page .card-layout {
margin-top: 20px;
}
</style>
