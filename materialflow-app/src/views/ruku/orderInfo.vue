<template>
    <div class="store">
        <div class="title">入&nbsp;&nbsp;库</div>
        <div class="store_input">
            <div class="store_item">
                <label for="dispatchAssociates">发货联系人</label>
                <input
                    type="text"
                    id="dispatchAssociates"
                    :value="orderInfo.dispatchAssociates"
                    placeholder="请输入发货联系人姓名"
                    readonly
                />
            </div>
            <div class="store_item">
                <label for="dispatchPhone">发货联系电话</label>
                <input
                    type="text"
                    id="dispatchPhone"
                    :value="orderInfo.dispatchPhone"
                    placeholder="请输入发货联系电话"
                    readonly
                />
            </div>

            <div class="store_item">
                <label for="dispatchAddress">发货地址</label>
                <input
                    type="text"
                    id="dispatchAddress"
                    v-model="orderInfo.dispatchAddress"
                    placeholder="请输入发货地址"
                />
            </div>
            <div class="store_item">
                <label for="acceptAssociates">收货联系人</label>
                <input
                    type="text"
                    id="acceptAssociates"
                    v-model="orderInfo.acceptAssociates"
                    placeholder="请输入收货联系人姓名"
                />
            </div>
            <div class="store_item">
                <label for="acceptPhone">收货联系电话</label>
                <input
                    type="text"
                    id="acceptPhone"
                    v-model="orderInfo.acceptPhone"
                    placeholder="请输入收货联系电话"
                />
            </div>
            <div class="store_item">
                <label for="acceptAddress">收货地址</label>
                <input
                    type="text"
                    id="acceptAddress"
                    v-model="orderInfo.acceptAddress"
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
                    :value="orderInfo.calendar"
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
import { showToast, showSuccessToast } from 'vant'
import 'vant/es/toast/style'
import { reactive } from 'vue'
import { rukuStore } from '../../store/modules/ruku'
import { useRouter } from 'vue-router'

const router = useRouter();
const useRukuStore = rukuStore()
const { customerInfo } = storeToRefs(useRukuStore)
const orderInfo = reactive({
    dispatchAssociates: customerInfo.value.customerName,
    dispatchPhone: customerInfo.value.customerPhone,
    dispatchAddress: '',
    acceptAssociates: '',
    acceptPhone: '',
    acceptAddress: '',
    count: 1,
    weight: 1,
    calendar: '',
    goodName: '',
    showCalendar: false
})

//格式化时间
const formatDate = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
const onConfirm = (value: Date) => {
    orderInfo.showCalendar = false
    orderInfo.calendar = formatDate(value)
}
//提交信息
const submitOrder = () => {
    if (orderInfo.dispatchAddress === '') {
        showToast('发货地址不能为空!')
    } else if (orderInfo.acceptAssociates === '') {
        showToast('收货联系人不能为空!')
    } else if (orderInfo.acceptPhone === '') {
        showToast('收货联系电话不能为空!')
    } else if (orderInfo.acceptAddress === '') {
        showToast('收货地址不能为空!')
    } else if (orderInfo.count <= 0) {
        showToast('数量不能为小于0!')
    } else if (orderInfo.weight <= 0) {
        showToast('重量不能为小于0!')
    } else if (orderInfo.calendar === '') {
        showToast('日期不能为空!')
    } else if (orderInfo.goodName === '') {
        showToast('货物名称不能为空!')
    } else {
        useRukuStore.submitOrder(orderInfo)
        showSuccessToast('提交成功!')
        router.push('/home/orderList')
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
