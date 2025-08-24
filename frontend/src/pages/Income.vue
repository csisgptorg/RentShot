<template>
  <div class="income">
    <h2>Income</h2>
    <div class="total">Total: {{ total }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getIncome } from '../services/admin';

const total = ref(0);

onMounted(async () => {
  const { data } = await getIncome();
  total.value = data.total;
});
</script>

<style scoped>
.income {
  padding: 2rem;
}
.total {
  font-size: 1.5rem;
  margin-top: 1rem;
}
</style>
