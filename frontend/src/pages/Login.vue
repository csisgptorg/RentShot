<template>
  <div>
    <h1>Login</h1>
    <div>
      <button @click="mode = 'user'">User</button>
      <button @click="mode = 'admin'">Admin</button>
    </div>
    <form @submit.prevent="submit">
      <div v-if="mode === 'user'">
        <input v-model="identifier" placeholder="National ID or My Code" />
        <input type="password" v-model="password" placeholder="Password" />
      </div>
      <div v-else>
        <input v-model="username" placeholder="Username" />
        <input type="password" v-model="password" placeholder="Password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
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
      localStorage.setItem('user', JSON.stringify(data.user));
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
