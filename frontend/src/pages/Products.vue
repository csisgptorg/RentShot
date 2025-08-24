<template>
  <div>
    <h2>Products</h2>
    <form @submit.prevent="create">
      <input v-model="form.name" placeholder="Name" />
      <input v-model.number="form.price" type="number" placeholder="Price" />
      <input v-model.number="form.quantity" type="number" placeholder="Quantity" />
      <input v-model="form.category" placeholder="Category" />
      <input v-model="form.imageUrl" placeholder="Image URL" />
      <button type="submit">Add</button>
    </form>
    <table>
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
            <button @click="save(p)">Update</button>
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
