<template>
  <div id="user-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.png" class="logo" alt="logo" />
          <div>茶AI题库</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalFooter from '@/layouts/components/globalFooter.vue'
</script>

<style scoped></style>
