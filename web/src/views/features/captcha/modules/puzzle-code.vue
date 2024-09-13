<script setup lang="ts">
import Vcode from 'vue3-puzzle-vcode';

defineOptions({
  name: 'PuzzleCode',
});

// 父组件传递的值
type Props = {
  locales: (field: string) => string;
};
const props = defineProps<Props>();

// 生成图片数组
const imgs = Object.keys(import.meta.glob('@/assets/img/*.jpg'));

/** @description: 验证通过回调 */
const onSuccess = () => {
  window.$message?.success(props.locales('verifySuccess'));
};
</script>

<template>
  <div class="puzzle-vcode-container">
    <Vcode
      show
      type="inside"
      :imgs="imgs"
      :slider-size="40"
      :canvas-width="300"
      :canvas-height="200"
      class-name="puzzle-vcode"
      @success="onSuccess"
    />
  </div>
</template>

<style lang="scss" scoped>
.puzzle-vcode-container {
  :deep(.puzzle-vcode) {
    display: flex;
    justify-content: center;
  }
}
</style>
