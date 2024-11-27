<script setup lang="ts">
import { ref } from 'vue';

import { I18nEyeDropper } from '@/constants/i18n';
import { $t } from '@/locales';
import { useThemeStore } from '@/store/modules/theme';

const themeStore = useThemeStore();

const color = ref(themeStore.themeColor);
const handleEyeDropper = async () => {
  if (!('EyeDropper' in window)) {
    window.$message?.error(I18nEyeDropper('support'));
    return;
  }
  const eyeDropper = new EyeDropper();
  try {
    const result = await eyeDropper.open();
    color.value = result.sRGBHex;
  } catch {
    window.$message?.warning(I18nEyeDropper('cancel'));
  }
};
</script>

<template>
  <ASpace direction="vertical" size="middle">
    <ACard :bordered="false" :body-style="{ padding: 0 }">
      <APageHeader :title="$t('route.features_eye-dropper')">
        {{ I18nEyeDropper('subTitle') }}
      </APageHeader>
    </ACard>
    <ABadgeRibbon :color="color" :text="color">
      <ACard :bordered="false">
        <AButton type="primary" @click="handleEyeDropper">{{ I18nEyeDropper('open') }}</AButton>
      </ACard>
    </ABadgeRibbon>
  </ASpace>
</template>
