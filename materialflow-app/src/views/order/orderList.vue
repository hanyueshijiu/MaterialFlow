<template>
    <!-- 页面标题 -->
    <div class="header">
        <div class="layout">
            <van-cell is-link :title="account" @click="layout = true" />
            <van-action-sheet v-model:show="layout" :actions="actions" @select="onSelect" />
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
                <input type="text" placeholder="输入电话号码搜索" />
            </div>
            <div class="btn">搜索</div>
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
                        <p>订单号： {{ order.ID }}</p>
                        <p>下单时间： {{ order.calendar }}</p>
                    </div>
                    <div class="rightBox">
                        <div @click="goToDetail(order.ID)">订单详情 ></div>
                    </div>
                </div>
                <div class="middle">
                    <div class="start">发货地址:{{ order.dispatchAddress }}</div>
                    <div class="title">{{ order.state }}</div>
                    <div class="end">收货地址:{{ order.acceptAddress }}</div>
                </div>
                <div class="bottom">运费： 20元</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import 'vant/es/toast/style'
import { orderStore } from '../../store/modules/order'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
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

const tabbar = [
    { id: 1, name: '全部' },
    { id: 2, name: '已入库' },
    { id: 3, name: '运输中' },
    { id: 4, name: '已送达' }
]

const kindBox = ref(null)
const layout = ref(false)
const dataIndex = ref(1)
const account = ref('张三')
const actions = ref([{ name: '退出登录' }, { name: '' }])

const router = useRouter()
const useOrderStore = orderStore()
const { orderList } = storeToRefs(useOrderStore)
let orderLists = ref([] as orderInfo[])
orderLists.value = orderList.value

const onSelect = (item: any) => {
    layout.value = false
    showToast(item.name)
}
//tabbar选择
const selectTabbar = (e: any) => {
    dataIndex.value = e.target.dataset.index

    const content = e.target.textContent
    if (content === '全部') {
        orderLists.value = orderList.value
    } else {
        orderLists.value = orderList.value.filter(item => {
            return item.state === content
        })
    }
}
const goToDetail = (ID: string) => {
    router.push({ path: '/home/orderDetail', query: { ID: ID } })
}
</script>

<style lang="less" scoped>
.header {
    display: flex;
    text-align: right;
    padding: 1rem 1rem 0;
    justify-content: space-between;
    align-items: center;
    .layout {
        .van-cell {
            background: #232628;
            align-items: center;
            border-radius: 1.5rem;
            color: #fff;
            font-size: 1rem;
            .van-cell__title {
                flex: none;
                padding: 0.5rem 0rem;
            }
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
        background: rgba(0, 0, 0, 0.2);
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
            background: #000;
            color: #fff;
            font-size: 1rem;
        }
    }
    .kindsBox {
        margin: 1rem;
        margin-top: 1.5rem;
        border-radius: 1.3rem;
        height: 2.4rem;
        background: rgba(0, 0, 0, 0.2);
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
            background: rgba(0, 0, 0, 0.8);
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
