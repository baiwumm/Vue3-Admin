<template>
  <div id="MiniProgress"></div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { Progress } from "@antv/g2plot";

defineOptions({
  name: "MiniProgress",
});

type Props = {
  dataSource: number;
  height: number;
  color: string;
};
const props = defineProps<Props>();

// 初始化图表
const initG2Plot = () => {
  const plot = new Progress("MiniProgress", {
    percent: props.dataSource,
    height: props.height,
    animation: {
      // 配置图表第一次加载时的入场动画
      appear: {
        animation: "fade-in", // 动画效果
        duration: 3000, // 动画执行时间
      },
    },
    color: [props.color, "#E8EDF3"],
  });
  plot.render();
};

onMounted(async () => {
  initG2Plot();
});
</script>
