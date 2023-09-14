<!--
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\views\home\index.vue
 * @LastEditTime: 2023-09-13 15:58:31
 * @Description: 
-->
<template>
    <div class="home">
        <router-view></router-view>

        <van-tabbar v-model="active">
            <van-tabbar-item name="customerInfo" icon="records" to="/home/customerInfo">
                入库
            </van-tabbar-item>
            <van-tabbar-item name="orderList" icon="description" to="/home/orderList">
                订单
            </van-tabbar-item>
            <van-tabbar-item name="administrator" icon="bill-o" to="/home/administrator">
                明细
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

let active = ref('')
//监视路径变化，修改tabbar
watch(
    () => route.path,
    newRoute => {
        active.value = newRoute.split('/')[2]
    },
    {
        immediate: true
    }
)
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
