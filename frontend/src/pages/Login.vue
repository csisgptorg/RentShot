<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white rounded shadow p-6">
      <div class="flex mb-6">
        <button
          :class="[
            'flex-1 py-2 text-sm font-medium',
            mode === 'user'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500'
          ]"
          @click="mode = 'user'"
        >
          User
        </button>
        <button
          :class="[
            'flex-1 py-2 text-sm font-medium',
            mode === 'admin'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500'
          ]"
          @click="mode = 'admin'"
        >
          Admin
        </button>
      </div>
      <form @submit.prevent="submit" class="space-y-4">
        <div v-if="mode === 'user'" class="space-y-4">
          <input
            v-model="identifier"
            type="text"
            placeholder="National ID or My Code"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-500"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-500"
          />
        </div>
        <div v-else class="space-y-4">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-500"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, loginAdmin } from '../services/auth';

const mode = ref('user');
const identifier = ref('');
const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

async function submit() {
  try {
    if (mode.value === 'user') {
      const { data } = await login(identifier.value, password.value);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', 'user');
      router.push('/reserve');
    } else {
      const { data } = await loginAdmin(username.value, password.value);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', 'admin');
      router.push('/admin');
    }
  } catch (e) {
    error.value = 'Login failed';
  }
}
</script>
