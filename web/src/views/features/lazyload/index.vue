<script setup lang="ts">
import { $t } from '@/locales';
import { getRandomImg } from '@/utils';

const onCallback = (el: HTMLElement) => {
  el.style.opacity = '1';
  el.style.display = 'block';
};
</script>

<template>
  <ASpace direction="vertical" size="middle">
    <ACard :bordered="false" :body-style="{ padding: 0 }">
      <APageHeader :title="$t('route.features_lazyload')">
        {{ $t('page.features.lazyload.subTitle') }}
      </APageHeader>
    </ACard>
    <div class="grid gap-4" :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }">
      <div v-for="i in 50" :key="i" class="lazy-img-cpntainer">
        <img
          v-lazyLoad="{
            src: getRandomImg(),
            callback: onCallback,
          }"
          class="lazy-img h-[250px] w-full cursor-pointer place-items-center rounded-md object-cover"
        />
      </div>
    </div>
  </ASpace>
</template>

<style lang="scss" scoped>
.lazy-img-cpntainer {
  position: relative;
  .lazy-img {
    opacity: 0;
    transition: opacity 2s;
  }
}
</style>
