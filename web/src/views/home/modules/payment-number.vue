<script setup lang="ts">
import { divide, last, random, round, subtract, sum, times } from 'lodash-es';
import { computed, onMounted, ref, watch } from 'vue';

import { useThemeStore } from '@/store/modules/theme';

import ChartCard from './chart-card.vue';
import TinyColumn from './tiny-column.vue';

defineOptions({
  name: 'PaymentNumber',
});

const themeStore = useThemeStore();

// 数据加载状态
const loading = ref(false);
// 组件 key
const componentKey = ref(0);

// 模拟数据长度
const dataLength = 10;

const dataSource = ref<number[]>([]);

// 重新挂载组件
const reloadComponent = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    dataSource.value = times(dataLength, () => random(1000, 10000));
    componentKey.value += 1;
  }, 1200);
};

// 计算转换率
const conversionRate = computed(() => {
  // 获取数组倒数第一个元素
  const lastData = last(dataSource.value) || 0;
  // 获取数组倒数第二个元素
  const penultimateData = dataSource.value[dataLength - 2];
  return divide(subtract(lastData, penultimateData), penultimateData);
});

onMounted(() => {
  reloadComponent();
});

watch(
  () => themeStore.themeColor,
  () => {
    reloadComponent();
  },
);
</script>

<template>
  <ChartCard :key="componentKey" title="支付笔数" :total="sum(dataSource)" :loading="loading">
    <TinyColumn :data-source="dataSource" :height="60" :color="themeStore.themeColor" />
    <template #extra>
      <ATooltip title="重新加载">
        <div class="cursor-pointer" @click="reloadComponent">
          <SvgIcon icon="ri:reset-left-fill" />
        </div>
      </ATooltip>
    </template>
    <template #footer>
      <ASpace>
        <CountTo
          prefix="转化率："
          suffix="%"
          :end-value="Math.abs(round(conversionRate * 100, 2))"
          class="text-12px text-black dark:text-white"
        />
        <SvgIcon
          :icon="conversionRate > 0 ? 'ri:arrow-up-fill' : 'ri:arrow-down-fill'"
          :style="{
            color: conversionRate > 0 ? '#3f8600' : '#cf1322',
          }"
        />
      </ASpace>
    </template>
  </ChartCard>
</template>
