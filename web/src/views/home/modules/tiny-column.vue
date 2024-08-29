<script setup lang="ts">
import { TinyColumn } from '@antv/g2plot';
import { onMounted } from 'vue';

defineOptions({
  name: 'TinyColumn',
});

type Props = {
  dataSource: number[];
  height: number;
  color: string;
};
const props = defineProps<Props>();

// 初始化图表
const initG2Plot = () => {
  const plot = new TinyColumn('TinyColumn', {
    data: props.dataSource,
    height: props.height,
    animation: {
      // 配置图表第一次加载时的入场动画
      appear: {
        animation: 'zoom-in', // 动画效果
        duration: 1500, // 动画执行时间
      },
    },
    color: props.color,
    pattern: { type: 'line' },
  });
  plot.render();
};

onMounted(async () => {
  initG2Plot();
});
</script>

<template>
  <div id="TinyColumn"></div>
</template>
