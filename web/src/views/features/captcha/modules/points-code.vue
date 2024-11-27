<script setup lang="ts">
import { useTemplateRef } from 'vue';

import { I18nCaptcha } from '@/constants/i18n';
import { I18N_COMMON } from '@/enum/i18n';
import { getRandomImg } from '@/utils';

import PointsVerify from './points-verify.vue'; // 点选验证码

defineOptions({
  name: 'PointsCode',
});

// 组件实例
const pointsVerify = useTemplateRef<HTMLElement>('pointsVerify');

// 重置
const onRest = () => {
  if (pointsVerify.value) {
    pointsVerify.value.refresh();
  }
};

// 结果回调
const pointsPassing = (flag: boolean) => {
  if (flag) {
    window.$message?.success(I18nCaptcha('verifySuccess'));
  } else {
    window.$message?.error(I18nCaptcha('verifyError'));
  }
};
</script>

<template>
  <ARow justify="center">
    <ASpace direction="vertical">
      <PointsVerify ref="pointsVerify" :imgs="getRandomImg(20)" :width="300" :height="230" @callback="pointsPassing" />
      <AButton type="primary" block @click="onRest">{{ $t(I18N_COMMON.RESET) }}</AButton>
    </ASpace>
  </ARow>
</template>
