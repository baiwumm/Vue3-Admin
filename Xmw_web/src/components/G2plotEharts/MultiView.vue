<template>
    <div id="MultiView"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue' // 引入 Composition-API
import { MultiView, G2 } from '@antv/g2plot' // 引入g2plot图表
export default defineComponent({
    name: 'MultiView',
    props: {
        value: {
            type: Object,
            default() {
                return {}
            },
        },
        Height: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        function initG2Plot() {
            G2.registerInteraction('custom-association-filter', {
                showEnable: [
                    { trigger: 'element:mouseenter', action: 'cursor:pointer' },
                    { trigger: 'element:mouseleave', action: 'cursor:default' },
                ],
                start: [
                    {
                        trigger: 'element:click',
                        action: (context) => {
                            const { view, event } = context;
                            // 获取第二个 view
                            const view1 = view.parent.views[1];
                            view1.filter('area', (d) => d === event.data?.data.area);
                            view1.render(true);
                        },
                    },
                ],
                end: [
                    {
                        trigger: 'element:dblclick',
                        action: (context) => {
                            const { view } = context;
                            // 获取第二个 view
                            const view1 = view.parent.views[1];
                            view1.filter('area', null);
                            view1.render(true);
                        },
                    },
                ],
            });
            const multiPlot = new MultiView('MultiView', {
                height: props.Height,
                tooltip: false,
                plots: [
                    {
                        type: 'bar',
                        region: { start: { x: 0, y: 0 }, end: { x: 0.45, y: 0.45 } },
                        options: {
                            data: props.value.bar,
                            xField: 'count',
                            yField: 'area',
                            seriesField: 'cat',
                            isStack: true,
                            tooltip: {
                                shared: true,
                                showCrosshairs: false,
                                showMarkers: false,
                            },
                            label: {},
                            interactions: [{ type: 'active-region' }],
                        },
                    },
                    {
                        type: 'pie',
                        region: { start: { x: 0.5, y: 0 }, end: { x: 1, y: 0.45 } },
                        options: {
                            data: props.value.pie,
                            angleField: 'bill',
                            colorField: 'area',
                            tooltip: {
                                showMarkers: false,
                            },
                            radius: 0.85,
                            label: { type: 'inner', formatter: '{name}', offset: '-15%' },
                            interactions: [
                                { type: 'element-active' },
                                {
                                    type: 'association-tooltip',
                                    cfg: {
                                        start: [
                                            {
                                                trigger: 'element:mousemove',
                                                action: 'association:showTooltip',
                                                arg: { dim: 'x', linkField: 'area' },
                                            },
                                        ],
                                    },
                                },
                                {
                                    type: 'association-highlight',
                                    cfg: {
                                        start: [
                                            {
                                                trigger: 'element:mousemove',
                                                action: 'association:highlight',
                                                arg: { linkField: 'area' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        type: 'area',
                        region: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.95 } },
                        options: {
                            data: props.value.line,
                            xField: 'time',
                            yField: 'value',
                            seriesField: 'area',
                            line: {},
                            point: { style: { r: 2.5 } },
                            meta: {
                                time: { range: [0, 1] },
                            },
                            smooth: true,
                            tooltip: {
                                showCrosshairs: true,
                                shared: true,
                            },
                        },
                    },
                ],
            });
            multiPlot.render();
        }
        // 挂载图表
        onMounted(() => {
            initG2Plot()
        })
    }
})
</script>
