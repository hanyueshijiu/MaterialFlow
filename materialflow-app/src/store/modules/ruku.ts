import { defineStore } from 'pinia'
import store from '../index'
interface customerInfo {
    customerName: string
    customerPhone: string
    customerAddress: string
    firmName?: string
}
interface orderInfo {
    dispatchAssociates: string
    dispatchPhone: string
    dispatchAddress: string
    acceptAssociates: string
    acceptPhone: string
    acceptAddress: string
    goodName: string
    count: number
    weight: number
    calendar: Date
}

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
        },
        submitOrder(order) {
            this.orderInfo = order
        }
    }
})

export function useuserInfoStoreWithOut() {
    return rukuStore(store) //  使分仓库名正言顺
}
