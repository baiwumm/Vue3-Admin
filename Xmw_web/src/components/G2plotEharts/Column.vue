<template>
    <div id="Column"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from 'vue' // 引入 Composition-API
import { Column } from '@antv/g2plot' // 引入g2plot图表
export default defineComponent({
    name: 'Column',
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
        const timer = ref(null)
        function initG2Plot() {
            const paletteSemanticRed = '#F4664A';
            const brandColor = '#5B8FF9';
            const columnPlot = new Column('Column', {
                data: props.value,
                height: props.Height,
                xField: 'type',
                yField: 'value',
                seriesField: 'value',
                color: ({ value }) => {
                    if (value < 0.05) {
                        return paletteSemanticRed;
                    }
                    return brandColor;
                },
                legend: false
            })
            columnPlot.render()
            timer.value = setInterval(() => {
                columnPlot.changeData(props.value.map((d) => ({ ...d, value: d.value * Math.random() })));
            }, 1200);
        }
        // 挂载图表
        onMounted(() => {
            initG2Plot()
        })
        onUnmounted(() => {
            clearInterval(timer.value)
        })
    }
})
</script>
