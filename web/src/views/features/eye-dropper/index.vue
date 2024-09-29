<script setup lang="ts">
import { ref } from 'vue';

import { $t } from '@/locales';
import { useThemeStore } from '@/store/modules/theme';

const themeStore = useThemeStore();

const color = ref(themeStore.themeColor);
const handleEyeDropper = async () => {
  if (!('EyeDropper' in window)) {
    window.$message?.error($t('page.features.eye-dropper.support'));
    return;
  }
  const eyeDropper = new EyeDropper();
  try {
    const result = await eyeDropper.open();
    color.value = result.sRGBHex;
  } catch {
    window.$message?.warning($t('page.features.eye-dropper.cancel'));
  }
};
</script>

<template>
  <ASpace direction="vertical" size="middle">
    <ACard :bordered="false" :body-style="{ padding: 0 }">
      <APageHeader :title="$t('route.features_eye-dropper')">
        {{ $t('page.features.eye-dropper.subTitle') }}
      </APageHeader>
    </ACard>
    <ABadgeRibbon :color="color" :text="color">
      <ACard :bordered="false">
        <AButton type="primary" @click="handleEyeDropper">{{ $t('page.features.eye-dropper.open') }}</AButton>
      </ACard>
    </ABadgeRibbon>
  </ASpace>
</template>
