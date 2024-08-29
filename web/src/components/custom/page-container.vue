<script setup lang="tsx">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <!-- 头部搜索 -->
    <slot name="header"></slot>
    <ACard
      :title="$t(`route.${String(route.name)}`)"
      :bordered="false"
      :body-style="{ flex: 1, overflow: 'hidden' }"
      class="flex-col-stretch sm:flex-1-hidden card-wrapper"
    >
      <!-- 右侧操作区 -->
      <template #extra>
        <slot name="extra"></slot>
      </template>
      <!-- 主体内容 -->
      <slot></slot>
    </ACard>
  </div>
</template>
