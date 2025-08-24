<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Register</h1>
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <input
          v-model="firstName"
          type="text"
          placeholder="First Name"
          class="w-full p-2 border rounded"
        />
        <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>
      </div>
      <div>
        <input
          v-model="lastName"
          type="text"
          placeholder="Last Name"
          class="w-full p-2 border rounded"
        />
        <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</p>
      </div>
      <div>
        <input
          v-model="nationalId"
          type="text"
          placeholder="National ID"
          class="w-full p-2 border rounded"
        />
        <p v-if="errors.nationalId" class="text-red-500 text-sm mt-1">{{ errors.nationalId }}</p>
      </div>
      <div>
        <input
          v-model="phone"
          type="text"
          placeholder="Phone"
          class="w-full p-2 border rounded"
        />
        <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
      </div>
      <div>
        <input
          v-model="referrerCode"
          type="text"
          placeholder="Referral Code (optional)"
          class="w-full p-2 border rounded"
        />
        <p v-if="errors.referrerCode" class="text-red-500 text-sm mt-1">{{ errors.referrerCode }}</p>
      </div>
      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-2 border rounded"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>
      <div>
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="w-full p-2 border rounded"
        />
        <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Register</button>
      <p v-if="errors.general" class="text-red-500 text-sm mt-2">{{ errors.general }}</p>
    </form>
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
const confirmPassword = ref('');
const errors = ref({});
const router = useRouter();

function validate() {
  const e = {};
  if (firstName.value.length < 2 || firstName.value.length > 50) {
    e.firstName = 'First name must be 2-50 characters';
  }
  if (lastName.value.length < 2 || lastName.value.length > 50) {
    e.lastName = 'Last name must be 2-50 characters';
  }
  if (!/^\d{10}$/.test(nationalId.value)) {
    e.nationalId = 'National ID must be 10 digits';
  }
  if (!/^09\d{9}$/.test(phone.value)) {
    e.phone = 'Phone must be 11 digits starting with 09';
  }
  if (referrerCode.value && !/^[a-zA-Z0-9]{6}$/.test(referrerCode.value)) {
    e.referrerCode = 'Referral code must be 6 alphanumeric characters';
  }
  if (password.value.length < 6) {
    e.password = 'Password must be at least 6 characters';
  }
  if (confirmPassword.value !== password.value) {
    e.confirmPassword = 'Passwords do not match';
  }
  errors.value = e;
  return Object.keys(e).length === 0;
}

async function submit() {
  if (!validate()) return;
  try {
    await register({
      firstName: firstName.value,
      lastName: lastName.value,
      nationalId: nationalId.value,
      phone: phone.value,
      referrerCode: referrerCode.value,
      password: password.value
    });
    router.push('/');
  } catch (err) {
    errors.value.general = 'Registration failed';
  }
}
</script>
