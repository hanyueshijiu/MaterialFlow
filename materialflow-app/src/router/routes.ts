import { RouteRecordRaw } from 'vue-router';
import Home from '../views/home/index.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        redirect: 'orderList'
      },
      {
        path:'orderList',
        name: 'orderList',
        component: () => import('@/views/order/orderList.vue')
      },
      {
        path:'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/order/orderDeatil.vue')
      },
      {
        path:'customerInfo',
        name: 'customerInfo',
        component: () => import('@/views/ruku/customerInfo.vue')
      },
      {
        path:'orderInfo',
        name: 'orderInfo',
        component: () => import('@/views/ruku/orderInfo.vue')
      },
      {
        path:'administrator',
        name: 'administrator',
        component: () => import('@/views/administrator/index.vue')
      },
    ]
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