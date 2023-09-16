<<<<<<< HEAD
=======
<!--
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\views\ruku\orderInfo.vue
 * @LastEditTime: 2023-09-16 18:44:44
 * @Description: 
-->
>>>>>>> f07c265f04af57f77fedb4be653d8a5a18fc7f1c
<template>
    <div class="store">
        <div class="title">入&nbsp;&nbsp;库</div>
        <div class="store_input">
            <div class="store_item">
                <label for="dispatchAssociates">发货联系人</label>
                <input
                    type="text"
                    id="dispatchAssociates"
                    :value="orderInfo.sender"
                    placeholder="请输入发货联系人姓名"
                    readonly
                />
            </div>
            <div class="store_item">
                <label for="dispatchPhone">发货联系电话</label>
                <input
                    type="text"
                    id="dispatchPhone"
                    :value="orderInfo.senderPhone"
                    placeholder="请输入发货联系电话"
                    readonly
                />
            </div>

            <div class="store_item">
                <label for="dispatchAddress">发货地址</label>
                <input
                    type="text"
                    id="dispatchAddress"
                    v-model="orderInfo.senderAddress"
                    placeholder="请输入发货地址"
                />
            </div>
            <div class="store_item">
                <label for="acceptAssociates">收货联系人</label>
                <input
                    type="text"
                    id="acceptAssociates"
                    v-model="orderInfo.recipient"
                    placeholder="请输入收货联系人姓名"
                />
            </div>
            <div class="store_item">
                <label for="acceptPhone">收货联系电话</label>
                <input
                    type="text"
                    id="acceptPhone"
                    v-model="orderInfo.recipientPhone"
                    placeholder="请输入收货联系电话"
                />
            </div>
            <div class="store_item">
                <label for="acceptAddress">收货地址</label>
                <input
                    type="text"
                    id="acceptAddress"
                    v-model="orderInfo.recipientAddress"
                    placeholder="请输入收货地址"
                />
            </div>
            <div class="store_item">
                <label for="goodName">货品名称</label>
                <input
                    type="text"
                    id="goodName"
                    v-model="orderInfo.goodName"
                    placeholder="请输入货品名称"
                />
            </div>
            <div class="store_item">
                <label for="count">数量</label>
                <input
                    type="number"
                    id="count"
                    v-model="orderInfo.count"
                    placeholder="请输入货品数量"
                />
            </div>
            <div class="store_item">
                <label for="weight">重量</label>
                <input
                    type="number"
                    id="weight"
                    v-model="orderInfo.weight"
                    placeholder="请输入货品重量"
                />
            </div>
            <div class="store_item">
                <van-cell
                    title="日期"
                    :value="orderInfo.date"
                    @click="orderInfo.showCalendar = true"
                />
                <van-calendar v-model:show="orderInfo.showCalendar" @confirm="onConfirm" />
                <i class="iconfont">&#xe73a;</i>
            </div>
        </div>
        <div class="store_operate">
            <button @click="submitOrder">提交</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { showToast, showSuccessToast, showFailToast } from 'vant'
import 'vant/es/toast/style'
import { reactive } from 'vue'
import { rukuStore } from '../../store/modules/ruku'
import { useRouter } from 'vue-router'
import { postOrderMsg } from '../../api/order'

const router = useRouter()
const useRukuStore = rukuStore()
const { customerInf, orderInf } = storeToRefs(useRukuStore)
const orderInfo = reactive({
    sender: customerInf.value.customerName,
    senderPhone: customerInf.value.customerPhone,
    senderAddress: '',
    companyName: customerInf.value.firmName,
    recipient: '',
    recipientPhone: '',
    recipientAddress: '',
    ename: '',
    count: 1,
    weight: 1,
    date: '',
    goodName: '',
    showCalendar: false,
    status: '已入库',
    price: 10
})

//格式化时间
const formatDate = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
const onConfirm = (value: Date) => {
    orderInfo.showCalendar = false
    orderInfo.date = formatDate(value)
}
//提交信息
const submitOrder = async () => {
    const mobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/ // 手机
    if (orderInfo.senderAddress === '') {
        showToast('发货地址不能为空!')
    } else if (orderInfo.recipient === '') {
        showToast('收货联系人不能为空!')
    } else if (orderInfo.recipientPhone === '') {
        showToast('收货联系电话不能为空!')
    } else if (!mobileReg.test(orderInfo.recipientPhone)) {
        showToast('收货联系号码错误!')
    } else if (orderInfo.recipientAddress === '') {
        showToast('收货地址不能为空!')
    } else if (orderInfo.count <= 0) {
        showToast('数量不能为小于0!')
    } else if (orderInfo.weight <= 0) {
        showToast('重量不能为小于0!')
    } else if (orderInfo.date === '') {
        showToast('日期不能为空!')
    } else if (orderInfo.goodName === '') {
        showToast('货物名称不能为空!')
    } else {
        //将订单信息保存在仓库
        useRukuStore.submitOrder(orderInfo)
        if (orderInf.value.weight > 10) {
            orderInf.value.price = orderInf.value.weight * 0.5 * orderInf.value.count
        } else {
            orderInf.value.price = 1 * orderInf.value.count
        }
        const res = await postOrderMsg({
            sender: customerInf.value.customerName,
            senderPhone: customerInf.value.customerPhone,
            senderAddress: orderInf.value.senderAddress,
            companyName: customerInf.value.firmName,
            recipient: orderInf.value.recipient,
            recipientPhone: orderInf.value.recipientPhone,
            recipientAddress: orderInf.value.recipientAddress,
            goodName: orderInf.value.goodName,
            ename: localStorage.getItem('account'),
            count: orderInf.value.count,
            weight: orderInf.value.weight,
            date: orderInf.value.date,
            status: orderInf.value.status,
            price: orderInf.value.price
        })
        if (res.code !== 0) {
            showFailToast(res.message)
        } else {
            showSuccessToast(res.message)
            router.push('/home/orderList')
        }
    }
}
</script>

<style lang="less" scoped>
.store {
    width: 100vw;
    height: 100vh;
    .title {
        font-size: 2rem;
        font-weight: 600;
        color: #ffffff;
        float: right;
        padding-top: 1.25rem;
        padding-right: 1.5rem;
    }
    .store_input {
        padding: 4.75rem 0.625rem 1.875rem;
        box-sizing: border-box;
        .store_item {
            display: flex;
            border-bottom: 2px solid #e0ecf1;
            align-items: center;
            label {
                padding: 0.75rem 0.625rem;
            }
            input {
                padding-left: 0.5rem;
                flex: 1;
                font-size: 0.875rem;
                border: none;
                height: 1.875rem;
                border-radius: 1rem;
            }
            .iconfont {
                position: relative;
                right: 11.5rem;
                z-index: 0;
            }
            &:nth-child(8) {
                input {
                    flex: none;
                    width: 6.25rem;
                }
            }
            &:nth-child(9) {
                input {
                    flex: none;
                    width: 6.25rem;
                }
            }
        }
    }
    .store_operate {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
            width: 80%;
            color: #fff;
            padding: 0.5rem 0rem;
            border: 0.125rem solid #022e57;
            border-radius: 1.25rem;
            background: #022e57;
        }
    }
}
</style>
<style>
.van-cell {
    font-size: 1rem;
    padding-left: 0.625rem;
    background: transparent;
    padding: 0rem;
    display: flex;
    align-items: center;
    .van-cell__title {
        flex: none;
        padding: 0.75rem 0.625rem;
    }
    .van-cell__value {
        flex: none;
        width: 7.5rem;
        height: 1.875rem;
        background: #ffffff;
        border-radius: 1rem;
        align-items: center;
        padding-left: 10px;
        text-align: left;
    }
}
</style>
