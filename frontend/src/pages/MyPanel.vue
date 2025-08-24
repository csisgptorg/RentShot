<template>
  <div>
    <h1>My Panel</h1>
    <section>
      <h2>Messages</h2>
      <ul>
        <li v-for="m in messages" :key="m._id || m.createdAt">
          {{ m.text }} - {{ new Date(m.createdAt).toLocaleString() }}
        </li>
      </ul>
    </section>
    <section>
      <h2>My Reservations</h2>
      <div v-for="r in reservations" :key="r.trackingCode">
        {{ r.trackingCode }} - {{ r.totalPrice }}
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getMyReservations } from '../services/reservation';
import { getMessages } from '../services/message';

const reservations = ref([]);
const messages = ref([]);

onMounted(async () => {
  const token = localStorage.getItem('token');
  const { data } = await getMyReservations(token);
  reservations.value = data;
  const { data: msg } = await getMessages(token);
  messages.value = msg;
});
</script>
