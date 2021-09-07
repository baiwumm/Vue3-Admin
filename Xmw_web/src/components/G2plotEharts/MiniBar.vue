<template>
    <div id="MiniBar"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue' // 引入 Composition-API
import { Column } from '@antv/g2plot'
export default defineComponent({
    name: 'MiniBar',
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
            const columnPlot = new Column('MiniBar', {
                data: props.value,
                height: props.Height,
                xField: 'time',
                yField: 'total',
                xAxis: {
                    label: null,
                    grid: null,
                },
                yAxis: {
                    label: null,
                    grid: null,
                },
                meta: {
                    time: {
                        alias: '类别',
                    },
                    total: {
                        alias: '支付笔数',
                    },
                },
            })

            columnPlot.render()
        }
        onMounted(() => {
            initG2Plot()
        })
    }
})
</script>
