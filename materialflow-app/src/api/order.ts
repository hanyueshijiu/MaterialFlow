import { get, post } from './index'

const token = localStorage.getItem('token')

// 订单入库
export function postOrderMsg(body: any) {
    return post('/orders/entry', body, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((res: any): any => res.data)
}

//查询所有订单
export function getAllOrderList() {
    return get('/orders/getAllInfo')
}

//修改状态
export function updateOrderStatus(body: any) {
    return post('/orders/modifyGoodStatus', body, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((res: any): any => res.data)
}

//查询员工业绩
export function getStaffPerformance() {
    const authority = localStorage.getItem('authority')
    return get(`/orders/performance?authority=${authority}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((res: any): any => res.data)
}
