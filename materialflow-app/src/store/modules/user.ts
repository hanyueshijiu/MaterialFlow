import { defineStore } from 'pinia'
import store from '../index'

export const useInfoStore = defineStore({
    id: 'userInfo',
    state: () => {
        return {
            username: '',
            password: ''
        }
    },
    getters: {},
    actions: {}
})

export function useuserInfoStoreWithOut() {
    return useInfoStore(store) //  使分仓库名正言顺
}
