<script setup lang="ts">
import { ref } from 'vue';

import { useThemeStore } from '@/store/modules/theme';

const themeStore = useThemeStore();

const color = ref(themeStore.themeColor);
const handleEyeDropper = async () => {
  if (!('EyeDropper' in window)) {
    window.$message?.error('你的浏览器不支持EyeDropper');
    return;
  }
  const eyeDropper = new EyeDropper();
  try {
    const result = await eyeDropper.open();
    color.value = result.sRGBHex;
  } catch {
    window.$message?.warning('用户取消取色！');
  }
};
</script>

<template>
  <ASpace direction="vertical" size="middle">
    <ACard :bordered="false" :body-style="{ padding: 0 }">
      <APageHeader :title="$t('route.features_eye-dropper')">
        可将取色器移动到浏览器窗口中任意位置，即可获取到颜色值。
      </APageHeader>
    </ACard>
    <ABadgeRibbon :color="color" :text="color">
      <ACard :bordered="false">
        <AButton type="primary" @click="handleEyeDropper">打开取色器</AButton>
      </ACard>
    </ABadgeRibbon>
  </ASpace>
</template>
