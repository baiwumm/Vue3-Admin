<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

import { $t } from '@/locales';

import DragVerify from './drag-verify.vue';

const dragVerify = useTemplateRef<HTMLElement>('dragVerify');

defineOptions({
  name: 'DragCode',
});

// 是否验证成功
const isPassing = ref(false);

// 成功回调
const onSuccess = (seconds: number) => {
  window.$message?.success($t(`page.features.captcha.slideCodeSuccess`, { seconds }));
};

// 还原验证码
const onReset = () => {
  if (dragVerify.value) {
    isPassing.value = false;
    dragVerify.value.reset();
  }
};
</script>

<template>
  <ARow justify="center" align="middle" :gutter="[10, 10]">
    <ACol flex="auto">
      <DragVerify ref="dragVerify" v-model:is-passing="isPassing" @passcallback="onSuccess">
        <template #textBefore>
          <SvgIcon :icon="isPassing ? 'ri:lock-unlock-line' : 'ri:lock-line'" />
        </template>
      </DragVerify>
    </ACol>
    <ACol flex="100px">
      <AButton type="primary" @click="onReset">{{ $t('common.reset') }}</AButton>
    </ACol>
  </ARow>
</template>
