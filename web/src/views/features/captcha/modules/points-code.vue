<script setup lang="ts">
import PointsVerify from './points-verify.vue'; // 点选验证码

defineOptions({
  name: 'PointsCode',
});

// 父组件传递的值
type Props = {
  locales: (field: string) => string;
};
const props = defineProps<Props>();

// 生成图片数组
const imgs = Object.keys(import.meta.glob('@/assets/img/*.jpg'));

// 结果回调
const pointsPassing = (flag: boolean) => {
  if (flag) {
    window.$message?.success(props.locales('verifySuccess'));
  } else {
    window.$message?.error(props.locales('verifyError'));
  }
};
</script>

<template>
  <PointsVerify :imgs="imgs" :width="312" :height="312" @callback="pointsPassing" />
</template>
