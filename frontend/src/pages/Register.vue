<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="submit">
      <input v-model="firstName" placeholder="First Name" />
      <input v-model="lastName" placeholder="Last Name" />
      <input v-model="nationalId" placeholder="National ID" />
      <input v-model="phone" placeholder="Phone" />
      <input v-model="referrerCode" placeholder="Referrer Code" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../services/auth';

const firstName = ref('');
const lastName = ref('');
const nationalId = ref('');
const phone = ref('');
const referrerCode = ref('');
const password = ref('');
const message = ref('');
const router = useRouter();

async function submit() {
  try {
    await register({ firstName: firstName.value, lastName: lastName.value, nationalId: nationalId.value, phone: phone.value, referrerCode: referrerCode.value, password: password.value });
    message.value = 'Registered. Await approval.';
    setTimeout(() => router.push('/'), 1000);
  } catch (e) {
    message.value = 'Registration failed';
  }
}
</script>