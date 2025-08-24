<template>
  <div>
    <h1>Main</h1>
    <div v-for="(group, cat) in grouped" :key="cat">
      <h2>{{ cat }}</h2>
      <ul>
        <li v-for="p in group" :key="p.productId">{{ p.name }} - {{ p.price }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getProducts } from '../services/product';

const products = ref([]);

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
</script>
