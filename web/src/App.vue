<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import { computed } from 'vue';

import { antdLocales } from './locales/antd';
import { useAppStore } from './store/modules/app';
import { useThemeStore } from './store/modules/theme';

defineOptions({
  name: 'App',
});

const appStore = useAppStore();
const themeStore = useThemeStore();

const antdLocale = computed(() => {
  return antdLocales[appStore.locale];
});
</script>

<template>
  <ConfigProvider :theme="themeStore.antdTheme" :locale="antdLocale">
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </ConfigProvider>
</template>

<style scoped></style>
