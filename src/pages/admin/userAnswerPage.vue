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
    <a-button type="primary" @click="addUserAnswerClick" style="margin-bottom: 10px; margin-left: 20px;">
      <template #icon>
        <icon-plus />
      </template>
      <template #default>新增用户回答</template>
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
      <template #updateTime="{ record }">
        {{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #action="{ record }">
        <a-button type="outline" @click="editUserAnswerClick(record)">编辑</a-button>
        <a-popconfirm content="你确定要删除该用户回答吗？" @ok="handleDelete(record)">
          <a-button type="primary" style="margin-left: 10px;">
            <template #icon>
              <icon-delete />
            </template>
            <template #default>Delete</template>
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <div id="addUserAnswer">
      <a-drawer :width="500" :visible="addUserAnswerVisible" @ok="addUserAnswerOk" @cancel="addUserAnswerCancel"
                unmountOnClose>
        <template #title>
          新增用户回答
        </template>
        <div class="add-userAnswer-form">
          <a-form :model="addUserAnswerForm" label-width="80">
            <a-form-item label="题库id">
              <a-input v-model="addUserAnswerForm.bankid" />
            </a-form-item>
            <a-form-item label="用户选项">
              <a-input v-model="addUserAnswerForm.choices" />
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
    </div>
    <div id="editUserAnswer">
      <a-drawer :width="500" :visible="editUserAnswerVisible" @ok="editUserAnswerOk" @cancel="editUserAnswerCancel"
                unmountOnClose>
        <template #title>
          编辑用户回答
        </template>
        <div class="add-userAnswer-form">
          <a-form :model="editUserAnswerForm" label-width="80">
            <a-form-item label="题库id">
              <a-input v-model="editUserAnswerForm.bankid" />
            </a-form-item>
            <a-form-item label="用户选项">
              <a-input v-model="editUserAnswerForm.choices" />
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
  addUserAnswerUsingPost,
  deleteUserAnswerUsingPost,
  listUserAnswerByPageUsingPost,
  updateUserAnswerUsingPost
} from '@/api/userAnswerController'
import { Message, Modal } from '@arco-design/web-vue'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'
import { IconDelete } from '@arco-design/web-vue/es/icon'
import { BANK_TYPE, SCORING_STRATEGY } from '@/enums/bankEnums'

const loading = ref(false)

const columns = [
  { title: 'id', dataIndex: 'id' },
  { title: '名称', dataIndex: 'resultName' },
  { title: '描述', dataIndex: 'resultDesc' },
  { title: '图片', dataIndex: 'resultPicture', slotName: 'resultPicture' },
  { title: '用户回答选项', dataIndex: 'choices' },
  { title: '结果id', dataIndex: 'resultid' },
  { title: '评分范围', dataIndex: 'resultScore' },
  { title: '题库id', dataIndex: 'bankid' },
  { title: '题库类型', dataIndex: 'banktype', slotName: 'bankType' },
  { title: '评分策略', dataIndex: 'scoringStrategy', slotName: 'scoringStrategy' },
  { title: '用户回答id', dataIndex: 'userid' },
  { title: '创建时间', dataIndex: 'createTime', slotName: 'createTime' },
  { title: '更新时间', dataIndex: 'updateTime', slotName: 'updateTime' },
  { title: '用户回答回答操作', dataIndex: 'action', slotName: 'action' }
]
const searchParams = ref<API.UserAnswerQueryRequest>({
  current: 1,
  pageSize: 10
})

const data = ref<API.UserAnswer[]>([])
const total = ref<number>(0)

const loadData = async () => {
  loading.value = true
  const res = await listUserAnswerByPageUsingPost(searchParams.value)
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

const editUserAnswerVisible = ref(false)

const editUserAnswerClick = (record: API.UserAnswer) => {
  editUserAnswerForm.id = record.id
  editUserAnswerForm.bankid = record.bankid
  editUserAnswerForm.choices = record.choices
  editUserAnswerVisible.value = true
}
const editUserAnswerOk = async () => {
  const res = await updateUserAnswerUsingPost(editUserAnswerForm)
  if (res.data.code === 200) {
    Message.success('修改用户回答成功')
    await loadData()
    editUserAnswerVisible.value = false
  } else {
    Message.error('修改用户回答失败:' + res.data.message)
  }
}
const editUserAnswerCancel = () => {
  editUserAnswerVisible.value = false
}

let editUserAnswerForm: API.UserAnswerUpdateRequest = reactive({})


const addUserAnswerVisible = ref(false)

const addUserAnswerClick = () => {
  addUserAnswerVisible.value = true
}
const addUserAnswerOk = async () => {
  const res = await addUserAnswerUsingPost(addUserAnswerForm)
  if (res.data.code === 200) {
    Message.success('新增用户回答成功')
    await loadData()
    addUserAnswerVisible.value = false
  } else {
    Message.error('新增用户回答失败:' + res.data.message)
  }
}
const addUserAnswerCancel = () => {
  addUserAnswerVisible.value = false
}

const addUserAnswerForm: API.UserAnswerAddRequest = reactive({})

const handleDelete = async (record: API.UserAnswer) => {
  // 在删除之前显示确认框
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除该用户回答吗？这将无法恢复。',
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