<template>
  <div class="pending-users">
    <h2>Pending Users</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u._id">
          <td>{{ u.firstName }} {{ u.lastName }}</td>
          <td>{{ u.phone }}</td>
          <td>
            <button @click="approve(u._id)">Approve</button>
            <button @click="reject(u._id)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPendingUsers, approveUser, rejectUser } from '../services/admin';

const users = ref([]);

async function load() {
  const { data } = await getPendingUsers();
  users.value = data;
}

async function approve(id) {
  await approveUser(id);
  load();
}

async function reject(id) {
  await rejectUser(id);
  load();
}

onMounted(load);
</script>

<style scoped>
.pending-users {
  padding: 2rem;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
}
.user-table th,
.user-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
.user-table button {
  margin-right: 0.5rem;
}
</style>
