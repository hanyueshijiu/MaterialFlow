/*
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\router\routes.ts
 * @LastEditTime: 2023-09-15 16:40:29
 * @Description:
 */
import { RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: '',
                name: 'order',
                redirect: '/home/orderList'
            },
            {
                path: 'orderList',
                name: 'orderList',
                meta: {
                    name: '订单列表'
                },
                component: () => import('@/views/order/orderList.vue')
            },
            {
                path: 'orderDetail',
                name: 'orderDetail',
                meta: {
                    name: '订单详情'
                },
                component: () => import('@/views/order/orderDetail.vue')
            },
            {
                path: 'customerInfo',
                name: 'customerInfo',
                meta: {
                    name: '客户信息'
                },
                component: () => import('@/views/ruku/customerInfo.vue')
            },
            {
                path: 'orderInfo',
                name: 'orderInfo',
                meta: {
                    name: '订单信息'
                },
                component: () => import('@/views/ruku/orderInfo.vue')
            },
            {
                path: 'administrator',
                name: 'administrator',
                meta: {
                    name: '明细'
                },
                component: () => import('@/views/administrator/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            name: '登录',
            exam: true
        },
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            name: '注册',
            exam: true
        },
        component: () => import('../views/register/index.vue')
    }
]
