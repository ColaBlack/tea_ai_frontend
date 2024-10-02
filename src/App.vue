<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <UserLayout />
    </template>
    <template v-else>
      <GlobalLayout />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import UserLayout from '@/layouts/userLayout.vue'
import GlobalLayout from '@/layouts/globalLayout.vue'
import { userStore } from '@/store/user'

const route = useRoute()

const loginUserStore = userStore()
loginUserStore.fetchLoginUser()

</script>

<style scoped></style>
