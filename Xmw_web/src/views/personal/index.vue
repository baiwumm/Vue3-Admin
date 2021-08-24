<template>
  <PageWrapper>
    <Row :gutter="16">
      <Col :md="24" :lg="8"><BaseInfo /></Col>
      <Col :md="24" :lg="16"><BaseSetting /></Col>
    </Row>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { PageWrapper } from '/@/components/Page'; // 包裹页面组件
import BaseInfo from './components/baseInfo.vue'; // 基本信息
import BaseSetting from './components/baseSetting.vue'; // 基本设置
import { Button, Row, Col } from 'ant-design-vue';
</script>