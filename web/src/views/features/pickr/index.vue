<script setup lang="ts">
import type Pickr from '@simonwep/pickr';
import { ref } from 'vue';

import { $t } from '@/locales';
import { useThemeStore } from '@/store/modules/theme';

defineOptions({
  name: 'PicKr',
});

const themeStore = useThemeStore();

// 文字颜色
const classicColor = ref(themeStore.themeColor);
const monolithColor = ref(themeStore.themeColor);
const nanoColor = ref(themeStore.themeColor);

const classicTheme = ref<Pickr.Theme>('classic');
const monolithTheme = ref<Pickr.Theme>('monolith');
const nanoTheme = ref<Pickr.Theme>('nano');
</script>

<template>
  <div>
    <ACard :title="$t('route.features_pickr')" :border="false">
      <template #extra>
        <AButton type="primary" href="https://github.com/simonwep/pickr" target="_blank" rel="noopener noreferrer">
          @simonwep/pickr
        </AButton>
      </template>
      <ARow justify="center" :gutter="30">
        <ACol>
          <ASpace direction="vertical" align="center">
            <AButton type="primary" ghost>{{ classicTheme }}</AButton>
            <ColorPicker v-model="classicColor" :theme="classicTheme" />
          </ASpace>
        </ACol>
        <ACol>
          <ASpace direction="vertical" align="center">
            <AButton type="primary" ghost>{{ monolithTheme }}</AButton>
            <ColorPicker v-model="monolithColor" :theme="monolithTheme" />
          </ASpace>
        </ACol>
        <ACol>
          <ASpace direction="vertical" align="center">
            <AButton type="primary" ghost>{{ nanoTheme }}</AButton>
            <ColorPicker v-model="nanoColor" :theme="nanoTheme" />
          </ASpace>
        </ACol>
      </ARow>
    </ACard>
  </div>
</template>
