/*
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\main.ts
 * @LastEditTime: 2023-09-11 13:23:59
 * @Description:
 */
import { Calendar } from 'vant'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'

createApp(App).use(router).use(store).use(Calendar).mount('#app')
