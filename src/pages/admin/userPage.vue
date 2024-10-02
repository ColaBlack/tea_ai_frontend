<template>
  <div id="userPage">
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
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { listUserByPageUsingPost } from '@/api/userController'
import { Message } from '@arco-design/web-vue'
import { dayjs } from "@arco-design/web-vue/es/_utils/date";

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
  { title: '更新时间', dataIndex: 'updateTime', slotName: 'updateTime' }
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
</script>

<style scoped>

</style>