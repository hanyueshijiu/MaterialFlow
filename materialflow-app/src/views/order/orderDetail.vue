<template>
    <div class="container">
        <div class="addressBox">
            <div class="Address">
                <div class="text">发</div>
                <div class="inpBox">{{ orderMsg.dispatchAddress }}</div>
                <div class="icon">
                    <van-icon name="guide-o" />
                </div>
            </div>
            <div class="iconBox">
                <van-icon id="icon" name="sort" />
            </div>
            <div class="Address">
                <div class="text">收</div>
                <div class="inpBox">{{ orderMsg.acceptAddress }}</div>
                <div class="icon">
                    <van-icon name="guide-o" />
                </div>
            </div>
        </div>
        <div class="datailBox">
            <div class="title"><van-icon name="label-o" />订单明细</div>
            <div class="detailTitle">
                <div class="orderId">订单号：{{ orderMsg.ID }}</div>
                <div class="productName">货物名称：{{ orderMsg.goodName }}</div>
                <div class="productName">下单日期：{{ orderMsg.calendar }}</div>
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
                <div class="txt">30</div>
            </div>
        </div>
        <div class="datailBox">
            <div class="title"><van-icon name="label-o" />发货人信息</div>
            <div class="detailTitle">
                <div class="orderId">发货人姓名：{{ orderMsg.dispatchAssociates }}</div>
                <div class="productName">发货人电话：{{ orderMsg.dispatchPhone }}</div>
            </div>
        </div>
        <div class="datailBox">
            <div class="title"><van-icon name="label-o" />收货人信息</div>
            <div class="detailTitle">
                <div class="orderId">收货人姓名：{{ orderMsg.acceptAssociates }}</div>
                <div class="productName">收货人电话：{{ orderMsg.acceptPhone }}</div>
            </div>
        </div>
        <div class="datailBox">
            <div class="title"><van-icon name="label-o" />运输状态</div>
            <van-radio-group
                class="checkBox"
                v-model="checked"
                direction="horizontal"
                @change="changeState"
            >
                <van-radio name="已入库">已入库</van-radio>
                <van-radio name="运输中">运输中</van-radio>
                <van-radio name="已送达">已送达</van-radio>
            </van-radio-group>
        </div>
        <div class="submitBtn">提交</div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { orderStore } from '../../store/modules/order'
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
const checked = ref('')

const route = useRoute()
const useOrderStore = orderStore()
let orderMsg = ref({} as orderInfo)

nextTick(() => {
    initOrderMessage()
})

const initOrderMessage = () => {
    if (route.query.ID) {
        useOrderStore.findOrderInfo(route.query.ID)
        orderMsg.value = useOrderStore.orderMsg[0]
        checked.value = useOrderStore.orderMsg[0].state
    }
}
const changeState = () => {
    useOrderStore.changeState(checked.value)
}
</script>

<style lang="less" scoped>
.container {
    padding-top: 0.625rem;
    .addressBox {
        width: 98%;
        height: 6rem;
        margin: auto;
        background: #fff;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
        padding: 1rem;
        box-sizing: border-box;
        .Address {
            height: 1.5rem;
            display: flex;
            align-items: center;
            .text {
                width: 1.5rem;
                border: 2px solid #eee;
                text-align: center;
                border-radius: 50%;
                background: rgb(155, 204, 204);
            }
            .inpBox {
                width: 80%;
                margin-left: 1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .iconBox {
            margin-top: 0.16rem;
            margin-left: 0.3rem;
        }
    }
    .datailBox {
        margin: 0.7rem 0.2rem;
        background: #fff;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
        padding: 0.5rem;
        box-sizing: border-box;
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
        background: #000;
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
