<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { sum, subtract, last, times, random } from "lodash-es";
import TinyArea from "./tiny-area.vue";
import ChartCard from "./chart-card.vue";
import { useThemeStore } from "@/store/modules/theme";

defineOptions({
  name: "PageView",
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
    componentKey.value++;
  }, 1200);
};

// 获取数组倒数第一个元素
const lastData = computed(() => last(dataSource.value) || 0);
// 获取数组倒数第二个元素
const penultimateData = computed(() => dataSource.value[dataLength - 2]);

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
  <ChartCard
    title="近十日访问量"
    :total="sum(dataSource)"
    :loading="loading"
    :key="componentKey"
  >
    <TinyArea
      :data-source="dataSource"
      :height="60"
      :color="themeStore.themeColor"
    />
    <template #extra>
      <ATooltip title="重新加载">
        <div @click="reloadComponent" class="cursor-pointer">
          <SvgIcon icon="ri:reset-left-fill" />
        </div>
      </ATooltip>
    </template>
    <template #footer>
      <ASpace>
        <CountTo
          prefix="今日访问量："
          :end-value="lastData"
          class="text-12px text-black dark:text-white"
        />
        <CountTo
          prefix="日同比："
          :end-value="Math.abs(subtract(lastData, penultimateData))"
          class="text-12px"
        />
        <SvgIcon
          :icon="
            lastData > penultimateData
              ? 'ri:arrow-up-fill'
              : 'ri:arrow-down-fill'
          "
          :style="{
            color: lastData > penultimateData ? '#3f8600' : '#cf1322',
          }"
        />
      </ASpace>
    </template>
  </ChartCard>
</template>
