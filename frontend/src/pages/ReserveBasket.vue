<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
        >
          🧺 سبد رزرو
        </h1>
        <p class="text-gray-600">مشاهده و تایید نهایی سفارش شما</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6"
          >
            <h2
              class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"
            >
              🛍️ آیتم‌های انتخابی
            </h2>

            <div v-if="cart.length === 0" class="text-center py-12">
              <div class="text-6xl mb-4">🛒</div>
              <h3 class="text-xl font-bold text-gray-600 mb-2">
                سبد خرید خالی است
              </h3>
              <p class="text-gray-500 mb-6">هنوز محصولی انتخاب نکرده‌اید</p>
              <router-link
                to="/reserve"
                class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                <span>🛍️</span>
                رفتن به فروشگاه
              </router-link>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="item in cart"
                :key="item.productId"
                class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100"
              >
                <div class="flex gap-4">
                  <!-- Product Image -->
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        v-if="getProductImageUrl(item)"
                        :src="getProductImageUrl(item)"
                        :alt="item.name"
                        class="w-full h-full object-cover"
                      />
                      <div
                        v-else
                        class="w-full h-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center"
                      >
                        <span class="text-white text-xl">📦</span>
                      </div>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 flex flex-col gap-4">
                    <!-- Header with name and remove button -->
                    <div class="flex justify-between items-start">
                      <h3 class="font-bold text-gray-800 text-lg">
                        {{ item.name }}
                      </h3>
                      <button
                        @click="removeFromCart(item.productId)"
                        class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                        title="حذف از سبد"
                      >
                        🗑️
                      </button>
                    </div>

                    <!-- Quantity controls and price -->
                    <div class="flex justify-between items-center">
                      <div class="flex items-center gap-4">
                        <!-- Quantity Controls -->
                        <div class="flex items-center gap-2">
                          <span class="text-sm text-gray-600">📦 تعداد:</span>
                          <div
                            class="flex items-center bg-white rounded-lg border border-gray-200"
                          >
                            <button
                              @click="decreaseQuantity(item.productId)"
                              :disabled="item.count <= 1"
                              class="px-3 py-1 text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg transition-colors"
                            >
                              ➖
                            </button>
                            <span
                              class="px-3 py-1 font-bold text-purple-600 min-w-[40px] text-center"
                            >
                              {{ item.count }}
                            </span>
                            <button
                              @click="increaseQuantity(item.productId)"
                              class="px-3 py-1 text-purple-600 hover:bg-purple-50 rounded-l-lg transition-colors"
                            >
                              ➕
                            </button>
                          </div>
                        </div>

                        <!-- Unit Price -->
                        <span
                          class="flex items-center gap-1 text-sm text-gray-600"
                        >
                          💰 قیمت واحد:
                          <span class="font-bold text-green-600">{{
                            item.unitPrice.toLocaleString()
                          }}</span>
                          تومان
                        </span>
                      </div>

                      <!-- Total Price -->
                      <div class="text-left">
                        <div class="text-2xl font-bold text-green-600">
                          {{ (item.unitPrice * item.count).toLocaleString() }}
                        </div>
                        <div class="text-sm text-gray-500">تومان</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sticky top-8"
          >
            <!-- Date Selection -->
            <div class="mb-8">
              <h3
                class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
              >
                📅 انتخاب تاریخ
              </h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >تاریخ و ساعت شروع</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10"
                    >
                      <span class="text-purple-500">📅</span>
                    </div>
                    <flat-pickr
                      v-model="startDate"
                      :config="dateConfig"
                      class="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-gradient-to-r from-gray-50 to-white focus:from-white focus:to-purple-50 text-gray-700 font-medium shadow-sm hover:shadow-md"
                      placeholder="انتخاب تاریخ و ساعت شروع"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >تاریخ و ساعت پایان</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10"
                    >
                      <span class="text-purple-500">📅</span>
                    </div>
                    <flat-pickr
                      v-model="endDate"
                      :config="endDateConfig"
                      class="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-gradient-to-r from-gray-50 to-white focus:from-white focus:to-purple-50 text-gray-700 font-medium shadow-sm hover:shadow-md"
                      placeholder="انتخاب تاریخ و ساعت پایان"
                    />
                  </div>
                </div>
              </div>

              <!-- Date Info -->
              <div
                v-if="datesValid"
                class="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl"
              >
                <div class="flex items-center gap-2 text-green-700">
                  <span>⏰</span>
                  <span class="font-medium"
                    >مدت اجاره: {{ rentalDays }} روز</span
                  >
                </div>
              </div>
            </div>

            <!-- Price Summary -->
            <div class="border-t border-gray-200 pt-6 mb-6">
              <h3
                class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
              >
                💰 خلاصه هزینه
              </h3>

              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">قیمت کل محصولات:</span>
                  <span class="font-bold"
                    >{{ basePrice.toLocaleString() }} تومان</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">تعداد روز:</span>
                  <span class="font-bold">{{ rentalDays }} روز</span>
                </div>
                <div class="border-t border-gray-200 pt-3">
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-gray-800">جمع کل:</span>
                    <div class="text-left">
                      <div class="text-2xl font-bold text-green-600">
                        {{ totalPrice.toLocaleString() }}
                      </div>
                      <div class="text-sm text-gray-500">تومان</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Confirm Button -->
            <button
              @click="confirmReservation"
              :disabled="!datesValid || cart.length === 0 || loading"
              class="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              <span
                v-if="loading"
                class="flex items-center justify-center gap-2"
              >
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                در حال ثبت...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                ✅ تایید نهایی رزرو
              </span>
            </button>

            <!-- Message -->
            <div
              v-if="message"
              :class="[
                'mt-4 p-4 rounded-xl border',
                message.includes('موفقیت')
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700',
              ]"
            >
              <div class="flex items-center gap-2">
                <span>{{ message.includes("موفقیت") ? "✅" : "❌" }}</span>
                <p class="font-medium">{{ message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { createReservation } from "../services/reservation";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
// Persian locale for flatpickr
import { Persian } from "flatpickr/dist/l10n/fa.js";

// Register component locally
const components = {
  flatPickr,
};

const cart = ref(JSON.parse(localStorage.getItem("cart") || "[]"));
const startDate = ref("");
const endDate = ref("");
const message = ref("");
const loading = ref(false);
const router = useRouter();

// Flatpickr configuration
const dateConfig = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  locale: Persian,
  minDate: "today",
  time_24hr: true,
  minuteIncrement: 30,
};

const endDateConfig = computed(() => ({
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  locale: Persian,
  minDate: startDate.value || "today",
  time_24hr: true,
  minuteIncrement: 30,
}));

const datesValid = computed(() => {
  return (
    startDate.value &&
    endDate.value &&
    new Date(startDate.value) <= new Date(endDate.value)
  );
});

const rentalDays = computed(() => {
  if (!datesValid.value) return 0;
  return Math.max(
    1,
    Math.ceil(
      (new Date(endDate.value) - new Date(startDate.value)) /
        (1000 * 60 * 60 * 24)
    ) + 1
  );
});

const basePrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.unitPrice * item.count, 0);
});

const totalPrice = computed(() => {
  if (!datesValid.value) return 0;
  return basePrice.value * rentalDays.value;
});

async function confirmReservation() {
  if (!datesValid.value) return;

  try {
    loading.value = true;
    message.value = "";

    const token = localStorage.getItem("token");
    await createReservation(
      {
        items: cart.value,
        startDate: startDate.value,
        endDate: endDate.value,
      },
      token
    );

    localStorage.removeItem("cart");
    message.value = "رزرو شما با موفقیت ثبت شد.";

    setTimeout(() => {
      router.push("/my-panel");
    }, 2000);
  } catch (err) {
    console.error("Reservation error:", err);
    message.value = err.response?.data?.error || "ثبت رزرو با شکست مواجه شد.";
  } finally {
    loading.value = false;
  }
}

function increaseQuantity(productId) {
  const item = cart.value.find((item) => item.productId === productId);
  if (item) {
    item.count++;
    updateCart();
  }
}

function decreaseQuantity(productId) {
  const item = cart.value.find((item) => item.productId === productId);
  if (item && item.count > 1) {
    item.count--;
    updateCart();
  }
}

function removeFromCart(productId) {
  const index = cart.value.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    cart.value.splice(index, 1);
    updateCart();
  }
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart.value));
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
/* Custom date picker styles */
input[type="date"] {
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

input[type="date"]:hover::-webkit-calendar-picker-indicator {
  opacity: 1;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="date"]::-moz-focus-inner {
  border: 0;
  outline: none;
}

/* Focus styles for better accessibility */
input[type="date"]:focus {
  box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
}
</style>
