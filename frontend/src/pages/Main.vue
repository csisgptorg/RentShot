<template>
  <div>
    <!-- Hero Slider -->
    <div class="hero-slider">
      <div class="slides">
        <div
          v-for="(img, index) in heroImages"
          :key="index"
          class="slide"
          :class="{ active: index === currentSlide }"
        >
          <img :src="img" alt="slide" />
        </div>
      </div>
      <button class="prev" @click="prevSlide">&#10094;</button>
      <button class="next" @click="nextSlide">&#10095;</button>
    </div>

    <!-- Category Cards -->
    <div class="categories">
      <div
        v-for="cat in categories"
        :key="cat"
        class="category-card"
        :class="{ active: cat === selectedCategory }"
        @click="filterProducts(cat)"
      >
        {{ cat }}
      </div>
    </div>

    <!-- Product Listing -->
    <div class="products">
      <div
        v-for="p in filteredProducts"
        :key="p.productId"
        class="product-card"
      >
        <h3>{{ p.name }}</h3>
        <p>{{ p.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getProducts } from '../services/product';

// Products
const products = ref([]);

onMounted(async () => {
  const { data } = await getProducts();
  products.value = data;
});

// Slider state
const heroImages = [
  'https://via.placeholder.com/1200x400?text=Slide+1',
  'https://via.placeholder.com/1200x400?text=Slide+2',
  'https://via.placeholder.com/1200x400?text=Slide+3'
];
const currentSlide = ref(0);
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % heroImages.length;
}
function prevSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + heroImages.length) % heroImages.length;
}

// Categories and filtering
const selectedCategory = ref('all');
const categories = computed(() => {
  const cats = new Set(products.value.map((p) => p.category));
  return ['all', ...cats];
});
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products.value;
  return products.value.filter((p) => p.category === selectedCategory.value);
});
function filterProducts(cat) {
  selectedCategory.value = cat;
}
</script>

<style scoped>
.hero-slider {
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
}
.hero-slider .slides {
  display: flex;
}
.hero-slider .slide {
  flex: 1 0 100%;
  display: none;
}
.hero-slider .slide.active {
  display: block;
}
.hero-slider img {
  width: 100%;
  display: block;
}
.hero-slider .prev,
.hero-slider .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.hero-slider .prev {
  left: 0;
}
.hero-slider .next {
  right: 0;
}

.categories {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}
.category-card {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
}
.category-card.active {
  background: #eee;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  width: 200px;
}
</style>
