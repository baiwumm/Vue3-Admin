<script setup lang="ts">
defineOptions({
  name: 'ChartCard',
});

type Props = {
  title: string; // 标题
  total: number; // 总数
  loading?: boolean; // 加载状态
  prefix?: string; // 前缀
  suffix?: string; // 后缀
};
defineProps<Props>();
</script>

<template>
  <ACard :bordered="false">
    <ASpin :spinning="loading">
      <ASpace direction="vertical" class="w-full">
        <AStatistic>
          <template #title>
            <ARow justify="space-between">
              <ATypographyText type="secondary">{{ title }}</ATypographyText>
              <slot name="extra" />
            </ARow>
          </template>
          <template #formatter>
            <CountTo
              :end-value="total"
              :prefix="prefix"
              :suffix="suffix"
              class="text-30px text-black dark:text-white"
            />
          </template>
        </AStatistic>
        <!-- 主题内容 -->
        <slot />
        <!-- 底部信息 -->
        <slot name="footer" />
      </ASpace>
    </ASpin>
  </ACard>
</template>
