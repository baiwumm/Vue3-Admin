<script setup lang="ts">
import { ref } from 'vue';

import { I18N_COMMON } from '@/enum/i18n';
import { $t } from '@/locales';

import SlideVerify from './slide-verify.vue'; // 滑块验证码

defineOptions({
  name: 'SlideCode',
});

const count = ref(0);

// 成功回调
const onSuccess = (seconds: number) => {
  window.$message?.success($t(`page.features.captcha.slideCodeSuccess`, { seconds }));
};
</script>

<template>
  <ARow justify="center" align="middle" :gutter="[10, 10]">
    <ACol flex="auto">
      <SlideVerify :key="count" @success="onSuccess" />
    </ACol>
    <ACol flex="100px">
      <AButton type="primary" @click="count++">{{ $t(I18N_COMMON.RESET) }}</AButton>
    </ACol>
  </ARow>
</template>
