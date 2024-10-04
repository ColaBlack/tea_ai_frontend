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
              <a-input-number v-model="addScoringResultForm.bankid" />
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
              <a-input-tag
                v-model="addScoringResultForm.resultProp"
                placeholder="输入结果集，按回车键添加"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="得分结果范围">
              <a-input-number
                v-model="addScoringResultForm.resultScoreRange"
                placeholder="请输入结果得分范围"
                allow-clear
              />
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
              <a-input-tag
                v-model="editScoringResultForm.resultProp"
                placeholder="输入结果集，按回车键添加"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="得分结果范围">
              <a-input-number
                v-model="editScoringResultForm.resultScoreRange"
                placeholder="请输入结果得分范围"
                allow-clear
              />
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
import {
  addScoringResultUsingPost,
  deleteScoringResultUsingPost,
  editScoringResultUsingPost,
  listScoringResultVoByPageUsingPost
} from '@/api/scoringResultController'
import { Message, Modal } from '@arco-design/web-vue'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'
import { IconDelete } from '@arco-design/web-vue/es/icon'
import { useUserStore } from '@/store/user'
import roleEnums from '@/access/roleEnums'
import { getQuestionBankVoByIdUsingGet } from '@/api/questionBankController'
import router from '@/router'

interface Props {
  bankId: number
}

const props = defineProps<Props>()

const loading = ref(false)

const columns = [{ title: 'id', dataIndex: 'id' },
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
  pageSize: 10,
  sortField: 'update_time',
  sortOrder: 'descend',
  bankid: props.bankId
})

const data = ref<API.ScoringResultVO[]>([])
const total = ref<number>(0)

const loadData = async () => {
  loading.value = true
  const res = await listScoringResultVoByPageUsingPost(searchParams.value)
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
  editScoringResultForm.value.resultName = record.resultName || ''
  editScoringResultForm.value.resultPicture = record.resultPicture
  editScoringResultForm.value.resultProp = JSON.parse(record.resultProp || '[]')
  editScoringResultForm.value.resultScoreRange = record.resultScoreRange
  editScoringResultVisible.value = true
}
const editScoringResultOk = async () => {
  const res = await editScoringResultUsingPost(editScoringResultForm.value)
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

let editScoringResultForm = ref<API.ScoringResultEditRequest>({})


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


const userStore = useUserStore()

let creator = ref(-1)

const canEdit = computed(() => {
  // 只有题库创建者或者管理员可以编辑评分结果信息
  return userStore.loginUser.id === creator.value || userStore.loginUser.userRole === roleEnums.ADMIN
})

onMounted(async () => {
  // 获取题库作者信息用于判断是否可以编辑评分结果信息
  // 获取题库信息
  const bank = await getQuestionBankVoByIdUsingGet({ id: props.bankId })
  if (bank.data.code === 200) {
    creator.value = bank.data.data?.userId || -1
  } else if (bank.data.code === 40400) {
    Message.error('获取题库信息失败:' + bank.data.message)
    // 访问的题库不存在则跳转到“404NotFound”页面
    await router.push('/404')
  } else {
    Message.error('获取题库信息失败:' + bank.data.message)
  }
  if (!canEdit.value) {
    Message.error('你没有权限编辑该评分结果信息')
    await router.push('/403')
  }
  await loadData()
})
</script>

<style scoped>
#scoringResultPage .search-input {
  width: 320px;
  margin-bottom: 10px;
}
</style>