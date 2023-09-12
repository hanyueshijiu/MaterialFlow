/*
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\router\routes.ts
 * @LastEditTime: 2023-09-12 09:31:26
 * @Description:
 */
import { RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home/orderList'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'orderList',
                name: 'orderList',
                component: () => import('@/views/order/orderList.vue')
            },
            {
                path: 'orderDetail',
                name: 'orderDetail',
                component: () => import('@/views/order/orderDetail.vue')
            },
            {
                path: 'customerInfo',
                name: 'customerInfo',
                component: () => import('@/views/ruku/customerInfo.vue')
            },
            {
                path: 'orderInfo',
                name: 'orderInfo',
                component: () => import('@/views/ruku/orderInfo.vue')
            },
            {
                path: 'administrator',
                name: 'administrator',
                component: () => import('@/views/administrator/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/register/index.vue')
    }
]
