<template>
  <div class="products">
    <h2>Product Management</h2>
    <form class="product-form" @submit.prevent="create">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model.number="form.price" type="number" placeholder="Price" required />
      <input v-model.number="form.quantity" type="number" placeholder="Quantity" required />
      <input v-model="form.category" placeholder="Category" required />
      <input v-model="form.imageUrl" placeholder="Image URL" />
      <button type="submit">Add</button>
    </form>

    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.productId">
          <td>{{ p.productId }}</td>
          <td>{{ p.name }}</td>
          <td><input type="number" v-model.number="p.price" /></td>
          <td><input type="number" v-model.number="p.quantity" /></td>
          <td>{{ p.category }}</td>
          <td>
            <button @click="save(p)">Save</button>
            <button @click="remove(p.productId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/admin';

const products = ref([]);
const form = ref({ name: '', price: 0, quantity: 0, category: '', imageUrl: '' });

async function load() {
  const { data } = await getProducts();
  products.value = data;
}

onMounted(load);

async function create() {
  await createProduct(form.value);
  form.value = { name: '', price: 0, quantity: 0, category: '', imageUrl: '' };
  load();
}

async function save(p) {
  await updateProduct(p.productId, { price: p.price, quantity: p.quantity });
  load();
}

async function remove(id) {
  await deleteProduct(id);
  load();
}
</script>

<style scoped>
.products {
  padding: 2rem;
}
.product-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.product-form input {
  flex: 1 1 150px;
  padding: 0.25rem;
}
.product-table {
  width: 100%;
  border-collapse: collapse;
}
.product-table th,
.product-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
.product-table input {
  width: 80px;
}
</style>
