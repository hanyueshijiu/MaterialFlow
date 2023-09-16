<template>
    <div class="container">
        <div class="addressBox">
            <div class="Address">
                <div class="text">发</div>
                <div class="inpBox">{{ orderMsg.senderAddress }}</div>
                <div class="icon">
                    <van-icon name="guide-o" />
                </div>
            </div>
            <div class="iconBox">
                <van-icon id="icon" name="sort" />
            </div>
            <div class="Address">
                <div class="text">收</div>
                <div class="inpBox">{{ orderMsg.recipientAddress }}</div>
                <div class="icon">
                    <van-icon name="guide-o" />
                </div>
            </div>
        </div>
        <div class="datailBox">
            <div class="title"><van-icon name="label-o" />订单明细</div>
            <div class="detailTitle">
                <div class="orderId">订单号：{{ orderMsg.id }}</div>
                <div class="productName">货物名称：{{ orderMsg.goodName }}</div>
                <div class="productName">下单日期：{{ orderMsg.date }}</div>
            </div>
        </div>
        <div class="datailBox">
            <div class="title"><van-icon name="label-o" />费用明细</div>
            <div class="billBox">
                <div class="txt">数量(/件)</div>
                <div class="txt">重量(/KG)</div>
                <div class="txt">费用(/元)</div>
            </div>
            <div class="billBox">
                <div class="txt">{{ orderMsg.count }}</div>
                <div class="txt">{{ orderMsg.weight }}</div>
                <div class="txt">{{ orderMsg.price }}</div>
            </div>
        </div>
        <div class="datailBox">
            <div class="title"><van-icon name="label-o" />发货人信息</div>
            <div class="detailTitle">
                <div class="orderId">发货人姓名：{{ orderMsg.sender }}</div>
                <div class="productName">发货人电话：{{ orderMsg.senderPhone }}</div>
            </div>
        </div>
        <div class="datailBox">
            <div class="title"><van-icon name="label-o" />收货人信息</div>
            <div class="detailTitle">
                <div class="orderId">收货人姓名：{{ orderMsg.recipient }}</div>
                <div class="productName">收货人电话：{{ orderMsg.recipientPhone }}</div>
            </div>
        </div>
        <div class="datailBox">
            <div class="title"><van-icon name="label-o" />运输状态</div>
            <van-radio-group
                class="checkBox"
                v-model="checked"
                direction="horizontal"
                @change="changeState"
                :disabled="disabled"
            >
                <van-radio name="已入库">已入库</van-radio>
                <van-radio name="运输中">运输中</van-radio>
                <van-radio name="已送达">已送达</van-radio>
            </van-radio-group>
        </div>
        <div v-if="!disabled" class="submitBtn" @click="submitStatus(orderMsg)">提交</div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { orderStore } from '../../store/modules/order'
import { updateOrderStatus } from '../../api/order'
import { showFailToast, showToast, showSuccessToast } from 'vant'
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

const route = useRoute()
const useOrderStore = orderStore()
let orderMsg = ref({} as orderInfo)
//记录状态
const checked = ref(route.query.status)
const disabled = ref<boolean>(false)
// const checked = ref(useOrderStore.orderMsg[0].status === '' ? '' : useOrderStore.orderMsg[0].status)

nextTick(() => {
    initOrderMessage()

    //判断权限
    const account = localStorage.getItem('account')
    const authority = localStorage.getItem('authority')
    // 管理员可以修改所有订单，如果不是管理员只能修改自己负责的订单
    if (authority !== '1' && account !== orderMsg.value.ename) {
        disabled.value = true
    }
})

//初始化页面
const initOrderMessage = () => {
    if (route.query.ID) {
        //查找指定订单的详情
        useOrderStore.findOrderInfo(route.query.ID)
        orderMsg.value = useOrderStore.orderMsg[0]
        checked.value = useOrderStore.orderMsg[0].status
    }
}
const changeState = async () => {
    useOrderStore.changeState(checked.value)
    showToast('修改状态为' + checked.value)
}

//提交状态改变
const submitStatus = async (order: orderInfo) => {
    const result = await updateOrderStatus({ id: order.id.toString(), status: order.status })
    if (result.code !== 0) {
        showFailToast(result.message)
    } else {
        showSuccessToast(result.message)
    }
}
</script>

<style lang="less" scoped>
.container {
    padding: 0rem 0.625rem;
    padding-top: 0.875rem;
    background: #f6f6f6;
    height: calc(100% - 0.875rem);
    .addressBox {
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 6.375rem;
        background: #ffffff;
        padding: 0.5rem 1rem;
        box-sizing: border-box;
        box-shadow: 0rem 0rem 0.25rem 0.25rem #dddddd;
        border-radius: 1rem;
        .Address {
            height: 2rem;
            display: flex;
            align-items: center;
            .text {
                width: 1.875rem;
                height: 1.875rem;
                color: #022e57;
                border: 1px solid #eee;
                text-align: center;
                line-height: 1.875rem;
                border-radius: 50%;
                background: #e4f6ff;
            }
            .inpBox {
                width: 80%;
                margin-left: 1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            &:last-child {
                .text {
                    color: #fff;
                    background: #022e57;
                }
            }
        }
        .iconBox {
            margin-top: 0.16rem;
            margin-left: 0.5rem;
        }
    }
    .datailBox {
        margin: 0.875rem 0rem;
        background: #ffffff;
        box-shadow: 0rem 0rem 0.25rem 0.25rem #e0e0e0c6;
        padding: 0.4375rem 1rem;
        box-sizing: border-box;
        border-radius: 0.625rem;
        .title {
            font-size: 0.5rem;
        }
        .detailTitle {
            margin-top: 0.1rem;
        }
        .billBox {
            display: flex;
            justify-content: space-around;
            margin-top: 0.1rem;
            .txt {
                text-align: left;
                flex: 1;
            }
        }
        .checkBox {
            margin: 0.2rem;
        }
    }
    .submitBtn {
        width: 20rem;
        height: 3rem;
        line-height: 3rem;
        background: #022e57;
        border-radius: 2rem;
        text-align: center;
        color: #fff;
        margin: auto;
        position: fixed;
        bottom: 3.5rem;
        left: 50%;
        transform: translate(-50%);
    }
}
</style>
