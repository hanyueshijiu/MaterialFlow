<template>
    <!-- 页面标题 -->
    <div class="header">
        <div class="logout">
            <van-cell is-link :title="account" @click="logout = true" />
            <van-action-sheet
                v-model:show="logout"
                :actions="actions"
                cancel-text="取消"
                close-on-click-action
                @cancel="onCancel"
            />
        </div>
        <div class="title">
            <p>订 单</p>
            <p>信 息</p>
        </div>
    </div>
    <div class="container">
        <!-- 搜索框 -->
        <div class="searchBox">
            <div class="searchType">电话</div>
            <div class="inputBox">
                <input type="text" v-model="search" placeholder="输入电话号码搜索" />
            </div>
            <div class="btn" @click="searchByPhone">搜索</div>
        </div>
        <!-- 分类bar -->
        <div class="kindsBox" ref="kindBox" @click="selectTabbar">
            <div
                class="kind"
                :class="{ focus: dataIndex == item.id }"
                v-for="item in tabbar"
                :data-index="item.id"
                :key="item.id"
            >
                {{ item.name }}
            </div>
        </div>
        <!-- 订单详情列表 -->
        <div class="orderListBox">
            <div class="orderItem" v-for="order in orderLists">
                <div class="top">
                    <div class="leftBox">
                        <p>订单号： {{ order.id }}</p>
                        <p>下单时间： {{ order.date }}</p>
                    </div>
                    <div class="rightBox">
                        <div @click="goToDetail(order.id, order.status)">
                            订单详情 <van-icon name="arrow" />
                        </div>
                    </div>
                </div>
                <div class="middle">
                    <div class="start">发货地址:{{ order.senderAddress }}</div>
                    <div class="title">{{ order.status }}</div>
                    <div class="end">收货地址:{{ order.recipientAddress }}</div>
                </div>
                <div class="bottom">运费： {{ order.price }}元</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { showFailToast, showToast } from 'vant'
import 'vant/es/toast/style'
import { orderStore } from '../../store/modules/order'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { getAllOrderList } from '../../api/order'

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

const tabbar = [
    { id: 1, name: '全部' },
    { id: 2, name: '已入库' },
    { id: 3, name: '运输中' },
    { id: 4, name: '已送达' }
]
const actions = ref([
    {
        name: '退出登录',
        subname: '您将退出登录',
        callback: () => {
            localStorage.removeItem('token')
            localStorage.removeItem('account')
            showToast('退出登录成功!')
            router.push('/login')
        }
    }
])
const search = ref('')
const kindBox = ref(null)
const logout = ref(false)
const dataIndex = ref(1)
const account = ref('')
const router = useRouter()
const useOrderStore = orderStore()
const { orderList } = storeToRefs(useOrderStore)
let orderLists = ref([] as orderInfo[])

nextTick(async () => {
    account.value = localStorage.getItem('account') as string
    getAllOrder()
})

const onCancel = () => showToast('取消')
//根据电话搜索
const searchByPhone = () => {
    const mobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/ // 手机
    const phoneReg = /^0\d{2,3}-?\d{7,8}$/ // 固话
    if (mobileReg.test(search.value) || phoneReg.test(search.value)) {
        orderLists.value = useOrderStore.findOrderByPhone(search.value)
        useOrderStore.getOrderList(orderLists.value)
    } else {
        showFailToast('号码格式错误!')
    }
    search.value = ''
}
//tabbar选择
const selectTabbar = (e: any) => {
    dataIndex.value = e.target.dataset.index

    const content = e.target.textContent
    if (content === '全部') {
        getAllOrder()
    } else {
        orderLists.value = orderList.value.filter(item => {
            return item.status === content
        })
    }
}
//从数据库请求数据
const getAllOrder = async () => {
    const res = await getAllOrderList()
    if (res.data.code !== 0) {
        showFailToast(res.data.message)
    } else {
        useOrderStore.getOrderList(res.data.result)
    }
    orderLists.value = orderList.value
}
//详情页面
const goToDetail = (id: string, status: string) => {
    router.push({ path: '/home/orderDetail', query: { ID: id, status: status } })
}
</script>

<style lang="less" scoped>
.header {
    display: flex;
    text-align: right;
    padding: 1rem 1rem 0;
    justify-content: space-between;
    align-items: center;
    .logout {
        .van-cell {
            display: flex;
            background: #022e57;
            align-items: center;
            border-radius: 1rem;
            color: #fff;
            font-size: 1rem;
            box-sizing: border-box;
            padding: 0.375rem 1rem;
        }
    }
    p {
        width: 100%;
        font-size: 2rem;
        font-weight: bold;
        color: #fff;
    }
}
.container {
    .searchBox {
        margin: 1rem;
        border-radius: 1.3rem;
        height: 2.4rem;
        background: #c3d5de;
        display: flex;
        align-items: center;
        font-size: 1rem;
        .searchType {
            width: 4rem;
            margin-left: 1rem;
            color: #fff;
        }
        .inputBox {
            flex: 1;
            margin-left: 2rem;
            input {
                border: 0;
                outline: none;
                background-color: rgba(0, 0, 0, 0);
                font-size: 1rem;
                color: #fff;
            }
        }
        .btn {
            width: 6rem;
            height: 2.2rem;
            line-height: 2.2rem;
            border-radius: 1.3rem;
            border: 1px solid #000;
            text-align: center;
            background: #022e57;
            color: #fff;
            font-size: 1rem;
        }
    }
    .kindsBox {
        margin: 1rem;
        margin-top: 1.5rem;
        border-radius: 1.3rem;
        height: 2.4rem;
        background: #c3d5de;
        display: flex;
        align-items: center;
        font-size: 1rem;
        overflow: hidden;
        .kind {
            flex: 1;
            height: 2.4rem;
            line-height: 2.4rem;
            text-align: center;
        }
        .kind:nth-child(0) {
            border-top-left-radius: 1.3rem;
            border-bottom-left-radius: 1.3rem;
        }
        .focus {
            background: #022e57;
            color: #fff;
            transition: all 0.5s linear;
        }
    }
    .orderListBox {
        height: 60vh;
        width: 88vw;
        margin: 0 1.5rem;
        overflow-y: scroll;
        .orderItem {
            width: 100%;
            height: 10rem;
            background: #fff;
            border-radius: 1rem;
            padding: 1rem;
            box-sizing: border-box;
            margin-bottom: 1rem;
            &:last-child {
                margin-bottom: 1.875rem;
            }
            .top {
                display: flex;
                justify-content: space-between;
                .leftBox {
                    width: 70%;
                    p {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        padding-top: 0.5rem;
                    }
                }
            }
            .middle {
                display: flex;
                text-align: center;
                margin: 1rem 0;
                .start,
                .end {
                    width: 40%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .title {
                    width: 20%;
                    font-size: 1rem;
                    color: #cab6b6;
                    text-align: center;
                }
            }
            .bottom {
                text-align: right;
            }
        }
    }
}
</style>
