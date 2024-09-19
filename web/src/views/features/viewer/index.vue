<script setup lang="ts">
import 'viewerjs/dist/viewer.css';

import { directive as viewer } from 'v-viewer';

import { $t } from '@/locales';
const vViewer = viewer({
  debug: true,
});
// 图片数组
const imgs = Object.keys(import.meta.glob('@/assets/img/*.jpg'));
</script>

<template>
  <div>
    <ACard :bordered="false" :title="$t('route.features_viewer')">
      <template #extra>
        <AButton type="primary" href="https://github.com/mirari/v-viewer" target="_blank" rel="noopener noreferrer">
          v-viewer
        </AButton>
      </template>
      <div v-viewer class="grid gap-4" :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }">
        <img
          v-for="img in imgs"
          :key="img"
          :src="img"
          class="h-[250px] w-full cursor-pointer place-items-center rounded-md object-cover"
        />
      </div>
    </ACard>
  </div>
</template>
