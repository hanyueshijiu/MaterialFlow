/*
 * @Author: 李羊
 * @Date: 2023-09-11 08:33:47
 * @FilePath: \materialflow-app\src\store\modules\ruku.ts
 * @LastEditTime: 2023-09-15 09:07:51
 * @Description:
 */
import { defineStore } from 'pinia'
import store from '../index'
interface customerInfo {
    customerName: string
    customerPhone: string
    customerAddress: string
    firmName?: string
}
interface orderInfo {
    sender: string
    senderPhone: string
    senderAddress: string
    recipient: string
    recipientPhone: string
    recipientAddress: string
    goodName: string
    ename: string
    count: number
    weight: number
    date: Date
    status: string
    price: number
}

export const rukuStore = defineStore({
    id: 'ruku',
    state: () => {
        return {
            customerInf: {} as customerInfo,
            orderInf: {} as orderInfo
        }
    },
    actions: {
        submitCustomer(customer) {
            this.customerInf = customer
        },
        submitOrder(order) {
            this.orderInf = order
        }
    }
})

export function useuserInfoStoreWithOut() {
    return rukuStore(store) //  使分仓库名正言顺
}
