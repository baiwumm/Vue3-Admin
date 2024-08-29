<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth';

const authStore = useAuthStore();

defineOptions({
  name: 'SoybeanAvatar',
});
</script>

<template>
  <div class="size-72px overflow-hidden rd-1/2">
    <AAvatar :src="authStore.userInfo.avatar" class="size-full" />
  </div>
</template>

<style scoped></style>
