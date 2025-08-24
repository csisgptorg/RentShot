<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
        >
          👤 پنل کاربری
        </h1>
        <p class="text-gray-600">
          خوش آمدید {{ user?.firstName }} {{ user?.lastName }}
        </p>
      </div>

      <!-- Registration Success Message -->
      <div v-if="registrationSuccess" class="mb-8 mx-auto max-w-md">
        <div
          class="bg-green-50 border border-green-200 rounded-xl p-6 shadow-lg"
        >
          <div class="flex items-center gap-3">
            <div class="text-3xl">🎉</div>
            <div>
              <h3 class="text-lg font-bold text-green-800 mb-1">
                ثبت نام موفق!
              </h3>
              <p class="text-green-700">{{ registrationMessage }}</p>
            </div>
            <button
              @click="dismissRegistrationMessage"
              class="ml-auto text-green-600 hover:text-green-800 p-1"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- User Info Card -->
        <div class="lg:col-span-1">
          <div
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 mb-8"
          >
            <h2
              class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"
            >
              ℹ️ اطلاعات کاربری
            </h2>

            <div class="space-y-4">
              <div
                class="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
              >
                <span class="text-gray-600">نام:</span>
                <span class="font-bold text-purple-600">{{
                  user.firstName
                }}</span>
              </div>

              <div
                class="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
              >
                <span class="text-gray-600">نام خانوادگی:</span>
                <span class="font-bold text-blue-600">{{ user.lastName }}</span>
              </div>

              <div
                class="flex items-center justify-between p-3 bg-green-50 rounded-lg"
              >
                <span class="text-gray-600">کد شخصی:</span>
                <span class="font-bold text-green-600">{{
                  user.myCode || "در انتظار تایید"
                }}</span>
              </div>

              <div
                class="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
              >
                <span class="text-gray-600">شماره تلفن:</span>
                <span class="font-bold text-orange-600">{{ user.phone }}</span>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="mt-6 space-y-3">
              <router-link
                to="/reserve"
                class="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                🛍️ اجاره محصولات جدید
              </router-link>

              <router-link
                to="/basket"
                class="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                🧺 مشاهده سبد خرید
              </router-link>
            </div>
          </div>

          <!-- Messages Card -->
          <div
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6"
          >
            <h2
              class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"
            >
              💬 پیام‌ها
            </h2>

            <div v-if="messages.length === 0" class="text-center py-8">
              <div class="text-4xl mb-2">📭</div>
              <p class="text-gray-500">پیامی موجود نیست</p>
            </div>

            <div v-else class="space-y-3 max-h-96 overflow-y-auto">
              <div
                v-for="m in messages"
                :key="m._id || m.createdAt"
                class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
              >
                <p class="text-gray-800 mb-2">{{ m.text }}</p>
                <div class="text-sm text-gray-500 flex items-center gap-1">
                  🕒 {{ new Date(m.createdAt).toLocaleString("fa-IR") }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reservations Card -->
        <div class="lg:col-span-2">
          <div
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6"
          >
            <h2
              class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"
            >
              📋 رزروهای من
            </h2>

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
                  در حال بارگذاری رزروها...
                </p>
              </div>
            </div>

            <div
              v-else-if="reservations.length === 0"
              class="text-center py-16"
            >
              <div class="text-6xl mb-4">📦</div>
              <h3 class="text-2xl font-bold text-gray-600 mb-2">
                هنوز رزروی ندارید
              </h3>
              <p class="text-gray-500 mb-6">
                شروع کنید و اولین رزرو خود را ثبت کنید
              </p>
              <router-link
                to="/reserve"
                class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                🛍️ شروع اجاره
              </router-link>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead
                  class="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                >
                  <tr>
                    <th class="px-4 py-3 text-right text-sm font-bold">
                      کد رهگیری
                    </th>
                    <th class="px-4 py-3 text-right text-sm font-bold">
                      تاریخ شروع
                    </th>
                    <th class="px-4 py-3 text-right text-sm font-bold">
                      تاریخ پایان
                    </th>
                    <th class="px-4 py-3 text-right text-sm font-bold">
                      قیمت کل
                    </th>
                    <th class="px-4 py-3 text-right text-sm font-bold">
                      ساعات تاخیر
                    </th>
                    <th class="px-4 py-3 text-right text-sm font-bold">
                      قیمت نهایی
                    </th>
                    <th class="px-4 py-3 text-center text-sm font-bold">
                      وضعیت
                    </th>
                    <th class="px-4 py-3 text-center text-sm font-bold">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    v-for="r in reservations"
                    :key="r.trackingCode"
                    class="hover:bg-purple-50 transition-colors duration-200"
                  >
                    <td class="px-4 py-3">
                      <span
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                      >
                        #{{ r.trackingCode }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-gray-600">
                      {{ new Date(r.startDate).toLocaleDateString("fa-IR") }}
                    </td>
                    <td class="px-4 py-3 text-gray-600">
                      {{ new Date(r.endDate).toLocaleDateString("fa-IR") }}
                    </td>
                    <td class="px-4 py-3">
                      <span class="font-bold text-green-600">
                        {{ r.totalPrice?.toLocaleString() }} تومان
                      </span>
                    </td>
                    <td class="px-4 py-3">
                      <span
                        :class="[
                          'font-bold',
                          r.lateHours > 0 ? 'text-red-600' : 'text-gray-600',
                        ]"
                      >
                        {{ r.lateHours || 0 }} ساعت
                      </span>
                    </td>
                    <td class="px-4 py-3">
                      <span class="font-bold text-blue-600">
                        {{
                          r.finalPrice?.toLocaleString() ||
                          r.totalPrice?.toLocaleString()
                        }}
                        تومان
                      </span>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <div class="flex flex-col gap-1">
                        <span
                          :class="[
                            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                            r.received
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800',
                          ]"
                        >
                          {{
                            r.received ? "✅ دریافت شده" : "⏳ در انتظار دریافت"
                          }}
                        </span>
                        <span
                          :class="[
                            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                            r.returned
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-orange-100 text-orange-800',
                          ]"
                        >
                          {{
                            r.returned ? "🔄 برگشت داده شده" : "📦 در دست کاربر"
                          }}
                        </span>
                        <span
                          :class="[
                            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                            r.paid
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800',
                          ]"
                        >
                          {{ r.paid ? "💰 پرداخت شده" : "💸 پرداخت نشده" }}
                        </span>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <router-link
                        :to="`/factor/${r.trackingCode}`"
                        class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 text-sm"
                      >
                        🧾 مشاهده فاکتور
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getMyReservations } from "../services/reservation";
import { getMessages } from "../services/message";
import { getMe } from "../services/auth";

const reservations = ref([]);
const messages = ref([]);
const loading = ref(true);
const user = ref({});
const router = useRouter();
const registrationSuccess = ref(false);
const registrationMessage = ref("");

onMounted(async () => {
  // Check for registration success message
  if (localStorage.getItem("registrationSuccess") === "true") {
    registrationSuccess.value = true;
    registrationMessage.value =
      localStorage.getItem("registrationMessage") ||
      "ثبت نام با موفقیت انجام شد.";
  }

  user.value = (await getMe()).data.user;

  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }

  try {
    loading.value = true;

    // Load reservations
    try {
      const reservationData = await getMyReservations(token);
      reservations.value = reservationData?.data || reservationData || [];
    } catch (error) {
      console.error("Error loading reservations:", error);
      reservations.value = [];
    }

    // Load messages
    try {
      const { data: msg } = await getMessages(token);
      messages.value = msg || [];
    } catch (error) {
      console.error("Error loading messages:", error);
      messages.value = [];
    }
  } catch (error) {
    console.error("Error loading panel data:", error);
  } finally {
    loading.value = false;
  }
});

function dismissRegistrationMessage() {
  registrationSuccess.value = false;
  localStorage.removeItem("registrationSuccess");
  localStorage.removeItem("registrationMessage");
}
</script>
