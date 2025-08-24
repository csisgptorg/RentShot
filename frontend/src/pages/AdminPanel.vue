<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1
          class="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
        >
          👨‍💼 پنل مدیریت
        </h1>
        <p class="text-xl text-gray-600">داشبورد کامل مدیریت سیستم</p>
      </div>

      <!-- Admin Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Products Management -->
        <router-link to="/admin/products" class="group">
          <div
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl"
          >
            <div class="flex flex-col items-center text-center">
              <div
                class="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <span class="text-3xl text-white">📦</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-3">
                مدیریت محصولات
              </h3>
              <p class="text-gray-600 text-center">
                افزودن، ویرایش و حذف محصولات
              </p>
              <div
                class="mt-4 inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700"
              >
                مدیریت محصولات
                <svg
                  class="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Pending Users -->
        <router-link to="/admin/queue-users" class="group">
          <div
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl"
          >
            <div class="flex flex-col items-center text-center">
              <div
                class="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <span class="text-3xl text-white">⏳</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-3">
                کاربران در انتظار
              </h3>
              <p class="text-gray-600 text-center">تایید یا رد کاربران جدید</p>
              <div
                class="mt-4 inline-flex items-center text-orange-600 font-semibold group-hover:text-orange-700"
              >
                مشاهده درخواست‌ها
                <svg
                  class="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Registered Users -->
        <router-link to="/admin/registered-users" class="group">
          <div
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl"
          >
            <div class="flex flex-col items-center text-center">
              <div
                class="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <span class="text-3xl text-white">👥</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-3">
                کاربران تایید شده
              </h3>
              <p class="text-gray-600 text-center">مدیریت کاربران فعال سیستم</p>
              <div
                class="mt-4 inline-flex items-center text-green-600 font-semibold group-hover:text-green-700"
              >
                مشاهده کاربران
                <svg
                  class="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Reservations -->
        <router-link to="/admin/reserved-lists" class="group">
          <div
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl"
          >
            <div class="flex flex-col items-center text-center">
              <div
                class="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <span class="text-3xl text-white">📋</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-3">
                مدیریت رزروها
              </h3>
              <p class="text-gray-600 text-center">
                مشاهده و مدیریت رزروهای کاربران
              </p>
              <div
                class="mt-4 inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700"
              >
                مشاهده رزروها
                <svg
                  class="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Income -->
        <router-link to="/admin/income" class="group">
          <div
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl"
          >
            <div class="flex flex-col items-center text-center">
              <div
                class="w-20 h-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <span class="text-3xl text-white">💰</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-3">گزارش درآمد</h3>
              <p class="text-gray-600 text-center">مشاهده آمار و گزارش مالی</p>
              <div
                class="mt-4 inline-flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700"
              >
                مشاهده گزارش
                <svg
                  class="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Quick Stats Card -->
        <div
          class="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-2xl p-8 text-white"
        >
          <div class="flex flex-col items-center text-center">
            <div
              class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6"
            >
              <span class="text-3xl">📊</span>
            </div>
            <h3 class="text-2xl font-bold mb-3">آمار سریع</h3>
            <p class="text-purple-100 text-center mb-6">خلاصه وضعیت سیستم</p>
            <div class="w-full space-y-3 text-sm">
              <div
                class="flex justify-between items-center p-2 bg-white/10 rounded-lg"
              >
                <span>کاربران فعال:</span>
                <span class="font-bold">--</span>
              </div>
              <div
                class="flex justify-between items-center p-2 bg-white/10 rounded-lg"
              >
                <span>رزروهای امروز:</span>
                <span class="font-bold">--</span>
              </div>
              <div
                class="flex justify-between items-center p-2 bg-white/10 rounded-lg"
              >
                <span>درآمد ماه:</span>
                <span class="font-bold">-- تومان</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Admin panel logic can be added here
// For example: fetch quick stats, handle real-time updates
</script>
