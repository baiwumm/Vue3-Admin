<script setup lang="ts">
import HeaderBanner from "./modules/header-banner.vue";
import ProjectNews from "./modules/project-news.vue";
import CreativityBanner from "./modules/creativity-banner.vue";
import StatisticChart from "./modules/statistic-card/index.vue";
</script>

<template>
  <ASpace direction="vertical" :size="16">
    <!-- 顶部用户信息 -->
    <HeaderBanner />
    <!-- 统计卡片 -->
    <StatisticChart />
    <ARow :gutter="[16, 16]">
      <ACol :span="24" :lg="14">
        <CreativityBanner />
      </ACol>
      <ACol :span="24" :lg="10">
        <ProjectNews />
      </ACol>
    </ARow>
  </ASpace>
</template>
