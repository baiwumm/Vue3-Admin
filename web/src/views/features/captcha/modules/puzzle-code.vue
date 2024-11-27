<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Vcode from 'vue3-puzzle-vcode';

import { I18nCaptcha } from '@/constants/i18n';
import { I18N_COMMON } from '@/enum/i18n';
import { getRandomImg } from '@/utils';

defineOptions({
  name: 'PuzzleCode',
});

// 组件实例
const puzzleVcode = useTemplateRef<HTMLElement>('puzzleVcode');

// 重置
const onRest = () => {
  if (puzzleVcode.value) {
    puzzleVcode.value.reset();
  }
};

/** @description: 验证通过回调 */
const onSuccess = () => {
  window.$message?.success(I18nCaptcha('verifySuccess'));
};
</script>

<template>
  <ARow justify="center">
    <ASpace direction="vertical">
      <Vcode
        ref="puzzleVcode"
        show
        type="inside"
        :imgs="getRandomImg(20)"
        :slider-size="40"
        :canvas-width="300"
        :canvas-height="230"
        class-name="puzzle-vcode"
        @success="onSuccess"
      />
      <AButton type="primary" block @click="onRest">{{ $t(I18N_COMMON.RESET) }}</AButton>
    </ASpace>
  </ARow>
</template>
