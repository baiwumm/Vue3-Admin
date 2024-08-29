<script setup lang="ts">
import { assign, random } from 'lodash-es';
import { onMounted, reactive, ref } from 'vue';

import ChartCard from './chart-card.vue';

defineOptions({
  name: 'SalesVolume',
});

// 数据加载状态
const loading = ref(false);

const state = reactive({
  total: 0,
  daily: 0,
  week: 0,
  completionRate: 0,
});

// 更新数据
const updateState = () => {
  assign(state, {
    total: random(100000, 100000000),
    daily: random(-100, 100),
    week: random(-100, 100),
    completionRate: random(1, 100),
  });
};

// 重新挂载组件
const reloadComponent = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    updateState();
  }, 1200);
};

onMounted(() => {
  reloadComponent();
});
</script>

<template>
  <ChartCard title="总销售额" :total="state.total" :loading="loading" prefix="¥">
    <template #extra>
      <ATooltip title="重新加载">
        <div class="cursor-pointer" @click="reloadComponent">
          <SvgIcon icon="ri:reset-left-fill" />
        </div>
      </ATooltip>
    </template>
    <template #footer>
      <CountTo
        prefix="前年同期业绩完成率："
        suffix="%"
        :end-value="state.completionRate"
        class="text-12px text-black dark:text-white"
      />
    </template>
    <div class="h-[60px]">
      <ASpace>
        <CountTo prefix="日同比：" :end-value="state.daily" suffix="%" class="text-12px text-black dark:text-white" />
        <SvgIcon
          :icon="state.daily >= 0 ? 'ri:arrow-up-fill' : 'ri:arrow-down-fill'"
          :style="{
            color: state.daily >= 0 ? '#3f8600' : '#cf1322',
          }"
        />
        <CountTo prefix="周同比：" :end-value="state.week" suffix="%" class="text-12px text-black dark:text-white" />
        <SvgIcon
          :icon="state.week >= 0 ? 'ri:arrow-up-fill' : 'ri:arrow-down-fill'"
          :style="{
            color: state.week >= 0 ? '#3f8600' : '#cf1322',
          }"
        />
      </ASpace>
      <ADivider />
    </div>
  </ChartCard>
</template>
