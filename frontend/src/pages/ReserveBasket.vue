<template>
  <div>
    <h1>Basket</h1>
    <div v-for="item in cart" :key="item.productId">
      {{ item.name }} x {{ item.count }} = {{ item.unitPrice * item.count }}
    </div>
    <div>
      Start: <input type="date" v-model="start" />
      End: <input type="date" v-model="end" />
    </div>
    <button @click="confirm">Confirm</button>
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createReservation } from '../services/reservation';

const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'));
const start = ref('');
const end = ref('');
const msg = ref('');
const router = useRouter();

async function confirm() {
  try {
    const token = localStorage.getItem('token');
    await createReservation({ items: cart.value, startDate: start.value, endDate: end.value }, token);
    localStorage.removeItem('cart');
    msg.value = 'Reserved!';
    setTimeout(() => router.push('/'), 1000);
  } catch (e) {
    msg.value = 'Reservation failed';
  }
}
</script>
