<template>
    <div id="Waterfall"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue' // 引入 Composition-API
import { Waterfall } from '@antv/g2plot'
export default defineComponent({
    name: 'Waterfall',
    props: {
        value: {
            type: Array,
            default() {
                return []
            },
        },
        Height: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        function initG2Plot() {
            const waterfallPlot = new Waterfall('Waterfall', {
                data: props.value,
                height: props.Height,
                padding: 'auto',
                appendPadding: [20, 0, 0, 0],
                xField: 'month',
                yField: 'value',
                meta: {
                    month: {
                        alias: '月份',
                    },
                    value: {
                        alias: '销售量',
                        formatter: (v) => `${v / 10000000} 亿`,
                    },
                },
                legend: {
                    custom: true,
                    items: [
                        {
                            name: '增加',
                            value: 'increase',
                            marker: { symbol: 'square', style: { r: 5, fill: '#f4664a' } },
                        },
                        {
                            name: '减少',
                            value: 'decrease',
                            marker: { symbol: 'square', style: { r: 5, fill: '#30bf78' } },
                        },
                        {
                            name: '总计',
                            value: 'total',
                            marker: { symbol: 'square', style: { r: 5, fill: '#96a6a6' } },
                        },
                    ],
                },
                /** 展示总计 */
                total: {
                    label: '总计',
                    style: {
                        fill: '#96a6a6',
                    },
                },
                /** 数据标签展示模式：绝对值 */
                labelMode: 'absolute',
                label: {
                    style: {
                        fontSize: 10,
                    },
                    background: {
                        style: {
                            fill: '#f6f6f6',
                            radius: 1,
                        },
                        padding: 1.5,
                    },
                },
            });

            waterfallPlot.render()
        }
        onMounted(() => {
            initG2Plot()
        })
    }
})
</script>
