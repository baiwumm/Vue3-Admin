<script setup lang="ts">
import { $t } from '@/locales';

import GraphicCode from './modules/graphic-code.vue'; // 图形验证码
import OperationCode from './modules/operation-code.vue'; // 运算验证码
import PointsCode from './modules/points-code.vue'; // 点选验证码
import PuzzleCode from './modules/puzzle-code.vue'; // 拼图验证码
import SlideCode from './modules/slide-code.vue'; // 滑块验证码

// 国际化
const locales = (field: string) => $t(`page.features.captcha.${field}`);
</script>

<template>
  <ASpace direction="vertical" size="middle">
    <ACard :bordered="false" :body-style="{ padding: 0 }">
      <APageHeader :title="$t('route.features_captcha')">{{ locales('subTitle') }}</APageHeader>
    </ACard>
    <ARow :gutter="[20, 20]">
      <!-- 图形验证码 -->
      <ACol :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="locales('graphicCode')">
          <GraphicCode :locales="locales" />
        </ACard>
      </ACol>
      <!-- 运算验证码 -->
      <ACol :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="locales('operationCode')">
          <OperationCode :locales="locales" />
        </ACard>
      </ACol>
      <!-- 滑块验证码 -->
      <ACol :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="locales('slideCode')">
          <SlideCode />
        </ACard>
      </ACol>
      <!-- 拼图验证码 -->
      <ACol :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="locales('puzzleCode')">
          <template #extra>
            <AButton
              type="link"
              href="https://github.com/javaLuo/vue-puzzle-vcode"
              target="_blank"
              rel="noopener noreferrer"
            >
              vue3-puzzle-vcode
            </AButton>
          </template>
          <PuzzleCode :locales="locales" />
        </ACard>
      </ACol>
      <!-- 点选验证码 -->
      <ACol :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="locales('pointsCode')">
          <PointsCode :locales="locales" />
        </ACard>
      </ACol>
    </ARow>
  </ASpace>
</template>
