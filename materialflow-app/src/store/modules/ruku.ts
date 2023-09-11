import { defineStore } from 'pinia'
import store from '../index'
interface customerInfo {
    customerName: string
    customerPhone: string
    customerAddress: string
    firmName?: string
}
interface orderInfo {}

export const rukuStore = defineStore({
    id: 'ruku',
    state: () => {
        return {
            customerInfo: {} as customerInfo,
            orderInfo: {} as orderInfo
        }
    },
    actions: {
        submitCustomer(customer) {
            this.customerInfo = customer
        }
    }
})

export function useuserInfoStoreWithOut() {
    return rukuStore(store) //  使分仓库名正言顺
}
