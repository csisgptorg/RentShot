<template>
  <div>
    <h1>My Panel</h1>
    <div v-for="r in reservations" :key="r.trackingCode">
      {{ r.trackingCode }} - {{ r.totalPrice }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getMyReservations } from '../services/reservation';

const reservations = ref([]);

onMounted(async () => {
  const token = localStorage.getItem('token');
  const { data } = await getMyReservations(token);
  reservations.value = data;
});
</script>
