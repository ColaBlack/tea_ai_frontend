<template>
  <div id="header">
    <a-row align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu mode="horizontal" :default-selected-keys="['1']">
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
            <img src="../../assets/logo.png" alt="logo" class="logo" />
            <p class="title">茶AI</p>
          </a-menu-item>
          <a-menu-item key="1">Home</a-menu-item>
          <a-menu-item key="2">Solution</a-menu-item>
          <a-menu-item key="3">Cloud Service</a-menu-item>
          <a-menu-item key="4">Cooperation</a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="64px">
        <a-button type="primary" href="/user/login">登录</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">

</script>
<style scoped>
#header .logo {
  height: 32px;
  margin: auto auto;
}

#header .title {
  font-size: 16px;
  margin: 0;
  padding: 0;
  line-height: 16px;
  color: #000000;
  text-align: center;
  font-family: "楷体体", "Times New Roman", sans-serif;
}
</style>