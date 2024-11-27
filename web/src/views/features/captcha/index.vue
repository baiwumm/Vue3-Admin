<script setup lang="ts">
import { I18nCaptcha } from '@/constants/i18n';
import { $t } from '@/locales';

import DragCode from './modules/drag-code.vue'; // 滑块验证码
import GraphicCode from './modules/graphic-code.vue'; // 图形验证码
import OperationCode from './modules/operation-code.vue'; // 运算验证码
import PointsCode from './modules/points-code.vue'; // 点选验证码
import PuzzleCode from './modules/puzzle-code.vue'; // 拼图验证码
import RotateCode from './modules/rotate-code.vue'; // 图片旋转验证码
</script>

<template>
  <ASpace direction="vertical" size="middle">
    <ACard :bordered="false" :body-style="{ padding: 0 }">
      <APageHeader :title="$t('route.features_captcha')">{{ I18nCaptcha('subTitle') }}</APageHeader>
    </ACard>
    <ARow :gutter="[20, 20]">
      <!-- 图形验证码 -->
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="I18nCaptcha('graphicCode')">
          <GraphicCode />
        </ACard>
      </ACol>
      <!-- 运算验证码 -->
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="I18nCaptcha('operationCode')">
          <OperationCode />
        </ACard>
      </ACol>
      <!-- 滑块验证码 -->
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="I18nCaptcha('slideCode')">
          <DragCode />
        </ACard>
      </ACol>
      <!-- 图片旋转验证码 -->
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="I18nCaptcha('rotateCode')">
          <RotateCode />
        </ACard>
      </ACol>
      <!-- 拼图验证码 -->
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="I18nCaptcha('puzzleCode')">
          <template #extra>
            <AButton
              type="primary"
              href="https://github.com/javaLuo/vue-puzzle-vcode"
              target="_blank"
              rel="noopener noreferrer"
            >
              vue3-puzzle-vcode
            </AButton>
          </template>
          <PuzzleCode />
        </ACard>
      </ACol>
      <!-- 点选验证码 -->
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="I18nCaptcha('pointsCode')">
          <PointsCode />
        </ACard>
      </ACol>
    </ARow>
  </ASpace>
</template>
