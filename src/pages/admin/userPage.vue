<template>
  <div id="userPage">
    <a-input-search class="search-input" placeholder="按名称搜索" search-button @search="handleSearch">
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
      :loading="form.loading"
      :show-header="true"
      :pagination="{
        showTotal:true,
        pageSize:searchParams.pageSize,
        current:searchParams.current,
        total:total
      }"
      @page-change="handlePageChange"
    >
      <template #userAvatar="{ record }">
        <a-image width="64" :src="record.userAvatar" />
      </template>
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #updateTime="{ record }">
        {{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #action="{ record }">
        <a-button type="outline" @click="handleEdit(record)">编辑</a-button>
        <a-button type="primary" @click="handleDelete(record)" style="margin-left: 10px;">
          <template #icon>
            <icon-delete />
          </template>
          <template #default>Delete</template>
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { deleteUserUsingPost, listUserByPageUsingPost } from '@/api/userController'
import { Message, Modal } from '@arco-design/web-vue'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'
import { IconDelete } from '@arco-design/web-vue/es/icon'

const form = reactive({
  border: true,
  borderCell: false,
  hover: true,
  stripe: false,
  checkbox: true,
  loading: false,
  tableHeader: true,
  noData: false
})

const columns = [
  { title: '用户ID', dataIndex: 'id' },
  { title: '用户账号', dataIndex: 'userAccount' },
  { title: '用户昵称', dataIndex: 'userName' },
  { title: '用户头像', dataIndex: 'userAvatar', slotName: 'userAvatar' },
  { title: '用户简介', dataIndex: 'userProfile' },
  { title: '用户角色', dataIndex: 'userRole' },
  { title: '创建时间', dataIndex: 'createTime', slotName: 'createTime' },
  { title: '更新时间', dataIndex: 'updateTime', slotName: 'updateTime' },
  { title: '用户操作', dataIndex: 'action', slotName: 'action' }
]

const searchParams = ref<API.UserQueryRequest>({
  current: 1,
  pageSize: 10
})

const data = ref<API.User[]>([])
const total = ref<number>(0)

const loadData = async () => {
  const res = await listUserByPageUsingPost(searchParams.value)
  if (res.data.code === 200) {
    data.value = res.data.data?.records || []
    total.value = res.data.data?.total || 0
  } else {
    Message.error(res.data.message || '数据加载失败')
  }
}

// 监听搜索条件变化，重新加载数据
watchEffect(() => {
  loadData()
})

const handlePageChange = (page: number) => {
  searchParams.value = { ...searchParams.value, current: page }
}

const handleEdit = async (record: API.User) => {
  // 跳转到编辑页面
  // TODO
}


const handleDelete = async (record: API.User) => {
  // 在删除之前显示确认框
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除该用户吗？',
    onOk: async () => {
      const res = await deleteUserUsingPost({ id: record.id })
      if (res.data.code === 200) {
        Message.success('删除成功')
        loadData()
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
  searchParams.value = { ...searchParams.value, userName: value }
}

</script>

<style scoped>
#userPage .search-input {
  width: 320px;
  margin-bottom: 10px;
}
</style>