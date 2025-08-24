<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"
  >
    <!-- Header Section -->
    <div
      class="bg-white shadow-lg border-b-4 border-gradient-to-r from-purple-500 to-blue-500"
    >
      <div class="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1
          class="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
        >
          🛍️ محصولات برای اجاره
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          بهترین محصولات را برای اجاره انتخاب کنید و تجربه‌ای بی‌نظیر داشته
          باشید
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Category Filter -->
      <div class="mb-12">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          🎯 دسته‌بندی محصولات
        </h3>
        <div class="flex flex-wrap justify-center gap-3">
          <button
            :class="[
              'px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105',
              selectedCategory === null
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md',
            ]"
            @click="selectedCategory = null"
          >
            همه محصولات
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            :class="[
              'px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105',
              selectedCategory === cat
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md',
            ]"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <div
          v-for="p in filtered"
          :key="p.productId"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
        >
          <!-- Product Header -->
          <div
            class="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white"
          >
            <h3 class="text-xl font-bold mb-1">{{ p.name }}</h3>
            <span
              class="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm"
            >
              {{ p.category }}
            </span>
          </div>

          <!-- Product Image -->
          <div class="h-48 overflow-hidden">
            <img
              v-if="getProductImageUrl(p)"
              :src="getProductImageUrl(p)"
              :alt="p.name"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div
              v-else
              class="h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center"
            >
              <span class="text-6xl text-gray-400">📦</span>
            </div>
          </div>

          <div class="p-6">
            <!-- Price & Stock Info -->
            <div class="flex justify-between items-center mb-6">
              <div class="text-right">
                <div class="text-3xl font-bold text-green-600">
                  {{ p.price.toLocaleString() }}
                </div>
                <div class="text-sm text-gray-500">تومان</div>
              </div>
              <div class="text-left">
                <div class="text-sm text-gray-600 mb-1">موجودی:</div>
                <div
                  :class="[
                    'text-lg font-bold',
                    p.quantity < 5 ? 'text-red-500' : 'text-emerald-600',
                  ]"
                >
                  {{ p.quantity }}
                </div>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-3"
                >تعداد:</label
              >
              <div
                class="flex items-center justify-center bg-gray-50 rounded-xl p-2"
              >
                <button
                  @click="dec(p)"
                  :disabled="(counts[p.productId] || 1) <= 1"
                  class="w-10 h-10 rounded-lg bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-red-500 hover:to-pink-600 transition-all duration-200"
                >
                  −
                </button>
                <span
                  class="mx-6 text-2xl font-bold text-gray-800 min-w-[2rem] text-center"
                >
                  {{ counts[p.productId] || 1 }}
                </span>
                <button
                  @click="inc(p)"
                  :disabled="(counts[p.productId] || 1) >= p.quantity"
                  class="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-500 hover:to-green-600 transition-all duration-200"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Add to Cart Button -->
            <button
              @click="add(p)"
              :disabled="p.quantity === 0"
              class="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <span class="text-lg">🛒</span>
              افزودن به سبد
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filtered.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">📦</div>
        <h3 class="text-2xl font-bold text-gray-600 mb-2">محصولی یافت نشد</h3>
        <p class="text-gray-500">در این دسته‌بندی محصولی موجود نیست</p>
      </div>
    </div>

    <!-- Floating Cart Button -->
    <div class="fixed bottom-8 right-8 z-50">
      <button
        @click="goBasket"
        class="relative bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 rounded-full shadow-2xl hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-110 group"
      >
        <span class="text-2xl">🧺</span>
        <span
          class="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center"
          v-if="cartItemsCount > 0"
        >
          {{ cartItemsCount }}
        </span>
        <div
          class="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
        >
          مشاهده سبد خرید
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getProducts } from "../services/product";

const products = ref([]);
const counts = ref({});
const selectedCategory = ref(null);
const router = useRouter();

onMounted(async () => {
  try {
    const { data } = await getProducts();
    products.value = data;
  } catch (error) {
    console.error("Error loading products:", error);
    // Handle error - maybe show a toast or error message
  }
});

const categories = computed(() => {
  const set = new Set();
  for (const p of products.value) set.add(p.category);
  return Array.from(set);
});

const filtered = computed(() => {
  if (!selectedCategory.value) return products.value;
  return products.value.filter((p) => p.category === selectedCategory.value);
});

const cartItemsCount = computed(() => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart.reduce((total, item) => total + item.count, 0);
});

function add(p) {
  // Check if user is logged in using auth utility
  const token = localStorage.getItem("token");
  if (!token) {
    alert("برای افزودن محصول به سبد خرید باید وارد شوید.");
    router.push("/login");
    return;
  }

  const count = counts.value[p.productId] || 1;
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find((i) => i.productId === p.productId);

  if (existing) {
    existing.count += count;
  } else {
    cart.push({
      productId: p.productId,
      name: p.name,
      unitPrice: p.price,
      count,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  counts.value[p.productId] = 1;

  // Show success message
  alert(`${p.name} با موفقیت به سبد خرید اضافه شد!`);
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
  router.push("/basket");
}

function getProductImageUrl(product) {
  if (product.imageData) {
    return `data:${product.imageType || "image/jpeg"};base64,${
      product.imageData
    }`;
  } else if (product.imageUrl) {
    return product.imageUrl;
  }
  return null;
}
</script>

<style scoped>
/* Custom styles for additional animations and effects */
@import url("https://fonts.googleapis.com/css2?family=Vazir:wght@300;400;500;600;700&display=swap");

* {
  font-family: "Vazir", sans-serif;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, var(--tw-gradient-stops));
}

.border-gradient-to-r {
  border-image: linear-gradient(to right, #8b5cf6, #3b82f6) 1;
}

/* Custom hover effects */
.product-card:hover .product-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Loading animation for buttons */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Pulse animation for empty state */
.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

/* Floating animation for cart button */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float {
  animation: float 3s ease-in-out infinite;
}

/* Glass morphism effect */
.glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Card shine effect */
.shine {
  position: relative;
  overflow: hidden;
}

.shine::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.5s;
}

.shine:hover::before {
  left: 100%;
}
</style>
