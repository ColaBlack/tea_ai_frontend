<!--suppress VueUnrecognizedSlot -->
<template>
  <div id="userAnswerPage">
    <a-input-search class="search-input" placeholder="按描述搜索" search-button @search="handleSearch" allow-clear>
      <template #button-icon>
        <icon-search />
      </template>
      <template #button-default>
        搜索
      </template>
    </a-input-search>
    <a-table
      :columns="columns"
      :data="data"
      :bordered="true"
      :hoverable="true"
      :stripe="true"
      :loading="loading"
      :show-header="true"
      :pagination="{
        showTotal:true,
        pageSize:searchParams.pageSize,
        current:searchParams.current,
        total:total
      }"
      @page-change="handlePageChange"
    >
      <template #resultPicture="{ record }">
        <a-image width="64" :src="record.resultPicture" />
      </template>
      <template #bankType="{ record }">
        {{ BANK_TYPE[record.bankType as 0 | 1] || '未知题库类型' }}
      </template>
      <template #scoringStrategy="{ record }">
        {{ SCORING_STRATEGY[record.scoringStrategy as 0 | 1] || '未知评分策略' }}
      </template>
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #resultProp="{ record }">
        <a-tag v-for="(tag, index) in record.resultProp" :key="index" style="margin-right: 4px;">{{ tag }}</a-tag>
      </template>
      <template #action="{ record }">
        <a-popconfirm content="你确定要删除该用户回答吗？" @ok="handleDelete(record)">
          <a-button status="danger" type="primary">
            <template #icon>
              <icon-delete />
            </template>
            <template #default>Delete</template>
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { deleteUserAnswerUsingPost } from '@/api/userAnswerController'
import { Message, Modal } from '@arco-design/web-vue'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'
import { IconDelete } from '@arco-design/web-vue/es/icon'
import { BANK_TYPE, SCORING_STRATEGY } from '@/enums/bankEnums'
import { listMyScoringResultVoByPageUsingPost } from '@/api/scoringResultController'

const loading = ref(false)

const columns = [
  { title: '名称', dataIndex: 'resultName' },
  { title: '描述', dataIndex: 'resultDesc' },
  { title: '图片', dataIndex: 'resultPicture', slotName: 'resultPicture' },
  { title: '得分', dataIndex: 'resultScoreRange' },
  { title: '创建时间', dataIndex: 'createTime', slotName: 'createTime' },
  { title: '选项', dataIndex: 'resultProp', slotName: 'resultProp' },
  { title: '操作', dataIndex: 'action', slotName: 'action' }
]
const searchParams = ref<API.ScoringResultQueryRequest>({
  current: 1,
  pageSize: 10
})

const data = ref<API.ScoringResultVO[]>([])
const total = ref<number>(0)

const loadData = async () => {
  loading.value = true
  const res = await listMyScoringResultVoByPageUsingPost(searchParams.value)
  if (res.data.code === 200) {
    data.value = res.data.data?.records || []
    total.value = res.data.data?.total || 0
  } else {
    Message.error(res.data.message || '数据加载失败')
  }
  loading.value = false
}

// 监听搜索条件变化，重新加载数据
watchEffect(() => {
  loadData()
})

const handlePageChange = (page: number) => {
  searchParams.value = { ...searchParams.value, current: page }
}
ref(false)
ref<API.UserAnswerUpdateRequest>({})
ref(false)
reactive({})
const handleDelete = async (record: API.UserAnswer) => {
  // 在删除之前显示确认框
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除该回答吗？这将无法恢复。',
    onOk: async () => {
      const res = await deleteUserAnswerUsingPost({ id: record.id })
      if (res.data.code === 200) {
        Message.success('删除成功')
        await loadData()
      } else {
        Message.error(res.data.message || '删除失败')
      }
    },
    onCancel: () => {
      Message.info('取消删除')
    }
  })
}

const handleSearch = (value: string) => {
  searchParams.value = { ...searchParams.value, resultDesc: value }
}

</script>

<style scoped>
#userAnswerPage .search-input {
  width: 320px;
  margin-bottom: 10px;
}
</style>