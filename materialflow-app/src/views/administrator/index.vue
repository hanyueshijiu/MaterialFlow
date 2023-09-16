<!--
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\views\administrator\index.vue
 * @LastEditTime: 2023-09-16 22:16:41
 * @Description: 
-->
<template>
    <div class="statistic">
        <div class="haulage">
            <div class="title">物流运输统计</div>
            <div class="haulage_wrap">
                <div class="haulage_content">
                    <p>已入库:{{ inStock }}</p>
                    <p>运输中:{{ inTransit }}</p>
                    <p>已送达:{{ inServed }}</p>
                </div>
                <div class="haulage_graph" ref="pieRef"></div>
            </div>
        </div>
        <div class="toroidal">
            <div class="title">实际收入统计</div>
            <div class="toroidal_wrap">
                <div class="toroidal_content">
                    <p>预计获取收入:{{ proIncome }}元</p>
                    <p>实际获取收入:{{ actIncome }}元</p>
                </div>
                <div class="toroidal_graph" ref="toroidalRef"></div>
            </div>
        </div>
        <div class="sales">
            <div class="title">员工业绩统计</div>
            <div class="sales_bar" ref="barRef"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, computed } from 'vue'
// import { orderStore } from '../../store/modules/order'
// import { storeToRefs } from 'pinia'
import { getAllOrderList, getStaffPerformance } from '../../api/order'

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

const pieRef = ref(null)
const toroidalRef = ref(null)
const barRef = ref(null)

const DBOrderList = ref([] as orderInfo[])
const staff = ref({})
let keys: string[] = []
let values: number[] = []
let pie: echarts.ECharts | null = null,
    toroidal: echarts.ECharts | null = null,
    bar: echarts.ECharts | null = null

onMounted(async () => {
    getDBOrderList()
    initGraph([], [])
    staffPerformance()
})

const initGraph = (keys: string[], values: number[]) => {
    if (!pie) {
        pie = echarts.init(pieRef.value)
    }
    if (!toroidal) {
        toroidal = echarts.init(toroidalRef.value)
    }
    if (!bar) {
        bar = echarts.init(barRef.value)
    }
    pie.setOption({
        title: {
            left: 'center',
            top: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            top: '8%'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['0%', '72%'],
                top: '18%',
                data: [
                    { value: inStock.value, name: '已入库' },
                    { value: inTransit.value, name: '运输中' },
                    { value: inServed.value, name: '已送达' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                labelLine: {
                    length: 8,
                    length2: 8
                }
            }
        ]
    })
    toroidal.setOption({
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'incomes',
                type: 'pie',
                radius: ['40%', '84%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: proIncome.value, name: '预计收入' },
                    { value: actIncome.value, name: '实际收入' }
                ]
            }
        ]
    })
    bar.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '2%',
            right: '10%',
            top: '6%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: keys
        },
        series: [
            {
                name: 'count',
                type: 'bar',
                label: {
                    show: true,
                    position: 'right'
                },
                data: values
            }
        ]
    })
}

//直接查询数据库中的记录
const getDBOrderList = async () => {
    const res = await getAllOrderList()
    if (res.data.code === 0) {
        DBOrderList.value = res.data.result
    }
}
//已入库
const inStock = computed(() => {
    let stock = 0
    DBOrderList.value.forEach(item => {
        if (item.status === '已入库') {
            stock++
        }
    })
    return stock
})
//运输中
const inTransit = computed(() => {
    let transit = 0
    DBOrderList.value.forEach(item => {
        if (item.status === '运输中') {
            transit++
        }
    })
    return transit
})
//已送达
const inServed = computed(() => {
    let serve = 0
    DBOrderList.value.forEach(item => {
        if (item.status === '已送达') {
            serve++
        }
    })
    return serve
})
//预计收入
const proIncome = computed(() => {
    let income = 0
    DBOrderList.value.forEach(item => {
        income += Number(item.price)
    })
    return income
})
//实际收入
const actIncome = computed(() => {
    let income = 0
    DBOrderList.value.forEach(item => {
        if (item.status === '已送达') {
            income += Number(item.price)
        }
    })
    return income
})

const staffPerformance = async () => {
    const res = await getStaffPerformance()
    staff.value = res.result
    keys = Object.getOwnPropertyNames(res.result)
    values = keys.map((key: string) => res.result[key])
    initGraph(keys, values)
}
</script>

<style lang="less" scoped>
.statistic {
    padding: 0rem 0.625rem;
    box-sizing: border-box;
    & > div {
        .title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #215476;
            padding-bottom: 0.5rem;
            &::before {
                content: '';
                width: 0rem;
                height: 0rem;
                border-left: 0.5rem solid #022e57;
                border-radius: 0.375rem;
                margin-right: 0.25rem;
            }
        }
    }
    .haulage {
        .haulage_wrap {
            height: 10.625rem;
            display: flex;
            background: #c3d5de;
            align-items: center;
            border-radius: 1.25rem;
            .haulage_content {
                flex: 0 0 6.25rem;
                p {
                    font-size: 0.9375rem;
                    padding: 0.75rem 0.5rem;
                }
            }
            .haulage_graph {
                flex: 1;
                height: 100%;
            }
        }
    }
    .toroidal {
        .toroidal_wrap {
            height: 11.125rem;
            background: #c3d5de;
            border-radius: 1.25rem;
            .toroidal_content {
                font-size: 1rem;
                p {
                    padding-top: 0.375rem;
                    padding-left: 0.75rem;
                }
            }
            .toroidal_graph {
                height: 70%;
            }
        }
    }
    .sales {
        height: 10.625rem;
        .sales_bar {
            height: 100%;
            background: #c3d5de;
            border-radius: 1.25rem;
        }
    }
}
</style>
