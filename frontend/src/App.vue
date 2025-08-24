<template>
  <div>
    <nav class="bg-gray-800 text-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold">RentShot</router-link>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link to="/" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">خانه</router-link>
                <router-link to="/reserve" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">رزرو</router-link>
                <router-link to="/basket" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">سبد</router-link>
                <router-link to="/about" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">درباره ما</router-link>
                <router-link to="/login" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">ورود</router-link>
                <router-link to="/register" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">ثبت‌نام</router-link>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" type="button"
              class="inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <router-link to="/" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700">خانه</router-link>
          <router-link to="/reserve" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700">رزرو</router-link>
          <router-link to="/basket" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700">سبد</router-link>
          <router-link to="/about" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700">درباره ما</router-link>
          <router-link to="/login" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700">ورود</router-link>
          <router-link to="/register" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700">ثبت‌نام</router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
</script>
