<template>
    <div class="customer">
        <div class="customer_input">
            <div class="customer_input_item">
                <label for="name"><i class="iconfont">&#xe63f;</i>客户姓名</label>
                <input
                    type="text"
                    id="name"
                    v-model="customerInfo.customerName"
                    placeholder="请输入客户姓名"
                />
            </div>
            <div class="customer_input_item">
                <label for="phone"><i class="iconfont">&#xe602;</i>联系电话</label>
                <input
                    type="text"
                    id="phone"
                    v-model="customerInfo.customerPhone"
                    placeholder="请输入电话"
                />
            </div>
            <div class="customer_input_item">
                <label for="address"><i class="iconfont">&#xe600;</i>地址</label>
                <input
                    type="text"
                    id="address"
                    v-model="customerInfo.customerAddress"
                    placeholder="请输入地址"
                />
            </div>
            <div class="customer_input_item">
                <label for="acronyms"><i class="iconfont">&#xe601;</i>公司简称</label>
                <input
                    type="text"
                    id="acronyms"
                    v-model="customerInfo.firmName"
                    placeholder="请输入公司名称"
                />
            </div>
        </div>
        <div class="customer_operate">
            <button @click="submitCustomerInfo">确认</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { showSuccessToast, showToast } from 'vant'
import 'vant/es/toast/style'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { rukuStore } from '../../store/modules/ruku'

const router = useRouter()
const useRukuStore = rukuStore()
const customerInfo = reactive({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    firmName: ''
})

const submitCustomerInfo = () => {
    if (customerInfo.customerName === '') {
        showToast('客户姓名不能为空!')
    } else if (customerInfo.customerPhone === '') {
        showToast('客户联系电话不能为空!')
    } else if (customerInfo.customerAddress === '') {
        showToast('客户地址不能为空!')
    } else {
        useRukuStore.submitCustomer(customerInfo)
        showSuccessToast('成功提交!')
        router.push('/home/orderInfo')
    }
}
</script>

<style lang="less" scoped>
.customer {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    .customer_input {
        margin: 6.25rem 0.625rem 5rem;
        background: #ffffff;
        border-radius: 1.25rem;
        .customer_input_item {
            padding: 0.75rem 0.875rem;
            border-radius: 1.25rem/1rem;
            overflow: hidden;
            border-bottom: 0.125rem solid #f4f4f4;
            display: flex;
            label {
                flex: 0 0 5.875rem;
                i {
                    padding-right: 0.375rem;
                }
            }
            input {
                border: none;
            }
        }
    }
    .customer_operate {
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
