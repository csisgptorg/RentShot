<template>
  <div class="basket">
    <h1>سبد رزرو</h1>

    <table v-if="cart.length">
      <thead>
        <tr>
          <th>کالا</th>
          <th>تعداد</th>
          <th>قیمت واحد</th>
          <th>قیمت</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.productId">
          <td>{{ item.name }}</td>
          <td>{{ item.count }}</td>
          <td>{{ item.unitPrice }}</td>
          <td>{{ item.unitPrice * item.count }}</td>
        </tr>
      </tbody>
    </table>

    <div class="dates">
      <label>
        تاریخ شروع
        <input type="date" v-model="startDate" />
      </label>
      <label>
        تاریخ پایان
        <input type="date" v-model="endDate" />
      </label>
    </div>

    <div class="total">
      جمع کل: {{ totalPrice }}
    </div>

    <button :disabled="!datesValid" @click="confirmReservation">تایید نهایی</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { createReservation } from '../services/reservation';

const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'));
const startDate = ref('');
const endDate = ref('');
const message = ref('');
const router = useRouter();

const datesValid = computed(() => {
  return (
    startDate.value &&
    endDate.value &&
    new Date(startDate.value) <= new Date(endDate.value)
  );
});

const totalPrice = computed(() => calculateTotalPrice());

function calculateTotalPrice() {
  if (!datesValid.value) return 0;
  const days = Math.max(
    1,
    Math.ceil(
      (new Date(endDate.value) - new Date(startDate.value)) /
        (1000 * 60 * 60 * 24)
    )
  );
  return cart.value.reduce(
    (sum, item) => sum + item.unitPrice * item.count * days,
    0
  );
}

async function confirmReservation() {
  if (!datesValid.value) return;
  try {
    const token = localStorage.getItem('token');
    await createReservation(
      {
        items: cart.value,
        startDate: startDate.value,
        endDate: endDate.value
      },
      token
    );
    localStorage.removeItem('cart');
    message.value = 'رزرو شما با موفقیت ثبت شد.';
    setTimeout(() => router.push('/'), 1000);
  } catch (err) {
    message.value = 'ثبت رزرو با شکست مواجه شد.';
  }
}
</script>
<style scoped>
.basket {
  max-width: 600px;
  margin: 0 auto;
}

.dates {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.total {
  margin-bottom: 1rem;
}
</style>
