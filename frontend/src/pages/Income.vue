<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
        >
          💰 گزارش درآمد
        </h1>
        <p class="text-xl text-gray-600">نمایش کل درآمدهای سیستم</p>
      </div>

      <!-- Income Card -->
      <div
        class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden"
      >
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
              در حال بارگذاری درآمد...
            </p>
          </div>
        </div>

        <!-- Income Display -->
        <div v-else class="p-8">
          <div class="text-center">
            <!-- Income Icon -->
            <div
              class="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span class="text-3xl text-white">💰</span>
            </div>

            <!-- Income Title -->
            <h2 class="text-2xl font-bold text-gray-800 mb-4">
              کل درآمد سیستم
            </h2>

            <!-- Income Amount -->
            <div
              class="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-8 mb-8"
            >
              <div class="text-5xl md:text-6xl font-bold mb-2">
                {{ total.toLocaleString() }}
              </div>
              <div class="text-xl opacity-90">تومان</div>
            </div>

            <!-- Additional Info -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-blue-50 rounded-xl p-6">
                <div class="text-3xl mb-2">📊</div>
                <div class="text-lg font-semibold text-blue-800">آمار فروش</div>
                <div class="text-sm text-blue-600">درآمد کل از اجاره‌ها</div>
              </div>

              <div class="bg-purple-50 rounded-xl p-6">
                <div class="text-3xl mb-2">📈</div>
                <div class="text-lg font-semibold text-purple-800">
                  روند رشد
                </div>
                <div class="text-sm text-purple-600">درآمد در حال افزایش</div>
              </div>

              <div class="bg-green-50 rounded-xl p-6">
                <div class="text-3xl mb-2">✅</div>
                <div class="text-lg font-semibold text-green-800">
                  وضعیت مالی
                </div>
                <div class="text-sm text-green-600">عملکرد مطلوب</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getIncome } from "../services/admin";

const total = ref(0);
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;
    const { data } = await getIncome();
    total.value = data.total;
  } catch (error) {
    console.error("Error loading income:", error);
  } finally {
    loading.value = false;
  }
});
</script>
