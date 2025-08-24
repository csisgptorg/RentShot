<template>
  <div>
    <h1>Reserve</h1>
    <div v-for="(group, cat) in grouped" :key="cat">
      <h2>{{ cat }}</h2>
      <div v-for="p in group" :key="p.productId">
        {{ p.name }} - {{ p.price }} - موجودی {{ p.quantity }}
        <input type="number" v-model.number="counts[p.productId]" min="1" :max="p.quantity" />
        <button @click="add(p)">Add</button>
      </div>
    </div>
    <router-link to="/basket">Go to basket</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getProducts } from '../services/product';

const products = ref([]);
const counts = ref({});

onMounted(async () => {
  const { data } = await getProducts();
  products.value = data;
});

const grouped = computed(() => {
  const g = {};
  for (const p of products.value) {
    if (!g[p.category]) g[p.category] = [];
    g[p.category].push(p);
  }
  return g;
});

function add(p) {
  const count = counts.value[p.productId] || 1;
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(i => i.productId === p.productId);
  if (existing) existing.count += count;
  else cart.push({ productId: p.productId, name: p.name, unitPrice: p.price, count });
  localStorage.setItem('cart', JSON.stringify(cart));
  counts.value[p.productId] = 1;
}
</script>
