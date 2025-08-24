<template>
  <div class="approved-users">
    <h2>Registered Users</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Code</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u._id">
          <td>{{ u.firstName }} {{ u.lastName }}</td>
          <td>{{ u.phone }}</td>
          <td>{{ u.myCode }}</td>
          <td>
            <button @click="remove(u._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getApprovedUsers, deleteUser } from '../services/admin';

const users = ref([]);

async function load() {
  const { data } = await getApprovedUsers();
  users.value = data;
}

async function remove(id) {
  await deleteUser(id);
  load();
}

onMounted(load);
</script>

<style scoped>
.approved-users {
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
</style>
