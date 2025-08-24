<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
        >
          ⏳ کاربران در انتظار تأیید
        </h1>
        <p class="text-xl text-gray-600">
          بررسی و تأیید درخواست‌های عضویت کاربران
        </p>
      </div>

      <!-- Users List -->
      <div
        class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden"
      >
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span class="text-3xl">👥</span>
            درخواست‌های عضویت
            <span
              class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ users.length }} درخواست
            </span>
          </h2>
        </div>

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
              در حال بارگذاری درخواست‌ها...
            </p>
          </div>
        </div>

        <!-- Users Table -->
        <div v-else-if="users.length > 0" class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  نام کامل
                </th>
                <th
                  class="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  شماره تلفن
                </th>
                <th
                  class="px-6 py-4 text-center text-sm font-medium text-gray-500"
                >
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="u in users"
                :key="u._id"
                class="hover:bg-gray-50 transition-colors duration-200"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                    >
                      {{ u.firstName.charAt(0) }}{{ u.lastName.charAt(0) }}
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">
                        {{ u.firstName }} {{ u.lastName }}
                      </div>
                      <div class="text-sm text-gray-500">درخواست عضویت</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900 font-medium">
                  {{ u.phone }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex justify-center gap-2">
                    <button
                      @click="approve(u._id)"
                      :disabled="processingUsers.has(u._id)"
                      class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span
                        v-if="processingUsers.has(u._id)"
                        class="animate-spin"
                        >⏳</span
                      >
                      <span v-else>✅</span>
                      تأیید
                    </button>
                    <button
                      @click="reject(u._id)"
                      :disabled="processingUsers.has(u._id)"
                      class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span
                        v-if="processingUsers.has(u._id)"
                        class="animate-spin"
                        >⏳</span
                      >
                      <span v-else>❌</span>
                      رد
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">✅</div>
          <h3 class="text-2xl font-bold text-gray-600 mb-2">
            درخواستی در انتظار نیست
          </h3>
          <p class="text-gray-500">همه درخواست‌های عضویت بررسی شده‌اند</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPendingUsers, approveUser, rejectUser } from "../services/admin";

const users = ref([]);
const loading = ref(true);
const processingUsers = ref(new Set());

async function load() {
  try {
    loading.value = true;
    const { data } = await getPendingUsers();
    users.value = data;
  } catch (error) {
    console.error("Error loading pending users:", error);
  } finally {
    loading.value = false;
  }
}

async function approve(id) {
  try {
    processingUsers.value.add(id);
    await approveUser(id);
    await load();
  } catch (error) {
    console.error("Error approving user:", error);
  } finally {
    processingUsers.value.delete(id);
  }
}

async function reject(id) {
  try {
    if (confirm("آیا از رد این درخواست مطمئن هستید؟")) {
      processingUsers.value.add(id);
      await rejectUser(id);
      await load();
    }
  } catch (error) {
    console.error("Error rejecting user:", error);
  } finally {
    processingUsers.value.delete(id);
  }
}

onMounted(load);
</script>
