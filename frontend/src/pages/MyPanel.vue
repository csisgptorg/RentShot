<template>
  <div>
    <h1>My Panel</h1>

    <section>
      <h2>User Details</h2>
      <p>Name: {{ user.firstName }}</p>
      <p>My Code: {{ user.myCode }}</p>
    </section>

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
      <table v-if="reservations.length">
        <thead>
          <tr>
            <th>Tracking Code</th>
            <th>Start</th>
            <th>End</th>
            <th>Total Price</th>
            <th>Late Hours</th>
            <th>Final Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in reservations" :key="r.trackingCode">
            <td>{{ r.trackingCode }}</td>
            <td>{{ new Date(r.startDate).toLocaleDateString() }}</td>
            <td>{{ new Date(r.endDate).toLocaleDateString() }}</td>
            <td>{{ r.totalPrice }}</td>
            <td>{{ r.lateHours }}</td>
            <td>{{ r.finalPrice }}</td>
            <td>
              <router-link :to="`/factor/${r.trackingCode}`">View Invoice</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No reservations.</p>
    </section>

    <section>
      <h2>Actions</h2>
      <router-link to="/reserve">Reserve</router-link>
      <button @click="logout">Logout</button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMyReservations } from '../services/reservation';
import { getMessages } from '../services/message';

const reservations = ref([]);
const messages = ref([]);
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));
const router = useRouter();

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
  router.push('/login');
}

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) return router.push('/login');
  reservations.value = await getMyReservations(token);
  const { data: msg } = await getMessages(token);
  messages.value = msg;
});
</script>
