/*
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\store\modules\order.ts
 * @LastEditTime: 2023-09-16 22:46:18
 * @Description:
 */
import { defineStore } from 'pinia'
import store from '../index'
interface orderInfo {
    id: string
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
        status: '已入库'
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
        status: '已入库'
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
        status: '运输中'
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
        status: '已入库'
    },
    {
        ID: '16',
        dispatchAssociates: 'Tfboys',
        dispatchPhone: '16778966552',
        dispatchAddress: '西安',
        acceptAssociates: '蒋莹',
        acceptPhone: '19878675119',
        acceptAddress: '遂川',
        goodName: '书籍',
        count: 10,
        weight: 50,
        calendar: '2023/9/14',
        status: '已入库'
    }
] as orderInfo[]
export const orderStore = defineStore({
    id: 'order',
    state: () => {
        return {
            orderList: [] as orderInfo[],
            orderMsg: [] as orderInfo[]
        }
    },
    actions: {
        //从数据库获取订单列表
        getOrderList(orderList) {
            this.orderList = orderList
        },
        //根据ID获取订单详情
        findOrderInfo(ID): orderInfo[] {
            this.orderMsg = this.orderList.filter(item => {
                return item.id.toString() === ID
            })
        },
        //修改订单状态
        changeState(state) {
            this.orderMsg[0].status = state
        },
        //根据电话搜索
        findOrderByPhone(phone): orderInfo[] {
            return this.orderList.filter(item => {
                return item.recipientPhone === phone || item.senderPhone === phone
            })
        },
        // 根据收件人姓名搜索
        findOrderByRName(name: string): orderInfo[] {
            return this.orderList.filter(order => {
                return order.recipient === name
            })
        },
        // 根据寄件人姓名搜索
        findOrderBySName(name: string): orderInfo[] {
            return this.orderList.filter(order => {
                return order.sender === name
            })
        }
    }
})

export function useuserInfoStoreWithOut() {
    return orderStore(store) //  使分仓库名正言顺
}
