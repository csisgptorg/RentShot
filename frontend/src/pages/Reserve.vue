<template>
  <div>
    <h1>Reserve</h1>
    <div class="category-filter">
      <button :class="{ active: selectedCategory === null }" @click="selectedCategory = null">All</button>
      <button
        v-for="cat in categories"
        :key="cat"
        :class="{ active: selectedCategory === cat }"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <div class="product-grid">
      <div v-for="p in filtered" :key="p.productId" class="product-card">
        <h3>{{ p.name }}</h3>
        <p>{{ p.price }} - موجودی {{ p.quantity }}</p>
        <div class="qty">
          <button @click="dec(p)">-</button>
          <span>{{ counts[p.productId] || 1 }}</span>
          <button @click="inc(p)">+</button>
        </div>
        <button @click="add(p)">Add</button>
      </div>
    </div>

    <button @click="goBasket">Go to basket</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getProducts } from '../services/product';

const products = ref([]);
const counts = ref({});
const selectedCategory = ref(null);
const router = useRouter();

onMounted(async () => {
  const { data } = await getProducts();
  products.value = data;
});

const categories = computed(() => {
  const set = new Set();
  for (const p of products.value) set.add(p.category);
  return Array.from(set);
});

const filtered = computed(() => {
  if (!selectedCategory.value) return products.value;
  return products.value.filter(p => p.category === selectedCategory.value);
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

function inc(p) {
  const c = counts.value[p.productId] || 1;
  if (c < p.quantity) counts.value[p.productId] = c + 1;
}

function dec(p) {
  const c = counts.value[p.productId] || 1;
  if (c > 1) counts.value[p.productId] = c - 1;
}

function goBasket() {
  router.push('/basket');
}
</script>
