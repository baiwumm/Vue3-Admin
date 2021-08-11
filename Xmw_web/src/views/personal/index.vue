<template>
  <PageWrapper contentClass="flex">
    <BaseInfo class="w-1/3" />
    <BaseSetting class="w-2/3" style="margin-left: 16px" />
  </PageWrapper>
</template>

<script>
import { defineComponent } from 'vue';
import { PageWrapper } from '/@/components/Page'; // 包裹页面组件
import BaseInfo from './components/baseInfo.vue'; // 基本信息
import BaseSetting from './components/baseSetting.vue'; // 基本设置
export default defineComponent({
  name: 'personal',
  components: { PageWrapper, BaseInfo, BaseSetting },
});
</script>