import { createRouter, createWebHistory } from 'vue-router';

import Main from '../pages/Main.vue';
import MyPanel from '../pages/MyPanel.vue';
import Reserve from '../pages/Reserve.vue';
import ReserveBasket from '../pages/ReserveBasket.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import AdminPanel from '../pages/AdminPanel.vue';
import AboutUs from '../pages/AboutUs.vue';
import Products from '../pages/Products.vue';
import QueueUsers from '../pages/QueueUsers.vue';
import RegisteredUsers from '../pages/RegisteredUsers.vue';
import ReservedLists from '../pages/ReservedLists.vue';
import Factor from '../pages/Factor.vue';
import Income from '../pages/Income.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/panel', component: MyPanel, meta: { requiresAuth: true } },
  { path: '/reserve', component: Reserve, meta: { requiresAuth: true } },
  { path: '/basket', component: ReserveBasket, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/admin', component: AdminPanel, meta: { requiresAdmin: true } },
  { path: '/about', component: AboutUs },
  { path: '/admin/products', component: Products, meta: { requiresAdmin: true } },
  { path: '/admin/queue-users', component: QueueUsers, meta: { requiresAdmin: true } },
  { path: '/admin/registered-users', component: RegisteredUsers, meta: { requiresAdmin: true } },
  { path: '/admin/reserved-lists', component: ReservedLists, meta: { requiresAdmin: true } },
  { path: '/factor/:code', component: Factor, meta: { requiresAuth: true } },
  { path: '/admin/income', component: Income, meta: { requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (to.meta.requiresAuth && !user) return next('/login');
  if (to.meta.requiresAdmin && role !== 'admin') return next('/');
  next();
});

export default router;
