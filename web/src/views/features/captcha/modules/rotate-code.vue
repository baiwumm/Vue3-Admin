<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

import { I18N_COMMON } from '@/enum/i18n';
import { $t } from '@/locales';
import { getRandomImg } from '@/utils';

import RotateVerify from './rotate-verify.vue';

defineOptions({
  name: 'RotateCode',
});

// 组件实例
const rotateVerify = useTemplateRef<HTMLElement>('rotateVerify');

const imgSrc = ref(getRandomImg());

// 重置
const onRest = () => {
  if (rotateVerify.value) {
    rotateVerify.value.reset();
    imgSrc.value = getRandomImg();
  }
};

// 成功回调
const onSuccess = (seconds: number) => {
  window.$message?.success($t(`page.features.captcha.slideCodeSuccess`, { seconds }));
};
</script>

<template>
  <ARow justify="center">
    <ASpace direction="vertical">
      <RotateVerify ref="rotateVerify" :width="250" :img-src="imgSrc" @success="onSuccess" />
      <AButton type="primary" block @click="onRest">{{ $t(I18N_COMMON.RESET) }}</AButton>
    </ASpace>
  </ARow>
</template>
