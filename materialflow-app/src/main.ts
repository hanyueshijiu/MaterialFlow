/*
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\main.ts
 * @LastEditTime: 2023-09-16 22:17:22
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'

createApp(App).use(router).use(store).mount('#app')
