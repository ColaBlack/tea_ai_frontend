<!--suppress VueUnrecognizedSlot -->
<template>
  <div id="questionPage">
    <a-input-search class="search-input" placeholder="按内容搜索" search-button @search="handleSearch" allow-clear>
      <template #button-icon>
        <icon-search />
      </template>
      <template #button-default>
        搜索
      </template>
    </a-input-search>
    <a-button type="primary" @click="addQuestionClick" style="margin-bottom: 10px; margin-left: 20px;">
      <template #icon>
        <icon-plus />
      </template>
      <template #default>新增题目</template>
    </a-button>
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
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #updateTime="{ record }">
        {{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #action="{ record }">
        <a-button type="outline" @click="editQuestionClick(record)">编辑</a-button>
        <a-popconfirm content="你确定要删除该题目吗？" @ok="handleDelete(record)">
          <a-button type="primary">
            <template #icon>
              <icon-delete />
            </template>
            <template #default>Delete</template>
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <div id="addQuestion">
      <a-drawer :width="500" :visible="addQuestionVisible" @ok="addQuestionOk" @cancel="addQuestionCancel"
                unmountOnClose>
        <template #title>
          新增题目
        </template>
        <div class="add-question-form">
          <a-form :model="addQuestionForm" label-width="80">
            <a-form-item label="所属题库ID">
              <a-input v-model="addQuestionForm.questionBankId" />
            </a-form-item>
            <a-form-item label="题目内容">
              <a-input v-model="addQuestionForm.questionContent" />
              <template #extra>
                <div>JSON字符串</div>
              </template>
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
    </div>
    <div id="editQuestion">
      <a-drawer :width="500" :visible="editQuestionVisible" @ok="editQuestionOk" @cancel="editQuestionCancel"
                unmountOnClose>
        <template #title>
          编辑题目
        </template>
        <div class="add-question-form">
          <a-form :model="editQuestionForm" label-width="80">
            <a-form-item label="题库ID">
              <a-input v-model="editQuestionForm.questionBankId" />
            </a-form-item>
            <a-form-item label="题目内容">
              <a-input v-model="editQuestionForm.questionContent" />
              <template #extra>
                <div>JSON字符串</div>
              </template>
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import {
  addQuestionUsingPost,
  deleteQuestionUsingPost,
  listQuestionByPageUsingPost,
  updateQuestionUsingPost
} from '@/api/questionController'
import { Message, Modal } from '@arco-design/web-vue'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'
import { IconDelete } from '@arco-design/web-vue/es/icon'

const loading = ref(false)

const columns = [
  { title: 'id', dataIndex: 'id' },
  { title: '题目内容', dataIndex: 'questionContent', slotName: 'questionContent' },
  { title: '题库id', dataIndex: 'bankid' },
  { title: '创建人id', dataIndex: 'userid' },
  { title: '创建时间', dataIndex: 'createTime', slotName: 'createTime' },
  { title: '更新时间', dataIndex: 'updateTime', slotName: 'updateTime' },
  { title: '题目操作', dataIndex: 'action', slotName: 'action' }
]

const searchParams = ref<API.QuestionQueryRequest>({
  current: 1,
  pageSize: 10
})

const data = ref<API.Question[]>([])
const total = ref<number>(0)

const loadData = async () => {
  loading.value = true
  const res = await listQuestionByPageUsingPost(searchParams.value)
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

const editQuestionVisible = ref(false)

const editQuestionClick = (record: API.Question) => {
  editQuestionForm.questionBankId = record.bankid
  editQuestionForm.questionContent = JSON.parse(record.questionContent as string)
  editQuestionVisible.value = true
}
const editQuestionOk = async () => {
  const res = await updateQuestionUsingPost(editQuestionForm)
  if (res.data.code === 200) {
    Message.success('修改题目成功')
    await loadData()
    editQuestionVisible.value = false
  } else {
    Message.error('修改题目失败:' + res.data.message)
  }
}
const editQuestionCancel = () => {
  editQuestionVisible.value = false
}

let editQuestionForm: API.QuestionUpdateRequest = reactive({
  questionContent: []
})


const addQuestionVisible = ref(false)

const addQuestionClick = () => {
  addQuestionVisible.value = true
}
const addQuestionOk = async () => {
  console.log(addQuestionForm)
  const res = await addQuestionUsingPost({
    questionContent: addQuestionForm.questionContent,
    questionBankId: addQuestionForm.questionBankId
  })
  if (res.data.code === 200) {
    Message.success('新增题目成功')
    await loadData()
    addQuestionVisible.value = false
  } else {
    Message.error('新增题目失败:' + res.data.message)
  }
}
const addQuestionCancel = () => {
  addQuestionVisible.value = false
}

const addQuestionForm: API.QuestionAddRequest = reactive({
  questionContent: []
})

const handleDelete = async (record: API.Question) => {
  // 在删除之前显示确认框
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除该题目吗？这将无法恢复。',
    onOk: async () => {
      const res = await deleteQuestionUsingPost({ id: record.id })
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
  searchParams.value = { ...searchParams.value, questionContent: value }
}

</script>

<style scoped>
#questionPage .search-input {
  width: 320px;
  margin-bottom: 10px;
}
</style>