<script setup lang="ts">
import { sample } from 'lodash-es';
import { ref, useTemplateRef } from 'vue';

import { $t } from '@/locales';

import RotateVerify from './rotate-verify.vue';

defineOptions({
  name: 'RotateCode',
});

// 是否验证成功
const rotateVerify = useTemplateRef<HTMLElement>('rotateVerify');

// 生成图片数组
const imgs = Object.keys(import.meta.glob('@/assets/img/*.jpg'));

const imgSrc = ref(sample(imgs));

// 重置
const onRest = () => {
  if (rotateVerify.value) {
    rotateVerify.value.reset();
    imgSrc.value = sample(imgs);
  }
};
</script>

<template>
  <ARow justify="center">
    <ASpace direction="vertical">
      <RotateVerify ref="rotateVerify" :width="250" :img-src="imgSrc" />
      <AButton type="primary" block @click="onRest">{{ $t('common.reset') }}</AButton>
    </ASpace>
  </ARow>
</template>
