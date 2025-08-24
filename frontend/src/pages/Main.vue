<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"
  >
    <!-- Hero Slider Section -->
    <div
      class="relative w-full h-96 md:h-[500px] overflow-hidden rounded-b-3xl shadow-2xl"
    >
      <!-- Slides -->
      <div class="relative h-full">
        <div
          v-for="(slide, index) in heroSlides"
          :key="index"
          :class="[
            'absolute inset-0 transition-all duration-700 ease-in-out',
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105',
          ]"
        >
          <div
            class="relative h-full bg-gradient-to-r"
            :style="{
              backgroundImage: `linear-gradient(${slide.gradient}), url(${slide.image})`,
            }"
          >
            <div class="absolute inset-0 bg-black/30"></div>
            <div
              class="relative h-full flex items-center justify-center text-center text-white p-8"
            >
              <div class="max-w-4xl">
                <h1 class="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                  {{ slide.title }}
                </h1>
                <p class="text-xl md:text-2xl mb-8 drop-shadow-md">
                  {{ slide.subtitle }}
                </p>
                <router-link
                  to="/reserve"
                  class="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span class="text-2xl">🛍️</span>
                  شروع خرید
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button
        @click="prevSlide"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
      >
        <svg
          class="w-6 h-6 transform transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
      >
        <svg
          class="w-6 h-6 transform transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>

      <!-- Slide Indicators -->
      <div
        class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2"
      >
        <button
          v-for="(slide, index) in heroSlides"
          :key="index"
          @click="currentSlide = index"
          :class="[
            'w-3 h-3 rounded-full transition-all duration-300',
            index === currentSlide
              ? 'bg-white scale-125'
              : 'bg-white/50 hover:bg-white/75',
          ]"
        ></button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Welcome Section -->
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6"
        >
          🎉 به RentShot خوش آمدید
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          بهترین پلتفرم اجاره محصولات در ایران. هر چیزی که نیاز دارید را با قیمت
          مناسب اجاره کنید
        </p>
      </div>

      <!-- Category Filter -->
      <div class="mb-16">
        <h3 class="text-3xl font-bold text-center text-gray-800 mb-8">
          🎯 دسته‌بندی محصولات
        </h3>
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="cat in categories"
            :key="cat"
            :class="[
              'px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105',
              cat === selectedCategory
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md',
            ]"
            @click="filterProducts(cat)"
          >
            {{ cat === "all" ? "همه محصولات" : cat }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="mb-16">
        <h3 class="text-3xl font-bold text-center text-gray-800 mb-8">
          <span v-if="selectedCategory === 'all'">🛍️ محصولات پیشنهادی</span>
          <span v-else>📦 محصولات {{ selectedCategory }}</span>
        </h3>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-16">
          <div class="flex flex-col items-center">
            <svg
              class="animate-spin h-12 w-12 text-purple-600 mb-4"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p class="text-lg font-medium text-gray-700">
              در حال بارگذاری محصولات...
            </p>
          </div>
        </div>

        <!-- Products Grid -->
        <div
          v-else-if="filteredProducts.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <div
            v-for="p in filteredProducts.slice(0, 8)"
            :key="p.productId"
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-white/20 group"
          >
            <!-- Product Image -->
            <div class="h-48 overflow-hidden">
              <img
                v-if="getProductImageUrl(p)"
                :src="getProductImageUrl(p)"
                :alt="p.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div
                v-else
                class="h-full bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 flex items-center justify-center"
              >
                <span class="text-6xl text-white">📦</span>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-6">
              <h3
                class="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-200"
              >
                {{ p.name }}
              </h3>
              <div class="flex justify-between items-center mb-4">
                <div>
                  <div class="text-2xl font-bold text-green-600">
                    {{ p.price.toLocaleString() }}
                  </div>
                  <div class="text-sm text-gray-500">تومان / روز</div>
                </div>
                <div class="text-right">
                  <div class="text-sm text-gray-600">موجودی:</div>
                  <div
                    :class="[
                      'text-lg font-bold',
                      p.quantity < 5 ? 'text-red-500' : 'text-green-600',
                    ]"
                  >
                    {{ p.quantity }}
                  </div>
                </div>
              </div>

              <!-- Category Badge -->
              <div class="mb-4">
                <span
                  class="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ p.category }}
                </span>
              </div>

              <!-- Action Button -->
              <router-link
                to="/reserve"
                class="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>🛒</span>
                اجاره این محصول
              </router-link>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">📭</div>
          <h3 class="text-2xl font-bold text-gray-600 mb-2">محصولی یافت نشد</h3>
          <p class="text-gray-500">در این دسته‌بندی محصولی موجود نیست</p>
        </div>

        <!-- View All Button -->
        <div v-if="filteredProducts.length > 8" class="text-center mt-12">
          <router-link
            to="/reserve"
            class="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>🔍</span>
            مشاهده همه محصولات
          </router-link>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div
          class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl text-white">⚡</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">اجاره سریع</h3>
          <p class="text-gray-600">فرآیند اجاره در کمتر از 5 دقیقه</p>
        </div>

        <div
          class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl text-white">🛡️</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">تضمین کیفیت</h3>
          <p class="text-gray-600">همه محصولات تست شده و باکیفیت</p>
        </div>

        <div
          class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center border border-white/20"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl text-white">💰</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">قیمت مناسب</h3>
          <p class="text-gray-600">بهترین قیمت‌ها در بازار</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getProducts } from "../services/product";

// Products
const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await getProducts();
    products.value = data;
  } catch (error) {
    console.error("Error loading products:", error);
  } finally {
    loading.value = false;
  }
});

// Enhanced Hero Slider
const heroSlides = [
  {
    title: "اجاره هوشمند محصولات",
    subtitle: "هر چیزی که نیاز دارید را با قیمت مناسب اجاره کنید",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1626",
    gradient: "rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8)",
  },
  {
    title: "تجربه‌ای متفاوت از خرید",
    subtitle: "کیفیت بالا، قیمت مناسب، سرویس عالی",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1630",
    gradient: "rgba(59, 130, 246, 0.8), rgba(16, 185, 129, 0.8)",
  },
  {
    title: "صدها محصول متنوع",
    subtitle: "از لوازم خانگی تا تجهیزات ورزشی",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1640",
    gradient: "rgba(16, 185, 129, 0.8), rgba(245, 158, 11, 0.8)",
  },
];

const currentSlide = ref(0);

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.length;
}

function prevSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + heroSlides.length) % heroSlides.length;
}

// Auto-play slider
let autoPlayInterval;
onMounted(() => {
  autoPlayInterval = setInterval(nextSlide, 5000);
});

// Categories and filtering
const selectedCategory = ref("all");

const categories = computed(() => {
  const cats = new Set(products.value.map((p) => p.category));
  return ["all", ...Array.from(cats)];
});

const filteredProducts = computed(() => {
  if (selectedCategory.value === "all") return products.value;
  return products.value.filter((p) => p.category === selectedCategory.value);
});

function filterProducts(cat) {
  selectedCategory.value = cat;
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

// Cleanup
import { onUnmounted } from "vue";
onUnmounted(() => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
});
</script>
