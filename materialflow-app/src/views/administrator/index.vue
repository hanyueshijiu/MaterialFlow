<!--
 * @Author: 李羊
 * @Date: 2023-09-11 08:21:32
 * @FilePath: \materialflow-app\src\views\administrator\index.vue
 * @LastEditTime: 2023-09-12 08:23:01
 * @Description: 
-->
<template>
    <div class="statistic">
        <div class="haulage">
            <div class="title">物流运输统计</div>
            <div class="haulage_wrap">
                <div class="haulage_content">
                    <p>已入库:</p>
                    <p>运输中:</p>
                    <p>已送达:</p>
                </div>
                <div class="haulage_graph" ref="pieRef"></div>
            </div>
        </div>
        <div class="toroidal">
            <div class="title">实际收入统计</div>
            <div class="toroidal_wrap">
                <div class="toroidal_content">
                    <p>预计获取收入:</p>
                    <p>实际获取收入:</p>
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
import { ref, onMounted } from 'vue'
const pieRef = ref(null)
const toroidalRef = ref(null)
const barRef = ref(null)

onMounted(() => {
    initGraph()
})

const initGraph = () => {
    var pie = echarts.init(pieRef.value)
    var toroidal = echarts.init(toroidalRef.value)
    var bar = echarts.init(barRef.value)
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
                radius: ['0%', '70%'],
                top: '18%',
                data: [
                    { value: 120, name: '已入库' },
                    { value: 75, name: '运输中' },
                    { value: 200, name: '已送达' }
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
        series: [
            {
                name: 'incomes',
                type: 'pie',
                top: '-27%',
                radius: ['30%', '56%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '预计收入' },
                    { value: 735, name: '实际收入' }
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
            data: ['张三', '李四', '王五', '赵六', '陈绮', '徐八']
        },
        series: [
            {
                name: 'count',
                type: 'bar',
                label: {
                    show: true,
                    position: 'right'
                },
                data: [18203, 23489, 29034, 104970, 131744, 140230]
            }
        ]
    })
}
</script>

<style lang="less" scoped>
.statistic {
    width: 100vw;
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
            background: #fff;
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
            background: #fff;
            border-radius: 1.25rem;
            .toroidal_content {
                font-size: 1rem;
                p {
                    padding-left: 0.75rem;
                }
            }
            .toroidal_graph {
                height: 100%;
            }
        }
    }
    .sales {
        height: 10.625rem;
        .sales_bar {
            height: 100%;
            background: #fff;
            border-radius: 1.25rem;
        }
    }
}
</style>
