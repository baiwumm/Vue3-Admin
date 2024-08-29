<script setup lang="ts">
import { TinyArea } from '@antv/g2plot';
import { onMounted } from 'vue';

defineOptions({
  name: 'TinyArea',
});

type Props = {
  dataSource: number[];
  height: number;
  color: string;
};
const props = defineProps<Props>();

// 初始化图表
const initG2Plot = () => {
  const plot = new TinyArea('TinyArea', {
    data: props.dataSource,
    height: props.height,
    smooth: true,
    animation: {
      // 配置图表第一次加载时的入场动画
      appear: {
        animation: 'fade-in', // 动画效果
        duration: 3000, // 动画执行时间
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
  <div id="TinyArea"></div>
</template>
