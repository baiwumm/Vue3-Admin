<script setup lang="ts">
import { random } from 'lodash-es';
import { onMounted, ref, watch } from 'vue';

import { useThemeStore } from '@/store/modules/theme';

import ChartCard from './chart-card.vue';
import MiniProgress from './mini-progress.vue';

defineOptions({
  name: 'ProjectSchedule',
});

const themeStore = useThemeStore();

// 数据加载状态
const loading = ref(false);
// 组件 key
const componentKey = ref(0);

const dataSource = ref(0);

const completionRate = ref(0);

// 重新挂载组件
const reloadComponent = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    dataSource.value = random(0, 1, true);
    completionRate.value = random(1, 100);
    componentKey.value += 1;
  }, 1200);
};

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
  <ChartCard :key="componentKey" title="项目进度" :total="dataSource * 100" :loading="loading" suffix="%">
    <MiniProgress :data-source="dataSource" :height="60" :color="themeStore.themeColor" />
    <template #extra>
      <ATooltip title="重新加载">
        <div class="cursor-pointer" @click="reloadComponent">
          <SvgIcon icon="ri:reset-left-fill" />
        </div>
      </ATooltip>
    </template>
    <template #footer>
      <CountTo
        prefix="今年同期项目完成率："
        suffix="%"
        :end-value="completionRate"
        class="text-12px text-black dark:text-white"
      />
    </template>
  </ChartCard>
</template>
