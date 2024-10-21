<script setup lang="ts">
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';

import { getRandomImg } from '@/utils';

const imgs = getRandomImg(20) as string[];

const thumbsSwiper = ref<SwiperClass | null>(null);

const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper;
};
</script>

<template>
  <div class="h-80">
    <Swiper
      loop
      :space-between="10"
      navigation
      :modules="[FreeMode, Navigation, Thumbs]"
      :thumbs="{ swiper: thumbsSwiper }"
      class="h-4/5 w-full"
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
    >
      <SwiperSlide v-for="i in 20" :key="i">
        <img :src="imgs[i - 1]" class="h-full w-full object-cover" />
      </SwiperSlide>
    </Swiper>
    <!-- 缩略图 -->
    <Swiper
      loop
      :space-between="10"
      :slides-per-view="5"
      free-mode
      watch-slides-progress
      :modules="[FreeMode, Navigation, Thumbs]"
      class="thumbs-swiper h-1/5 !pt-2.5"
      @swiper="setThumbsSwiper"
    >
      <SwiperSlide v-for="i in 20" :key="i">
        <img :src="imgs[i - 1]" class="h-full w-full object-cover" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
.thumbs-swiper {
  .swiper-slide {
    height: 100%;
    opacity: 0.4;
    transition: 0.3s all;
    cursor: pointer;
  }
  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>
