<template>
    <div id="MiniArea"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue' // 引入 Composition-API
import { Area } from '@antv/g2plot' // 引入g2plot图表
export default defineComponent({
    name: 'MiniArea',
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
            const area = new Area('MiniArea', {
                data: props.value,
                height: props.Height,
                xField: 'time',
                yField: 'total',
                smooth: true,
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
                        alias: '访问量',
                    },
                },
            })
            area.render()
        }
        // 挂载图表
        onMounted(() => {
            initG2Plot()
        })
    }
})
</script>
