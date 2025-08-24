<template>
  <div>
    <h2>Reservations</h2>
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Start</th>
          <th>End</th>
          <th>Received</th>
          <th>Returned</th>
          <th>Paid</th>
          <th>Late Hours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in reservations" :key="r.trackingCode">
          <td>{{ r.trackingCode }}</td>
          <td>{{ r.user.firstName }} {{ r.user.lastName }}</td>
          <td>{{ r.user.phone }}</td>
          <td>{{ r.startDate.slice(0,10) }}</td>
          <td>{{ r.endDate.slice(0,10) }}</td>
          <td><input type="checkbox" v-model="r.received" /></td>
          <td><input type="checkbox" v-model="r.returned" /></td>
          <td><input type="checkbox" v-model="r.paid" /></td>
          <td><input type="number" v-model.number="r.lateHours" min="0" /></td>
          <td><button @click="save(r)">Update</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getReservations, updateReservation } from '../services/admin';

const reservations = ref([]);

async function load() {
  const { data } = await getReservations();
  reservations.value = data;
}

onMounted(load);

async function save(r) {
  await updateReservation(r.trackingCode, {
    received: r.received,
    returned: r.returned,
    paid: r.paid,
    lateHours: r.lateHours
  });
  load();
}
</script>

