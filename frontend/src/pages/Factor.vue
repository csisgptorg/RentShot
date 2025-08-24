<template>
  <div class="factor" v-if="reservation">
    <h2>Invoice</h2>

    <div class="details">
      <p><strong>Tracking Code:</strong> {{ reservation.trackingCode }}</p>
      <p><strong>Start Date:</strong> {{ reservation.startDate.slice(0,10) }}</p>
      <p><strong>End Date:</strong> {{ reservation.endDate.slice(0,10) }}</p>
    </div>

    <table class="items">
      <thead>
        <tr>
          <th>Item</th>
          <th>Unit Price</th>
          <th>Count</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in reservation.items" :key="item.productId">
          <td>{{ item.name }}</td>
          <td>{{ item.unitPrice }}</td>
          <td>{{ item.count }}</td>
          <td>{{ item.unitPrice * item.count }}</td>
        </tr>
      </tbody>
    </table>

    <div class="summary">
      <p><strong>Total Price:</strong> {{ reservation.totalPrice }}</p>
      <p><strong>Penalty:</strong> {{ penalty }}</p>
      <p><strong>Final Price:</strong> {{ reservation.finalPrice }}</p>
    </div>

    <div class="actions">
      <button @click="print">Print</button>
      <button @click="back">Back</button>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getMyReservations } from '../services/reservation';

const route = useRoute();
const router = useRouter();
const reservation = ref(null);

const code = parseInt(route.params.code);

async function load() {
  const token = localStorage.getItem('token');
  const { data } = await getMyReservations(token);
  reservation.value = data.find(r => r.trackingCode === code);
}

onMounted(load);

const penalty = computed(() => {
  if (!reservation.value) return 0;
  const total = reservation.value.totalPrice || 0;
  const final = reservation.value.finalPrice || total;
  return final - total;
});

function print() {
  window.print();
}

function back() {
  router.push('/panel');
}
</script>

<style scoped>
.factor {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background: #fff;
}

.details {
  margin-bottom: 20px;
}

.items {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.items th,
.items td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.summary {
  margin-top: 20px;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
}
</style>
