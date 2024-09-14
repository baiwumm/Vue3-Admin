<script setup lang="ts">
import { useTemplateRef } from 'vue';

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
    window.$message?.success(props.locales('verifySuccess'));
  } else {
    window.$message?.error(props.locales('verifyError'));
  }
};
</script>

<template>
  <ARow justify="center">
    <ASpace direction="vertical">
      <PointsVerify ref="pointsVerify" :imgs="imgs" :width="300" :height="230" @callback="pointsPassing" />
      <AButton type="primary" block @click="onRest">{{ $t('common.reset') }}</AButton>
    </ASpace>
  </ARow>
</template>
