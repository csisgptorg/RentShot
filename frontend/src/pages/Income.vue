<template>
  <div>
    <h2>Income</h2>
    <p>Total: {{ total }}</p>
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

