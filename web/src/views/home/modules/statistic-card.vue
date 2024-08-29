<script setup lang="ts">
import PageView from './page-view.vue';
import PaymentNumber from './payment-number.vue';
import ProjectSchedule from './project-schedule.vue';
import SalesVolume from './sales-volume.vue';

defineOptions({
  name: 'StatisticChart',
});
</script>

<template>
  <ARow :gutter="[16, 16]">
    <ACol :sm="24" :md="12" :xl="6">
      <!-- 总销售额 -->
      <SalesVolume />
    </ACol>
    <ACol :sm="24" :md="12" :xl="6">
      <!-- 访问量 -->
      <PageView />
    </ACol>
    <ACol :sm="24" :md="12" :xl="6">
      <!-- 支付笔数 -->
      <PaymentNumber />
    </ACol>
    <ACol :sm="24" :md="12" :xl="6">
      <!-- 项目进度 -->
      <ProjectSchedule />
    </ACol>
  </ARow>
</template>
