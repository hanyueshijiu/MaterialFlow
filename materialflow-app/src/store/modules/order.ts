/*
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\store\modules\order.ts
 * @LastEditTime: 2023-09-13 17:04:25
 * @Description:
 */
import { defineStore } from 'pinia'
import store from '../index'
interface orderInfo {
    ID: string
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

const list = [
    {
        ID: '12',
        dispatchAssociates: '张三',
        dispatchPhone: '16778966552',
        dispatchAddress: '南昌',
        acceptAssociates: '李四',
        acceptPhone: '19878675119',
        acceptAddress: '丰城',
        goodName: '纸巾',
        count: 20,
        weight: 100,
        calendar: '2023/9/13'
    },
    {
        ID: '13',
        dispatchAssociates: '王五',
        dispatchPhone: '16778966552',
        dispatchAddress: '南昌',
        acceptAssociates: '赵六',
        acceptPhone: '19878675119',
        acceptAddress: '丰城',
        goodName: '纸巾',
        count: 20,
        weight: 80,
        calendar: '2023/9/13'
    }
] as orderInfo[]
export const orderStore = defineStore({
    id: 'order',
    state: () => {
        return {
            orderList: list
            // orderMsg: [] as orderInfo[]
        }
    },
    actions: {
        //添加订单信息至列表
        addOrderList(order: orderInfo) {
            this.orderList.push(order)
        },
        findOrderInfo(ID): orderInfo[] {
            return this.orderList.filter(item => {
                return item.ID === ID
            })
        }
    }
})

export function useuserInfoStoreWithOut() {
    return orderStore(store) //  使分仓库名正言顺
}
