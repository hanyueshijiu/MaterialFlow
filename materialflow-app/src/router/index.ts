import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    //存储token
    if (to.meta.name) {
        document.title = to.meta.name
        if (token || to.meta.exam === true) {
            next()
        } else {
            if (to.name === '/login') {
                next()
            } else {
                next('/login')
            }
        }
    }
})
export default router
