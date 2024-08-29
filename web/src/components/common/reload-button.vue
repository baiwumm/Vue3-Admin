<script setup lang="ts">
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';

defineOptions({
  name: 'ReloadButton',
});

const appStore = useAppStore();
</script>

<template>
  <ButtonIcon :tooltip-content="$t('icon.reload')">
    <icon-ant-design-reload-outlined :class="{ 'animate-spin animate-duration-750': !appStore.reloadFlag }" />
  </ButtonIcon>
</template>

<style scoped></style>
