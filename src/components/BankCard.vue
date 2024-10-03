<template>
  <div id="bank-card">
    <a-card hoverable @click="CardClick">
      <template #cover>
        <div
          :style="{
          height: '204px',
          overflow: 'hidden',
        }"
        >
          <img
            :style="{ width: '100%',transform: 'translateY(-10px)' }"
            :src="bank.bankIcon"
            :alt="bank.bankName"
          />
        </div>
      </template>
      <a-card-meta :title="bank.bankName" :description="bank.bankDesc" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  bank: API.QuestionBankVO
}

const props: Props = withDefaults(defineProps<Props>(), {
  bank: () => {
    return {}
  }
})

const router = useRouter()

const CardClick = () => {
  router.push(`/bank/detail/${props.bank.id}`)
}
</script>

<style scoped>
#bank-card {
  cursor: pointer;
}
</style>