/*
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\store\modules\order.ts
 * @LastEditTime: 2023-09-14 14:18:54
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
    state: string
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
        calendar: '2023/9/13',
        state: '已入库'
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
        calendar: '2023/9/13',
        state: '已入库'
    },
    {
        ID: '14',
        dispatchAssociates: '王五',
        dispatchPhone: '16778966552',
        dispatchAddress: '北京',
        acceptAssociates: '李白',
        acceptPhone: '19878675119',
        acceptAddress: '青岛',
        goodName: '衣服',
        count: 2,
        weight: 5,
        calendar: '2023/9/14',
        state: '运输中'
    },
    {
        ID: '15',
        dispatchAssociates: '迪丽热巴',
        dispatchPhone: '16778966552',
        dispatchAddress: '西藏',
        acceptAssociates: '李清照',
        acceptPhone: '19878675119',
        acceptAddress: '湖南',
        goodName: '书籍',
        count: 10,
        weight: 50,
        calendar: '2023/9/13',
        state: '已入库'
    }
] as orderInfo[]
export const orderStore = defineStore({
    id: 'order',
    state: () => {
        return {
            orderList: list,
            orderMsg: [] as orderInfo[]
        }
    },
    actions: {
        //添加订单信息至列表
        addOrderList(order: orderInfo) {
            this.orderList.push(order)
        },
        //根据ID获取订单详情
        findOrderInfo(ID): orderInfo[] {
            this.orderMsg = this.orderList.filter(item => {
                return item.ID === ID
            })
        },
        //修改订单状态
        changeState(state) {
            this.orderMsg[0].state = state
        }
    }
})

export function useuserInfoStoreWithOut() {
    return orderStore(store) //  使分仓库名正言顺
}
