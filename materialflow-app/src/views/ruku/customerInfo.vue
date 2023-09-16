<!--
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\views\ruku\customerInfo.vue
 * @LastEditTime: 2023-09-16 18:48:01
 * @Description: 
-->
<template>
    <div class="customer">
        <div class="title">入&nbsp;&nbsp;库</div>
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
                    placeholder="请输入11位号码"
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
    const mobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/ // 手机
    if (customerInfo.customerName === '') {
        showToast('客户姓名不能为空!')
    } else if (customerInfo.customerPhone === '') {
        showToast('客户联系号码不能为空!')
    } else if (!mobileReg.test(customerInfo.customerPhone)) {
        showToast('客户号码错误!')
    } else if (customerInfo.customerAddress === '') {
        showToast('客户地址不能为空!')
    } else {
        // 保存客户信息在仓库
        useRukuStore.submitCustomer(customerInfo)
        showSuccessToast('成功提交!')
        router.push('/home/orderInfo')
    }
}
</script>

<style lang="less" scoped>
.customer {
    .title {
        font-size: 2rem;
        font-weight: 600;
        color: #ffffff;
        float: right;
        padding-top: 1.25rem;
        padding-right: 1.5rem;
    }
    width: 100vw;
    height: 100vh;
    overflow: auto;
    .customer_input {
        margin: 6.25rem 0.625rem 5rem;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 1.25rem;
        .customer_input_item {
            padding: 0.75rem 0.875rem;
            border-radius: 1.25rem/1rem;
            overflow: hidden;
            border-bottom: 0.0625rem solid #f4f4f4;
            display: flex;
            label {
                flex: 0 0 5.875rem;
                i {
                    padding-right: 0.375rem;
                }
            }
            input {
                border: 0;
                outline: none;
                background-color: rgba(0, 0, 0, 0);
                font-size: 1rem;
                color: #fff;
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
