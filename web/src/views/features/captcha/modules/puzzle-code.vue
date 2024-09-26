<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Vcode from 'vue3-puzzle-vcode';

import { getRandomImg } from '@/utils';

defineOptions({
  name: 'PuzzleCode',
});

// 父组件传递的值
type Props = {
  locales: (field: string) => string;
};
const props = defineProps<Props>();

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
  window.$message?.success(props.locales('verifySuccess'));
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
      <AButton type="primary" block @click="onRest">{{ $t('common.reset') }}</AButton>
    </ASpace>
  </ARow>
</template>
