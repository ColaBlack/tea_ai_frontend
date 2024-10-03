<!--suppress VueUnrecognizedSlot -->
<template>
  <div id="userPage">
    <a-input-search class="search-input" placeholder="按名称搜索" search-button @search="handleSearch" allow-clear>
      <template #button-icon>
        <icon-search />
      </template>
      <template #button-default>
        搜索
      </template>
    </a-input-search>
    <a-button type="primary" @click="addBankClick" style="margin-bottom: 10px; margin-left: 20px;">
      <template #icon>
        <icon-plus />
      </template>
      <template #default>新增题库</template>
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
      <template #bankIcon="{ record }">
        <a-image width="64" :src="record.bankIcon" />
      </template>
      <template #bankType="{ record }">
        {{ BANK_TYPE[record.bankType as 0 | 1] || '未知题库类型' }}
      </template>
      <template #scoringStrategy="{ record }">
        {{ SCORING_STRATEGY[record.scoringStrategy as 0 | 1] || '未知评分策略' }}
      </template>
      <template #reviewStatus="{ record }">
        {{ REVIEW_STATUS[record.reviewStatus as 0 | 1 | 2] || '未知审核状态' }}
      </template>
      <template #reviewTime="{ record }">
        {{ dayjs(record.reviewTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #updateTime="{ record }">
        {{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #action="{ record }">
        <a-button type="outline" @click="editBankClick(record)">编辑</a-button>
        <a-popconfirm content="你确定要删除该题库吗？" @ok="handleDelete(record)">
          <a-button status="danger" type="primary" style="margin-left: 10px;">
            <template #icon>
              <icon-delete />
            </template>
            <template #default>Delete</template>
          </a-button>
        </a-popconfirm>
        <a-button
          v-if="record.reviewStatus !== REVIEW_STATUS[REVIEW_ENUMS.APPROVED]"
          status="success"
          @click="doReview(record, REVIEW_ENUMS.APPROVED, '')"
        >
          通过
        </a-button>
        <a-button
          v-if="record.reviewStatus !== REVIEW_STATUS[REVIEW_ENUMS.REJECTED]"
          status="warning" style="margin-left: 10px;margin-top: 10px;"
          @click="doReview(record, REVIEW_ENUMS.REJECTED, '审核不合格，请修改后重新提交')"
        >
          拒绝
        </a-button>
      </template>
    </a-table>
    <div id="addBank">
      <a-drawer :width="500" :visible="addBankVisible" @ok="addBankOk" @cancel="addBankCancel" unmountOnClose>
        <template #title>
          新增题库
        </template>
        <div class="add-bank-form">
          <a-form :model="addBankForm" label-width="80">
            <a-form-item label="题库名称" :rules="[{ required: true, message: '题库名称是必填项' }]">
              <a-input v-model="addBankForm.bankName" />
            </a-form-item>
            <a-form-item label="题库描述">
              <a-input v-model="addBankForm.bankDesc" />
            </a-form-item>
            <a-form-item label="题库头像">
              <a-input v-model="addBankForm.bankIcon" />
            </a-form-item>
            <a-form-item field="bankType" label="题库类型" :rules="[{ required: true, message: '题库类型是必填项' }]"
                         validate-trigger="blur">
              <a-select v-model="addBankForm.bankType" placeholder="请选择题库类型" allow-clear>
                <a-option v-for="(value, key) of BANK_TYPE" :value="key" :key="key" :label="value"></a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="scoringStrategy" label="题库评分策略"
                         :rules="[{ required: true, message: '题库评分策略是必填项' }]"
                         validate-trigger="blur">
              <a-select v-model="addBankForm.scoringStrategy" placeholder="请选择题库评分策略" allow-clear>
                <a-option v-for="(value, key) of SCORING_STRATEGY" :value="key" :key="key" :label="value"></a-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
    </div>
    <div id="editBank">
      <a-drawer :width="500" :visible="editBankVisible" @ok="editBankOk" @cancel="editBankCancel" unmountOnClose>
        <template #title>
          编辑题库
        </template>
        <div class="add-user-form">
          <a-form :model="editBankForm" label-width="80">
            <a-form-item label="题库名称">
              <a-input v-model="editBankForm.bankName" />
            </a-form-item>
            <a-form-item label="题库图标">
              <a-input v-model="editBankForm.bankIcon" />
            </a-form-item>
            <a-form-item label="题库描述">
              <a-input v-model="editBankForm.bankDesc" />
            </a-form-item>
            <a-form-item field="bankType" label="题库类型" :rules="[{ required: true, message: '题库类型是必填项' }]"
                         validate-trigger="blur">
              <a-select v-model="addBankForm.bankType" placeholder="请选择题库类型" allow-clear>
                <a-option v-for="(value, key) of BANK_TYPE" :value="key" :key="key" :label="value"></a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="scoringStrategy" label="题库评分策略"
                         :rules="[{ required: true, message: '题库评分策略是必填项' }]"
                         validate-trigger="blur">
              <a-select v-model="addBankForm.scoringStrategy" placeholder="请选择题库评分策略" allow-clear>
                <a-option v-for="(value, key) of SCORING_STRATEGY" :value="key" :key="key" :label="value"></a-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { Message, Modal } from '@arco-design/web-vue'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'
import { IconDelete } from '@arco-design/web-vue/es/icon'
import {
  addQuestionBankUsingPost,
  deleteQuestionBankUsingPost,
  listQuestionBankByPageUsingPost,
  questionBankReviewUsingPost,
  updateQuestionBankUsingPost
} from '@/api/questionBankController'
import { BANK_TYPE, REVIEW_ENUMS, REVIEW_STATUS, SCORING_STRATEGY } from '@/enums/bankEnums'

const loading = ref(true)

const columns = [
  { title: '题库id', dataIndex: 'id' },
  { title: '题库名称', dataIndex: 'bankName' },
  { title: '题库描述', dataIndex: 'bankDesc' },
  { title: '题库图标', dataIndex: 'bankIcon', slotName: 'bankIcon' },
  { title: '应用类型', dataIndex: 'bankType', slotName: 'bankType' },
  { title: '评分策略', dataIndex: 'scoringStrategy', slotName: 'scoringStrategy' },
  { title: '审核状态', dataIndex: 'reviewStatus', slotName: 'reviewStatus' },
  { title: '审核信息', dataIndex: 'reviewMessage' },
  { title: '审核时间', dataIndex: 'reviewTime', slotName: 'reviewTime' },
  { title: '审核人 id', dataIndex: 'reviewerId' },
  { title: '用户 id', dataIndex: 'userId' },
  { title: '创建时间', dataIndex: 'createTime', slotName: 'createTime' },
  { title: '更新时间', dataIndex: 'updateTime', slotName: 'updateTime' },
  { title: '题库操作', dataIndex: 'action', slotName: 'action' }
]

const searchParams = ref<API.QuestionBankQueryRequest>({
  current: 1,
  pageSize: 10
})

const data = ref<API.QuestionBank []>([])
const total = ref<number>(0)

const loadData = async () => {
  loading.value = true
  const res = await listQuestionBankByPageUsingPost(searchParams.value)
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

const editBankVisible = ref(false)

const editBankClick = (record: API.QuestionBank) => {
  editBankForm.value.bankName = record.bankName
  editBankForm.value.bankDesc = record.bankDesc
  editBankForm.value.bankIcon = record.bankIcon
  editBankForm.value.bankType = record.bankType
  editBankForm.value.scoringStrategy = record.scoringStrategy
  editBankForm.value.id = record.id
  editBankVisible.value = true
}
const editBankOk = async () => {
  const res = await updateQuestionBankUsingPost(editBankForm.value)
  if (res.data.code === 200) {
    Message.success('修改题库成功')
    await loadData()
    editBankVisible.value = false
  } else {
    Message.error('修改题库失败:' + res.data.message)
  }
}
const editBankCancel = () => {

  editBankVisible.value = false
}

let editBankForm = ref<API.QuestionBankEditRequest>({
  bankDesc: '',
  bankIcon: '',
  bankName: ''
})


const addBankVisible = ref(false)

const addBankClick = () => {
  addBankVisible.value = true
}
const addBankOk = async () => {
  console.log(addBankForm)
  const res = await addQuestionBankUsingPost(addBankForm)
  if (res.data.code === 200) {
    Message.success('新增题库成功')
    await loadData()
    addBankVisible.value = false
  } else {
    Message.error('新增题库失败:' + res.data.message)
  }
}
const addBankCancel = () => {
  addBankVisible.value = false
}

const addBankForm: API.QuestionBankAddRequest = reactive({
  bankDesc: '',
  bankIcon: '',
  bankName: ''
})

const handleDelete = async (record: API.User) => {
  // 在删除之前显示确认框
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除该题库吗？这将无法恢复。',
    onOk: async () => {
      const res = await deleteQuestionBankUsingPost({ id: record.id })
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
  searchParams.value = { ...searchParams.value, bankName: value }
}

const doReview = async (record: API.QuestionBank, reviewStatus: number, reviewMessage: string) => {
  const params: API.ReviewRequest = {
    id: record.id,
    reviewStatus: reviewStatus,
    reviewMessage: reviewMessage
  }
  const res = await questionBankReviewUsingPost(params)
  if (res.data.code === 200) {
    Message.success('审核成功') // 刷新页面
    await loadData()
  } else {
    Message.error('审核失败:' + res.data.message)
  }
}
</script>

<style scoped>
#userPage .search-input {
  width: 320px;
  margin-bottom: 10px;
}
</style>