import { RouteRecordRaw } from 'vue-router';
import Home from '../views/home/index.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/index.vue'),
  },
];