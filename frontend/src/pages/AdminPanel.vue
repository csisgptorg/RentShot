<template>
  <div class="admin-panel">
    <h2>Admin Dashboard</h2>
    <div class="tiles">
      <router-link to="/admin/products" class="tile">Products</router-link>
      <router-link to="/admin/queue-users" class="tile">Pending Users</router-link>
      <router-link to="/admin/registered-users" class="tile">Registered Users</router-link>
      <router-link to="/admin/reserved-lists" class="tile">Reservations</router-link>
      <router-link to="/admin/income" class="tile">Income</router-link>
    </div>
  </div>
</template>

<script setup>
// no additional logic needed
</script>

<style scoped>
.admin-panel {
  padding: 2rem;
}
.tiles {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.tile {
  flex: 1 1 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background: #f0f0f0;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.tile:hover {
  background: #e0e0e0;
}
</style>
