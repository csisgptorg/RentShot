<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4"
  >
    <div class="max-w-md mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
        >
          📝 ثبت نام
        </h1>
        <p class="text-gray-600">حساب کاربری جدید ایجاد کنید</p>
      </div>

      <!-- Register Card -->
      <div
        class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8"
      >
        <form @submit.prevent="submit" class="space-y-6">
          <!-- First Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >نام</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-400">👤</span>
              </div>
              <input
                v-model="firstName"
                type="text"
                placeholder="نام خود را وارد کنید"
                :class="[
                  'w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white',
                  errors.firstName
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200',
                ]"
                required
              />
            </div>
            <p
              v-if="errors.firstName"
              class="text-red-500 text-sm mt-1 flex items-center gap-1"
            >
              <span>⚠️</span>{{ errors.firstName }}
            </p>
          </div>

          <!-- Last Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >نام خانوادگی</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-400">👥</span>
              </div>
              <input
                v-model="lastName"
                type="text"
                placeholder="نام خانوادگی خود را وارد کنید"
                :class="[
                  'w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white',
                  errors.lastName
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200',
                ]"
                required
              />
            </div>
            <p
              v-if="errors.lastName"
              class="text-red-500 text-sm mt-1 flex items-center gap-1"
            >
              <span>⚠️</span>{{ errors.lastName }}
            </p>
          </div>

          <!-- National ID -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >کد ملی</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-400">🆔</span>
              </div>
              <input
                v-model="nationalId"
                type="text"
                placeholder="کد ملی 10 رقمی"
                maxlength="10"
                :class="[
                  'w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white',
                  errors.nationalId
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200',
                ]"
                required
              />
            </div>
            <p
              v-if="errors.nationalId"
              class="text-red-500 text-sm mt-1 flex items-center gap-1"
            >
              <span>⚠️</span>{{ errors.nationalId }}
            </p>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >شماره تلفن</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-400">📱</span>
              </div>
              <input
                v-model="phone"
                type="text"
                placeholder="09xxxxxxxxx"
                maxlength="11"
                :class="[
                  'w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white',
                  errors.phone
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200',
                ]"
                required
              />
            </div>
            <p
              v-if="errors.phone"
              class="text-red-500 text-sm mt-1 flex items-center gap-1"
            >
              <span>⚠️</span>{{ errors.phone }}
            </p>
          </div>

          <!-- Referrer Code -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >کد معرف <span class="text-red-500">*</span></label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-400">🎫</span>
              </div>
              <input
                v-model="referrerCode"
                type="text"
                placeholder="کد معرف 6 کاراکتری الزامی"
                maxlength="6"
                :class="[
                  'w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white',
                  errors.referrerCode
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200',
                ]"
                required
              />
            </div>
            <p
              v-if="errors.referrerCode"
              class="text-red-500 text-sm mt-1 flex items-center gap-1"
            >
              <span>⚠️</span>{{ errors.referrerCode }}
            </p>
            <p class="text-blue-600 text-sm mt-1 flex items-center gap-1">
              <span>ℹ️</span>کد معرف را از معرف خود دریافت کنید
            </p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >رمز عبور</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-400">🔒</span>
              </div>
              <input
                v-model="password"
                type="password"
                placeholder="حداقل 6 کاراکتر"
                :class="[
                  'w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white',
                  errors.password
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200',
                ]"
                required
              />
            </div>
            <p
              v-if="errors.password"
              class="text-red-500 text-sm mt-1 flex items-center gap-1"
            >
              <span>⚠️</span>{{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >تکرار رمز عبور</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-400">🔐</span>
              </div>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="رمز عبور را مجدداً وارد کنید"
                :class="[
                  'w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white',
                  errors.confirmPassword
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200',
                ]"
                required
              />
            </div>
            <p
              v-if="errors.confirmPassword"
              class="text-red-500 text-sm mt-1 flex items-center gap-1"
            >
              <span>⚠️</span>{{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
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
              در حال ثبت نام...
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              ✨ ثبت نام
            </span>
          </button>

          <!-- General Error -->
          <div
            v-if="errors.general"
            class="p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <div class="flex items-center gap-2">
              <span class="text-red-500">⚠️</span>
              <p class="text-red-700 font-medium">{{ errors.general }}</p>
            </div>
          </div>
        </form>

        <!-- Login Link -->
        <div class="mt-8 text-center">
          <p class="text-gray-600">
            قبلاً ثبت نام کرده‌اید؟
            <router-link
              to="/login"
              class="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors duration-200"
            >
              وارد شوید
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../services/auth";

const firstName = ref("");
const lastName = ref("");
const nationalId = ref("");
const phone = ref("");
const referrerCode = ref("");
const password = ref("");
const confirmPassword = ref("");
const errors = ref({});
const loading = ref(false);
const router = useRouter();

function validate() {
  const e = {};
  if (firstName.value.length < 2 || firstName.value.length > 50) {
    e.firstName = "نام باید بین 2 تا 50 کاراکتر باشد";
  }
  if (lastName.value.length < 2 || lastName.value.length > 50) {
    e.lastName = "نام خانوادگی باید بین 2 تا 50 کاراکتر باشد";
  }
  if (!/^\d{10}$/.test(nationalId.value)) {
    e.nationalId = "کد ملی باید 10 رقم باشد";
  }
  if (!/^09\d{9}$/.test(phone.value)) {
    e.phone = "شماره تلفن باید 11 رقم و با 09 شروع شود";
  }
  if (!referrerCode.value) {
    e.referrerCode = "کد معرف الزامی است";
  } else if (!/^[a-zA-Z0-9]{6}$/.test(referrerCode.value)) {
    e.referrerCode = "کد معرف باید 6 کاراکتر انگلیسی و عدد باشد";
  }
  if (password.value.length < 6) {
    e.password = "رمز عبور باید حداقل 6 کاراکتر باشد";
  }
  if (confirmPassword.value !== password.value) {
    e.confirmPassword = "تکرار رمز عبور مطابقت ندارد";
  }
  errors.value = e;
  return Object.keys(e).length === 0;
}

async function submit() {
  if (!validate()) return;

  try {
    loading.value = true;
    await register({
      firstName: firstName.value,
      lastName: lastName.value,
      nationalId: nationalId.value,
      phone: phone.value,
      referrerCode: referrerCode.value,
      password: password.value,
    });

    // ذخیره پیام موفقیت در localStorage
    localStorage.setItem("registrationSuccess", "true");
    localStorage.setItem(
      "registrationMessage",
      "ثبت نام شما با موفقیت انجام شد و منتظر تایید مدیر می‌باشد."
    );

    // Success message and redirect
    alert("ثبت نام با موفقیت انجام شد. لطفاً منتظر تایید مدیر باشید.");
    router.push("/login");
  } catch (err) {
    console.error("Registration error:", err);
    errors.value.general = err.response?.data?.error || "خطا در ثبت نام";
  } finally {
    loading.value = false;
  }
}
</script>
