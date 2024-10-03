<!--suppress VueUnrecognizedSlot -->
<template>
  <div id="scoringResultPage">
    <a-input-search class="search-input" placeholder="按结果名称搜索" search-button @search="handleSearch" allow-clear>
      <template #button-icon>
        <icon-search />
      </template>
      <template #button-default>
        搜索
      </template>
    </a-input-search>
    <a-button type="primary" @click="addScoringResultClick" style="margin-bottom: 10px; margin-left: 20px;">
      <template #icon>
        <icon-plus />
      </template>
      <template #default>新增评分结果</template>
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
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #updateTime="{ record }">
        {{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #action="{ record }">
        <a-button type="outline" @click="editScoringResultClick(record)">编辑</a-button>
        <a-popconfirm content="你确定要删除该评分结果吗？" @ok="handleDelete(record)">
          <a-button status="danger" type="primary">
            <template #icon>
              <icon-delete />
            </template>
            <template #default>Delete</template>
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <div id="addScoringResult">
      <a-drawer :width="500" :visible="addScoringResultVisible" @ok="addScoringResultOk"
                @cancel="addScoringResultCancel" unmountOnClose>
        <template #title>
          新增评分结果
        </template>
        <div class="add-scoringResult-form">
          <a-form :model="addScoringResultForm" label-width="80">
            <a-form-item label="题库id">
              <a-input v-model="addScoringResultForm.bankid" />
            </a-form-item>
            <a-form-item label="结果描述">
              <a-input v-model="addScoringResultForm.resultDesc" />
            </a-form-item>
            <a-form-item label="结果名称">
              <a-input v-model="addScoringResultForm.resultName" />
            </a-form-item>
            <a-form-item label="结果图片">
              <a-input v-model="addScoringResultForm.resultPicture" />
            </a-form-item>
            <a-form-item label="结果属性">
              <a-input v-model="addScoringResultForm.resultProp" />
            </a-form-item>
            <a-form-item label="得分结果范围">
              <a-input v-model="addScoringResultForm.resultScoreRange" />
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
    </div>
    <div id="editScoringResult">
      <a-drawer :width="500" :visible="editScoringResultVisible" @ok="editScoringResultOk"
                @cancel="editScoringResultCancel" unmountOnClose>
        <template #title>
          编辑评分结果
        </template>
        <div class="add-scoringResult-form">
          <a-form :model="editScoringResultForm" label-width="80">
            <a-form-item label="结果描述">
              <a-input v-model="editScoringResultForm.resultDesc" />
            </a-form-item>
            <a-form-item label="结果名称">
              <a-input v-model="editScoringResultForm.resultName" />
            </a-form-item>
            <a-form-item label="结果图片">
              <a-input v-model="editScoringResultForm.resultPicture" />
            </a-form-item>
            <a-form-item label="结果属性">
              <a-input v-model="editScoringResultForm.resultProp" />
            </a-form-item>
            <a-form-item label="得分结果范围">
              <a-input v-model="editScoringResultForm.resultScoreRange" />
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
  addScoringResultUsingPost,
  deleteScoringResultUsingPost,
  listScoringResultByPageUsingPost,
  updateScoringResultUsingPost
} from '@/api/scoringResultController'
import { Message, Modal } from '@arco-design/web-vue'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'
import { IconDelete } from '@arco-design/web-vue/es/icon'

const loading = ref(false)

const columns = [{ title: 'id', dataIndex: 'id' },
  { title: '结果id', dataIndex: 'id' },
  { title: '题库id', dataIndex: 'bankid' },
  { title: '结果描述', dataIndex: 'resultDesc' },
  { title: '结果名称', dataIndex: 'resultName' },
  { title: '结果图片', dataIndex: 'resultPicture', slotName: 'resultPicture' },
  { title: '结果属性', dataIndex: 'resultProp' },
  { title: '得分结果范围', dataIndex: 'resultScoreRange' },
  { title: '创建时间', dataIndex: 'createTime', slotName: 'createTime' },
  { title: '更新时间', dataIndex: 'updateTime', slotName: 'updateTime' },
  { title: '结果操作', dataIndex: 'action', slotName: 'action' }
]
const searchParams = ref<API.ScoringResultQueryRequest>({
  current: 1,
  pageSize: 10
})

const data = ref<API.ScoringResult[]>([])
const total = ref<number>(0)

const loadData = async () => {
  loading.value = true
  const res = await listScoringResultByPageUsingPost(searchParams.value)
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

const editScoringResultVisible = ref(false)

const editScoringResultClick = (record: API.ScoringResult) => {
  editScoringResultForm.value.id = record.id
  editScoringResultForm.value.resultDesc = record.resultDesc
  editScoringResultForm.value.resultName = record.resultName
  editScoringResultForm.value.resultPicture = record.resultPicture
  editScoringResultForm.value.resultProp = record.resultProp
  editScoringResultForm.value.resultScoreRange = record.resultScoreRange
  editScoringResultForm.value.userid = record.userid
  editScoringResultVisible.value = true
}
const editScoringResultOk = async () => {
  const res = await updateScoringResultUsingPost(editScoringResultForm.value)
  if (res.data.code === 200) {
    Message.success('修改评分结果成功')
    await loadData()
    editScoringResultVisible.value = false
  } else {
    Message.error('修改评分结果失败:' + res.data.message)
  }
}
const editScoringResultCancel = () => {
  editScoringResultVisible.value = false
}

let editScoringResultForm = ref<API.ScoringResultUpdateRequest>({})


const addScoringResultVisible = ref(false)

const addScoringResultClick = () => {
  addScoringResultVisible.value = true
}
const addScoringResultOk = async () => {
  const res = await addScoringResultUsingPost(addScoringResultForm)
  if (res.data.code === 200) {
    Message.success('新增评分结果成功')
    await loadData()
    addScoringResultVisible.value = false
  } else {
    Message.error('新增评分结果失败:' + res.data.message)
  }
}
const addScoringResultCancel = () => {
  addScoringResultVisible.value = false
}

const addScoringResultForm: API.ScoringResultAddRequest = reactive({})

const handleDelete = async (record: API.ScoringResult) => {
  // 在删除之前显示确认框
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除该评分结果吗？这将无法恢复。',
    onOk: async () => {
      const res = await deleteScoringResultUsingPost({ id: record.id })
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
  searchParams.value = { ...searchParams.value, resultName: value }
}

</script>

<style scoped>
#scoringResultPage .search-input {
  width: 320px;
  margin-bottom: 10px;
}
</style>