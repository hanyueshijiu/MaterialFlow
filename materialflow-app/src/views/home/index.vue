<template>
    <div class="home">
        <router-view></router-view>

        <van-tabbar v-model="active">
            <van-tabbar-item icon="records" to="/home/customerInfo">入库</van-tabbar-item>
            <van-tabbar-item icon="description" to="/home/orderList">订单</van-tabbar-item>
            <van-tabbar-item icon="bill-o" to="/home/administrator">明细</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)
</script>

<style lang="less" scoped>
.home {
    width: 100vw;
    height: 100vh;
    background-image: url('../../assets/bg2.png');
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
